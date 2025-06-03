import classNames from "classnames";
import {
  Briefcase,
  Building2,
  Calendar,
  Dumbbell,
  type LucideIcon,
  MapPin,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { Money } from "~/components/Money";
import { TopNav } from "~/components/TopNav";

const PRICES = {
  apartment: 875,
  services: {
    gym: 40,
    spa: 50,
    coworking: 100,
  },
};

export function ContractScreen() {
  const [services, setServices] = useState({
    gym: true,
    spa: false,
    coworking: false,
  });

  const calculateTotal = () => {
    const servicesTotal = Object.entries(services).reduce(
      (sum, [service, isActive]) =>
        isActive
          ? sum + PRICES.services[service as keyof typeof PRICES.services]
          : sum,
      0,
    );
    return PRICES.apartment + servicesTotal;
  };

  const toggleService = (service: keyof typeof services) => {
    setServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
  };

  return (
    <>
      <TopNav title="My Contract" />

      <div className="p-4">
        <table className="table w-full">
          <tbody>
            <TableHeader title="Apartment" />
            <TableApartmentRow title="Type" icon={Building2} value="Economy" />
            <TableApartmentRow
              title="Location"
              icon={MapPin}
              value="Copenhagen"
            />
            <TableApartmentRow
              title="Duration"
              icon={Calendar}
              value="6 months"
              description="March - August 2025"
            />
            <tr className="border-t-2 border-base-300">
              <td></td>
              <td className="text-right font-bold">
                <Money amount={PRICES.apartment} />
              </td>
              <td></td>
            </tr>

            <TableHeader title="Services" />
            <TableServiceRow
              title="Gym"
              icon={Dumbbell}
              price={PRICES.services.gym}
              isActive={services.gym}
              toggleActive={() => toggleService("gym")}
            />
            <TableServiceRow
              title="Spa"
              icon={Waves}
              price={PRICES.services.spa}
              isActive={services.spa}
              toggleActive={() => toggleService("spa")}
            />
            <TableServiceRow
              title="Coworking"
              icon={Briefcase}
              price={PRICES.services.coworking}
              isActive={services.coworking}
              toggleActive={() => toggleService("coworking")}
            />

            <tr className="border-t-2 border-base-300">
              <td className="font-bold">Total Monthly Price</td>
              <td className="text-right font-bold">{calculateTotal()} €</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function TableHeader({ title }: { title: string }) {
  return (
    <tr>
      <td colSpan={3} className="bg-base-200">
        <div className="py-2 font-bold">{title}</div>
      </td>
    </tr>
  );
}

type TableApartmentRowProps = {
  title: string;
  icon: LucideIcon;
  value: string;
  description?: string;
};

function TableApartmentRow({
  title,
  icon: Icon,
  value,
  description,
}: TableApartmentRowProps) {
  return (
    <tr>
      <td colSpan={2}>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span>{title}:</span>
          <span className="font-medium">{value}</span>
        </div>
        {description && (
          <div className="ml-7 text-xs text-base-content/50">{description}</div>
        )}
      </td>
      <td className="align-top">
        <button className="btn w-full btn-ghost btn-sm">Change</button>
      </td>
    </tr>
  );
}

type TableServiceRowProps = {
  title: string;
  icon: LucideIcon;
  price: number;
  isActive: boolean;
  toggleActive: () => void;
};

function TableServiceRow({
  title,
  icon: Icon,
  price,
  isActive,
  toggleActive,
}: TableServiceRowProps) {
  return (
    <tr className={classNames(!isActive && "text-base-content/50")}>
      <td>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span>{title}</span>
        </div>
      </td>
      <td className={classNames("text-right")}>
        <Money amount={price} />
      </td>
      <td>
        <button className="btn w-full btn-ghost btn-sm" onClick={toggleActive}>
          {isActive ? "Cancel" : "Add"}
        </button>
      </td>
    </tr>
  );
}
