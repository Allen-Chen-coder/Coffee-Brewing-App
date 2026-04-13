import { useNavigate } from "react-router";
import { ChevronLeft, MessageCircle, Heart } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "今天尝试了新的手冲技巧",
    content: "使用了分段注水法，萃取效果非常好，口感层次分明...",
    image: "☕",
    likes: 45,
    comments: 12,
    date: "2天前",
  },
  {
    id: 2,
    title: "埃塞俄比亚耶加雪菲品鉴",
    content: "花香浓郁，柑橘调性明显，酸度适中，回甘持久...",
    image: "🌸",
    likes: 78,
    comments: 23,
    date: "5天前",
  },
];

export function MyPostsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">发布的帖子</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8B4513] to-[#A0522D] flex items-center justify-center text-2xl">
                {post.image}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <span className="ml-auto">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
