import classNames from "classnames";
import { useAtom } from "jotai";
import { ChevronDown } from "lucide-react";

import { type Section, currentSectionAtom } from "./store";

type SectionCardProps = {
  title: string;
  value: string;
  section: Section;
  children?: React.ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  value,
  section,
  children,
  className,
}: SectionCardProps) {
  const [currentSection, setCurrentSection] = useAtom(currentSectionAtom);
  const isExpanded = currentSection === section;

  return (
    <div
      className={classNames(
        "flex flex-col rounded-box border-2 bg-base-100 shadow-lg transition-all duration-200",
        isExpanded ? "flex-1 border-primary" : "border-transparent",
      )}
    >
      <button
        onClick={() => setCurrentSection(section)}
        className={classNames(
          "flex w-full cursor-pointer items-center justify-between p-4",
        )}
      >
        <div
          className={classNames(
            "transition-all duration-200",
            isExpanded
              ? "text-lg text-primary"
              : "text-sm text-base-content/50",
          )}
        >
          {title}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={classNames(
              "text-sm transition-all duration-200",
              isExpanded ? "text-primary" : "text-base-content",
            )}
          >
            {value}
          </div>
          <ChevronDown
            className={classNames(
              "h-4 w-4 transition-all duration-200",
              isExpanded ? "rotate-180 text-primary" : "text-base-content/60",
            )}
          />
        </div>
      </button>
      <div
        className={classNames(
          "-mt-4 flex-1 rounded-b-box p-4",
          !isExpanded && "hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
