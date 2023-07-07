import { SalesRepresentative } from "./types";

const gustavo = {
  email: "gustavo.j@dotconceito.com",
  name: "Gustavo Jesinski",
  phone: "+5551998606868",
  pabblyWebhook:
    "https://webhook.zapcloud.com.br/webhook/1e330cfdf8c6e92136c398d6f13351ff",
};
const lorenzo = {
  // email: "lorenzo@dotconceito.com",
  email: "plataforma@dotconceito.com",
  name: "Lorenzo Meneguzzo",
  phone: "+5551980109909",
  pabblyWebhook:
    "https://webhook.zapcloud.com.br/webhook/78d888326a70c8475442792277a0cbc8",
};

export default function getSalesRepresentatives(): SalesRepresentative[] {
  return new Array<SalesRepresentative>(gustavo, lorenzo);
}
