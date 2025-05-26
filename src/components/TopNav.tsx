import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-base-100 px-4 py-2 border-b border-base-300">
      <div className="flex-1">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm px-2 -ml-2 text-base-content/70 hover:text-base-content"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-none">
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <div className="flex-1" />
    </div>
  );
}
