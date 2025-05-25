import { Logo } from "~/components/Logo";
import { PricingChart } from "~/components/PricingChart";

export function HomeScreen() {
  return (
    <div className="m-4">
      <Logo className="mb-4" />

      <PricingChart />
    </div>
  );
}
