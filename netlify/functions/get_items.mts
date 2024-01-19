import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  return new Response(
    JSON.stringify([
      { id: "1", body: "blabla" },
      { id: "2", body: "aaaaa" },
    ])
  );
};
