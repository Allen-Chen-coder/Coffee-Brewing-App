import { useState } from "react";
import { useNavigate } from "react-router";
import { Coffee, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 演示模式：直接跳转到主页
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#4E342E] to-[#3E2723] flex flex-col">
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* 咖啡豆装饰背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        {/* Logo区域 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl mb-4 shadow-2xl">
            <Coffee className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">咖啡智酿</h1>
          <p className="text-amber-200/80 text-sm">专业手冲咖啡助手</p>
        </motion.div>

        {/* 登录表单 */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* 邮箱输入 */}
          <div>
            <label className="block text-amber-100 text-sm mb-2 ml-1">邮箱</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱地址"
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* 密码输入 */}
          <div>
            <label className="block text-amber-100 text-sm mb-2 ml-1">密码</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300/60" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 忘记密码 */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-amber-300 text-sm hover:text-amber-200 transition-colors"
            >
              忘记密码？
            </button>
          </div>

          {/* 登录按钮 */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-shadow"
          >
            登录
          </motion.button>

          {/* 分隔线 */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/40 text-sm">或</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* 第三方登录 */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">W</div>
              <span className="text-sm">微信</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">Q</div>
              <span className="text-sm">QQ</span>
            </button>
          </div>
        </motion.form>

        {/* 注册提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <span className="text-white/60 text-sm">还没有账号？</span>
          <button
            onClick={() => navigate("/register")}
            className="text-amber-300 text-sm font-semibold ml-2 hover:text-amber-200 transition-colors"
          >
            立即注册
          </button>
        </motion.div>

        {/* 快速体验 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => navigate("/home")}
            className="text-white/40 text-xs hover:text-white/60 transition-colors underline"
          >
            跳过登录，快速体验
          </button>
        </motion.div>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
