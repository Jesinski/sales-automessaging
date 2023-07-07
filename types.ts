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

export type CustomerInformation = {
  name: string;
  phone: string;
};

export type ListContacts = {
  contacts: Contact[];
};

type Contact = {
  id: string;
  name: string;
  phones: ContactPhones[];
};

type ContactPhones = {
  phone: string;
  type: string;
};
