import { useNavigate } from 'react-router';
import { ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguagePage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white px-6 py-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t('language')}</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-3">
          <button
            onClick={() => setLanguage('zh')}
            className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">简体中文</span>
            {language === 'zh' && (
              <Check className="w-5 h-5 text-[#8B4513]" />
            )}
          </button>

          <button
            onClick={() => setLanguage('en')}
            className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">English</span>
            {language === 'en' && (
              <Check className="w-5 h-5 text-[#8B4513]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
