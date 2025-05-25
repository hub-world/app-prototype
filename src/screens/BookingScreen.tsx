export function BookingScreen() {
  return (
    <div className="p-4 bg-base-200 h-full flex flex-col gap-4">
      <div className="p-4 bg-base-100 rounded-2xl shadow-lg flex justify-between">
        <div className="text-sm text-base-content/50">Where</div>
        <div className="text-sm">Flexible</div>
      </div>

      <div className="p-4 bg-base-100 rounded-2xl shadow-lg flex justify-between">
        <div className="text-sm text-base-content/50">When</div>
        <div className="text-sm">Add dates</div>
      </div>

      <div className="p-4 bg-base-100 rounded-2xl shadow-lg flex justify-between">
        <div className="text-sm text-base-content/50">Who</div>
        <div className="text-sm">Add guests</div>
      </div>
    </div>
  );
}
