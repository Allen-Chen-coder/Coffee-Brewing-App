import { useNavigate } from "react-router";
import { ArrowLeft, Award, Flame, Users, FileText } from "lucide-react";

const badges = [
  {
    id: "brewing-master",
    name: "冲煮大师",
    description: "冲煮成功率达90%以上",
    icon: "🏆",
    gradient: "from-yellow-400 to-orange-500",
    condition: "冲煮成功率 ≥ 90%",
    progress: 92,
    unlocked: true,
  },
  {
    id: "plan-expert",
    name: "方案达人",
    description: "发布的手冲方案被10人以上使用",
    icon: "📝",
    gradient: "from-blue-500 to-purple-500",
    condition: "方案使用人数 ≥ 10人",
    progress: 7,
    unlocked: false,
  },
  {
    id: "social-expert",
    name: "社交达人",
    description: "发布10篇及以上帖子",
    icon: "🌟",
    gradient: "from-green-500 to-teal-500",
    condition: "发布帖子数 ≥ 10篇",
    progress: 12,
    unlocked: true,
  },
];

export function MyBadgesPage() {
  const navigate = useNavigate();

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">我的徽章</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl">
              {unlockedBadges.length > 0 ? (
                <div className="flex items-center justify-center gap-1">
                  {unlockedBadges.map((badge) => (
                    <span key={badge.id} className="text-3xl">{badge.icon}</span>
                  ))}
                </div>
              ) : (
                "🏅"
              )}
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{unlockedBadges.length}/{badges.length}</div>
              <div className="text-sm text-gray-500">已获得徽章</div>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] h-2 rounded-full transition-all"
              style={{ width: `${(unlockedBadges.length / badges.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#8B4513]" />
            已获得的徽章
          </h2>
          {unlockedBadges.length > 0 ? (
            <div className="space-y-4">
              {unlockedBadges.map((badge) => (
                <div key={badge.id} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{badge.name}</h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-full">已获得</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Flame className="w-4 h-4" />
                        <span>{badge.condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500">还没有获得任何徽章</p>
              <p className="text-sm text-gray-400 mt-1">继续努力，解锁你的第一个徽章吧！</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-gray-400" />
            未解锁的徽章
          </h2>
          {lockedBadges.length > 0 ? (
            <div className="space-y-4">
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="bg-white rounded-2xl p-5 shadow-sm opacity-75">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center text-3xl relative`}>
                      {badge.icon}
                      <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">🔒</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{badge.name}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">未解锁</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{badge.description}</p>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {badge.condition}
                          </span>
                          <span>{badge.progress}/10</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${badge.gradient} h-2 rounded-full transition-all`}
                            style={{ width: `${badge.progress * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] rounded-2xl p-6 text-white text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="font-semibold">太棒了！</p>
              <p className="text-sm text-white/80">你已经解锁了所有徽章！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
