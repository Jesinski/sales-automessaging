import { Context, ScheduledEvent } from "aws-lambda";
import dotenv from "dotenv";
import getCalendarEvents from "./getCalendarEvents";
import getSalesRepresentatives from "./getSalesRepresentatives";
dotenv.config();

export const handler = async (event: ScheduledEvent, context: Context) => {
  try {
    const promises: Promise<void>[] = [];

    // getSDRInfo()
    const salesRepresentatives = getSalesRepresentatives();

    for (let i = 0; i < salesRepresentatives.length; i++) {
      await getCalendarEvents(salesRepresentatives[i].email);
    }
    // salesRepresentatives.forEach(async (representative, index) => {
    //   // getCalendarEvents()
    //   // processEvents()
    //   // getCustomerInfo()
    //   // sendWhatsappMessage()
    // });
  } catch (err) {
    console.log(err);
  } finally {
    return {
      statusCode: 200,
    };
  }
};
