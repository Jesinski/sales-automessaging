import { Context, ScheduledEvent } from "aws-lambda";
import { format, parseISO } from "date-fns";
import { calendar_v3 } from "googleapis";
import getCalendarEvents from "./getCalendarEvents";
import getCustomerInformation from "./getCustomerInformation";
import getSalesRepresentatives from "./getSalesRepresentatives";
import sendWhatsappMessage from "./sendWhatsappMessage";
import { MeetingRequester } from "./types";

function getMeetingTime(event: calendar_v3.Schema$Event) {
  return format(parseISO(event!.start!.dateTime!), "HH:mm");
}

export const handler = async (event: ScheduledEvent, context: Context) => {
  try {
    const promises: Promise<void>[] = []; // TODO: run this shit in parallel

    const salesRepresentatives = getSalesRepresentatives();

    for (let i = 0; i < salesRepresentatives.length; i++) {
      const events = await getCalendarEvents(salesRepresentatives[i].email);

      for (let j = 0; j < events.length; j++) {
        const payload: MeetingRequester = {
          eventId: events[j].id!,
          summary: events[j].summary!,
          meetingTime: getMeetingTime(events[j]),
          creatorInfo: salesRepresentatives[i],
          creatorEmail: events[j].creator?.email!,
          customers: events[j].attendees!.filter(
            (attendee) =>
              !attendee.self && !attendee.email!.includes("@dotconceito.com")
          ),
        };

        const customer = await getCustomerInformation(payload.customers);

        if (!customer) {
          logError("Customer Not Found! Payload:", payload);
          continue;
        }

        await sendWhatsappMessage(payload, customer);
        logError("Sent Whatsapp", payload);
      }
    }
    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
    };
  }
};

function logError(error: string, payload: MeetingRequester) {
  console.log(error, payload.summary, payload.creatorInfo.email);
}
