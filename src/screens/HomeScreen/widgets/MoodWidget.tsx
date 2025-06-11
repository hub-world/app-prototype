import classNames from "classnames";
import {
  BookOpenIcon,
  EllipsisIcon,
  HeartIcon,
  type LucideIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";

import { BaseWidget } from "./BaseWidget";

type MoodWidgetProps = {
  className?: string;
};

type Mood = "day" | "focus" | "relax" | "evening" | "night" | "custom";

const MOODS: Array<{ id: Mood; label: string; icon: LucideIcon }> = [
  { id: "day", label: "Day", icon: SunIcon },
  { id: "focus", label: "Focus", icon: BookOpenIcon },
  { id: "relax", label: "Relax", icon: HeartIcon },
  { id: "night", label: "Night", icon: MoonIcon },
  { id: "custom", label: "More", icon: EllipsisIcon },
];

export function MoodWidget({ className }: MoodWidgetProps) {
  const [selectedMood, setSelectedMood] = useState<Mood>("focus");
  const modalName = "modal-mood";

  const openModal = () => {
    const modal = document.getElementById(modalName) as HTMLDialogElement;
    modal.open = true;
  };

  const closeModal = () => {
    const modal = document.getElementById(modalName) as HTMLDialogElement;
    modal.close();
  };

  const handleMoodClick = (mood: Mood) => {
    if (mood === selectedMood || mood === "custom") {
      openModal();
    }
    setSelectedMood(mood);
  };

  return (
    <>
      <BaseWidget className={classNames("row-span-2 px-1 py-2", className)}>
        <div className="flex h-full flex-col justify-between gap-1">
          {MOODS.map(({ id, label, icon: Icon }) => (
            <MoodButton
              key={id}
              label={label}
              icon={Icon}
              selected={selectedMood === id}
              onClick={() => handleMoodClick(id)}
            />
          ))}
        </div>
      </BaseWidget>

      <dialog id={modalName} className="modal">
        <div className="modal-box flex flex-col gap-4 p-4">
          <h2 className="mb-2 text-2xl font-semibold">Mood</h2>

          <div className="mb-4 flex flex-wrap gap-1">
            {MOODS.map(({ id, label }) => (
              <button
                key={id}
                className={classNames(
                  "btn btn-sm",
                  selectedMood === id && "btn-primary",
                )}
                style={{ fontWeight: selectedMood === id ? 500 : 400 }}
                onClick={() => handleMoodClick(id)}
              >
                {id === "custom" ? "Custom" : label}
              </button>
            ))}
          </div>

          <div className="mb-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold">Lights</span>
              <span className="text-sm opacity-70">75%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={75}
              className="range range-primary range-sm"
            />
          </div>

          <div className="mb-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold">Color Temperature</span>
              <span className="text-sm opacity-70">50%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={50}
              className="range range-primary range-sm"
            />
          </div>

          <div className="mb-2">
            <span className="mb-1 block font-semibold">Color</span>
            <div className="flex gap-3">
              {[
                "bg-yellow-100",
                "bg-yellow-50",
                "bg-yellow-300",
                "bg-orange-100",
                "bg-emerald-900",
                "bg-purple-700",
                "bg-neutral-700",
              ].map((color, i) => (
                <button
                  key={color}
                  className={classNames(
                    "flex h-7 w-7 items-center justify-center rounded-full border-2",
                    i === 1 ? "border-primary" : "border-transparent",
                  )}
                  style={{ backgroundColor: undefined }}
                >
                  <span
                    className={classNames("block h-5 w-5 rounded-full", color)}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-semibold">Blinds</span>
              <span className="text-sm opacity-70">0%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={0}
              className="range range-primary range-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="mb-1 block font-semibold">Temperature</span>
            <div className="flex items-center gap-2">
              <button className="btn btn-circle bg-base-200 text-lg btn-sm">
                -
              </button>
              <span className="text-lg">24°</span>
              <button className="btn btn-circle bg-base-200 text-lg btn-sm">
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedMood("custom");
              closeModal();
            }}
            className="btn mt-4 btn-primary"
          >
            Set mood
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
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
        "flex cursor-pointer items-center gap-3 rounded-md bg-base-300 px-2 py-2.5 transition-colors",
        selected && "bg-primary/10 text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" /> <span className="text-sm">{label}</span>
    </div>
  );
}
