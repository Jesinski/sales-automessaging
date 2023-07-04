import { Context, ScheduledEvent } from "aws-lambda";
import dotenv from "dotenv";
import getSalesRepresentatives from "./getSalesRepresentatives";
dotenv.config();

export const handler = async (event: ScheduledEvent, context: Context) => {
  try {
    const promises: Promise<void>[] = [];

    // getSDRInfo()
    const salesRepresentatives = getSalesRepresentatives();

    salesRepresentatives.forEach((representative) => {
      // getCalendarEvents()
      // processEvents()
      // getCustomerInfo()
      // sendWhatsappMessage()
    });
  } catch (err) {
    console.log(err);
  } finally {
    return {
      statusCode: 200,
    };
  }
};
