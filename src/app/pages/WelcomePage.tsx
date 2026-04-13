import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Coffee } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2秒后自动跳转到登录页
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#4E342E] to-[#3E2723] flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 60}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.5rem] mb-8 shadow-2xl">
            <Coffee className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">咖啡智酿</h1>
          <p className="text-amber-200/80 text-lg mb-8">专业手冲咖啡助手</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate("/login")}
          className="mt-12 text-amber-300 text-sm hover:text-amber-200 transition-colors"
        >
          点击进入 →
        </motion.button>
      </div>
    </div>
  );
}
