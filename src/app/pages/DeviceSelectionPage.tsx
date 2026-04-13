import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Bluetooth, Coffee, Droplets, Coffee as CoffeeIcon, Scale } from "lucide-react";

export type DeviceType = "scale" | "coffeeMachine" | "nitrogenMachine" | "brewer";

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: "connected" | "disconnected";
  battery?: number;
  version?: string;
}

interface DeviceTypeInfo {
  type: DeviceType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const deviceTypes: DeviceTypeInfo[] = [
  {
    type: "scale",
    label: "智能咖啡秤",
    icon: <Scale className="w-8 h-8" />,
    description: "精准测量咖啡粉和水量"
  },
  {
    type: "coffeeMachine",
    label: "咖啡机",
    icon: <CoffeeIcon className="w-8 h-8" />,
    description: "自动冲泡咖啡"
  },
  {
    type: "nitrogenMachine",
    label: "氮气机",
    icon: <Droplets className="w-8 h-8" />,
    description: "制作氮气咖啡"
  },
  {
    type: "brewer",
    label: "萃取壶",
    icon: <Coffee className="w-8 h-8" />,
    description: "手冲咖啡器具"
  }
];

// 模拟已连接的设备
const connectedDevices: Device[] = [
  {
    id: "1",
    name: "智能咖啡秤",
    type: "scale",
    status: "connected",
    battery: 85,
    version: "v2.3.1"
  },
  {
    id: "2",
    name: "家用咖啡机",
    type: "coffeeMachine",
    status: "connected",
    battery: 60,
    version: "v1.2.0"
  }
];

export function DeviceSelectionPage() {
  const navigate = useNavigate();
  const [showAddDevice, setShowAddDevice] = useState(false);

  const handleAddDevice = (type: DeviceType) => {
    navigate(`/device-connection?type=${type}`);
  };

  const handleDeviceClick = (device: Device) => {
    // 跳转到设备详情页面（这里暂时跳转到原有的设备设置页面）
    navigate("/device-settings");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">设备管理</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* 已连接设备列表 */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">已连接设备</h2>
          
          {connectedDevices.length > 0 ? (
            <div className="space-y-4">
              {connectedDevices.map((device) => {
                let icon: React.ReactNode;
                switch (device.type) {
                  case "scale":
                    icon = <Scale className="w-8 h-8" />;
                    break;
                  case "coffeeMachine":
                    icon = <CoffeeIcon className="w-8 h-8" />;
                    break;
                  case "nitrogenMachine":
                    icon = <Droplets className="w-8 h-8" />;
                    break;
                  case "brewer":
                    icon = <Coffee className="w-8 h-8" />;
                    break;
                }

                return (
                  <button
                    key={device.id}
                    onClick={() => handleDeviceClick(device)}
                    className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center text-white">
                        {icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{device.name}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${device.status === "connected" ? "bg-green-500" : "bg-red-500"}`} />
                          <span className="text-gray-600">
                            {device.status === "connected" ? "已连接" : "未连接"}
                          </span>
                          {device.battery !== undefined && (
                            <span className="text-gray-500">· 电量: {device.battery}%</span>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bluetooth className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">设备待连接</h3>
              <p className="text-gray-500 mb-6">暂无已连接的设备</p>
              <button
                onClick={() => setShowAddDevice(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
              >
                连接设备
              </button>
            </div>
          )}
        </div>

        {/* 添加新设备 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">添加新设备</h2>
            <button
              onClick={() => setShowAddDevice(!showAddDevice)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {showAddDevice && (
            <div className="grid grid-cols-2 gap-4">
              {deviceTypes.map((deviceType) => (
                <button
                  key={deviceType.type}
                  onClick={() => handleAddDevice(deviceType.type)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-center"
                >
                  <div className="w-16 h-16 bg-[#8B4513]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <div className="text-[#8B4513]">
                      {deviceType.icon}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{deviceType.label}</h3>
                  <p className="text-xs text-gray-500">{deviceType.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
