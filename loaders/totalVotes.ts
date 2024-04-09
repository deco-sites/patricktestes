import { AppContext } from "deco-sites/patricktestes/apps/site.ts";

export default async function totalVotes(
  _props: unknown,
  _req: Request,
  _ctx: AppContext,
) {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "patricktestes",
    },
  });

  return response.json();
}
