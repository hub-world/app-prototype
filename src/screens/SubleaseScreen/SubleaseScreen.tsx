import { format } from "date-fns";
import { useRef, useState } from "react";

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
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const requestFormRef = useRef<HTMLDivElement>(null);

  const activateRequestForm = (opportunity: Opportunity | null) => {
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
                onApply={() => activateRequestForm(opp)}
                classNames={{
                  card: "!bg-primary/20",
                  button: "!btn-primary",
                }}
              />
            ))}

            <OpportunityCard
              name="Make your own offer"
              when="choose dates"
              onApply={() => activateRequestForm(null)}
              classNames={{ button: "btn-neutral" }}
            />
          </div>
        </div>

        {showRequestForm && (
          <div ref={requestFormRef} key={selectedOpportunity?.id ?? "custom"}>
            <RequestForm
              opportunity={selectedOpportunity}
              onClose={() => setShowRequestForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
