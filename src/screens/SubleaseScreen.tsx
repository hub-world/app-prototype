import { format } from "date-fns";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Money } from "~/components/Money";
import { TopNav } from "~/components/TopNav";
import { currentBooking } from "~/config";

type Opportunity = {
  id: number;
  dateRange: { start: Date; end: Date };
  discount: number;
  name: string;
};

const opportunities: Opportunity[] = [
  {
    id: 1,
    name: "Next Tech Fest",
    dateRange: {
      start: new Date("2025-10-15"),
      end: new Date("2025-10-19"),
    },
    discount: 150,
  },
  {
    id: 2,
    name: "Culture Week 2025",
    dateRange: {
      start: new Date("2025-10-22"),
      end: new Date("2025-10-25"),
    },
    discount: 120,
  },
];

export function SubleaseScreen() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const requestFormRef = useRef<HTMLDivElement>(null);

  const activateRequestForm = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowRequestForm(true);
    requestAnimationFrame(() => {
      requestFormRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div>
      <TopNav title="Sublease" />

      <div className="m-4 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Sublease Your Apartment</h1>
          <p className="mt-2 text-base-content/70">
            Turn your empty apartment into extra income while you're away.
            Perfect for business trips, vacations, or peak event seasons.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-medium">Upcoming Opportunities</h2>
          {opportunities.length > 0 ? (
            <div className="flex flex-col gap-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="rounded-box border border-base-300 bg-base-200 p-4"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{opp.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-base-content/70">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {format(opp.dateRange.start, "do")} –{" "}
                        {format(opp.dateRange.end, "do MMMM")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base-content/70">
                        <Money amount={opp.discount} />
                      </div>
                      <button
                        onClick={() => activateRequestForm(opp)}
                        className="btn mt-2 btn-sm btn-primary"
                      >
                        Apply for sublease
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-base-300 bg-base-200 p-4 text-center text-base-content/70">
              No sublease opportunities available right now. Check back soon!
            </div>
          )}
        </div>

        {showRequestForm && selectedOpportunity && (
          <div
            ref={requestFormRef}
            key={selectedOpportunity.id}
            className="relative rounded-box border border-base-300 bg-base-200 p-4"
          >
            <button
              className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
              onClick={() => setShowRequestForm(false)}
            >
              ✕
            </button>
            <h2 className="mb-3 text-lg font-medium">Request dates</h2>
            <div className="mb-4 flex gap-4">
              <input
                type="date"
                className="input-bordered input w-full"
                placeholder="Start Date"
                defaultValue={format(
                  selectedOpportunity.dateRange.start,
                  "yyyy-MM-dd",
                )}
              />
              <input
                type="date"
                className="input-bordered input w-full"
                placeholder="End Date"
                defaultValue={format(
                  selectedOpportunity.dateRange.end,
                  "yyyy-MM-dd",
                )}
              />
            </div>

            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly Rent</span>
                <Money amount={currentBooking.monthlyRent} />
              </div>
              <div className="flex justify-between text-success">
                <span>Sublease Discount</span>
                <span>
                  -<Money amount={selectedOpportunity.discount} />
                </span>
              </div>
              <div className="border-t border-base-300 pt-2">
                <div className="flex justify-between font-medium">
                  <span>Effective Monthly Rent</span>
                  <Money
                    amount={
                      currentBooking.monthlyRent - selectedOpportunity.discount
                    }
                  />
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
        )}
      </div>
    </div>
  );
}
