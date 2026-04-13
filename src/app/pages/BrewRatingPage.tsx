import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Star, Smile, Meh, Frown, Send, Bot } from "lucide-react";

const tastes = [
  { id: "balanced", label: "均衡", icon: Smile },
  { id: "sweet", label: "甜感", icon: Smile },
  { id: "sour", label: "酸感", icon: Meh },
  { id: "bitter", label: "苦感", icon: Frown },
  { id: "fruity", label: "果香", icon: Smile },
  { id: "floral", label: "花香", icon: Smile },
];

// AI知识库 - 关于咖啡冲煮的常见问题
const brewingKnowledge: Record<string, string> = {
  "滤纸浸润": "滤纸预浸润是指在正式萃取前，用热水冲洗滤纸。这样做有三个好处：1) 去除滤纸的纸浆味，避免影响咖啡风味；2) 预热萃取器具，保持萃取温度稳定；3) 让滤纸与滤杯更好地贴合，提高萃取效率。",
  "水温": "手冲咖啡的最佳水温一般在88-94℃之间。浅烘焙豆建议使用较高温度（92-94℃）以充分萃取风味，深烘焙豆建议使用较低温度（88-90℃）避免过度萃取产生苦味。",
  "粉水比": "粉水比是指咖啡粉与水的重量比例。常见的粉水比为1:15到1:17，即15g咖啡粉对应225-255g水。粉水比越小（如1:15）咖啡浓度越高，粉水比越大（如1:17）咖啡浓度越低。可根据个人口味调整。",
  "萃取时间": "手冲咖啡的理想萃取时间一般在2-3分钟。时间过短可能萃取不足，咖啡偏酸；时间过长可能过度萃取，咖啡偏苦。通过调整研磨度和注水速度可以控制萃取时间。",
  "研磨度": "研磨度直接影响萃取速度和风味。研磨过细会导致萃取过度，咖啡偏苦；研磨过粗会导致萃取不足，咖啡偏酸。手冲咖啡一般使用中细研磨，类似细砂糖的颗粒度。",
  "注水": "注水技巧对萃取均匀度影响很大。建议采用中心绕圈注水，保持稳定的水流速度。先进行闷蒸（注入2倍咖啡粉重量的水，等待30秒），然后分段注水，避免水流直接冲击滤纸边缘。",
  "大师曲线": "大师曲线是专业咖啡师总结的最佳萃取曲线，记录了不同时间点应达到的累计萃取水量。跟随大师曲线注水可以实现理想的萃取节奏，获得均衡的风味表现。",
  "默认": "您好！我是咖啡冲煮助手。您可以问我关于咖啡冲煮的任何问题，比如：为什么要预浸润滤纸？水温应该是多少？什么是粉水比？我会为您详细解答。",
};

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function BrewRatingPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);

  // AI答疑相关状态
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "您好！我是咖啡冲煮助手。您可以问我关于咖啡冲煮的任何问题，比如：为什么要预浸润滤纸？水温应该是多少？什么是粉水比？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSave = () => {
    navigate("/home");
  };

  const getAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // 关键词匹配
    if (lowerMessage.includes("滤纸") || lowerMessage.includes("浸润") || lowerMessage.includes("预浸")) {
      return brewingKnowledge["滤纸浸润"];
    } else if (lowerMessage.includes("水温") || lowerMessage.includes("温度")) {
      return brewingKnowledge["水温"];
    } else if (lowerMessage.includes("粉水比") || lowerMessage.includes("比例")) {
      return brewingKnowledge["粉水比"];
    } else if (lowerMessage.includes("时间") || lowerMessage.includes("多久")) {
      return brewingKnowledge["萃取时间"];
    } else if (lowerMessage.includes("研磨") || lowerMessage.includes("磨粉")) {
      return brewingKnowledge["研磨度"];
    } else if (lowerMessage.includes("注水") || lowerMessage.includes("怎么冲")) {
      return brewingKnowledge["注水"];
    } else if (lowerMessage.includes("大师曲线") || lowerMessage.includes("曲线")) {
      return brewingKnowledge["大师曲线"];
    }

    return "感谢您的提问！这是一个很好的问题。关于" + userMessage + "，建议您尝试调整水温、研磨度和注水速度来优化冲煮效果。您也可以询问更具体的问题，比如'水温应该是多少'或'为什么要预浸润滤纸'。";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiTyping(true);

    // 模拟AI思考时间
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAiResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-semibold text-center">冲煮完成</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white rounded-3xl p-8 mb-8 text-center">
          <div className="text-5xl mb-2">✓</div>
          <div className="text-2xl font-bold mb-2">冲煮成功</div>
          <div className="text-white/80">埃塞俄比亚 · 手冲咖啡</div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">给这次冲煮打分</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            {rating === 0 && "轻点星星评分"}
            {rating === 1 && "需要改进"}
            {rating === 2 && "一般"}
            {rating === 3 && "不错"}
            {rating === 4 && "很好"}
            {rating === 5 && "完美"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">口感描述</h2>
          <div className="grid grid-cols-3 gap-3">
            {tastes.map((taste) => {
              const Icon = taste.icon;
              const isSelected = selectedTastes.includes(taste.id);
              return (
                <button
                  key={taste.id}
                  onClick={() =>
                    setSelectedTastes((prev) =>
                      prev.includes(taste.id)
                        ? prev.filter((id) => id !== taste.id)
                        : [...prev, taste.id]
                    )
                  }
                  className={`p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#8B4513] bg-[#8B4513]/5"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mx-auto mb-1 ${
                      isSelected ? "text-[#8B4513]" : "text-gray-400"
                    }`}
                  />
                  <div className={`text-sm ${isSelected ? "text-[#8B4513] font-medium" : "text-gray-600"}`}>
                    {taste.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI答疑模块 */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-[#8B4513]" />
            <h2 className="font-semibold text-gray-900">AI 冲煮答疑</h2>
          </div>

          {/* 消息列表 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-[#8B4513] text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 输入框 */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="问我关于冲煮的问题..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isAiTyping}
              className="p-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={rating === 0}
          className="w-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl py-4 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          保存记录
        </button>
      </div>
    </div>
  );
}
