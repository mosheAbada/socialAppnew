import React, { useState } from 'react';

const AccessibilityButton = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargerText, setIsLargerText] = useState(false);

  // פונקציה לשינוי ניגודיות
  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
    document.body.classList.toggle('high-contrast', !isHighContrast);
  };

  // פונקציה לשינוי גודל הטקסט
  const toggleTextSize = () => {
    setIsLargerText((prev) => !prev);
    document.body.classList.toggle('larger-text', !isLargerText);
  };

  return (
    <button
      className={`fixed  top-40 right-0 px-4 py-2 rounded-lg border-none cursor-pointer transition-colors ${
        isHighContrast ? 'bg-black text-white' : 'bg-blue-500 text-white'
      } ${isLargerText ? 'text-lg' : 'text-base'}`}
      onClick={() => {
        toggleHighContrast();
        toggleTextSize();
      }}
    >
      נגישות
    </button>
  );
};

export default AccessibilityButton;
