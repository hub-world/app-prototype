import classNames from "classnames";
import { addDays, format, isSameDay, isToday } from "date-fns";
import { SparklesIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function CleaningWidget() {
  const modalName = "modal-cleaning";
  const openModal = () => {
    const modal = document.getElementById(modalName) as HTMLDialogElement;
    modal.open = true;
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    // Adjust to start from Monday (1) instead of Sunday (0)
    const dayOffset = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    date.setDate(date.getDate() - dayOffset + i);
    return date;
  });

  const nextCleaningDate = addDays(new Date(), 2);

  return (
    <>
      <BaseWidget className="p-2" onClick={openModal}>
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

      <dialog id={modalName} className="modal">
        <div className="modal-box flex flex-col gap-4 p-4">
          <h2 className="text-2xl font-semibold">Cleaning Calendar</h2>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date, i) => (
              <DayCell
                key={i}
                date={date}
                current={isToday(date)}
                active={isSameDay(date, nextCleaningDate)}
              />
            ))}
          </div>

          <div className="rounded-box bg-base-200 p-4">
            <div>Next cleaning:</div>
            <div>
              <strong>{format(nextCleaningDate, "EEEE")}</strong>{" "}
              {format(nextCleaningDate, "MMMM d")},{" "}
              <strong>9:00 - 11:00</strong>
            </div>
          </div>

          <button className="btn btn-primary">Schedule cleaning</button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
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
          current && "bg-base-300 text-base-content",
          active && "bg-primary text-primary-content",
        )}
      >
        <div className="text-[10px] uppercase opacity-70">{dayString}</div>
        <div className="text-sm font-semibold">{dayNumber}</div>
      </div>
    );
  }
}
