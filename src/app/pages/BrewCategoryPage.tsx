import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Coffee, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const coffeeTypes = [
  { id: "curve-brew", name: "曲线冲煮模式", icon: Coffee },
  { id: "espresso", name: "意式模式", icon: Coffee },
  { id: "free-brew", name: "自由冲煮模式", icon: Coffee },
];

const downloadedCurves = [
  { id: "master-classic", name: "经典大师曲线", type: "手冲", targetTime: "2:00" },
  { id: "fast-brew", name: "快速萃取曲线", type: "手冲", targetTime: "1:30" },
  { id: "espresso-standard", name: "标准意式曲线", type: "意式", targetTime: "0:28" },
  { id: "gentle-pour", name: "温柔注水曲线", type: "手冲", targetTime: "2:30" },
];

export function BrewCategoryPage() {
  const navigate = useNavigate();
  const [selectedCoffee, setSelectedCoffee] = useState("curve-brew");
  const [selectedCurve, setSelectedCurve] = useState("master-classic");
  const [showTransition, setShowTransition] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showTransition) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 800);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => navigate("/brew/brewing"), 500);
      }
    }
  }, [showTransition, countdown, navigate]);

  const handleStart = () => {
    if (selectedCoffee === "curve-brew") {
      setShowTransition(true);
    } else {
      // 意式模式和自由冲煮模式跳转到简化页面
      navigate("/brew/simple", { state: { mode: selectedCoffee } });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">选择品类</h1>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-4">模式选择</h2>
          <div className="grid grid-cols-3 gap-3">
            {coffeeTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedCoffee(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCoffee === type.id
                      ? "border-[#8B4513] bg-[#8B4513]/5"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      selectedCoffee === type.id ? "text-[#8B4513]" : "text-gray-400"
                    }`}
                  />
                  <div className={`text-sm ${selectedCoffee === type.id ? "text-[#8B4513] font-medium" : "text-gray-600"}`}>
                    {type.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedCoffee === "curve-brew" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-600">本地曲线库</h2>
              <button
                onClick={() => navigate("/curve-library")}
                className="text-xs text-[#8B4513] hover:text-[#A0522D] transition-colors flex items-center gap-1"
              >
                <span>去下载</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {downloadedCurves.map((curve) => (
                <button
                  key={curve.id}
                  onClick={() => setSelectedCurve(curve.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    selectedCurve === curve.id
                      ? "border-[#8B4513] bg-[#8B4513]/5"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedCurve === curve.id ? "bg-[#8B4513]" : "bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          selectedCurve === curve.id ? "text-white" : "text-gray-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${selectedCurve === curve.id ? "text-[#8B4513]" : "text-gray-900"}`}>
                        {curve.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {curve.type} · 目标时间 {curve.targetTime}
                      </div>
                    </div>
                  </div>
                  {selectedCurve === curve.id && (
                    <div className="w-5 h-5 rounded-full bg-[#8B4513] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl py-4 font-semibold shadow-lg"
        >
          确认并开始
        </button>
      </div>

      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-br from-[#2C1810] via-[#3E2723] to-[#4E342E]"
            />

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 100,
                    opacity: 0,
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 1,
                    ease: "linear",
                  }}
                  className="absolute w-2 h-2 bg-white/40 rounded-full blur-sm"
                />
              ))}
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                className="mb-8"
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-full flex items-center justify-center shadow-2xl">
                  <Coffee className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-2xl font-medium mb-4"
              >
                准备冲煮
              </motion.div>

              <AnimatePresence mode="wait">
                {countdown > 0 && (
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white text-8xl font-bold tabular-nums"
                  >
                    {countdown}
                  </motion.div>
                )}
              </AnimatePresence>

              {countdown === 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-white text-5xl font-bold"
                >
                  开始！
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-96 h-96 rounded-full border-4 border-white/20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
