import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Battery, Wifi, ChevronRight, TrendingUp, Coffee, Bluetooth, Check, AlertCircle, Plus, Scale, Droplets, Coffee as CoffeeIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DeviceType, deviceTypes } from "./DeviceSelectionPage";

const extractionData = [
  { time: 0, quality: 50 },
  { time: 30, quality: 75 },
  { time: 60, quality: 90 },
  { time: 90, quality: 85 },
  { time: 120, quality: 70 },
];

const waterDeviationData = [
  { time: 0, deviation: 0 },
  { time: 30, deviation: 2 },
  { time: 60, deviation: -1 },
  { time: 90, deviation: 1 },
  { time: 120, deviation: 0 },
];

const recentBrews = [
  { id: 1, type: "手冲咖啡", bean: "埃塞俄比亚", ratio: "1:15", time: "2:30", date: "今天 09:23", rating: 4.5 },
  { id: 2, type: "意式浓缩", bean: "哥伦比亚", ratio: "1:2", time: "0:28", date: "昨天 14:15", rating: 4.0 },
  { id: 3, type: "手冲咖啡", bean: "肯尼亚", ratio: "1:16", time: "2:45", date: "04-07 10:30", rating: 4.8 },
];

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: "connected" | "disconnected";
  battery?: number;
  version?: string;
}

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

export function BarPage() {
  const navigate = useNavigate();
  
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'failed'>('disconnected');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [key, setKey] = useState('');
  const [showDeviceManagement, setShowDeviceManagement] = useState(true);
  const [showAddDevice, setShowAddDevice] = useState(false);
  
  const handleConnect = () => {
    setConnectionStatus('connecting');
    // 模拟蓝牙连接过程
    setTimeout(() => {
      setShowKeyInput(true);
      setConnectionStatus('disconnected');
    }, 1500);
  };
  
  const handleSubmitKey = () => {
    if (key) {
      setConnectionStatus('connecting');
      // 模拟密钥验证过程
      setTimeout(() => {
        setConnectionStatus('connected');
        setShowKeyInput(false);
      }, 1500);
    }
  };
  
  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
  };

  const handleDeviceClick = (device: Device) => {
    if (device.type === "scale") {
      // 智能咖啡秤显示当前页面的详细信息
      setShowDeviceManagement(false);
    } else {
      // 其他设备显示功能尚未开发
      alert("功能尚未开发，敬请期待");
    }
  };

  const handleAddDevice = (type: DeviceType) => {
    if (type === "scale") {
      // 智能咖啡秤跳转到设备选择页面
      navigate("/device-selection");
    } else {
      // 其他设备显示功能尚未开发
      alert("功能尚未开发，敬请期待");
    }
  };

  return (
    <div className="min-h-screen pb-6">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white p-6 min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wifi className="w-5 h-5" />
            <div className="flex items-center gap-1">
              <Battery className="w-5 h-5" />
              <span className="text-sm">85%</span>
            </div>
          </div>
        </div>

        {showDeviceManagement ? (
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">设备管理</h2>
              <button
                onClick={() => setShowDeviceManagement(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* 已连接设备列表 */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">已连接设备</h3>
              
              {connectedDevices.length > 0 ? (
                <div className="space-y-4">
                  {connectedDevices.map((device) => {
                    let icon: React.ReactNode;
                    switch (device.type) {
                      case "scale":
                        icon = <Scale className="w-6 h-6" />;
                        break;
                      case "coffeeMachine":
                        icon = <CoffeeIcon className="w-6 h-6" />;
                        break;
                      case "nitrogenMachine":
                        icon = <Droplets className="w-6 h-6" />;
                        break;
                      case "brewer":
                        icon = <Coffee className="w-6 h-6" />;
                        break;
                      default:
                        icon = <Coffee className="w-6 h-6" />;
                    }

                    return (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceClick(device)}
                        className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                            {icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">{device.name}</div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${device.status === "connected" ? "bg-green-400" : "bg-red-400"}`} />
                                <span>
                                  {device.status === "connected" ? "已连接" : "未连接"}
                                </span>
                              </div>
                              {device.battery !== undefined && (
                                <div className="flex items-center gap-1">
                                  <div className="w-16 bg-white/20 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${device.battery > 70 ? "bg-green-400" : device.battery > 30 ? "bg-yellow-400" : "bg-red-400"}`}
                                      style={{ width: `${device.battery}%` }}
                                    />
                                  </div>
                                  <span>{device.battery}%</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/70 flex-shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Bluetooth className="w-10 h-10" />
                  </div>
                  <h4 className="font-semibold text-lg mb-3">设备待连接</h4>
                  <p className="text-sm text-white/80 mb-6 max-w-xs mx-auto">暂无已连接的设备，点击下方按钮添加新设备</p>
                  <button
                    onClick={() => setShowAddDevice(true)}
                    className="px-8 py-3 bg-gradient-to-r from-white/20 to-white/10 rounded-xl hover:from-white/30 hover:to-white/20 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    连接设备
                  </button>
                </div>
              )}
            </div>

            {/* 添加新设备 */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">添加新设备</h3>
                <button
                  onClick={() => setShowAddDevice(!showAddDevice)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {showAddDevice && (
                <div className="grid grid-cols-2 gap-4">
                  {deviceTypes.map((deviceType) => (
                    <button
                      key={deviceType.type}
                      onClick={() => handleAddDevice(deviceType.type)}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 transform hover:translate-y-[-4px] shadow-md hover:shadow-lg text-center group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {deviceType.icon}
                      </div>
                      <h4 className="font-medium text-base mb-2">{deviceType.label}</h4>
                      <p className="text-xs text-white/70">{deviceType.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                <Coffee className="w-10 h-10" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">智能咖啡称</div>
                <div className="text-sm text-white/80 mt-1">v2.3.1</div>
                <div className="text-sm text-white/80 mt-1">累计冲煮 127 次</div>
              </div>
              <button
                onClick={() => navigate("/device-settings")}
                className="ml-auto p-2 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {!showKeyInput ? (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-lg">设备连接</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${connectionStatus === 'connected' ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
                      {connectionStatus === 'connected' ? '已连接' : 
                       connectionStatus === 'connecting' ? '正在连接...' : 
                       '未连接'}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${connectionStatus === 'connected' ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
                      {connectionStatus === 'connected' ? (
                        <Check className="w-6 h-6" />
                      ) : connectionStatus === 'connecting' ? (
                        <Bluetooth className="w-6 h-6 animate-spin" />
                      ) : (
                        <Bluetooth className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white/80">
                        {connectionStatus === 'connected' ? '设备已成功连接，可以开始冲煮' : 
                         connectionStatus === 'connecting' ? '正在与设备建立连接...' : 
                         '设备未连接，请点击下方按钮进行连接'}
                      </p>
                    </div>
                    {connectionStatus === 'connected' ? (
                      <button
                        onClick={handleDisconnect}
                        className="px-5 py-2 bg-gradient-to-r from-red-400/20 to-red-500/10 text-red-300 rounded-xl hover:from-red-400/30 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        断开连接
                      </button>
                    ) : (
                      <button
                        onClick={handleConnect}
                        className="px-5 py-2 bg-gradient-to-r from-blue-400/20 to-blue-500/10 text-blue-300 rounded-xl hover:from-blue-400/30 hover:to-blue-500/20 transition-all duration-300 transform hover:scale-105 shadow-md"
                      >
                        连接设备
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 shadow-md">
                    <div className="font-medium text-sm text-white/80 mb-2">设备电量</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-inner">
                        <Battery className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                          <div className="h-2 rounded-full bg-green-400" style={{ width: '85%' }} />
                        </div>
                        <div className="text-sm font-medium">85%</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 shadow-md">
                    <div className="font-medium text-sm text-white/80 mb-2">冲煮数据</div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center shadow-inner">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-bold">127</div>
                        <div className="text-sm text-white/80">累计冲煮次数</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-300">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">需要设备密钥</div>
                    <div className="text-sm text-white/80">请输入咖啡秤显示的密钥以完成连接</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="输入设备密钥"
                    className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowKeyInput(false)}
                    className="flex-1 py-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSubmitKey}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-400/20 to-blue-500/10 text-blue-300 rounded-xl hover:from-blue-400/30 hover:to-blue-500/20 transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    确认连接
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!showDeviceManagement && (
        <div className="px-6 mt-2">
          <div className="bg-white rounded-2xl shadow-sm p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-900">最近萃取质量曲线</h2>
              <TrendingUp className="w-4 h-4 text-[#8B4513]" />
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={extractionData}>
                <defs>
                  <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4513" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B4513" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid-1" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis-1" dataKey="time" tick={{ fill: "#999", fontSize: 10 }} />
                <YAxis key="yaxis-1" tick={{ fill: "#999", fontSize: 10 }} />
                <Tooltip key="tooltip-1" />
                <Area
                  key="quality-area"
                  type="monotone"
                  dataKey="quality"
                  stroke="#8B4513"
                  strokeWidth={2}
                  fill="url(#qualityGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">水量偏差曲线</h2>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={waterDeviationData}>
                <CartesianGrid key="grid-2" strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis key="xaxis-2" dataKey="time" tick={{ fill: "#999", fontSize: 10 }} />
                <YAxis key="yaxis-2" tick={{ fill: "#999", fontSize: 10 }} />
                <Tooltip key="tooltip-2" />
                <Line
                  key="deviation-line"
                  type="monotone"
                  dataKey="deviation"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">近期冲煮记录</h2>
              <button onClick={() => navigate("/history")} className="text-sm text-[#8B4513] hover:underline">查看历史记录</button>
            </div>
            <div className="space-y-3">
              {recentBrews.map((brew) => (
                <button
                  key={brew.id}
                  onClick={() => navigate(`/brew/${brew.id}`)}
                  className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{brew.type}</div>
                      <div className="text-sm text-gray-500">{brew.bean}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{brew.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>粉水比 {brew.ratio}</span>
                    <span>时长 {brew.time}</span>
                    <span className="ml-auto text-xs text-gray-400">{brew.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => navigate("/publish-brewing-plan")}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
              <span className="text-sm font-medium text-gray-700">冲煮方案</span>
            </button>
            <button
              onClick={() => navigate("/brew/category")}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🚿</span>
              </div>
              <span className="text-sm font-medium text-gray-700">开始冲煮</span>
            </button>
          </div>

          <button
            onClick={() => navigate("/brew/category")}
            className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl py-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            开始冲煮
          </button>
        </div>
      )}
    </div>
  );
}
