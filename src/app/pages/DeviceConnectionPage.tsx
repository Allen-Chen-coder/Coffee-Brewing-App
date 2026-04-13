import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, Bluetooth, Loader, CheckCircle, XCircle } from "lucide-react";
import { DeviceType, deviceTypes } from "./DeviceSelectionPage";

interface BluetoothDevice {
  id: string;
  name: string;
  signal: number;
}

export function DeviceConnectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [deviceType, setDeviceType] = useState<DeviceType>("scale");
  const [searching, setSearching] = useState(true);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<BluetoothDevice | null>(null);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [key, setKey] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const type = searchParams.get("type") as DeviceType;
    if (type) {
      setDeviceType(type);
    }

    // 模拟蓝牙搜索
    const searchTimer = setTimeout(() => {
      setDevices([
        { id: "1", name: "智能咖啡秤 CF-PRO", signal: 85 },
        { id: "2", name: "咖啡机 KF-1000", signal: 70 },
        { id: "3", name: "氮气机 N2-500", signal: 65 }
      ]);
      setSearching(false);
    }, 2000);

    return () => clearTimeout(searchTimer);
  }, [searchParams]);

  const handleDeviceSelect = (device: BluetoothDevice) => {
    setSelectedDevice(device);
    setShowKeyInput(true);
  };

  const handleConnect = () => {
    if (!key || !selectedDevice) return;

    setConnecting(true);

    // 模拟连接过程
    setTimeout(() => {
      setConnecting(false);
      if (key === "123456") {
        setConnectionSuccess(true);
        // 3秒后返回设备选择页面
        setTimeout(() => {
          navigate("/device-selection");
        }, 2000);
      } else {
        setConnectionError(true);
        // 2秒后清除错误状态
        setTimeout(() => {
          setConnectionError(false);
        }, 2000);
      }
    }, 2000);
  };

  const getDeviceTypeInfo = () => {
    return deviceTypes.find(type => type.type === deviceType) || deviceTypes[0];
  };

  const deviceTypeInfo = getDeviceTypeInfo();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">连接{deviceTypeInfo.label}</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-[#8B4513]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="text-[#8B4513]">
                {deviceTypeInfo.icon}
              </div>
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">{deviceTypeInfo.label}</h2>
            <p className="text-sm text-gray-500">{deviceTypeInfo.description}</p>
          </div>

          {!showKeyInput ? (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">搜索设备</h3>
              
              {searching ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 border-4 border-[#8B4513]/20 border-t-[#8B4513] rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">正在搜索{deviceTypeInfo.label}...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {devices.length > 0 ? (
                    devices.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => handleDeviceSelect(device)}
                        className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{device.name}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <div className={`w-2 h-2 rounded-full ${device.signal > 70 ? "bg-green-500" : device.signal > 50 ? "bg-yellow-500" : "bg-red-500"}`} />
                            <span>信号强度: {device.signal}%</span>
                          </div>
                        </div>
                        <Bluetooth className="w-5 h-5 text-[#8B4513]" />
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bluetooth className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600">未搜索到{deviceTypeInfo.label}</p>
                      <p className="text-sm text-gray-500 mt-2">请确保设备已开机并处于可配对状态</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-medium text-gray-900 mb-4">连接设备</h3>
              
              {selectedDevice && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="font-medium text-gray-900 mb-1">{selectedDevice.name}</div>
                  <div className="text-sm text-gray-500">请输入设备显示的密钥</div>
                </div>
              )}
              
              <div className="mb-4">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="输入设备密钥"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              
              {connecting ? (
                <div className="text-center py-4">
                  <Loader className="w-8 h-8 text-[#8B4513] animate-spin mx-auto mb-2" />
                  <p className="text-gray-600">正在连接...</p>
                </div>
              ) : connectionSuccess ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-green-600 font-medium">连接成功！</p>
                  <p className="text-sm text-gray-500 mt-2">正在返回设备列表...</p>
                </div>
              ) : connectionError ? (
                <div className="text-center py-4">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <p className="text-red-600 font-medium">连接失败</p>
                  <p className="text-sm text-gray-500 mt-2">密钥错误，请重试</p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowKeyInput(false)}
                    className="flex-1 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleConnect}
                    disabled={!key}
                    className="flex-1 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    连接
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
