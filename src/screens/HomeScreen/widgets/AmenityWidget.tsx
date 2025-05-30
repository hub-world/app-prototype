import classNames from "classnames";
import { format } from "date-fns";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import { Money } from "~/components/Money";
import { OccupancyChart } from "~/components/OccupancyChart";

import { BaseWidget } from "./BaseWidget";

type OccupancyLevel = "low" | "mid" | "high" | "none";

type AmenityWidgetProps = {
  occupancy: OccupancyLevel;
  name: string;
  icon: LucideIcon;
  monthlyPrice: number;
  dailyPrice: number;
};

export function AmenityWidget({
  occupancy,
  name,
  icon: Icon,
  monthlyPrice,
  dailyPrice,
}: AmenityWidgetProps) {
  const modalName = `modal-occupancy-${name}`;
  const openModal = () => {
    const modal = document.getElementById(modalName) as HTMLDialogElement;
    // modal.showModal() forcibly sets position: fixed, but we want it to be relative to the phone frame
    modal.open = true;
  };

  return (
    <>
      <BaseWidget
        className="flex aspect-square flex-col justify-between p-4"
        onClick={openModal}
      >
        <div className="flex flex-col items-center gap-1">
          <Icon className="h-8 w-8" />
          <span>{name}</span>
        </div>

        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={classNames(
                "h-2 flex-1 rounded-full",
                getBarColor(occupancy, index),
              )}
            />
          ))}
        </div>
      </BaseWidget>

      <dialog id={modalName} className="modal">
        <div className="modal-box flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <div>
            <div className="flex items-baseline justify-between">
              <h3 className="mb-2 font-semibold">Popular times</h3>
              <div className="flex items-center gap-1 text-sm opacity-50">
                <span>{format(new Date(), "EEEE")}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
            <OccupancyChart />
          </div>

          <div className="card bg-info/20 text-info-content card-sm">
            <div className="card-body">
              <h3 className="card-title">Upgrade your stay</h3>
              <p>
                Get a day pass for maximum freedom, or save monthly with a
                convenient subscription.
              </p>

              <div className="mt-2 flex">
                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-lg font-bold tracking-wide opacity-50">
                    Monthly Plan
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold">
                      <Money amount={monthlyPrice} />
                    </span>
                    <span className="text-sm">/month</span>
                  </div>
                  <button className="btn w-full btn-accent">Subscribe</button>
                </div>

                <div className="flex=- divider mx-2 divider-horizontal text-info-content/60">
                  or
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <h4 className="text-lg font-bold tracking-wide opacity-50">
                    Day Pass
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold">
                      <Money amount={dailyPrice} />
                    </span>
                    <span className="text-sm">/day</span>
                  </div>
                  <button className="btn w-full btn-primary">
                    Get Day Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

const colors: Record<OccupancyLevel, string> = {
  low: "bg-success",
  mid: "bg-warning",
  high: "bg-error",
  none: "bg-base-content/10",
};

function getBarColor(occupancy: OccupancyLevel, index: number): string {
  if (occupancy === "none") return colors.none;
  if (occupancy === "low" && index === 0) return colors.low;
  if (occupancy === "mid" && index < 2) return colors.mid;
  if (occupancy === "high") return colors.high;
  return colors.none;
}
