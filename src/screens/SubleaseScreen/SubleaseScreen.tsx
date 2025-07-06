import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

import { OpportunityCard } from "./OpportunityCard";
import { RequestForm } from "./RequestForm";
import { TopNav } from "~/components/TopNav";

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
    discount: 250,
  },
  {
    id: 2,
    name: "Culture Week 2025",
    dateRange: {
      start: new Date("2025-10-22"),
      end: new Date("2025-10-25"),
    },
    discount: 190,
  },
];

export function SubleaseScreen() {
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  const openRequestForm = (opportunity: Opportunity | null) => {
    setSelectedOpportunity(opportunity);
    const modal = document.getElementById(
      "request-form-modal",
    ) as HTMLDialogElement;
    modal.open = true;
  };

  const closeRequestForm = () => {
    setSelectedOpportunity(null);
    const modal = document.getElementById(
      "request-form-modal",
    ) as HTMLDialogElement;
    modal.open = false;
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
          <div className="flex flex-col gap-3">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                name={opp.name}
                when={
                  format(opp.dateRange.start, "do") +
                  "–" +
                  format(opp.dateRange.end, "do MMMM")
                }
                amount={opp.discount}
                onApply={() => openRequestForm(opp)}
                classNames={{
                  card: "!bg-primary/20",
                  button: "!btn-primary",
                }}
              />
            ))}

            <OpportunityCard
              name="Make your own offer"
              when="choose dates"
              onApply={() => openRequestForm(null)}
              classNames={{ button: "btn-neutral" }}
            />
          </div>
        </div>

        <div className="divider mt-8 mb-4">
          <div className="flex items-center gap-2 text-base-content/60">
            <InfoIcon className="h-5 w-5" />
            <span className="text-sm font-medium">How it works</span>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-content">
                1
              </div>
              <div>
                <h3 className="font-medium">We review your request</h3>
                <p className="text-sm text-base-content/70">
                  Once you submit your sublease request, we check availability
                  for your dates and confirm final pricing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-content">
                2
              </div>
              <div>
                <h3 className="font-medium">We store your belongings</h3>
                <p className="text-sm text-base-content/70">
                  On moving day, we handle everything. Your belongings are moved
                  using the apartment’s built-in storage.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-content">
                3
              </div>
              <div>
                <h3 className="font-medium">You earn money back</h3>
                <p className="text-sm text-base-content/70">
                  Your sublease discount is credited to your account, reducing
                  your monthly rent.
                </p>
              </div>
            </div>
          </div>
        </div>

        <RequestForm
          opportunity={selectedOpportunity}
          onClose={closeRequestForm}
        />
      </div>
    </div>
  );
}
