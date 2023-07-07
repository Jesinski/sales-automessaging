import { CustomerInformation, MeetingRequester } from "./types";

export default async function sendWhatsappMessage(
  payload: MeetingRequester,
  customer: CustomerInformation
) {
  let data = JSON.stringify({
    name: customer.name,
    phone: customer.phone,
    variable1: customer.name,
    variable2: payload.meetingTime,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  await fetch(payload.creatorInfo.pabblyWebhook, config)
    .then((res) => res)
    .catch((err) => console.log(err));
}
