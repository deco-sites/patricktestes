import { AppContext } from "deco-sites/patricktestes/apps/site.ts";

export interface sendVotesProps {
  productID: string;
}

export default async function sendVotes(
  props: sendVotesProps,
  _req: Request,
  _ctx: AppContext,
) {
  const data = { productId: props.productID };

  console.log("data", data);

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "patricktestes",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
