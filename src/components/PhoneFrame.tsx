export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full xs:mockup-phone xs:h-auto xs:w-auto xs:scale-80">
      <div className="xs:mockup-phone-camera"></div>
      <div className="h-full w-full bg-base-100 xs:mockup-phone-display xs:pt-safe">
        {children}
      </div>
    </div>
  );
}
