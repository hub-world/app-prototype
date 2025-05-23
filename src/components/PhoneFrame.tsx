export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mockup-phone">
      <div className="mockup-phone-camera"></div>
      <div className="mockup-phone-display bg-base-100 pt-safe">{children}</div>
    </div>
  );
}
