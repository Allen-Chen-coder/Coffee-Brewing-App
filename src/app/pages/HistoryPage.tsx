import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Trash2, CheckSquare, Square, Filter } from "lucide-react";

const mockHistoryBrews = [
  { id: 1, type: "手冲咖啡", bean: "埃塞俄比亚", ratio: "1:15", time: "2:30", date: "今天 09:23", rating: 4.5 },
  { id: 2, type: "意式浓缩", bean: "哥伦比亚", ratio: "1:2", time: "0:28", date: "昨天 14:15", rating: 4.0 },
  { id: 3, type: "手冲咖啡", bean: "肯尼亚", ratio: "1:16", time: "2:45", date: "04-07 10:30", rating: 4.8 },
  { id: 4, type: "法压壶", bean: "巴西", ratio: "1:12", time: "4:00", date: "04-06 16:45", rating: 4.2 },
  { id: 5, type: "意式浓缩", bean: "意式拼配", ratio: "1:2.5", time: "0:30", date: "04-05 08:30", rating: 4.3 },
  { id: 6, type: "手冲咖啡", bean: "苏门答腊", ratio: "1:15", time: "2:20", date: "04-04 11:15", rating: 4.6 },
];

export function HistoryPage() {
  const navigate = useNavigate();
  const [brews, setBrews] = useState(mockHistoryBrews);
  const [selectedBrews, setSelectedBrews] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const handleToggleSelect = (id: number) => {
    setSelectedBrews(prev => {
      if (prev.includes(id)) {
        return prev.filter(brewId => brewId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setBrews(prev => prev.filter(brew => !selectedBrews.includes(brew.id)));
    setSelectedBrews([]);
    setIsSelectMode(false);
  };

  const handleDeleteSingle = (id: number) => {
    setBrews(prev => prev.filter(brew => brew.id !== id));
  };

  const handleSelectAll = () => {
    if (selectedBrews.length === brews.length) {
      setSelectedBrews([]);
    } else {
      setSelectedBrews(brews.map(brew => brew.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">冲煮历史记录</h1>
        {isSelectMode && (
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500">已选择 {selectedBrews.length} 项</span>
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              删除
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {isSelectMode ? (
              <button
                onClick={handleSelectAll}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {selectedBrews.length === brews.length ? (
                  <CheckSquare className="w-5 h-5 text-[#8B4513]" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
            ) : (
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Filter className="w-5 h-5" />
              </button>
            )}
            <span className="text-sm text-gray-500">共 {brews.length} 条记录</span>
          </div>
          <button
            onClick={() => setIsSelectMode(!isSelectMode)}
            className="text-sm text-[#8B4513] hover:underline"
          >
            {isSelectMode ? "取消" : "批量管理"}
          </button>
        </div>

        {brews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无冲煮记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {brews.map((brew) => (
              <div
                key={brew.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  {isSelectMode ? (
                    <button
                      onClick={() => handleToggleSelect(brew.id)}
                      className="mr-3 mt-1 flex-shrink-0"
                    >
                      {selectedBrews.includes(brew.id) ? (
                        <CheckSquare className="w-5 h-5 text-[#8B4513]" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  ) : (
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{brew.type}</div>
                      <div className="text-sm text-gray-500">{brew.bean}</div>
                    </div>
                  )}
                  {!isSelectMode && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{brew.rating}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteSingle(brew.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>粉水比 {brew.ratio}</span>
                  <span>时长 {brew.time}</span>
                  <span className="ml-auto text-xs text-gray-400">{brew.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
