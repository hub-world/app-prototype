import classNames from "classnames";
import type { LucideIcon } from "lucide-react";
import { OccupancyGraph } from "~/components/OccupancyGraph";

import { BaseWidget } from "./BaseWidget";

type OccupancyLevel = "low" | "mid" | "high" | "none";

type AmenityWidgetProps = {
  level: OccupancyLevel;
  name: string;
  icon: LucideIcon;
};

export function AmenityWidget({ level, name, icon: Icon }: AmenityWidgetProps) {
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
                getBarColor(level, index),
              )}
            />
          ))}
        </div>
      </BaseWidget>

      <dialog id={modalName} className="modal absolute">
        <div className="modal-box flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <div>
            <h3 className="mb-2 font-semibold">Popular times</h3>
            <OccupancyGraph />
          </div>
          <div className="card bg-info/20">
            <div className="card-body p-4">
              <h2 className="card-title">Card title!</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Get Day Pass</button>
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
  low: "bg-green-500",
  mid: "bg-yellow-400",
  high: "bg-amber-500",
  none: "bg-neutral-content",
};

function getBarColor(level: OccupancyLevel, index: number): string {
  if (level === "none") return colors.none;
  if (level === "low" && index === 0) return colors.low;
  if (level === "mid" && index < 2) return colors.mid;
  if (level === "high") return colors.high;
  return colors.none;
}
