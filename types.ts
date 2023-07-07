import { calendar_v3 } from "googleapis";

export type SalesRepresentative = {
  name: string;
  email: string;
  phone: string;
  pabblyWebhook: string;
};

export type MeetingRequester = {
  eventId: string;
  summary: string;
  meetingTime: string;
  creatorEmail: string;
  creatorInfo: SalesRepresentative;
  customers: calendar_v3.Schema$EventAttendee[];
};

export type CustomerInfo = {
  name: string;
  phone: string;
};
