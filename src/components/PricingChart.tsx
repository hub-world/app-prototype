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

  const calculatePrice = (i: number) => {
    return maxPrice - ((maxPrice - minPrice) * i) / (months - 1);
  };

  const monthLabel = (i: number) => {
    if (i === 0) return "1 month";
    if (i === months - 1) return `${months}+ months`;
    return `${i + 1} months`;
  };

  const isLabelVisible = (i: number) => {
    if (i === 0) return true;
    if (i === months - 1) return true;
    if (selectedMonth === i) return true;
    return false;
  };

  return (
    <div className="pt-12 pb-6">
      <div
        className="flex h-full items-end justify-between gap-1"
        style={{ height }}
      >
        {Array.from({ length: months }).map((_, i) => (
          <div
            key={i}
            className="relative flex-1 cursor-pointer rounded-t-md bg-gray-300 hover:bg-gray-300/80 active:scale-98"
            style={{ height: calculateHeight(i) }}
            onClick={() => setSelectedMonth(i)}
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
            {isLabelVisible(i) && (
              <div
                className={classNames(
                  "absolute bottom-full pb-2 text-sm whitespace-nowrap",
                  "left-1/2 -translate-x-1/2",
                  selectedMonth === i ? "text-primary" : "text-base-content/60",
                )}
              >
                {selectedMonth === i ? (
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={classNames(
                        "text-center",
                        selectedMonth === 0 && "relative left-6 text-left",
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
                    {i > 0 && (
                      <div
                        className="bg-primary"
                        style={{
                          width: 1,
                          height: i * (height / (months * 2)),
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <Money amount={calculatePrice(i)} />
                )}
              </div>
            )}
            {[0, months - 1].includes(i) && (
              <div
                className={classNames(
                  "absolute -bottom-7 text-sm whitespace-nowrap",
                  selectedMonth === i ? "text-primary" : "text-base-content/60",
                  i === 0
                    ? "left-0"
                    : i === months - 1
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2",
                )}
              >
                {monthLabel(i)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
