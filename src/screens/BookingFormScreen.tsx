import { PricingChart } from "~/components/PricingChart";
import { StickyLogo } from "~/components/StickyLogo";

export function BookingFormScreen() {
  return (
    <div className="flex h-full flex-col">
      <StickyLogo />

      <div className="flex-1 bg-base-200 p-4">
        <div className="flex flex-col gap-4">
          <SectionCard title="Where" value="Flexible" />
          <SectionCard title="When" value="Add dates" />
          <SectionCard title="Who" value="Add guests" />

          <div className="rounded-2xl bg-base-100 p-4 shadow-lg">
            <PricingChart />
          </div>
        </div>
      </div>
    </div>
  );
}

type SectionCardProps = {
  title: string;
  value: string;
};

function SectionCard({ title, value }: SectionCardProps) {
  return (
    <div className="flex justify-between rounded-2xl bg-base-100 p-4 shadow-lg">
      <div className="text-sm text-base-content/50">{title}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
