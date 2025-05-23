import classNames from "classnames";
import { useState } from "react";

import { Money } from "./Money";

type PricingChartProps = {
  height?: number;
  months?: number;
  maxPrice?: number;
  minPrice?: number;
};

export function PricingChart({
  height = 220,
  months = 8,
  maxPrice = 1100,
  minPrice = 785,
}: PricingChartProps) {
  const [selectedMonth, setSelectedMonth] = useState(0);

  const calculateHeight = (i: number) => {
    return height - (height * 0.8 * i) / (months - 1);
  };

  return (
    <div className={classNames("flex flex-col justify-between")}>
      <div className="text-base-content/60 flex justify-between">
        <Money amount={maxPrice} />
        <Money amount={minPrice} />
      </div>

      <div className="my-2 flex-1" style={{ height }}>
        <div className="flex h-full items-end justify-between gap-1">
          {Array.from({ length: months }).map((_, i) => (
            <div
              key={i}
              className={classNames(
                "relative flex-1 cursor-pointer rounded-t-md",
                selectedMonth === i ? "bg-primary" : "bg-gray-300",
              )}
              style={{ height: calculateHeight(i) }}
              onClick={() => setSelectedMonth(i)}
            >
              {selectedMonth > i && (
                <div
                  className={classNames(
                    "bg-primary absolute right-0 bottom-0 left-0 rounded-t-md",
                  )}
                  style={{ height: calculateHeight(selectedMonth) }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-base-content/60 flex justify-between">
        <span>1 month</span>
        <span>{months}+ months</span>
      </div>
    </div>
  );
}
