import { getRateSchedule } from "../storage.js";
export function registerGetBillRates(server) {
  server.tool(
    "get_bill_rates",
    "Get the current bill rate schedule. Returns on-shore and off-shore hourly rates by role, plus estimation factors (hours/day, high estimate adjustment).",
    {},
    async () => {
      const schedule = await getRateSchedule();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(schedule, null, 2),
          },
        ],
      };
    },
  );
}
