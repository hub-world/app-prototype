import classNames from "classnames";

type PhoneFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={classNames(
        "h-full w-full",
        "xs:mockup-phone xs:h-auto xs:w-auto xs:scale-80",
        className,
      )}
    >
      <div className="xs:mockup-phone-camera"></div>
      <div className="h-full w-full bg-base-100 xs:mockup-phone-display xs:pt-safe">
        {children}
      </div>
    </div>
  );
}
