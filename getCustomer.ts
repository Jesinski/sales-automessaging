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
  email: string
): Promise<CustomerInfo> {
  try {
    const contactId = await getContactId(email);
    const contact = await getContact(contactId);
    return contact!;
  } catch (err) {
    console.log(JSON.stringify(err));
    return undefined!;
  }
}
