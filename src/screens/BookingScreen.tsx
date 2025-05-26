import { Logo } from "~/components/Logo";
import { PricingChart } from "~/components/PricingChart";

export function BookingScreen() {
  return (
    <div className="p-4 bg-base-200 h-full">
      <Logo className="mb-4" />

      <div className="flex flex-col gap-4">
        <SectionCard title="Where" value="Flexible" />
        <SectionCard title="When" value="Add dates" />
        <SectionCard title="Who" value="Add guests" />

        <div className="bg-base-100 rounded-2xl shadow-lg p-4">
          <PricingChart />
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
    <div className="p-4 bg-base-100 rounded-2xl shadow-lg flex justify-between">
      <div className="text-sm text-base-content/50">{title}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
