import { calendar_v3 } from "googleapis";
import { CustomerInfo } from "./types";

type ListContacts = {
  contacts: Contact[];
};

type ContactPhones = {
  phone: string;
  type: string;
};

type Contact = {
  id: string;
  name: string;
  phones: ContactPhones[];
};

const RD_API_KEY = process.env.RD_CRM_TOKEN;
const REQUEST_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

export default async function getCustomer(
  attendees: calendar_v3.Schema$EventAttendee[]
): Promise<CustomerInfo | undefined> {
  for (let i = 0; i < attendees.length; i++) {
    const contact = await getFirstContactWithFaxPhone(attendees[i].email!);
    if (contact) {
      return {
        name: contact.name,
        phone: contact.phones.find((phone) => phone.type === "fax")!.phone,
      };
    }
  }
  return undefined;
}

async function getFirstContactWithFaxPhone(email: string) {
  const url = `https://crm.rdstation.com/api/v1/contacts?token=${RD_API_KEY}&email=${email}`;

  const response = await callRDApi<ListContacts>(url);
  return response.contacts.find(
    (contact) =>
      contact.phones.find((phone) => phone.type === "fax") !== undefined
  );
}

async function callRDApi<T>(url: string): Promise<T> {
  return await fetch(url, REQUEST_OPTIONS)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
}
