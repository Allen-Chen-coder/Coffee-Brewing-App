import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // 通用
    language: '语言',
    zh: '简体中文',
    en: 'English',
    settings: '设置',
    back: '返回',
    confirm: '确认',
    cancel: '取消',
    
    // 导航栏
    home: '主页',
    profile: '我的',
    
    // 设备相关
    deviceManagement: '设备管理',
    deviceSettings: '设备设置',
    connectedDevices: '已连接设备',
    addDevice: '添加新设备',
    connectDevice: '连接设备',
    deviceType: '设备类型',
    
    // 冲煮相关
    startBrewing: '开始冲煮',
    recentBrews: '近期冲煮记录',
    brewingHistory: '冲煮历史',
    extractionQuality: '萃取质量',
    waterDeviation: '水量偏差',
    
    // 统计相关
    totalBrews: '累计冲煮',
    deviceCount: '设备数量',
    curveCount: '曲线数量',
    
    // 菜单
    myDevices: '我的设备',
    personalInfo: '个人信息',
    myPosts: '发布的帖子',
    curveLibrary: '曲线库',
    
    // 其他
    version: '版本信息',
    logout: '退出登录',
  },
  en: {
    // General
    language: 'Language',
    zh: '简体中文',
    en: 'English',
    settings: 'Settings',
    back: 'Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    
    // Navigation
    home: 'Home',
    profile: 'Profile',
    
    // Device related
    deviceManagement: 'Device Management',
    deviceSettings: 'Device Settings',
    connectedDevices: 'Connected Devices',
    addDevice: 'Add New Device',
    connectDevice: 'Connect Device',
    deviceType: 'Device Type',
    
    // Brewing related
    startBrewing: 'Start Brewing',
    recentBrews: 'Recent Brews',
    brewingHistory: 'Brewing History',
    extractionQuality: 'Extraction Quality',
    waterDeviation: 'Water Deviation',
    
    // Statistics related
    totalBrews: 'Total Brews',
    deviceCount: 'Device Count',
    curveCount: 'Curve Count',
    
    // Menu
    myDevices: 'My Devices',
    personalInfo: 'Personal Info',
    myPosts: 'My Posts',
    curveLibrary: 'Curve Library',
    
    // Other
    version: 'Version Info',
    logout: 'Logout',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
