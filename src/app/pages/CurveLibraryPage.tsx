import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Download, Send, Star, TrendingUp } from "lucide-react";

const curves = [
  {
    id: 1,
    name: "大师经典手冲",
    author: "咖啡大师",
    type: "手冲咖啡",
    rating: 4.8,
    downloads: 1234,
    description: "适合中浅烘焙豆，突出花香果酸",
  },
  {
    id: 2,
    name: "浓郁意式萃取",
    author: "意式专家",
    type: "意式浓缩",
    rating: 4.6,
    downloads: 892,
    description: "适合深烘豆，强调醇厚口感",
  },
  {
    id: 3,
    name: "温柔冷萃方案",
    author: "冷萃达人",
    type: "冷萃咖啡",
    rating: 4.7,
    downloads: 567,
    description: "低温长时间萃取，口感顺滑",
  },
  {
    id: 4,
    name: "快速手冲曲线",
    author: "效率大师",
    type: "手冲咖啡",
    rating: 4.5,
    downloads: 423,
    description: "适合忙碌早晨，保持风味",
  },
];

export function CurveLibraryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"online" | "local">("online");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold">曲线库</h1>
        </div>

        <div className="flex items-center border-t">
          <button
            onClick={() => setActiveTab("online")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "online" ? "text-[#8B4513]" : "text-gray-500"
            }`}
          >
            线上曲线
            {activeTab === "online" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("local")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "local" ? "text-[#8B4513]" : "text-gray-500"
            }`}
          >
            本地曲线
            {activeTab === "local" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]" />
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "online" && (
          <>
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6" />
                <h2 className="font-bold text-lg">热门推荐</h2>
              </div>
              <p className="text-white/90 text-sm">
                精选专业咖啡师调试的萃取曲线，一键下载使用
              </p>
            </div>

            <div className="space-y-4">
              {curves.map((curve) => (
                <div
                  key={curve.id}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {curve.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {curve.author} · {curve.type}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {curve.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{curve.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{curve.downloads}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 border border-[#8B4513] text-[#8B4513] rounded-lg text-sm font-medium hover:bg-[#8B4513]/5 transition-colors">
                        <Download className="w-4 h-4 inline mr-1" />
                        下载
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow">
                        <Send className="w-4 h-4 inline mr-1" />
                        同步
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "local" && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">暂无本地曲线</h3>
            <p className="text-gray-500 text-sm mb-6">
              从线上曲线库下载或创建自己的曲线
            </p>
            <button
              onClick={() => setActiveTab("online")}
              className="px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl font-medium shadow-lg"
            >
              浏览线上曲线
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
