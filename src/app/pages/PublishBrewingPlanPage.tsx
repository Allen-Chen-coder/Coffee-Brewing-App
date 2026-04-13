import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, Coffee, Scale, Thermometer, Droplets, Clock, Settings, Zap, Check, Plus, Minus, ChevronRight } from "lucide-react";

type FormData = {
  coffeeBeans: string[];
  targetWeight: number;
  recommendedRate: string;
  grindSize: string;
  ratio: string;
  extractionTime: string;
  extractionTemperature: number;
  brewingMethod: string;
  notes: string;
};

const grindSizes = ["极细", "细", "中细", "中等", "中粗", "粗", "极粗"];
const brewingMethods = ["手冲", "意式浓缩", "法压壶", "冷萃", "虹吸壶"];

export function PublishBrewingPlanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const coffeeBean = location.state?.coffeeBean;
  
  const [formData, setFormData] = useState<FormData>({
    coffeeBeans: coffeeBean ? [coffeeBean.name] : [],
    targetWeight: coffeeBean?.brewingProfile?.targetWeight || 15,
    recommendedRate: coffeeBean?.brewingProfile?.recommendedRate || "2.5-3.0g/s",
    grindSize: coffeeBean?.brewingProfile?.grindSize || "中细",
    ratio: coffeeBean?.brewingProfile?.ratio || "1:16",
    extractionTime: coffeeBean?.brewingProfile?.extractionTime || "2:20-2:40",
    extractionTemperature: coffeeBean?.brewingProfile?.extractionTemperature || 92,
    brewingMethod: "手冲",
    notes: ""
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCoffeeBean = () => {
    // 这里可以打开咖啡豆选择对话框
    // 暂时先添加一个示例
    setFormData(prev => ({
      ...prev,
      coffeeBeans: [...prev.coffeeBeans, "哥伦比亚苏普雷莫"]
    }));
  };

  const handleRemoveCoffeeBean = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coffeeBeans: prev.coffeeBeans.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以处理表单提交
    console.log("Form submitted:", formData);
    // 提交后返回上一页
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* 顶部导航 */}
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">发布冲煮方案</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* 咖啡豆组成 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#8B4513]" />
            使用咖啡豆组成
          </h3>
          
          <div className="space-y-3">
            {formData.coffeeBeans.map((bean, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{bean}</span>
                <button 
                  type="button" 
                  onClick={() => handleRemoveCoffeeBean(index)}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={handleAddCoffeeBean}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#8B4513] transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">添加咖啡豆</span>
            </button>
          </div>
        </div>

        {/* 冲煮参数 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#8B4513]" />
            冲煮参数
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">目标克重 (g)</label>
              <input 
                type="number" 
                value={formData.targetWeight} 
                onChange={(e) => handleInputChange("targetWeight", parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-2">推荐速率</label>
              <input 
                type="text" 
                value={formData.recommendedRate} 
                onChange={(e) => handleInputChange("recommendedRate", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                placeholder="例如: 2.5-3.0g/s"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-2">推荐研磨度</label>
              <select 
                value={formData.grindSize} 
                onChange={(e) => handleInputChange("grindSize", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              >
                {grindSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-2">推荐粉水比</label>
              <input 
                type="text" 
                value={formData.ratio} 
                onChange={(e) => handleInputChange("ratio", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                placeholder="例如: 1:16"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-2">推荐萃取时间</label>
              <input 
                type="text" 
                value={formData.extractionTime} 
                onChange={(e) => handleInputChange("extractionTime", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                placeholder="例如: 2:20-2:40"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-500 mb-2">推荐萃取温度 (°C)</label>
              <input 
                type="number" 
                value={formData.extractionTemperature} 
                onChange={(e) => handleInputChange("extractionTemperature", parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm text-gray-500 mb-2">冲煮方式</label>
              <select 
                value={formData.brewingMethod} 
                onChange={(e) => handleInputChange("brewingMethod", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              >
                {brewingMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 大师曲线 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#8B4513]" />
            大师曲线
          </h3>
          
          <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#8B4513] opacity-30 mx-auto mb-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              <p className="text-gray-500 text-sm">大师冲煮曲线</p>
              <p className="text-gray-400 text-xs mt-1">预设冲煮曲线</p>
            </div>
          </div>
        </div>

        {/* 备注 */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">备注</h3>
          <textarea 
            value={formData.notes} 
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent min-h-[100px]"
            placeholder="添加冲煮心得或其他备注..."
          />
        </div>

        {/* 提交按钮 */}
        <button 
          type="submit"
          className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white hover:opacity-90 transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-6 h-6" />
          发布冲煮方案
        </button>
      </form>
    </div>
  );
}
