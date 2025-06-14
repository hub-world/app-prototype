import cn from "classnames";
import { CalendarIcon } from "lucide-react";

import { Money } from "~/components/Money";

type OpportunityCardProps = {
  name: string;
  when: string;
  amount?: number;
  onApply: () => void;
  classNames?: {
    card?: string;
    button?: string;
  };
};

export const OpportunityCard = ({
  name,
  when,
  amount,
  onApply,
  classNames = {},
}: OpportunityCardProps) => {
  return (
    <div
      className={cn(
        "rounded-box border border-base-300 bg-base-200 p-4",
        classNames.card,
      )}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          <div className="mt-1 flex items-center text-sm text-base-content/70">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {when}
          </div>
        </div>
        <div className="text-right">
          <div className="text-base-content/70">
            {amount ? <Money amount={amount} /> : null}
          </div>
          <button
            onClick={onApply}
            className={cn("btn mt-2 btn-sm btn-primary", classNames.button)}
          >
            Apply for sublease
          </button>
        </div>
      </div>
    </div>
  );
};
