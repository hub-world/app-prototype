import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-base-300 bg-base-100 px-4 py-2">
      <div className="flex-1">
        <button
          onClick={() => navigate(-1)}
          className="btn -ml-2 px-2 text-base-content/70 btn-ghost btn-sm hover:text-base-content"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-none">
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <div className="flex-1" />
    </div>
  );
}
