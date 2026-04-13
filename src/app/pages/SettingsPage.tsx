import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Bell, Lock, Globe, Moon } from "lucide-react";

const settingsItems = [
  { id: "notifications", label: "通知设置", icon: Bell },
  { id: "privacy", label: "隐私与安全", icon: Lock },
  { id: "language", label: "语言", icon: Globe, value: "简体中文" },
  { id: "theme", label: "主题", icon: Moon, value: "浅色" },
];

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">设置</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "language") {
                    navigate("/language");
                  }
                }}
                className={`w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  index !== settingsItems.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-sm text-gray-500">{item.value}</span>}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="text-sm text-gray-500 mb-2">版本信息</div>
          <div className="text-gray-900">v2.3.1</div>
        </div>

        <button className="w-full bg-red-500 text-white rounded-2xl py-4 font-medium hover:bg-red-600 transition-colors">
          退出登录
        </button>
      </div>
    </div>
  );
}
