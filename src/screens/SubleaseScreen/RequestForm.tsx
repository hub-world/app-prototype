import {
  addDays,
  differenceInDays,
  format,
  isBefore,
  isValid,
  startOfDay,
} from "date-fns";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";

import { Money } from "~/components/Money";
import { currentBooking } from "~/config";

type Opportunity = {
  id: number;
  dateRange: { start: Date; end: Date };
  discount: number;
  name: string;
};

type RequestFormProps = {
  opportunity: Opportunity | null;
  onClose: () => void;
};

export const RequestForm = ({ opportunity, onClose }: RequestFormProps) => {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [month, setMonth] = useState<Date>(new Date());

  useEffect(() => {
    const newRange = {
      from: opportunity?.dateRange.start,
      to: opportunity?.dateRange.end,
    };
    setRange(newRange);

    // Update the displayed month to show the selected range
    if (newRange.from) {
      setMonth(newRange.from);
    }
  }, [opportunity]);

  const tomorrow = startOfDay(addDays(new Date(), 1));
  const monthLabel = range?.to ? format(range.to, "MMMM") : "";

  const calculateDiscount = () => {
    if (
      !range?.from ||
      !range?.to ||
      !isValid(range.from) ||
      !isValid(range.to)
    ) {
      return null;
    }

    if (isBefore(range.to, range.from)) {
      return null;
    }

    if (opportunity) return opportunity.discount;

    const days = differenceInDays(range.to, range.from);
    return Math.ceil(currentBooking.monthlyRent / 30 + 12) * days;
  };

  const discount = calculateDiscount();
  const isValidRange =
    range?.from && range?.to && isValid(range.from) && isValid(range.to);

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) {
      setRange({ from: undefined, to: undefined });
      return;
    }

    setRange((prev) => {
      // If we're selecting a start date and it's different from current start
      if (selectedRange.from && selectedRange.from !== prev.from) {
        // Clear end date when start date changes
        return { from: selectedRange.from, to: undefined };
      }

      // Otherwise, use the selected range as is
      return selectedRange;
    });
  };

  return (
    <dialog id="request-form-modal" className="modal">
      <div className="modal-box">
        <div className="flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            disabled={(date) => isBefore(date, tomorrow)}
            month={month}
            onMonthChange={setMonth}
          />
        </div>

        <div className="divider my-4"></div>

        <div className="mb-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Rent {monthLabel}</span>
            <Money amount={currentBooking.monthlyRent} />
          </div>
          <div className="flex justify-between text-success">
            <span>Sublease Discount</span>
            <span>
              {discount !== null ? (
                <>
                  -<Money amount={discount} />
                </>
              ) : (
                "..."
              )}
            </span>
          </div>
          <div className="border-t border-base-300 pt-2">
            <div className="flex justify-between font-medium">
              <span>Effective Rent {monthLabel}</span>
              <Money amount={currentBooking.monthlyRent - (discount ?? 0)} />
            </div>
          </div>
        </div>

        <div className="mb-4 alert alert-info">
          <InfoIcon className="h-5 w-5" />
          <span>
            We'll review your request and get back to you within 24 hours.
          </span>
        </div>

        <div className="modal-action">
          <button className="btn btn-primary" disabled={!isValidRange}>
            Submit Request
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};
