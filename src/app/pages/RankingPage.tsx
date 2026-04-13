import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, Users, Coffee, Zap, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type RankingItem = {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  isCurrentUser: boolean;
};

type RankingType = "success" | "plan" | "times";

const generateRankingData = (type: RankingType): RankingItem[] => {
  const data: RankingItem[] = [];
  const names = [
    "咖啡研究者", "意式达人", "手冲爱好者", "咖啡师", "咖啡狂热者",
    "萃取专家", "方案大师", "手冲匠人", "咖啡爱好者", "咖啡迷",
    "咖啡控", "咖啡粉", "咖啡师助手", "咖啡学徒", "咖啡达人"
  ];
  
  for (let i = 1; i <= 900; i++) {
    data.push({
      rank: i,
      name: i <= 15 ? names[i - 1] : `咖啡爱好者${i}`,
      avatar: i <= 15 ? ["☕", "🎯", "🌿", "🔥", "⚡", "📝", "📋", "📄", "🌟", "💎", "⭐", "✨", "💫", "🌟", "⭐"][i % 15] : "☕",
      score: type === "success" ? Math.max(50, 99 - Math.floor(i / 5)) :
             type === "plan" ? Math.max(10, 250 - Math.floor(i / 3)) :
             Math.max(100, 1200 - Math.floor(i / 2)),
      isCurrentUser: i === 900
    });
  }
  
  return data;
};

const successRanking = generateRankingData("success");
const planRanking = generateRankingData("plan");
const timesRanking = generateRankingData("times");

const getTop100 = (data: RankingItem[]) => data.slice(0, 100);
const getCurrentUser = (data: RankingItem[]) => data.find(item => item.isCurrentUser);

// 生成排名历史数据
const generateRankHistory = (type: RankingType): { week: string; rank: number }[] => {
  const history = [];
  let currentRank = 950;
  
  for (let i = 1; i <= 12; i++) {
    // 根据不同排行榜类型生成不同的排名变化
    let change;
    switch (type) {
      case "success":
        change = Math.floor(Math.random() * 15) - 2; // -2 到 13 的随机变化，上升趋势较明显
        break;
      case "plan":
        change = Math.floor(Math.random() * 25) - 5; // -5 到 20 的随机变化，波动较大
        break;
      case "times":
        change = Math.floor(Math.random() * 10) - 1; // -1 到 9 的随机变化，稳步上升
        break;
    }
    currentRank = Math.max(800, currentRank - change);
    history.push({
      week: `第${i}周`,
      rank: currentRank
    });
  }
  
  return history;
};

const successRankHistory = generateRankHistory("success");
const planRankHistory = generateRankHistory("plan");
const timesRankHistory = generateRankHistory("times");

export function RankingPage() {
  const navigate = useNavigate();
  const [activeRanking, setActiveRanking] = React.useState<RankingType>("success");
  const [showRankHistory, setShowRankHistory] = React.useState(false);

  const currentData = activeRanking === "success" ? successRanking :
                     activeRanking === "plan" ? planRanking :
                     timesRanking;
  
  const currentRankHistory = activeRanking === "success" ? successRankHistory :
                            activeRanking === "plan" ? planRankHistory :
                            timesRankHistory;
  
  const top100Data = getTop100(currentData);
  const currentUser = getCurrentUser(currentData);
  
  const getRankingTitle = () => {
    switch (activeRanking) {
      case "success": return "冲煮成功率排行榜";
      case "plan": return "方案使用排行榜";
      case "times": return "冲煮次数排行榜";
    }
  };
  
  const getScoreLabel = () => {
    switch (activeRanking) {
      case "success": return "成功率";
      case "plan": return "方案使用";
      case "times": return "冲煮次数";
    }
  };
  
  const getScoreUnit = () => {
    switch (activeRanking) {
      case "success": return "%";
      case "plan": return "次";
      case "times": return "次";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">{getRankingTitle()}</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
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

        {currentUser && (
          <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                {currentUser.avatar}
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">你的排名</div>
                <div className="text-3xl font-bold mb-1">#{currentUser.rank}</div>
                <div className="text-white/80 text-sm">{getScoreLabel()}: {currentUser.score}{getScoreUnit()}</div>
              </div>
              <div className="ml-auto">
                <button 
                  onClick={() => setShowRankHistory(!showRankHistory)}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {showRankHistory ? <ChevronUp className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                </button>
              </div>
            </div>
            
            {showRankHistory && (
              <div className="mt-6 pt-4 border-t border-white/20">
                <h3 className="font-semibold text-sm mb-3">排名升降曲线</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentRankHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="week" 
                        stroke="rgba(255,255,255,0.7)" 
                        tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.7)' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.7)" 
                        tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.7)' }}
                        domain={['dataMax + 50', 'dataMin - 50']}
                        reversed
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(139, 69, 19, 0.9)', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rank" 
                        stroke="#FFFFFF" 
                        strokeWidth={2} 
                        dot={{ fill: '#FFFFFF', r: 4 }} 
                        activeDot={{ r: 6, fill: '#FFFFFF' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#8B4513]" />
            前100名排行榜
          </h2>
          
          {currentUser && currentUser.rank > 100 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-700">只有前100名ID会展示，你的排名是 <span className="font-semibold text-[#8B4513]">#{currentUser.rank}</span>，继续努力冲进前100名吧！</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {top100Data.map((item) => (
              <div 
                key={item.rank} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  item.isCurrentUser ? 'bg-[#8B4513]/10 border border-[#8B4513]/20' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  item.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                  item.rank === 2 ? 'bg-gray-100 text-gray-600' :
                  item.rank === 3 ? 'bg-orange-100 text-orange-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {item.rank}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  item.isCurrentUser 
                    ? 'bg-gradient-to-br from-[#8B4513] to-[#A0522D]' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-600'
                }`}>
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    item.isCurrentUser ? 'text-[#8B4513] font-bold' : 'text-gray-900'
                  }`}>{item.name}</div>
                  <div className="text-xs text-gray-500">{getScoreLabel()}: {item.score}{getScoreUnit()}</div>
                </div>
                {item.isCurrentUser && (
                  <span className="px-2 py-1 bg-[#8B4513] text-white text-xs font-medium rounded-full">
                    你
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>数据更新时间: 2026-04-13</p>
          <p className="mt-1">每周一00:00更新排行榜</p>
        </div>
      </div>
    </div>
  );
}
