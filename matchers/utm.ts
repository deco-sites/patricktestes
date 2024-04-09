import { MatchContext } from "deco/blocks/matcher.ts";

export interface utmProps {
  utm: string;
}

export default function utm(props: utmProps, ctx: MatchContext) {
  const url = ctx.request.url;
  const params = new URL(url);
  const paramUtm = params.searchParams.get("utmcampaign");

  return paramUtm?.includes(props.utm) ?? false;
}
