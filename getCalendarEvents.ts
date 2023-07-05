import { addDays, addHours } from "date-fns";
import { JWT } from "google-auth-library";
import { calendar_v3, google } from "googleapis";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events.readonly",
];
const GRAPHITE_COLOR_ID = "8";
const GCP_CLIENT_EMAIL = process.env.GCP_CLIENT_EMAIL;
const GCP_PRIVATE_KEY = process.env.GCP_PRIVATE_KEY;

function authenticate(email: string) {
  return new JWT({
    email: GCP_CLIENT_EMAIL,
    key: GCP_PRIVATE_KEY,
    scopes: SCOPES,
    subject: email,
  });
}

export default async function getCalendarEvents(email: string) {
  const client = authenticate(email);
  const calendar = google.calendar({ version: "v3", auth: client });

  const now = new Date();
  const timeMin = addDays(now, 1);
  const timeMax = addHours(timeMin, 1);

  const params: calendar_v3.Params$Resource$Events$List = {
    calendarId: email,
    q: "+ DOT",
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  };

  const events =
    (await calendar.events.list(params)).data.items?.filter(
      (event) => event.colorId === GRAPHITE_COLOR_ID
    ) || [];

  console.log("Found", events.length, "events for", email);
  return events;
}
