import classNames from "classnames";
import {
  BookOpenIcon,
  EllipsisIcon,
  HeartIcon,
  type LucideIcon,
  MoonIcon,
  SunIcon,
  SunsetIcon,
} from "lucide-react";
import { useState } from "react";

import { BaseWidget } from "./BaseWidget";

type MoodWidgetProps = {
  className?: string;
};

type Mood = "day" | "focus" | "relax" | "evening" | "night" | "more";

const MOODS: Array<{ id: Mood; label: string; icon: LucideIcon }> = [
  { id: "day", label: "Day", icon: SunIcon },
  { id: "focus", label: "Focus", icon: BookOpenIcon },
  { id: "relax", label: "Relax", icon: HeartIcon },
  { id: "evening", label: "Evening", icon: SunsetIcon },
  { id: "night", label: "Night", icon: MoonIcon },
  { id: "more", label: "More", icon: EllipsisIcon },
];

export function MoodWidget({ className }: MoodWidgetProps) {
  const [selectedMood, setSelectedMood] = useState<Mood>("focus");

  return (
    <BaseWidget className={classNames("row-span-2 px-1 py-2", className)}>
      <div className="flex h-full flex-col justify-between">
        {MOODS.map(({ id, label, icon: Icon }) => (
          <MoodButton
            key={id}
            label={label}
            icon={Icon}
            selected={selectedMood === id}
            onClick={() => setSelectedMood(id)}
          />
        ))}
      </div>
    </BaseWidget>
  );
}

type MoodButtonProps = {
  label: string;
  icon: LucideIcon;
  selected?: boolean;
  onClick: () => void;
};

function MoodButton({ label, icon: Icon, selected, onClick }: MoodButtonProps) {
  return (
    <div
      className={classNames(
        "flex cursor-pointer items-center gap-3 rounded-md bg-base-300 px-2 py-1.5 transition-colors",
        selected && "bg-primary/10 text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" /> <span className="text-sm">{label}</span>
    </div>
  );
}
