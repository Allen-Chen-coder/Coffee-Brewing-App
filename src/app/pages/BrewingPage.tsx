import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// 快速演示模式：30秒大师曲线数据
const masterCurveData = [
  { time: 0, weight: 0 },
  { time: 5, weight: 30 },
  { time: 10, weight: 70 },
  { time: 15, weight: 110 },
  { time: 20, weight: 155 },
  { time: 25, weight: 195 },
  { time: 30, weight: 225 },
];

export function BrewingPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [phase, setPhase] = useState<"weigh-beans" | "calculate" | "filter-rinse" | "ready" | "brewing" | "done">("weigh-beans");
  const [beansWeight, setBeansWeight] = useState(15);
  const [scaleWeight, setScaleWeight] = useState(0); // 咖啡称实时重量
  const [isStable, setIsStable] = useState(false);
  const [stableTimer, setStableTimer] = useState(0);
  const [weightStabilized, setWeightStabilized] = useState(false); // 重量是否已稳定
  const [autoTransitioning, setAutoTransitioning] = useState(false); // 是否正在自动跳转

  const recommendedWeight = 15; // 推荐咖啡豆重量

  // 模拟咖啡称重量变化和自动检测（快速演示模式）
  useEffect(() => {
    const interval = setInterval(() => {
      setScaleWeight((prev) => {
        let newWeight = prev;

        // 根据不同阶段模拟不同的重量变化
        if (phase === "weigh-beans") {
          // 称重阶段：快速达到目标重量
          if (weightStabilized) {
            // 已稳定，保持不变
            newWeight = 15;
          } else if (prev < 14) {
            newWeight = prev + Math.random() * 4; // 加快增长速度
          } else if (prev < 15) {
            newWeight = prev + Math.random() * 1;
          } else {
            // 接近目标重量，开始稳定
            newWeight = 15 + (Math.random() - 0.5) * 0.15;
          }
          setBeansWeight(newWeight);
        } else if (phase === "calculate") {
          // 计算阶段：快速拿走豆子
          if (prev > 0.5) {
            newWeight = Math.max(0, prev - Math.random() * 8);
          } else if (prev > 0 && !autoTransitioning) {
            newWeight = 0;
            setAutoTransitioning(true);
            // 豆子已拿走，0.8秒后自动进入浸润阶段
            setTimeout(() => {
              setPhase("filter-rinse");
              setAutoTransitioning(false);
            }, 800);
          } else {
            newWeight = 0;
          }
        } else if (phase === "filter-rinse") {
          // 浸润阶段：快速加水然后拿走
          if (prev < 30) {
            newWeight = prev + Math.random() * 18; // 快速加水
          } else if (prev >= 30 && prev < 50) {
            newWeight = prev + (Math.random() - 0.5) * 3; // 短暂稳定
          } else {
            newWeight = Math.max(0, prev - Math.random() * 30); // 快速拿走萃取壶
            if (newWeight < 5 && prev >= 5 && !autoTransitioning) {
              setAutoTransitioning(true);
              setTimeout(() => {
                setPhase("ready");
                setAutoTransitioning(false);
              }, 600);
            }
          }
        } else if (phase === "ready") {
          // 准备阶段：快速放回萃取壶并加咖啡粉
          if (prev < 8) {
            newWeight = prev + Math.random() * 15; // 快速放回萃取壶
          } else if (prev >= 8 && prev < 18) {
            newWeight = prev + Math.random() * 5; // 快速加咖啡粉
          } else if (prev >= 18 && !autoTransitioning) {
            // 检测到咖啡粉，0.6秒后自动开始萃取
            setAutoTransitioning(true);
            setTimeout(() => {
              setPhase("brewing");
              setAutoTransitioning(false);
            }, 600);
            newWeight = prev + (Math.random() - 0.5) * 0.5;
          } else {
            newWeight = prev + (Math.random() - 0.5) * 0.5;
          }
        }

        return newWeight;
      });
    }, 100); // 加快更新频率：从150ms改为100ms

    return () => clearInterval(interval);
  }, [phase, weightStabilized, autoTransitioning]);

  // 检测重量稳定（称重阶段）- 快速演示模式
  useEffect(() => {
    if (phase === "weigh-beans" && !autoTransitioning) {
      if (scaleWeight >= 14.7 && scaleWeight <= 15.3) {
        setStableTimer((prev) => {
          const newTimer = prev + 1;
          if (newTimer > 5 && !autoTransitioning) { // 稳定0.5秒后（5次 × 100ms）
            setWeightStabilized(true); // 标记重量已稳定
            setIsStable(true);
            setAutoTransitioning(true);
            // 稳定后0.8秒自动进入计算阶段
            setTimeout(() => {
              setPhase("calculate");
              setStableTimer(0);
              setIsStable(false);
              setWeightStabilized(false);
              setAutoTransitioning(false);
            }, 800);
          }
          return newTimer;
        });
      } else {
        setStableTimer(0);
        setIsStable(false);
      }
    }
  }, [scaleWeight, phase, autoTransitioning]);
  const [rate, setRate] = useState(0);

  const targetWeight = 225;
  const schemeName = "经典大师曲线";

  // 快速演示模式：30秒完成萃取
  useEffect(() => {
    if (phase !== "brewing") {
      return; // 只在brewing阶段计时
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        const next = prev + 1;
        if (next >= 30) { // 从120秒改为30秒
          setPhase("done");
          setTimeout(() => navigate("/brew/rating"), 1000);
        }
        return next;
      });

      setWeight((prev) => {
        const increment = Math.random() * 8 + 4; // 加快增长速度以在30秒内达到225g
        setRate(increment);
        return Math.min(prev + increment, 225);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, phase]);

  const [realTimeData, setRealTimeData] = useState<{ time: number; weight: number }[]>([]);

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

  const waterLevel = (weight / targetWeight) * 100;
  const masterCurveProgress = time / 30; // 从120改为30秒
  const currentMasterWeight = masterCurveData.find(d => d.time <= time && masterCurveData.find(d2 => d2.time > time)?.time > d.time)?.weight || 0;
  const isExceeded = weight > currentMasterWeight && currentMasterWeight > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3E2723] to-[#4E342E] text-white relative overflow-hidden">
      {/* 动态波浪线 - 大师曲线 */}
      {phase === "brewing" && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" preserveAspectRatio="none">
        <motion.path
          d={`M 0 ${50 + Math.sin(masterCurveProgress * Math.PI) * 30} Q 25 ${40 + Math.sin(masterCurveProgress * Math.PI * 1.2) * 25}, 50 ${50 + Math.sin(masterCurveProgress * Math.PI * 0.8) * 30} T 100 ${50 + Math.sin(masterCurveProgress * Math.PI) * 30}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              `M 0 ${50 + Math.sin(time * 0.1) * 5} Q 25 ${45 + Math.sin(time * 0.15) * 5}, 50 ${50 + Math.sin(time * 0.12) * 5} T 100 ${50 + Math.sin(time * 0.1) * 5}`,
              `M 0 ${50 + Math.sin((time + 1) * 0.1) * 5} Q 25 ${45 + Math.sin((time + 1) * 0.15) * 5}, 50 ${50 + Math.sin((time + 1) * 0.12) * 5} T 100 ${50 + Math.sin((time + 1) * 0.1) * 5}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        </svg>
      )}

      {/* 雨滴特效 - 数量随速率变化 */}
      {phase === "brewing" && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(Math.max(5, Math.min(Math.floor(rate * 5), 30)))].map((_, i) => {
            const startX = Math.random() * window.innerWidth;
            const waterSurfaceY = window.innerHeight * (1 - waterLevel / 100);
            const dropletSize = 0.8 + Math.random() * 0.6; // 随机大小
            const fallDuration = 0.8 + Math.random() * 0.6;
            const horizontalDrift = (Math.random() - 0.5) * 20; // 左右摆动

            return (
              <div key={i}>
                {/* 水滴形状雨滴 */}
                <motion.div
                  className="absolute"
                  style={{
                    width: `${3 * dropletSize}px`,
                    height: `${8 * dropletSize}px`,
                  }}
                  initial={{
                    x: startX,
                    y: -50,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: startX + horizontalDrift,
                    y: waterSurfaceY,
                    opacity: [0, 0.85, 0.85, 0],
                    rotate: horizontalDrift > 0 ? 5 : -5,
                  }}
                  transition={{
                    duration: fallDuration,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: [0.4, 0, 0.6, 1], // 模拟重力加速
                  }}
                >
                  <div
                    className={`w-full h-full ${isExceeded ? 'bg-red-400/75' : 'bg-cyan-400/75'}`}
                    style={{
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      filter: 'blur(0.5px)',
                    }}
                  />
                </motion.div>

                {/* 溅起的水花 - 多个小水珠向外扩散 */}
                <div className="absolute" style={{ left: startX, top: waterSurfaceY }}>
                  {[...Array(4)].map((_, splashIndex) => {
                    const angle = (splashIndex * 90 - 45) * (Math.PI / 180);
                    const distance = 15 + Math.random() * 10;

                    return (
                      <motion.div
                        key={splashIndex}
                        className={`absolute w-1.5 h-1.5 rounded-full ${isExceeded ? 'bg-red-300/60' : 'bg-cyan-300/60'}`}
                        style={{
                          filter: 'blur(0.5px)',
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          scale: 0,
                          opacity: 0,
                        }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance - 10,
                          scale: [0, 1, 0.5],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: fallDuration + Math.random() * 2,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}

                  {/* 中心水花圆环 */}
                  <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 2, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: fallDuration + Math.random() * 2,
                      ease: "easeOut",
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 ${isExceeded ? 'border-red-200/50' : 'border-cyan-200/50'}`} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 底部水面 */}
      {phase === "brewing" && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          initial={{ height: 0 }}
          animate={{
            height: `${Math.min(waterLevel, 100)}%`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div
            className={`w-full h-full ${
              isExceeded
                ? 'bg-gradient-to-t from-red-700/60 via-red-600/45 to-red-500/25'
                : 'bg-gradient-to-t from-cyan-900/65 via-cyan-700/50 to-blue-500/30'
            } backdrop-blur-sm`}
          >
            {/* 水面波浪效果 */}
            <svg className="absolute top-0 w-full h-20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isExceeded ? 'rgba(185, 28, 28, 0.6)' : 'rgba(8, 145, 178, 0.65)'} />
                  <stop offset="100%" stopColor={isExceeded ? 'rgba(220, 38, 38, 0.4)' : 'rgba(6, 182, 212, 0.45)'} />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z"
                fill="url(#waterGradient)"
                animate={{
                  d: [
                    "M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z",
                    "M0,5 Q25,15 50,5 T100,5 L100,20 L0,20 Z",
                    "M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* 添加水面光泽效果 */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          </div>
        </motion.div>
      )}

      {/* 主要内容 */}
      <div className="relative z-40 h-screen flex flex-col">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 flex flex-col justify-between px-6 py-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-white mb-2">{schemeName}</div>
            <div className="text-sm text-white/60 mb-3">粉水比 1:15 · 目标时间 0:30</div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-400/30">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-xs text-amber-200">推荐咖啡豆重量</span>
              <span className="text-sm font-semibold text-amber-100">{recommendedWeight}g</span>
            </div>
          </motion.div>

          {phase === "weigh-beans" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">咖啡豆重量</div>
                <div className="text-8xl font-bold tabular-nums">
                  {beansWeight.toFixed(1)}
                  <span className="text-4xl text-white/60 ml-2">g</span>
                </div>
              </div>
            </motion.div>
          ) : phase === "calculate" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">咖啡豆</div>
                  <div className="text-5xl font-bold tabular-nums">
                    {beansWeight.toFixed(1)}
                    <span className="text-2xl text-white/60 ml-1">g</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">粉水比</div>
                  <div className="text-5xl font-bold">1:15</div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/20 mt-6 text-center">
                <div className="text-xs text-white/50 mb-2">目标水量</div>
                <div className="text-4xl font-semibold text-white/90 tabular-nums">{targetWeight}g</div>
              </div>
            </motion.div>
          ) : (phase === "filter-rinse" || phase === "ready") ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">电子秤重量</div>
                <div className="text-8xl font-bold tabular-nums">
                  {scaleWeight.toFixed(1)}
                  <span className="text-4xl text-white/60 ml-2">g</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">实时重量</div>
                  <div className="text-7xl font-bold tabular-nums">
                    {weight.toFixed(1)}
                    <span className="text-3xl text-white/60 ml-2">g</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/60 mb-3 uppercase tracking-wider">时间</div>
                  <div className="text-7xl font-bold tabular-nums">
                    {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xs text-white/50 mb-2">目标克重</div>
                  <div className="text-3xl font-semibold text-white/90 tabular-nums">{targetWeight}g</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/50 mb-2">实时速率</div>
                  <div className="text-3xl font-semibold text-white/90 tabular-nums">{rate.toFixed(1)}g/s</div>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {phase === "weigh-beans" && (
              <motion.div
                key="weigh-beans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                  <div className="text-2xl font-medium mb-2">称重咖啡豆</div>
                  <div className="text-sm text-white/70 mb-3">
                    {autoTransitioning ? "即将自动跳转..." : "请将咖啡豆放在电子秤上称重"}
                  </div>
                  {autoTransitioning ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-green-400"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">自动跳转中...</span>
                    </motion.div>
                  ) : isStable ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-green-400"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">重量稳定，即将自动确认...</span>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-white/50">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
                      <span className="text-sm">等待重量稳定...</span>
                    </div>
                  )}
                  <button
                    onClick={() => setPhase("calculate")}
                    className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    手动跳转
                  </button>
                </div>
              </motion.div>
            )}
            {phase === "calculate" && (
              <motion.div
                key="calculate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                  <div className="text-2xl font-medium mb-2">计算冲煮参数</div>
                  <div className="text-sm text-white/70 mb-4">
                    {autoTransitioning ? "计算完成，即将自动跳转..." : "根据咖啡豆重量计算水粉比和目标克重"}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-left mb-4">
                    <div>
                      <div className="text-xs text-white/50">咖啡豆</div>
                      <div className="text-xl font-semibold">{beansWeight.toFixed(1)}g</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/50">目标水量</div>
                      <div className="text-xl font-semibold">{targetWeight}g</div>
                    </div>
                  </div>
                  {autoTransitioning ? (
                    <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">自动跳转中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-sm">请将咖啡豆拿去研磨...</span>
                    </div>
                  )}
                  <button
                    onClick={() => setPhase("filter-rinse")}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    手动跳转
                  </button>
                </div>
              </motion.div>
            )}
            {phase === "filter-rinse" && (
              <motion.div
                key="filter-rinse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                  <div className="text-2xl font-medium mb-2">滤纸预浸润</div>
                  <div className="text-sm text-white/70 mb-3">
                    {autoTransitioning ? "浸润完成，即将自动跳转..." : "用热水浸润滤纸，去除纸味"}
                  </div>
                  {autoTransitioning ? (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">自动跳转中...</span>
                    </div>
                  ) : scaleWeight < 20 ? (
                    <div className="flex items-center justify-center gap-2 text-cyan-400">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      <span className="text-sm">请开始浸润滤纸...</span>
                    </div>
                  ) : scaleWeight < 45 ? (
                    <div className="flex items-center justify-center gap-2 text-blue-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-sm">正在浸润中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">请倒掉预浸水并拿走萃取壶...</span>
                    </div>
                  )}
                  <button
                    onClick={() => setPhase("ready")}
                    className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    手动跳转
                  </button>
                </div>
              </motion.div>
            )}
            {phase === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                  <div className="text-2xl font-medium mb-2">准备就绪</div>
                  <div className="text-sm text-white/70 mb-3">
                    {autoTransitioning
                      ? "检测完成，即将自动开始萃取..."
                      : scaleWeight < 8
                        ? "请放回萃取壶..."
                        : scaleWeight < 18
                          ? "请加入咖啡粉..."
                          : "即将自动开始萃取..."}
                  </div>
                  {autoTransitioning ? (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">自动跳转中...</span>
                    </div>
                  ) : scaleWeight < 8 ? (
                    <div className="flex items-center justify-center gap-2 text-yellow-400">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-sm">检测萃取壶...</span>
                    </div>
                  ) : scaleWeight < 18 ? (
                    <div className="flex items-center justify-center gap-2 text-blue-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-sm">检测咖啡粉...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">准备完成，即将开始...</span>
                    </div>
                  )}
                  <button
                    onClick={() => setPhase("brewing")}
                    className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    手动跳转
                  </button>
                </div>
              </motion.div>
            )}
            {phase === "brewing" && (
              <motion.div
                key="brewing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
                  <div className="text-2xl font-medium mb-2">正在萃取</div>
                  <div className="text-sm text-white/70 mb-4">保持稳定水流，跟随大师曲线</div>
                  <button
                    onClick={() => navigate("/brew/rating")}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
                  >
                    完成萃取
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "brewing" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4"
              >
                <div className="text-sm font-medium text-white/90 mb-3 text-center">萃取曲线</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...masterCurveData, ...realTimeData].sort((a, b) => a.time - b.time)}
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
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                        dot={{ r: 0 }} 
                        name="实时曲线"
                        data={realTimeData}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#3B82F6" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={{ r: 0 }} 
                        name="预设曲线"
                        data={masterCurveData}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl py-4 text-center mt-4">
                  <div className="text-sm text-white/80">正在同步咖啡称数据...</div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
