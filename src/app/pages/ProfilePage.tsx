import { useNavigate } from "react-router";
import { ChevronRight, Smartphone, User, FileText, Database, Settings, Award } from "lucide-react";

const menuItems = [
  { id: "devices", label: "我的设备", icon: Smartphone, path: "/device-selection" },
  { id: "badges", label: "我的徽章", icon: Award, path: "/my-badges" },
  { id: "profile", label: "个人信息", icon: User, path: "/profile-info" },
  { id: "posts", label: "发布的帖子", icon: FileText, path: "/my-posts" },
  { id: "curves", label: "曲线库", icon: Database, path: "/curve-library" },
  { id: "settings", label: "设置", icon: Settings, path: "/settings" },
];

export function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 pt-12 pb-20">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
            ☕
          </div>
          <div>
            <div className="text-xl font-bold mb-1">咖啡爱好者</div>
            <div className="text-white/80 text-sm">ID: CF2024001</div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12">
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <button onClick={() => navigate("/history")} className="cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors">
              <div className="text-2xl font-bold text-gray-900 mb-1">127</div>
              <div className="text-xs text-gray-500">累计冲煮</div>
            </button>
            <button onClick={() => navigate("/device-selection")} className="cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors">
              <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-xs text-gray-500">设备数量</div>
            </button>
            <button onClick={() => navigate("/my-badges")} className="cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-colors">
              <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
              <div className="text-xs text-gray-500">徽章数量</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
