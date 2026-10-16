export type HourSlot = {
  days: string;
  times: string[];
};

export const RESTAURANT_INFO = {
  address: {
    line1: "417 Lancaster Ave,",
    line2: "Malvern, Pennsylvania 19355",
    mapsUrl: "https://maps.app.goo.gl/Kcxxw6DfZSQEd9gX8",
  },
  hours: [
    {
      days: "Mon – Fri",
      times: ["11:00am – 3:00pm", "5:00pm – 10:00pm"],
    },
    {
      days: "Sat – Sun",
      times: ["11:00am – 11:00pm"],
    },
  ] satisfies HourSlot[],
  followUs: {
    description: "Follow us for signature flavors, kitchen stories, and celebrations from our community.",
  },
  copyright: "© 2026 ABCD Restaurant. All rights reserved.",
};
