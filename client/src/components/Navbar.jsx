import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from './LanguageSwitcher';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(false); // State for the dropdown
  const open = Boolean(anchorEl); // Check if the menu is open
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      HeadLine: ' Welcome to  ',
      HomePage: 'Home Page',
      LogIn: 'Sign In',
      SignUp: 'Sign Up',
      LogOut: 'Log Out',
      AdminPage: 'Admin Page',
    },
    he: {
      HeadLine: ' ברוך הבא ',
      HomePage: 'דף הבית',
      LogIn: 'התחברות',
      SignUp: 'הרשמה',
      LogOut: 'התנתקות',
      AdminPage: 'עמוד מנהל',
    },
  };

  // Menu handlers
  const handleClick = (event) => {
    setAnchorEl(!anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navigation handlers
  const goToHome = () => {
    navigate('/');
    handleClose(); // Close menu after navigation
  };
  const goToSignin = () => navigate('/signin');
  const goToSignup = () => navigate('/signup');
  const goToSignout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
    handleClose(); // Close menu after sign out
  };

  return (
    <div className="bg-lime-500 p-4 flex w-full justify-between items-center border-b border-black-400 fixed top-0 left-0 z-30">
      {/* Left Side - Dashboard Menu */}
      <div className="relative">
        <button
          className="font-bold text-black p-2 hover:bg-white hover:text-lime-500 rounded"
          onClick={handleClick}
        >
          <MenuIcon />
        </button>
        {open && (
          <div
            className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-40 z-20"
            onMouseLeave={handleClose}
          >
            <ul className="flex flex-col">
              <li className="p-2 hover:bg-gray-200">
                <button onClick={goToHome}>
                  {translations[language].HomePage}
                </button>
              </li>
              {user?.email === 'moshe@gmail.com' && (
                <li className="p-2 hover:bg-gray-200">
                  <Link to="/admin" onClick={handleClose}>
                    {translations[language].AdminPage}
                  </Link>
                </li>
              )}
              <li className="p-2 hover:bg-gray-200">
                <LanguageSwitcher />
              </li>
              <li className="p-2 hover:bg-gray-200">
                <button onClick={goToSignout}>
                  {translations[language].LogOut}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Center - Headline */}
      <div>
        <h1 className="font-bold text-2xl ml-10 text-black">
          {user?.firstname} {translations[language].HeadLine}
        </h1>
        <p>
          <RestaurantIcon />
          Food Is Good <MedicationLiquidIcon />
        </p>
      </div>

      {/* Right Side - SignIn/SignUp */}
      <div className="flex gap-4">
        {!user && (
          <>
            <button
              className="m-2 font-bold px-2 py-1 rounded hover:bg-white hover:text-lime-500 text-black transition"
              onClick={goToSignin}
            >
              {translations[language].LogIn}
            </button>
            <button
              className="m-2 font-bold px-2 py-1 rounded hover:bg-white hover:text-lime-500 text-black transition"
              onClick={goToSignup}
            >
              {translations[language].SignUp}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
