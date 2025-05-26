import { ChevronRightIcon } from "lucide-react";
import { Logo } from "~/components/Logo";

export function ProfileScreen() {
  return (
    <div className="m-4">
      <Logo className="mb-4" />

      <div className="flex flex-col gap-4 m-2 mt-8">
        <ListItem title="Personal Information" />
        <ListItem title="Payment Methods" />
        <ListItem title="Booking History" />
        <ListItem title="Invoices & Receipts" />
        <ListItem title="Mood Presets" />
        <ListItem title="Cleaning Preferences" />
        <ListItem title="Notification Settings" />
        <ListItem title="Language & Region" />
        <ListItem title="Security" />
        <ListItem title="Support & FAQ" />
        <ListItem title="Legal & Privacy" />
      </div>
    </div>
  );
}

type ListItemProps = {
  title: string;
};

function ListItem({ title }: ListItemProps) {
  return (
    <div className="flex items-center gap-2 hover:ml-4 transition-[margin] cursor-pointer">
      <ChevronRightIcon />
      <span className="text-xl">{title}</span>
    </div>
  );
}
