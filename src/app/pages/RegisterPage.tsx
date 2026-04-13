import { useState } from "react";
import { useNavigate } from "react-router";
import { Coffee, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("两次输入的密码不一致");
      return;
    }

    if (!agreed) {
      alert("请阅读并同意服务条款和隐私政策");
      return;
    }

    // 演示模式：直接跳转到主页
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#4E342E] to-[#3E2723] flex flex-col">
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* 咖啡豆装饰背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      <div className="flex-1 flex flex-col px-8 py-8 relative z-10 overflow-y-auto">
        {/* 返回按钮 */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate("/login")}
          className="self-start flex items-center gap-2 text-amber-200 mb-6 hover:text-amber-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">返回登录</span>
        </motion.button>

        {/* Logo区域 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl mb-3 shadow-2xl">
            <Coffee className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">创建账号</h1>
          <p className="text-amber-200/80 text-sm">开启你的专业咖啡之旅</p>
        </motion.div>

        {/* 注册表单 */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleRegister}
          className="space-y-4"
        >
          {/* 用户名输入 */}
          <div>
            <label className="block text-amber-100 text-sm mb-2 ml-1">用户名</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300/60" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

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
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
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
                placeholder="请输入密码（至少6位）"
                minLength={6}
                className="w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
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

          {/* 确认密码输入 */}
          <div>
            <label className="block text-amber-100 text-sm mb-2 ml-1">确认密码</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-300/60" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                minLength={6}
                className="w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-300/60 hover:text-amber-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 同意条款 */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-amber-500 focus:ring-amber-400"
            />
            <label htmlFor="agree" className="text-white/70 text-xs leading-relaxed">
              我已阅读并同意
              <button type="button" className="text-amber-300 hover:text-amber-200 mx-1">
                《服务条款》
              </button>
              和
              <button type="button" className="text-amber-300 hover:text-amber-200 ml-1">
                《隐私政策》
              </button>
            </label>
          </div>

          {/* 注册按钮 */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-shadow mt-6"
          >
            立即注册
          </motion.button>
        </motion.form>

        {/* 已有账号 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 mb-4"
        >
          <span className="text-white/60 text-sm">已有账号？</span>
          <button
            onClick={() => navigate("/login")}
            className="text-amber-300 text-sm font-semibold ml-2 hover:text-amber-200 transition-colors"
          >
            立即登录
          </button>
        </motion.div>
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
