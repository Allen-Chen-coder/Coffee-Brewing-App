import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, Heart, ExternalLink, Thermometer, Droplets, Clock, Settings, Check, Zap } from "lucide-react";

type CoffeeBean = {
  id: number;
  name: string;
  origin: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  flavorNotes: string[];
  roastLevel: string;
  processingMethod: string;
  altitude: string;
  history: string;
  brewingProfile?: {
    targetWeight: number;
    recommendedRate: string;
    waterAmount: number;
    temperature: number;
    grindSize: string;
    brewTime: string;
    ratio: string;
    extractionTime: string;
    extractionTemperature: number;
    pourStages: { amount: number; time: number }[];
  };
  purchaseLinks?: { name: string; url: string }[];
};

const allBeans: CoffeeBean[] = [
  {
    id: 1,
    name: "埃塞俄比亚耶加雪菲",
    origin: "埃塞俄比亚",
    price: 89,
    rating: 4.8,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ethiopian%20Yirgacheffe%20coffee%20beans%20in%20a%20sack%2C%20premium%20quality%2C%20light%20roast%2C%20professional%20photography&image_size=landscape_4_3",
    description: "花香四溢，带有柑橘和茉莉的清新风味，酸度明亮，回甘悠长。埃塞俄比亚耶加雪菲是世界上最著名的咖啡产地之一，以其独特的花香和果酸著称。",
    tags: ["花香", "柑橘", "明亮"],
    flavorNotes: ["柑橘", "茉莉", "蜂蜜", "柠檬", "红糖"],
    roastLevel: "浅度烘焙",
    processingMethod: "水洗处理",
    altitude: "1800-2200米",
    history: "耶加雪菲位于埃塞俄比亚的西达摩地区，是世界上最古老的咖啡产区之一。这里的咖啡以其独特的花香和明亮的酸度而闻名，被认为是埃塞俄比亚最好的咖啡之一。耶加雪菲咖啡的历史可以追溯到19世纪末，当时这里的咖啡开始被运往世界各地。",
    brewingProfile: {
      targetWeight: 15,
      recommendedRate: "2.5-3.0g/s",
      waterAmount: 250,
      temperature: 92,
      grindSize: "中细",
      brewTime: "2:30",
      ratio: "1:16.7",
      extractionTime: "2:20-2:40",
      extractionTemperature: 92,
      pourStages: [
        { amount: 40, time: 0 },
        { amount: 80, time: 30 },
        { amount: 80, time: 60 },
        { amount: 50, time: 90 }
      ]
    },
    purchaseLinks: [
      { name: "天猫旗舰店", url: "https://www.tmall.com" },
      { name: "京东自营店", url: "https://www.jd.com" }
    ]
  },
  {
    id: 2,
    name: "哥伦比亚苏普雷莫",
    origin: "哥伦比亚",
    price: 79,
    rating: 4.6,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Colombian%20Supremo%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20rich%20flavor%2C%20professional%20photography&image_size=landscape_4_3",
    description: "平衡的酸甜，带有焦糖和坚果的风味，口感顺滑。哥伦比亚咖啡以其均匀的质量和浓郁的风味而闻名。",
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
    },
    purchaseLinks: [
      { name: "亚马逊", url: "https://www.amazon.cn" }
    ]
  },
  {
    id: 3,
    name: "肯尼亚AA",
    origin: "肯尼亚",
    price: 99,
    rating: 4.7,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kenyan%20AA%20coffee%20beans%20in%20a%20sack%2C%20bright%20acidity%2C%20blackcurrant%20flavor%2C%20professional%20photography&image_size=landscape_4_3",
    description: "明亮的酸度，带有黑醋栗和柠檬的风味，层次丰富。肯尼亚AA是肯尼亚最高等级的咖啡豆。",
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
    },
    purchaseLinks: [
      { name: "官方微店", url: "https://weidian.com" }
    ]
  },
  {
    id: 4,
    name: "意大利浓缩拼配",
    origin: "意大利",
    price: 69,
    rating: 4.5,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Italian%20espresso%20blend%20coffee%20beans%20in%20a%20sack%2C%20dark%20roast%2C%20creamy%2C%20professional%20photography&image_size=landscape_4_3",
    description: "浓郁的巧克力和焦糖风味，油脂丰富，口感醇厚。经典的意式拼配，适合制作浓缩咖啡。",
    tags: ["巧克力", "焦糖", "醇厚"],
    brewingProfile: {
      waterAmount: 36,
      temperature: 93,
      grindSize: "细",
      brewTime: "0:28",
      pourStages: [
        { amount: 36, time: 0 }
      ]
    },
    purchaseLinks: [
      { name: "亚马逊", url: "https://www.amazon.cn" }
    ]
  },
  {
    id: 5,
    name: "巴西桑托斯",
    origin: "巴西",
    price: 75,
    rating: 4.4,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Brazilian%20Santos%20coffee%20beans%20in%20a%20sack%2C%20medium%20dark%20roast%2C%20nutty%2C%20professional%20photography&image_size=landscape_4_3",
    description: "坚果和巧克力的风味，低酸度，口感顺滑。巴西是世界最大的咖啡生产国。",
    tags: ["坚果", "巧克力", "低酸度"],
    brewingProfile: {
      waterAmount: 38,
      temperature: 92,
      grindSize: "细",
      brewTime: "0:30",
      pourStages: [
        { amount: 38, time: 0 }
      ]
    },
    purchaseLinks: [
      { name: "天猫旗舰店", url: "https://www.tmall.com" }
    ]
  },
  {
    id: 6,
    name: "危地马拉安提瓜",
    origin: "危地马拉",
    price: 85,
    rating: 4.6,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guatemalan%20Antigua%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20fruity%2C%20professional%20photography&image_size=landscape_4_3",
    description: "带有水果和香料的风味，平衡的酸度，回甘明显。危地马拉安提瓜产区的咖啡以其复杂的口感而著称。",
    tags: ["水果", "香料", "平衡"],
    brewingProfile: {
      waterAmount: 40,
      temperature: 91,
      grindSize: "细",
      brewTime: "0:32",
      pourStages: [
        { amount: 40, time: 0 }
      ]
    },
    purchaseLinks: [
      { name: "京东自营店", url: "https://www.jd.com" }
    ]
  },
  {
    id: 7,
    name: "巴拿马瑰夏",
    origin: "巴拿马",
    price: 199,
    rating: 4.9,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Panamanian%20Geisha%20coffee%20beans%20in%20a%20premium%20sack%2C%20light%20roast%2C%20floral%2C%20professional%20photography&image_size=landscape_4_3",
    description: "顶级瑰夏，花香浓郁，带有热带水果和蜂蜜的风味，酸度明亮。巴拿马瑰夏是咖啡界的传奇品种。",
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
    },
    purchaseLinks: [
      { name: "官方微店", url: "https://weidian.com" }
    ]
  },
  {
    id: 8,
    name: "牙买加蓝山",
    origin: "牙买加",
    price: 169,
    rating: 4.8,
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jamaican%20Blue%20Mountain%20coffee%20beans%20in%20a%20sack%2C%20medium%20roast%2C%20premium%20quality%2C%20professional%20photography&image_size=landscape_4_3",
    description: "世界顶级咖啡豆，平衡的酸甜，带有坚果和巧克力的风味。牙买加蓝山是世界上最受推崇的咖啡之一。",
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
    },
    purchaseLinks: [
      { name: "天猫旗舰店", url: "https://www.tmall.com" }
    ]
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
    },
    purchaseLinks: [
      { name: "京东自营店", url: "https://www.jd.com" }
    ]
  },
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
    },
    purchaseLinks: [
      { name: "天猫旗舰店", url: "https://www.tmall.com" }
    ]
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
    },
    purchaseLinks: [
      { name: "亚马逊", url: "https://www.amazon.cn" }
    ]
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
    },
    purchaseLinks: [
      { name: "官方微店", url: "https://weidian.com" }
    ]
  }
];

export function CoffeeBeanDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const bean = allBeans.find(b => b.id === Number(id));
  
  if (!bean) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">咖啡豆未找到</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-[#8B4513] hover:underline"
          >
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCurveLibrary = () => {
    setIsAdded(true);
    setShowToast(true);
    setTimeout(() => {
      setIsAdded(false);
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">咖啡豆详情</h1>
        </div>
      </div>

      {/* 咖啡豆图片 */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={bean.image} 
          alt={bean.name} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-white shadow-lg"
        >
          <Heart 
            className={`w-6 h-6 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* 咖啡豆基本信息 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{bean.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{bean.origin}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-900">{bean.rating}</span>
            </div>
          </div>
          
          <div className="text-lg font-bold text-[#8B4513] mb-3">¥{bean.price}</div>
          
          <p className="text-gray-600 leading-relaxed mb-4">{bean.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">味道元素</h4>
            <div className="flex flex-wrap gap-2">
              {bean.flavorNotes.map((note, index) => (
                <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {note}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">烘焙程度</h4>
              <p className="text-sm font-medium text-gray-900">{bean.roastLevel}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">处理方法</h4>
              <p className="text-sm font-medium text-gray-900">{bean.processingMethod}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">产地海拔</h4>
              <p className="text-sm font-medium text-gray-900">{bean.altitude}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">产地</h4>
              <p className="text-sm font-medium text-gray-900">{bean.origin}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">历史</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{bean.history}</p>
          </div>
        </div>

        {/* 冲煮方案 */}
        {bean.brewingProfile && (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#8B4513]" />
              冲煮方案
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
                </div>
                <div className="text-sm text-gray-500">目标克重</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.targetWeight}g</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 6 12 12 16 14"></polyline><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
                <div className="text-sm text-gray-500">推荐速率</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.recommendedRate}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">萃取温度</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.extractionTemperature}°C</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">水量</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.waterAmount}ml</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">萃取时间</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.extractionTime}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <Settings className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <div className="text-sm text-gray-500">粉水比</div>
                <div className="font-semibold text-gray-900">{bean.brewingProfile.ratio}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">研磨度：</span>
                <span className="text-sm font-medium text-gray-900">{bean.brewingProfile.grindSize}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">大师曲线</h4>
              <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#8B4513] opacity-30 mx-auto mb-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                  <p className="text-gray-500 text-sm">大师冲煮曲线</p>
                  <p className="text-gray-400 text-xs mt-1">该方案的预设曲线</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">分段注水</h4>
              <div className="space-y-2">
                {bean.brewingProfile.pourStages.map((stage, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#8B4513]/10 rounded-full flex items-center justify-center text-[#8B4513] font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-600">
                        第 {index + 1} 段
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-900 font-medium">{stage.amount}ml</span>
                      <span className="text-gray-500">@ {stage.time}s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 购买链接 */}
        {bean.purchaseLinks && bean.purchaseLinks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">购买链接</h3>
            <div className="space-y-2">
              {bean.purchaseLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-900 font-medium">{link.name}</span>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
        <button 
          onClick={handleAddToCurveLibrary}
          disabled={isAdded}
          className={`w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
            isAdded 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:opacity-90'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-6 h-6" />
              已添加到曲线库
            </>
          ) : (
            <>
              <Zap className="w-6 h-6" />
              将该冲煮方案加入曲线库
            </>
          )}
        </button>
      </div>

      {/* Toast提示 */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#8B4513] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce z-50">
          <Check className="w-5 h-5" />
          "{bean.name}" 的冲煮方案已添加到曲线库
        </div>
      )}
    </div>
  );
}
