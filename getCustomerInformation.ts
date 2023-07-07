import { calendar_v3 } from "googleapis";
import { CustomerInformation, ListContacts } from "./types";

const RD_API_KEY = process.env.RD_CRM_TOKEN;
const REQUEST_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

export default async function getCustomerInformation(
  attendees: calendar_v3.Schema$EventAttendee[]
): Promise<CustomerInformation | undefined> {
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
  const response = await callRDApi(email);

  return response.contacts.find(
    (contact) =>
      contact.phones.find((phone) => phone.type === "fax") !== undefined
  );
}

async function callRDApi(email: string): Promise<ListContacts> {
  const url = `https://crm.rdstation.com/api/v1/contacts?token=${RD_API_KEY}&email=${email}`;
  return await fetch(url, REQUEST_OPTIONS)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
}
