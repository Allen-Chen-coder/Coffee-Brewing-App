import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function SimpleBrewingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "free-brew";
  
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rate, setRate] = useState(0);
  const [beansWeight] = useState(15);
  const [phase, setPhase] = useState<"brewing" | "done">("brewing");
  const [realTimeData, setRealTimeData] = useState<{ time: number; weight: number }[]>([]);

  // 模拟咖啡称数据
  useEffect(() => {
    if (phase !== "brewing") return;

    const interval = setInterval(() => {
      setTime((prev) => {
        const next = prev + 1;
        return next;
      });

      setWeight((prev) => {
        const increment = Math.random() * 5 + 2;
        setRate(increment);
        return prev + increment;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // 更新实时曲线数据
  useEffect(() => {
    setRealTimeData((prev) => {
      const existingIndex = prev.findIndex((d) => d.time === time);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { time, weight };
        return updated;
      }
      return [...prev, { time, weight }];
    });
  }, [time, weight]);

  const handleFinish = () => {
    setPhase("done");
    setTimeout(() => navigate("/brew/rating"), 500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3E2723] to-[#4E342E] text-white relative overflow-hidden">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-50"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="h-screen flex flex-col px-6 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="text-3xl font-bold text-white mb-2">
            {mode === "espresso" ? "意式模式" : "自由冲煮模式"}
          </div>
          <div className="text-sm text-white/60">
            {mode === "espresso" ? "意式浓缩" : `粉水比 1:15 · 咖啡豆 ${beansWeight}g`}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl flex flex-col justify-center"
        >
          {mode === "free-brew" ? (
            // 自由冲煮模式：显示实时速率/粉水比/计时/克重
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">实时克重</div>
                  <div className="text-6xl font-bold tabular-nums">
                    {weight.toFixed(1)}
                    <span className="text-2xl text-white/60 ml-1">g</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-2 uppercase tracking-wider">计时</div>
                  <div className="text-6xl font-bold tabular-nums">
                    {formatTime(time)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xs text-white/50 mb-2">粉水比</div>
                  <div className="text-3xl font-semibold text-white/90">1:15</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/50 mb-2">实时速率</div>
                  <div className="text-3xl font-semibold text-white/90 tabular-nums">{rate.toFixed(1)}g/s</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20">
                <div className="text-sm font-medium text-white/90 mb-3 text-center">萃取曲线</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={realTimeData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="time" 
                        label={{ value: '时间 (秒)', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.6)' }} 
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <YAxis 
                        label={{ value: '重量 (g)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }} 
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: 'white' }} 
                        labelStyle={{ color: 'white' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                        dot={{ r: 0 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ) : (
            // 意式模式：仅显示计时和克重
            <div className="space-y-12">
              <div className="text-center">
                <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">计时</div>
                <div className="text-8xl font-bold tabular-nums">
                  {formatTime(time)}
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/20">
                <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">实时克重</div>
                <div className="text-7xl font-bold tabular-nums">
                  {weight.toFixed(1)}
                  <span className="text-3xl text-white/60 ml-2">g</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={handleFinish}
          className="mt-6 w-full py-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          完成冲煮
        </motion.button>
      </div>
    </div>
  );
}
