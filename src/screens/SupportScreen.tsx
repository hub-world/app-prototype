import classNames from "classnames";
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  ClockIcon,
  HelpCircleIcon,
  type LucideIcon,
  SparklesIcon,
  WifiIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { TopNav } from "~/components/TopNav";

type ChatHistory = {
  id: string;
  title: string;
  lastMessage: string;
  date: string;
  status: "open" | "resolved";
};

type LinkButtonProps = {
  title: string;
  icon: LucideIcon;
  className?: string;
};

function LinkButton({ title, icon: Icon, className }: LinkButtonProps) {
  return (
    <div
      className={classNames("flex items-center justify-between p-2", className)}
    >
      <div className="flex items-center gap-2 text-xl">
        <Icon />
        {title}
      </div>
      <ChevronRightIcon />
    </div>
  );
}

export function SupportScreen() {
  const [chatInput, setChatInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Amenity Booking Question",
      lastMessage: "Can I cancel my gym booking for tomorrow?",
      date: "Yesterday",
      status: "open",
    },
    {
      id: "2",
      title: "Maintenance Request",
      lastMessage: "The technician will visit on Friday between 2-4 PM.",
      date: "3 days ago",
      status: "resolved",
    },
    {
      id: "3",
      title: "Guest Key Access",
      lastMessage:
        "How do I create a temporary key for my friend that is visiting?",
      date: "1 week ago",
      status: "resolved",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatInput("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [chatInput]);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        <TopNav title="Support" />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Quick Links Section */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold">Quick Help</h2>
            <div className="space-y-2">
              <div className="cursor-pointer rounded-lg hover:bg-base-200">
                <LinkButton title="FAQ" icon={HelpCircleIcon} />
              </div>
              <div className="cursor-pointer rounded-lg hover:bg-base-200">
                <LinkButton title="WiFi & Media Settings" icon={WifiIcon} />
              </div>
              <Link to="/report">
                <div className="cursor-pointer rounded-lg hover:bg-base-200">
                  <LinkButton title="Report a Problem" icon={AlertTriangleIcon} />
                </div>
              </Link>
            </div>
          </div>

          {/* Chat History Section */}
          <div>
            <h2 className="mb-3 text-lg font-semibold">Recent Conversations</h2>
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="cursor-pointer rounded-box border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-medium">{chat.title}</h3>
                          <span
                            className={classNames(
                              "badge badge-sm",
                              chat.status === "resolved"
                                ? "badge-success"
                                : "badge-warning",
                            )}
                          >
                            {chat.status}
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-base-content/70">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-base-content/50">
                          <ClockIcon className="h-3 w-3" />
                          {chat.date}
                        </div>
                      </div>
                      <ChevronRightIcon className="h-4 w-4 text-base-content/40" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed AI Chat Input */}
      <div className="shrink-0 border-t border-base-300 bg-base-100 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="input-bordered input input-lg w-full rounded-full pl-10"
              placeholder="Ask me anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <SparklesIcon className="absolute top-1/2 left-3 z-1 h-5 w-5 -translate-y-1/2 text-base-content/40" />
          </div>
        </form>
      </div>
    </div>
  );
}
