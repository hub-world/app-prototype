import classNames from "classnames";
import { useState } from "react";

import { Money } from "./Money";
import { unitSpecs } from "~/config";

type PricingChartProps = {
  height?: number;
  months?: number;
  maxPrice?: number;
  minPrice?: number;
  onSelect?: (month: number) => void;
};

export function PricingChart({
  height = 220,
  months = 8,
  maxPrice = unitSpecs.economy.monthlyRent[1],
  minPrice = unitSpecs.economy.monthlyRent[0],
  onSelect,
}: PricingChartProps) {
  const [selectedMonth, setSelectedMonth] = useState(0);

  const calculateHeight = (i: number) => {
    return height - (height * 0.8 * i) / (months - 1);
  };

  const calculatePrice = (i: number) => {
    return maxPrice - ((maxPrice - minPrice) * i) / (months - 1);
  };

  const monthLabel = (i: number) => {
    if (i === 0) return "1 month";
    if (i === months - 1) return `${months}+ months`;
    return `${i + 1} months`;
  };

  return (
    <div className="relative flex flex-col">
      <div className="mt-6 mb-2 flex justify-between text-sm text-base-content/60">
        <Money
          amount={calculatePrice(0)}
          className={classNames(selectedMonth === 0 && "invisible")}
        />
        <Money
          amount={calculatePrice(months - 1)}
          className={classNames(selectedMonth === months - 1 && "invisible")}
        />
      </div>
      <div className="flex items-end justify-between gap-1" style={{ height }}>
        {Array.from({ length: months }).map((_, i) => (
          <div
            key={i}
            className="relative flex-1 cursor-pointer rounded-t-md bg-gray-200 hover:bg-gray-300/80 active:scale-98"
            style={{ height: calculateHeight(i) }}
            onClick={() => {
              setSelectedMonth(i);
              onSelect?.(i + 1);
            }}
          >
            <div
              className={classNames(
                "absolute right-0 bottom-0 left-0 rounded-t-md bg-primary",
                "transition-all duration-200",
                selectedMonth >= i ? "opacity-100" : "opacity-0",
              )}
              style={{
                height: Math.min(
                  calculateHeight(selectedMonth),
                  calculateHeight(i),
                ),
              }}
            />
            {selectedMonth === i && (
              <div
                className={classNames(
                  "absolute bottom-full left-1/2 -translate-x-1/2",
                  "pb-2 text-sm whitespace-nowrap",
                )}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={classNames(
                      "text-center",
                      selectedMonth === 0 && "relative left-7 text-left",
                      selectedMonth === 1 && "relative left-10 text-left",
                      selectedMonth === 2 && "relative left-4 text-left",
                      selectedMonth === months - 1 &&
                        "relative right-8 text-right",
                    )}
                  >
                    <strong>{monthLabel(i)}</strong> from
                    <br />
                    <strong>
                      <Money amount={calculatePrice(i)} />
                    </strong>
                    /month
                  </div>
                  <div
                    className="bg-primary"
                    style={{
                      width: 1,
                      height: i * (height / (months * 2)),
                      display: i === 0 ? "none" : "block",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 mb-1 flex justify-between text-sm text-base-content/60">
        <div>{monthLabel(0)}</div>
        <div>{monthLabel(months - 1)}</div>
      </div>
    </div>
  );
}
