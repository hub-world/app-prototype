import {
  addDays,
  differenceInDays,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
} from "date-fns";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

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
  const [startDate, setStartDate] = useState<Date | null>(
    opportunity?.dateRange.start ?? null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    opportunity?.dateRange.end ?? null,
  );

  const tomorrow = startOfDay(addDays(new Date(), 1));
  const minStartDate = format(tomorrow, "yyyy-MM-dd");
  const minEndDate = startDate
    ? format(addDays(startDate, 1), "yyyy-MM-dd")
    : minStartDate;

  const monthLabel = endDate ? format(endDate, "MMMM") : "";

  const calculateDiscount = () => {
    if (!startDate || !endDate || !isValid(startDate) || !isValid(endDate)) {
      return null;
    }

    if (isBefore(endDate, startDate)) {
      return null;
    }

    if (opportunity) return opportunity.discount;

    const days = differenceInDays(endDate, startDate);
    return Math.ceil(currentBooking.monthlyRent / 30) * days;
  };

  const discount = calculateDiscount();

  const handleDateChange =
    (type: "start" | "end") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = e.target.value ? parseISO(e.target.value) : null;

      if (type === "start") {
        if (date && isBefore(date, tomorrow)) {
          return;
        }
        setStartDate(date);
        // Reset end date if it's before the new start date
        if (endDate && date && isBefore(endDate, date)) {
          setEndDate(null);
        }
      } else {
        if (date && startDate && isBefore(date, startDate)) {
          return;
        }
        setEndDate(date);
      }
    };

  return (
    <div className="relative rounded-box border border-base-300 bg-base-200 p-4">
      <button
        className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
        onClick={onClose}
      >
        ✕
      </button>
      <h2 className="mb-3 text-lg font-medium">Request dates</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="date"
          className="input-bordered input w-full"
          placeholder="Start Date"
          min={minStartDate}
          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
          onChange={handleDateChange("start")}
        />
        <input
          type="date"
          className="input-bordered input w-full"
          placeholder="End Date"
          min={minEndDate}
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
          onChange={handleDateChange("end")}
        />
      </div>

      <div className="mb-4 space-y-2 text-sm">
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
      <button className="btn w-full btn-primary">Submit Request</button>
    </div>
  );
};
