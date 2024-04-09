export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

import type { Product } from "apps/commerce/types.ts";

export type productFlag = Product[] | null;

export default function productFlag(
  props: MultivariateProps<productFlag>,
): MultivariateFlag<productFlag> {
  return multivariate(props);
}
