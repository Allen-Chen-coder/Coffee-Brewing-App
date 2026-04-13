import { Outlet, useLocation, useNavigate } from "react-router";
import { Coffee, Users, User } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/home", label: "吧台", icon: Coffee },
    { path: "/home/coffee-circle", label: "咖圈", icon: Users },
    { path: "/home/profile", label: "我的", icon: User },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="border-t bg-white">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "text-[#8B4513]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs ${
                    isActive ? "text-[#8B4513] font-medium" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
