import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 ">
      <button
        onClick={() => switchLanguage('en')}
        className={`p-2 rounded transition-colors duration-300 ${
          language === 'en' ? 'bg-black text-white' : 'bg-gray-200'
        } hover:bg-gray-300`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage('he')}
        className={`p-2 rounded transition-colors duration-300 ${
          language === 'he' ? 'bg-black text-white' : 'bg-gray-200'
        } hover:bg-gray-300`}
      >
        עברית
      </button>
    </div>
  );
};

export default LanguageSwitcher;
