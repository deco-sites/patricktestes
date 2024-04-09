import weather, {
  Props as TemperatureProps,
} from "apps/weather/loaders/temperature.ts";

import type { SectionProps } from "deco/types.ts";

export interface Props {
  text: string;
  temperature: TemperatureProps;
}

export const loader = async (props: Props, req: Request) => {
  const temperature = await weather({
    lat: props.temperature.lat,
    long: props.temperature.long,
  }, req);

  return { ...props, temperature };
};

export default function currentTemperature(
  { text, temperature }: SectionProps<typeof loader>,
) {
  return (
    <div class="temperature-container text-center">
      <div class="temperature-description  lg:text-3xl d-flex">
        <span class="text-base">{text}</span>
        <span>{temperature?.celsius}°C</span>
      </div>
    </div>
  );
}
