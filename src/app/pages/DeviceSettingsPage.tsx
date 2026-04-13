import { useNavigate } from "react-router";
import { ArrowLeft, Zap, Download, RotateCcw, Keyboard } from "lucide-react";

const settingOptions = [
  {
    id: "calibrate",
    label: "校准设备",
    description: "一键快捷校准咖啡称",
    icon: Zap,
    color: "text-blue-600",
  },
  {
    id: "update",
    label: "设备版本更新",
    description: "检查并安装OTA升级",
    icon: Download,
    color: "text-green-600",
  },
  {
    id: "reset",
    label: "重置设备",
    description: "恢复出厂设置并删除数据",
    icon: RotateCcw,
    color: "text-red-600",
  },
  {
    id: "buttons",
    label: "按键设置",
    description: "自定义咖啡称按键功能",
    icon: Keyboard,
    color: "text-purple-600",
  },
];

export function DeviceSettingsPage() {
  const navigate = useNavigate();

  const handleAction = (id: string) => {
    switch (id) {
      case "calibrate":
        alert("正在校准设备...");
        break;
      case "update":
        alert("检查更新中...");
        break;
      case "reset":
        if (confirm("确定要重置设备吗？此操作将删除所有数据且无法恢复。")) {
          alert("设备重置中...");
        }
        break;
      case "buttons":
        alert("按键设置功能开发中...");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">设备管理</h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl">
              ⚖️
            </div>
            <h2 className="font-bold text-lg text-gray-900 mb-1">智能咖啡称</h2>
            <p className="text-sm text-gray-500">型号: CF-PRO-2024</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">设备版本</div>
              <div className="font-semibold text-gray-900">v2.3.1</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">固件版本</div>
              <div className="font-semibold text-gray-900">v1.8.5</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">电量</div>
              <div className="font-semibold text-green-600">85%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">连接状态</div>
              <div className="font-semibold text-blue-600">已连接</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {settingOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleAction(option.id)}
                className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${option.color} bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
