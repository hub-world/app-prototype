import classNames from "classnames";

type OccupancyChartProps = {
  className?: string;
  hours?: number[]; // Percentage of occupancy for each hour
  currentHour?: [number, number]; // Hour and percentage of occupancy for the current hour
};

export function OccupancyChart({
  className,
  hours,
  currentHour,
}: OccupancyChartProps) {
  hours ??= generateHours();
  currentHour ??= generateCurrentHour();

  return (
    <div className={classNames("flex h-[200px] w-full flex-col", className)}>
      <div className="flex flex-1 gap-px rounded-t bg-base-200">
        {[0, ...hours.slice(5, 20), 0].map((percentage, index) => (
          <div key={index} className="relative flex h-full flex-1 items-end">
            <div
              className="w-full rounded-t-xs bg-info hover:bg-info/80"
              style={{ height: `${percentage}%` }}
            />
            {index + 5 === currentHour[0] && (
              <div
                className="absolute w-full rounded-t-xs bg-secondary hover:bg-secondary/80"
                style={{ height: `${currentHour[1]}%` }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between border-t border-gray-400 pb-6">
        <div />
        <HourLabel hour="06:00" />
        <div />
        <div />
        <HourLabel hour="09:00" />
        <div />
        <div />
        <HourLabel hour="12:00" />
        <div />
        <div />
        <HourLabel hour="15:00" />
        <div />
        <div />
        <HourLabel hour="18:00" />
        <div />
        <div />
        <HourLabel hour="21:00" />
        <div />
      </div>
    </div>
  );
}

function HourLabel({ hour }: { hour: string }) {
  return (
    <div>
      <div className="h-2 w-px bg-gray-400" />
      <div className="absolute -translate-x-1/2 text-sm text-gray-400">
        {hour}
      </div>
    </div>
  );
}

function generateHours(): number[] {
  return Array.from({ length: 24 }, (_, i) => {
    const x = (i - 12) / 2;
    const normal = Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI);
    return Math.floor(normal * 100 * 1.5 + Math.random() * 20);
  });
}

function generateCurrentHour(): [number, number] {
  return [
    Math.ceil(Math.random() * 7) + 10,
    Math.ceil(Math.random() * 60) + 20,
  ];
}
