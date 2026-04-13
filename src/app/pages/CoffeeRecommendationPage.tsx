import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Coffee, Star, Heart, Filter, Sliders, ChevronRight, Check, Zap } from "lucide-react";

type CoffeeBean = {
  id: number;
  name: string;
  origin: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  brewingProfile?: {
    waterAmount: number;
    temperature: number;
    grindSize: string;
    brewTime: string;
    pourStages: { amount: number; time: number }[];
  };
};

// 手冲咖啡豆推荐
const pourOverBeans: CoffeeBean[] = [
  {
    id: 1,
    name: "埃塞俄比亚耶加雪菲",
    origin: "埃塞俄比亚",
    price: 89,
    rating: 4.8,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ethiopian%20Yirgacheffe%20coffee%20beans%20in%20a%20sack%2C%20premium%20quality%2C%20light%20roast%2C%20professional%20photography&image_size=landscape_4_3",
    description: "花香四溢，带有柑橘和茉莉的清新风味，酸度明亮，回甘悠长。",
    tags: ["花香", "柑橘", "明亮"],
    brewingProfile: {
      waterAmount: 250,
      temperature: 92,
      grindSize: "中细",
      brewTime: "2:30",
      pourStages: [
        { amount: 40, time: 0 },
        { amount: 80, time: 30 },
        { amount: 80, time: 60 },
        { amount: 50, time: 90 }
      ]
    }
  },
  {
    id: 2,
    name: "哥伦比亚苏普雷莫",
    origin: "哥伦比亚",
    price: 79,
    rating: 4.6,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Colombian%20Supremo%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20rich%20flavor%2C%20professional%20photography&image_size=landscape_4_3",
    description: "平衡的酸甜，带有焦糖和坚果的风味，口感顺滑。",
    tags: ["平衡", "焦糖", "坚果"],
    brewingProfile: {
      waterAmount: 240,
      temperature: 90,
      grindSize: "中等",
      brewTime: "2:15",
      pourStages: [
        { amount: 50, time: 0 },
        { amount: 100, time: 30 },
        { amount: 90, time: 60 }
      ]
    }
  },
  {
    id: 3,
    name: "肯尼亚AA",
    origin: "肯尼亚",
    price: 99,
    rating: 4.7,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kenyan%20AA%20coffee%20beans%20in%20a%20sack%2C%20bright%20acidity%2C%20blackcurrant%20flavor%2C%20professional%20photography&image_size=landscape_4_3",
    description: "明亮的酸度，带有黑醋栗和柠檬的风味，层次丰富。",
    tags: ["明亮", "黑醋栗", "层次丰富"],
    brewingProfile: {
      waterAmount: 260,
      temperature: 94,
      grindSize: "中细",
      brewTime: "2:45",
      pourStages: [
        { amount: 40, time: 0 },
        { amount: 70, time: 35 },
        { amount: 80, time: 70 },
        { amount: 70, time: 105 }
      ]
    }
  }
];

// 意式咖啡豆推荐
const espressoBeans: CoffeeBean[] = [
  {
    id: 4,
    name: "意大利浓缩拼配",
    origin: "意大利",
    price: 69,
    rating: 4.5,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Italian%20espresso%20blend%20coffee%20beans%20in%20a%20sack%2C%20dark%20roast%2C%20creamy%2C%20professional%20photography&image_size=landscape_4_3",
    description: "浓郁的巧克力和焦糖风味，油脂丰富，口感醇厚。",
    tags: ["巧克力", "焦糖", "醇厚"],
    brewingProfile: {
      waterAmount: 36,
      temperature: 93,
      grindSize: "细",
      brewTime: "0:28",
      pourStages: [
        { amount: 36, time: 0 }
      ]
    }
  },
  {
    id: 5,
    name: "巴西桑托斯",
    origin: "巴西",
    price: 75,
    rating: 4.4,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Brazilian%20Santos%20coffee%20beans%20in%20a%20sack%2C%20medium%20dark%20roast%2C%20nutty%2C%20professional%20photography&image_size=landscape_4_3",
    description: "坚果和巧克力的风味，低酸度，口感顺滑。",
    tags: ["坚果", "巧克力", "低酸度"],
    brewingProfile: {
      waterAmount: 38,
      temperature: 92,
      grindSize: "细",
      brewTime: "0:30",
      pourStages: [
        { amount: 38, time: 0 }
      ]
    }
  },
  {
    id: 6,
    name: "危地马拉安提瓜",
    origin: "危地马拉",
    price: 85,
    rating: 4.6,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guatemalan%20Antigua%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20fruity%2C%20professional%20photography&image_size=landscape_4_3",
    description: "带有水果和香料的风味，平衡的酸度，回甘明显。",
    tags: ["水果", "香料", "平衡"],
    brewingProfile: {
      waterAmount: 40,
      temperature: 91,
      grindSize: "细",
      brewTime: "0:32",
      pourStages: [
        { amount: 40, time: 0 }
      ]
    }
  }
];

// 专业级口感咖啡豆推荐
const professionalBeans: CoffeeBean[] = [
  {
    id: 7,
    name: "巴拿马瑰夏",
    origin: "巴拿马",
    price: 199,
    rating: 4.9,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panamanian%20Geisha%20coffee%20beans%20in%20a%20premium%20sack%2C%20light%20roast%2C%20floral%2C%20professional%20photography&image_size=landscape_4_3",
    description: "顶级瑰夏，花香浓郁，带有热带水果和蜂蜜的风味，酸度明亮。",
    tags: ["顶级", "花香", "热带水果"],
    brewingProfile: {
      waterAmount: 280,
      temperature: 95,
      grindSize: "中细",
      brewTime: "3:00",
      pourStages: [
        { amount: 50, time: 0 },
        { amount: 60, time: 40 },
        { amount: 70, time: 80 },
        { amount: 50, time: 120 },
        { amount: 50, time: 150 }
      ]
    }
  },
  {
    id: 8,
    name: "牙买加蓝山",
    origin: "牙买加",
    price: 169,
    rating: 4.8,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jamaican%20Blue%20Mountain%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20premium%20quality%2C%20professional%20photography&image_size=landscape_4_3",
    description: "世界顶级咖啡豆，平衡的酸甜，带有坚果和巧克力的风味。",
    tags: ["顶级", "平衡", "坚果"],
    brewingProfile: {
      waterAmount: 250,
      temperature: 90,
      grindSize: "中等",
      brewTime: "2:20",
      pourStages: [
        { amount: 45, time: 0 },
        { amount: 80, time: 30 },
        { amount: 80, time: 70 },
        { amount: 45, time: 100 }
      ]
    }
  },
  {
    id: 9,
    name: "埃塞俄比亚花神",
    origin: "埃塞俄比亚",
    price: 149,
    rating: 4.7,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ethiopian%20Kochere%20coffee%20beans%20in%20a%20sack%2C%20light%20roast%2C%20floral%20aroma%2C%20professional%20photography&image_size=landscape_4_3",
    description: "花香浓郁，带有柑橘和蜂蜜的风味，酸度明亮，层次丰富。",
    tags: ["花香", "柑橘", "层次丰富"],
    brewingProfile: {
      waterAmount: 260,
      temperature: 93,
      grindSize: "中细",
      brewTime: "2:40",
      pourStages: [
        { amount: 45, time: 0 },
        { amount: 70, time: 35 },
        { amount: 80, time: 75 },
        { amount: 65, time: 115 }
      ]
    }
  }
];

// 风味咖啡豆推荐
const flavoredBeans: CoffeeBean[] = [
  {
    id: 10,
    name: "香草风味咖啡豆",
    origin: "哥伦比亚",
    price: 65,
    rating: 4.3,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Vanilla%20flavored%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20aromatic%2C%20professional%20photography&image_size=landscape_4_3",
    description: "香草风味浓郁，带有焦糖和奶油的口感，适合搭配牛奶。",
    tags: ["香草", "焦糖", "奶油"],
    brewingProfile: {
      waterAmount: 240,
      temperature: 88,
      grindSize: "中等",
      brewTime: "2:10",
      pourStages: [
        { amount: 50, time: 0 },
        { amount: 100, time: 30 },
        { amount: 90, time: 65 }
      ]
    }
  },
  {
    id: 11,
    name: "巧克力风味咖啡豆",
    origin: "巴西",
    price: 68,
    rating: 4.4,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chocolate%20flavored%20coffee%20beans%20in%20a%20sack%2C%20dark%20roast%2C%20rich%20flavor%2C%20professional%20photography&image_size=landscape_4_3",
    description: "浓郁的巧克力风味，带有坚果和焦糖的口感，适合喜欢甜食的人。",
    tags: ["巧克力", "坚果", "焦糖"],
    brewingProfile: {
      waterAmount: 250,
      temperature: 90,
      grindSize: "中等",
      brewTime: "2:15",
      pourStages: [
        { amount: 50, time: 0 },
        { amount: 100, time: 30 },
        { amount: 100, time: 70 }
      ]
    }
  },
  {
    id: 12,
    name: "肉桂风味咖啡豆",
    origin: "危地马拉",
    price: 66,
    rating: 4.2,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cinnamon%20flavored%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20spicy%20aroma%2C%20professional%20photography&image_size=landscape_4_3",
    description: "肉桂风味独特，带有香料和焦糖的口感，适合秋冬季节饮用。",
    tags: ["肉桂", "香料", "焦糖"],
    brewingProfile: {
      waterAmount: 245,
      temperature: 92,
      grindSize: "中等",
      brewTime: "2:20",
      pourStages: [
        { amount: 45, time: 0 },
        { amount: 80, time: 30 },
        { amount: 80, time: 70 },
        { amount: 40, time: 100 }
      ]
    }
  }
];

const CoffeeCard = ({ bean, onAdded, navigate }: { bean: CoffeeBean; onAdded: (name: string) => void; navigate: any }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCurveLibrary = () => {
    // 模拟添加到曲线库
    setIsAdded(true);
    onAdded(bean.name);
    
    // 3秒后恢复按钮状态
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={bean.image} 
          alt={bean.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Heart 
            className={`w-5 h-5 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{bean.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-600">{bean.rating}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">{bean.origin}</div>
        <div className="text-sm text-gray-600 mb-3 line-clamp-2">{bean.description}</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {bean.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="font-bold text-[#8B4513]">¥{bean.price}</div>
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCurveLibrary}
              disabled={isAdded}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                isAdded 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  已添加
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  冲煮方案
                </>
              )}
            </button>
            <button onClick={() => navigate(`/coffee-bean/${bean.id}`)} className="px-3 py-1.5 bg-[#8B4513] text-white text-sm rounded-lg hover:bg-[#A0522D] transition-colors">
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CoffeeRecommendationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const tabs = [
    { id: 0, name: "手冲咖啡豆", beans: pourOverBeans },
    { id: 1, name: "意式咖啡豆", beans: espressoBeans },
    { id: 2, name: "专业级口感", beans: professionalBeans },
    { id: 3, name: "风味咖啡豆", beans: flavoredBeans }
  ];

  const handleAdded = (beanName: string) => {
    setToastMessage(`"${beanName}" 的冲煮方案已添加到曲线库`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">咖啡豆推荐</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 text-sm">
            为您推荐精选咖啡豆
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Sliders className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap mr-2 ${
                activeTab === tab.id
                  ? "bg-[#8B4513] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabs[activeTab].beans.map((bean) => (
            <CoffeeCard key={bean.id} bean={bean} onAdded={handleAdded} navigate={navigate} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transition-colors font-medium flex items-center justify-center gap-2 mx-auto">
            加载更多
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#8B4513] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce z-50">
          <Check className="w-5 h-5" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
