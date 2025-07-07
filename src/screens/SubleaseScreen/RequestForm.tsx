import { Player } from "@lottiefiles/react-lottie-player";
import {
  addDays,
  differenceInDays,
  format,
  isBefore,
  isValid,
  startOfDay,
} from "date-fns";
import { InfoIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router";

import reviewingAnimation from "~/assets/animations/reviewing.json";
import successAnimation from "~/assets/animations/success.json";
import { Money } from "~/components/Money";
import { currentBooking } from "~/config";
import { formatDateRange } from "~/utils/date";

type FormState = "form" | "loading" | "success";

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
  const navigate = useNavigate();
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [month, setMonth] = useState<Date>(new Date());
  const [formState, setFormState] = useState<FormState>("form");

  useEffect(() => {
    // Reset form state when modal opens (opportunity changes)
    setFormState("form");

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
    setRange(selectedRange ?? { from: undefined, to: undefined });
  };

  const handleSubmit = async () => {
    if (!isValidRange) return;

    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setFormState("success");
  };

  const handleBookAlternative = () => {
    onClose();
    navigate("/booking");
  };

  if (formState === "loading") {
    return (
      <dialog id="request-form-modal" className="modal">
        <div className="modal-box">
          <Player autoplay loop src={reviewingAnimation} className="mx-auto" />
        </div>
      </dialog>
    );
  }

  if (formState === "success") {
    return (
      <dialog id="request-form-modal" className="modal">
        <div className="modal-box">
          <div className="mb-6 text-center">
            <div className="relative">
              <Player
                autoplay
                loop={false}
                keepLastFrame={true}
                src={successAnimation}
                style={{ height: "120px", width: "120px" }}
                className="mx-auto"
              />
              <SparklesIcon className="absolute top-2 right-2 h-7 w-7 animate-pulse text-warning" />
              <SparklesIcon
                className="absolute bottom-2 left-2 h-5 w-5 animate-pulse text-warning"
                style={{ animationDelay: "0.5s" }}
              />
              <SparklesIcon
                className="absolute top-6 left-6 h-6 w-6 animate-pulse text-warning"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-success">
              Request Approved!
            </h3>
            <p className="mb-4 text-base-content/70">
              Your sublease from {formatDateRange(range.from, range.to)} has
              been approved. You're all set to start subletting.
            </p>
          </div>

          <div className="divider"></div>

          <div className="mb-6">
            <div className="card border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="card-body p-4">
                <h4 className="mb-2 text-lg font-medium">
                  Make your sublet a getaway
                </h4>
                <div className="text-base-content/70">
                  While your apartment is sublet, stay at another Urban Hub for
                  the same dates and get 10% off.
                </div>
                <div className="my-2 flex items-center justify-between text-sm">
                  <span>Dates: {formatDateRange(range.from, range.to)}</span>
                  <span className="font-medium text-success">10% off</span>
                </div>
                <div>
                  <button
                    className="btn mt-2 w-full btn-sm btn-primary"
                    onClick={handleBookAlternative}
                  >
                    Find Your Stay
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    );
  }

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
          {isValidRange && (
            <div className="flex justify-between text-xs text-base-content/70">
              <span>Sublease Dates</span>
              <span>{formatDateRange(range.from, range.to)}</span>
            </div>
          )}
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
          <button
            className="btn btn-primary"
            disabled={!isValidRange}
            onClick={handleSubmit}
          >
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
