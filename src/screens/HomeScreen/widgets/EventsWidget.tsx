import { CalendarIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function EventsWidget() {
  return (
    <BaseWidget className="flex aspect-square flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <CalendarIcon className="h-8 w-8" />
        <span>Events</span>
      </div>
    </BaseWidget>
  );
}
