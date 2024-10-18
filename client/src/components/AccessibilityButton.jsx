import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
const AccessibilityButton = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargerText, setIsLargerText] = useState(false);
  const { language } = useLanguage();

  // const translations = {
  //   en: {
  //     title: 'Accessibility',
  //   },
  //   he: {
  //     title: 'נגישות',
  //   },
  // };

  //change colors
  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
    document.body.classList.toggle('high-contrast', !isHighContrast);
  };

  //chaneg text size
  const toggleTextSize = () => {
    setIsLargerText((prev) => !prev);
    document.body.classList.toggle('larger-text', !isLargerText);
  };

  return (
    <button
      className={`fixed  top-40 right-0 px-4 py-2 rounded-lg border-none cursor-pointer transition-colors ${
        isHighContrast ? 'bg-black text-white' : 'bg-blue-300 text-white'
      } ${isLargerText ? 'text-lg' : 'text-base'}`}
      onClick={() => {
        toggleHighContrast();
        toggleTextSize();
      }}
    >
      <VisibilityIcon />
    </button>
  );
};

export default AccessibilityButton;
