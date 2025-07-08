import classNames from "classnames";
import { CheckIcon } from "lucide-react";

type ProgressStepsProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function ProgressSteps({
  currentStep,
  totalSteps,
  className,
}: ProgressStepsProps) {
  return (
    <div className={classNames("flex items-center justify-center", className)}>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === totalSteps - 1;

          return (
            <div key={stepNumber} className="flex items-center gap-2">
              <div
                className={classNames(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-content"
                    : isCompleted
                      ? "bg-success text-success-content"
                      : "bg-base-300 text-base-content/60",
                )}
              >
                {isCompleted ? <CheckIcon className="h-4 w-4" /> : stepNumber}
              </div>
              {!isLast && (
                <div
                  className={classNames(
                    "h-0.5 w-8",
                    stepNumber < currentStep ? "bg-success" : "bg-base-300",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
