import classNames from "classnames";

import { BaseWidget } from "./BaseWidget";

type DummyWidgetProps = {
  title: string;
  className?: string;
};

export function DummyWidget({ title, className }: DummyWidgetProps) {
  return (
    <BaseWidget className={classNames("p-3", className)}>
      <span className="text-sm">{title}</span>
    </BaseWidget>
  );
}
