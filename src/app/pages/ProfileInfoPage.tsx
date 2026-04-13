import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

export function ProfileInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">个人信息</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b">
            <div className="text-sm text-gray-500 mb-1">昵称</div>
            <div className="text-gray-900">咖啡爱好者</div>
          </div>
          <div className="px-5 py-4 border-b">
            <div className="text-sm text-gray-500 mb-1">用户ID</div>
            <div className="text-gray-900">CF2024001</div>
          </div>
          <div className="px-5 py-4 border-b">
            <div className="text-sm text-gray-500 mb-1">注册时间</div>
            <div className="text-gray-900">2024-01-15</div>
          </div>
          <div className="px-5 py-4">
            <div className="text-sm text-gray-500 mb-1">邮箱</div>
            <div className="text-gray-900">coffee@example.com</div>
          </div>
        </div>

        <button className="w-full bg-[#8B4513] text-white rounded-2xl py-4 font-medium hover:bg-[#A0522D] transition-colors">
          编辑资料
        </button>
      </div>
    </div>
  );
}
