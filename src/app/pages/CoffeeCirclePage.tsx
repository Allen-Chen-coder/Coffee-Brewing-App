import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, MessageCircle, Share2, Plus, TrendingUp, Users } from "lucide-react";

const posts = [
  {
    id: 1,
    author: "咖啡爱好者",
    avatar: "☕",
    time: "2小时前",
    content: "今天用新豆子试了手冲，花香味特别明显，推荐给大家！",
    image: true,
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: "意式达人",
    avatar: "🎯",
    time: "5小时前",
    content: "分享一下我的拉花心得，关键是要控制好奶泡的细腻度",
    image: true,
    likes: 128,
    comments: 23,
  },
  {
    id: 3,
    author: "咖啡研究员",
    avatar: "🔬",
    time: "1天前",
    content: "深度解析：不同产区咖啡豆的风味特征对比",
    image: false,
    likes: 89,
    comments: 15,
  },
];

const circles = [
  { id: 1, name: "手冲咖啡", members: "12.3k", icon: "☕" },
  { id: 2, name: "意式咖啡", members: "8.7k", icon: "🎯" },
  { id: 3, name: "咖啡器具", members: "6.2k", icon: "🔧" },
  { id: 4, name: "冲煮方案分享", members: "5.8k", icon: "📝" },
];

export function CoffeCirclePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"following" | "circles" | "competition">("circles");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postType, setPostType] = useState<"text" | "image" | "brewingPlan" | null>(null);
  const [activeRanking, setActiveRanking] = useState<"success" | "plan" | "times">("success");

  const handlePostTypeSelect = (type: "text" | "image" | "brewingPlan") => {
    setPostType(type);
    switch (type) {
      case "text":
        alert("文字发布功能开发中");
        break;
      case "image":
        alert("图片发布功能开发中");
        break;
      case "brewingPlan":
        alert("冲煮方案发布功能开发中");
        break;
    }
    setShowPostModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">咖圈</h1>
        </div>
        <div className="flex items-center border-t">
          <button
            onClick={() => setActiveTab("circles")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "circles" ? "text-[#8B4513]" : "text-gray-500"
            }`}
          >
            热门圈子
            {activeTab === "circles" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("competition")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "competition" ? "text-[#8B4513]" : "text-gray-500"
            }`}
          >
            咖啡比赛
            {activeTab === "competition" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "following" ? "text-[#8B4513]" : "text-gray-500"
            }`}
          >
            关注
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B4513]" />
            )}
          </button>
        </div>
      </div>

      <div className="pb-6">
        {activeTab === "circles" && (
          <div className="p-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">咖啡比赛 & 排行</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">本月冲煮成功率排行</div>
                  <button className="text-[#8B4513] text-sm font-medium">查看 →</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">线上手冲比赛报名</div>
                  <button className="text-[#8B4513] text-sm font-medium">参加 →</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {circles.map((circle) => (
                <div
                  key={circle.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-3">{circle.icon}</div>
                  <div className="font-semibold text-gray-900 mb-1">{circle.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {circle.members} 成员
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h3 className="font-semibold text-lg">咖啡豆推荐</h3>
              </div>
              <p className="text-white/90 text-sm mb-3">发现更多精选咖啡豆及专属萃取方案</p>
              <button onClick={() => navigate("/coffee-recommendation")} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                查看推荐
              </button>
            </div>
          </div>
        )}

        {activeTab === "competition" && (
          <div className="p-6">
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h3 className="font-semibold text-lg">本月冲煮成功率排行</h3>
              </div>
              <p className="text-white/90 text-sm mb-3">查看你在社群中的排名，与其他咖啡爱好者一较高下</p>
              <button onClick={() => navigate("/ranking")} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                查看排行
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">🏆 咖啡比赛</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    世
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">WBrC 世界咖啡冲煮大赛</div>
                    <div className="text-sm text-gray-500">世界级 · 中国区选拔赛</div>
                  </div>
                  <a 
                    href="https://www.sca.coffee/events/world-brewers-cup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8B4513] text-white text-sm font-medium rounded-lg hover:bg-[#A0522D] transition-colors"
                  >
                    立即报名
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    全
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">CBC 中国咖啡冲煮大赛</div>
                    <div className="text-sm text-gray-500">全国级 · 年度总决赛</div>
                  </div>
                  <a 
                    href="https://www.cbccoffee.cn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8B4513] text-white text-sm font-medium rounded-lg hover:bg-[#A0522D] transition-colors"
                  >
                    立即报名
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    全
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">PCA 专业咖啡拉花大赛</div>
                    <div className="text-sm text-gray-500">全国级 · 城市分赛</div>
                  </div>
                  <a 
                    href="https://www.pcacoffee.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8B4513] text-white text-sm font-medium rounded-lg hover:bg-[#A0522D] transition-colors"
                  >
                    立即报名
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    世
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">World Latte Art Championship 世界拉花大赛</div>
                    <div className="text-sm text-gray-500">世界级 · 亚太区选拔赛</div>
                  </div>
                  <a 
                    href="https://www.sca.coffee/events/world-latte-art" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8B4513] text-white text-sm font-medium rounded-lg hover:bg-[#A0522D] transition-colors"
                  >
                    立即报名
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8B4513]">
                    <path d="M3 3h18v18H3z"/>
                    <path d="M8 8h8v8H8z"/>
                  </svg>
                  社群排行榜
                </h3>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setActiveRanking("success")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeRanking === "success"
                      ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  冲煮成功
                </button>
                <button
                  onClick={() => setActiveRanking("plan")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeRanking === "plan"
                      ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  方案使用
                </button>
                <button
                  onClick={() => setActiveRanking("times")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeRanking === "times"
                      ? "bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  冲煮次数
                </button>
              </div>

              {activeRanking === "success" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">1</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white">☕</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">咖啡研究者</div>
                      <div className="text-xs text-gray-500">成功率 98.5%</div>
                    </div>
                    <span className="text-lg">🏆</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white">🎯</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">意式达人</div>
                      <div className="text-xs text-gray-500">成功率 95.2%</div>
                    </div>
                    <span className="text-lg">🥈</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">3</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-white">🌿</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">手冲爱好者</div>
                      <div className="text-xs text-gray-500">成功率 92.8%</div>
                    </div>
                    <span className="text-lg">🥉</span>
                  </div>
                </div>
              )}

              {activeRanking === "plan" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">1</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">📝</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">方案大师</div>
                      <div className="text-xs text-gray-500">方案使用 256次</div>
                    </div>
                    <span className="text-lg">🏆</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">📋</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">萃取专家</div>
                      <div className="text-xs text-gray-500">方案使用 189次</div>
                    </div>
                    <span className="text-lg">🥈</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">3</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">📄</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">手冲匠人</div>
                      <div className="text-xs text-gray-500">方案使用 156次</div>
                    </div>
                    <span className="text-lg">🥉</span>
                  </div>
                </div>
              )}

              {activeRanking === "times" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">1</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white">🔥</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">咖啡狂热者</div>
                      <div className="text-xs text-gray-500">冲煮次数 1256次</div>
                    </div>
                    <span className="text-lg">🏆</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold">2</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white">⚡</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">咖啡师</div>
                      <div className="text-xs text-gray-500">冲煮次数 987次</div>
                    </div>
                    <span className="text-lg">🥈</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">3</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white">🌟</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">咖啡爱好者</div>
                      <div className="text-xs text-gray-500">冲煮次数 654次</div>
                    </div>
                    <span className="text-lg">🥉</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "following" && (
          <div className="space-y-4 p-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{post.author}</div>
                    <div className="text-xs text-gray-500">{post.time}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{post.content}</p>

                {post.image && (
                  <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl h-48 mb-3 flex items-center justify-center">
                    <div className="text-6xl">☕</div>
                  </div>
                )}

                <div className="flex items-center gap-6 pt-3 border-t">
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#8B4513] transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#8B4513] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#8B4513] transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowPostModal(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">选择发布类型</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handlePostTypeSelect("text")}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <span className="text-sm font-medium text-gray-700">文字</span>
              </button>
              <button
                onClick={() => handlePostTypeSelect("image")}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <span className="text-sm font-medium text-gray-700">图片</span>
              </button>
              <button
                onClick={() => handlePostTypeSelect("brewingPlan")}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#8B4513] to-[#A0522D] rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">☕</span>
                </div>
                <span className="text-sm font-medium text-gray-700">冲煮方案</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
