import { calendar_v3 } from "googleapis";
import { CustomerInfo } from ".";

async function getContactId(email: string) {
  const url = `https://crm.rdstation.com/api/v1/contacts?token=${process.env.RD_CRM_TOKEN}&email=${email}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => json.contacts[0].id)
    .catch((err) => console.error("error:" + err));
}

async function getContact(id: string): Promise<CustomerInfo | undefined> {
  const url = `https://crm.rdstation.com/api/v1/contacts/${id}?token=${process.env.RD_CRM_TOKEN}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  return fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const contact = {
        name: json.name,
        phone: json.phones.find((phone: any) => phone.type === "fax").phone,
      };
      return contact;
    })
    .catch((err) => {
      console.error("error:" + err);
      return undefined;
    });
}

export default async function getCustomer(
  attendees: calendar_v3.Schema$EventAttendee[]
): Promise<CustomerInfo | undefined> {
  for (let i = 0; i < attendees.length; i++) {
    const contactId = await getContactId(attendees[i].email!);
    const contact = await getContact(contactId);
    if (contact) {
      return contact;
    }
  }
  return undefined;
}
