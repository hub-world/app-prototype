import classNames from "classnames";
import type { LucideIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

type OccupancyLevel = "low" | "mid" | "high" | "none";

type OccupancyWidgetProps = {
  level: OccupancyLevel;
  name: string;
  icon: LucideIcon;
};

export function OccupancyWidget({
  level,
  name,
  icon: Icon,
}: OccupancyWidgetProps) {
  return (
    <BaseWidget className="flex flex-col justify-between p-4 aspect-square">
      <div className="flex flex-col items-center gap-1">
        <Icon className="w-8 h-8" />
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
  );
}

const colors: Record<OccupancyLevel, string> = {
  low: "bg-green-500",
  mid: "bg-yellow-500",
  high: "bg-red-500",
  none: "bg-neutral-content",
};

function getBarColor(level: OccupancyLevel, index: number): string {
  if (level === "none") return colors.none;
  if (level === "low" && index === 0) return colors.low;
  if (level === "mid" && index < 2) return colors.mid;
  if (level === "high") return colors.high;
  return colors.none;
}
