import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        onClick={() => switchLanguage('en')}
        className={`p-2 rounded ${
          language === 'en' ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('he')}
        className={`p-2 rounded ${
          language === 'he' ? 'bg-black text-white' : 'bg-gray-200'
        }`}
      >
        עברית
      </button>
    </div>
  );
};

export default LanguageSwitcher;
