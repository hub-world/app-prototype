import classNames from "classnames";
import { addDays } from "date-fns";
import { SparklesIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function CleaningWidget() {
  return (
    <BaseWidget className="p-2">
      <div className="mb-1 flex items-center gap-1">
        <SparklesIcon className="h-4 w-4" /> <span>Cleaning</span>
      </div>

      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center gap-1.5">
          <DayCell date={new Date()} current />
          <span className="h-2 w-2 rounded-full bg-neutral/30" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <DayCell date={addDays(new Date(), 1)} />
          <span className="h-2 w-2 rounded-full bg-neutral/30" />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <DayCell date={addDays(new Date(), 2)} />
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    </BaseWidget>
  );

  type DayCellProps = {
    date: Date;
    current?: boolean;
    active?: boolean;
  };

  function DayCell({ date, current, active }: DayCellProps) {
    const dayString = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .slice(0, 2);
    const dayNumber = date.getDate();

    return (
      <div
        className={classNames(
          "flex flex-col items-center rounded-field px-2 py-1",
          current && "bg-primary/10 text-base-content",
          active && "bg-primary text-primary-content",
        )}
      >
        <div className="text-[10px] uppercase opacity-70">{dayString}</div>
        <div className="text-sm font-semibold">{dayNumber}</div>
      </div>
    );
  }
}
