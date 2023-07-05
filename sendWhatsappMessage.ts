import { CustomerInfo, MeetingRequester } from ".";

export default async function sendWhatsappMessage(
  payload: MeetingRequester,
  customer: CustomerInfo
) {
  console.log("sendingWhatsapp");
  let data = JSON.stringify({
    name: customer.name,
    phone: customer.phone,
    variable1: customer.name,
    variable2: payload.meetingTime,
  });

  console.log(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  try {
    const response = await fetch(payload.creatorInfo.pabblyWebhook, config)
      .then((res) => res)
      .catch((err) => console.log(err));

    console.log("res", response);
  } catch (error) {
    console.log(error);
  }
}
