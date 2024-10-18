import React from 'react';
import { useLanguage } from '../LanguageContext';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="mt-4">
      <select
        value={language}
        onChange={(e) => switchLanguage(e.target.value)}
        className="p-2 rounded transition-colors duration-300 bg-green-200 hover:bg-gray-300"
      >
        <option value="en">English</option>
        <option value="he">עברית</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
