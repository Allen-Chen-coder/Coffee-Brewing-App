import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, Thermometer, Droplet, BookOpen, Trash2, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const detailData = [
  { time: 0, weight: 0, flow: 0 },
  { time: 15, weight: 30, flow: 2.0 },
  { time: 30, weight: 60, flow: 2.0 },
  { time: 60, weight: 120, flow: 2.0 },
  { time: 90, weight: 180, flow: 2.0 },
  { time: 120, weight: 225, flow: 1.5 },
];

export function BrewDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [inCurveLibrary, setInCurveLibrary] = useState(false);
  
  const handleToggleCurveLibrary = () => {
    setInCurveLibrary(!inCurveLibrary);
  };
  
  const handleDeleteRecord = () => {
    if (confirm("确定要删除这条冲煮记录吗？")) {
      // 模拟删除操作
      alert("记录已删除");
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">冲煮详情</h1>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white rounded-3xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">手冲咖啡</h2>
              <p className="text-white/80">埃塞俄比亚</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-300 text-xl">★</span>
              <span className="text-lg font-semibold">4.5</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-white/70 text-xs mb-1">粉水比</div>
              <div className="font-semibold">1:15</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-white/70 text-xs mb-1">总时长</div>
              <div className="font-semibold">2:30</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">冲煮参数</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Thermometer className="w-5 h-5" />
                <span className="text-sm">水温</span>
              </div>
              <span className="font-medium text-gray-900">92°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Droplet className="w-5 h-5" />
                <span className="text-sm">咖啡粉量</span>
              </div>
              <span className="font-medium text-gray-900">15g</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Droplet className="w-5 h-5" />
                <span className="text-sm">注水量</span>
              </div>
              <span className="font-medium text-gray-900">225g</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">冲煮时间</span>
              </div>
              <span className="font-medium text-gray-900">今天 09:23</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">重量曲线</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={detailData}>
              <defs>
                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B4513" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B4513" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fill: "#999", fontSize: 12 }} label={{ value: "时间(s)", position: "insideBottom", offset: -5, fill: "#666" }} />
              <YAxis tick={{ fill: "#999", fontSize: 12 }} label={{ value: "重量(g)", angle: -90, position: "insideLeft", fill: "#666" }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#8B4513"
                strokeWidth={2}
                fill="url(#weightGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">流速曲线</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={detailData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fill: "#999", fontSize: 12 }} label={{ value: "时间(s)", position: "insideBottom", offset: -5, fill: "#666" }} />
              <YAxis tick={{ fill: "#999", fontSize: 12 }} label={{ value: "流速(g/s)", angle: -90, position: "insideLeft", fill: "#666" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="flow"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">口感评价</h3>
          <div className="flex flex-wrap gap-2">
            {["均衡", "甜感", "果香"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-[#8B4513]/10 text-[#8B4513] rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleToggleCurveLibrary}
            className={`w-full py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 ${
              inCurveLibrary
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-[#8B4513] text-white hover:bg-[#A0522D]"
            }`}
          >
            {inCurveLibrary ? (
              <>
                <X className="w-5 h-5" />
                <span>从曲线库中移除</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>添加到曲线库</span>
              </>
            )}
          </button>
          <button
            onClick={handleDeleteRecord}
            className="w-full py-4 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            <span>删除记录</span>
          </button>
        </div>
      </div>
    </div>
  );
}
