import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import AdminPage from '../pages/AdminPage';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      HeadLine: ' Welcome to  "FoodIsGood" ',
      HomePage: 'Home Page',
      LogIn: 'Log In',
      SignUp: 'Sign Up',
      LogOut: 'Log Out',
      AdminPage: 'Admin Page',
    },
    he: {
      HeadLine: ' : ברוך הבא',
      HomePage: 'דף הבית',
      LogIn: 'התחברות',
      SignUp: 'הרשמה',
      LogOut: 'התנתקות',
      AdminPage: 'עמוד מנהל',
    },
  };

  // Navigate to different pages
  const goToHome = () => navigate('/');
  const goToSignin = () => navigate('/signin');
  const goToSignup = () => navigate('/signup');
  const goToSignout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="bg-lime-500 p-4 flex w-full justify-between items-center border-b border-black-400 fixed top-0 left-0 z-30">
      <Link to={'/'}>
        <button className="font-bold text-black">
          {translations[language].HomePage}
        </button>
      </Link>
      {user?.email === 'moshe@gmail.com' && (
        <Link to={'/admin'}>
          <button className="font-bold text-black">
            {translations[language].AdminPage}
          </button>
        </Link>
      )}

      <div>
        <h1 className="font-bold text-2xl ml-10 text-black">
          {user?.firstname} {translations[language].HeadLine}
        </h1>
      </div>
      <div>
        <button
          className={`${
            user ? 'hidden' : ' '
          } m-2 font-bold px-2 py-1 rounded hover:bg-white hover:text-lime-500 text-black transition`}
          onClick={goToSignin}
        >
          {translations[language].LogIn}
        </button>
        <button
          className={`${
            user ? 'hidden' : ' '
          } m-2 font-bold px-2 py-1 rounded hover:bg-white hover:text-lime-500 text-black transition`}
          onClick={goToSignup}
        >
          {translations[language].SignUp}
        </button>
        <button
          className={`${
            user ? '' : 'hidden'
          } m-2 font-bold px-2 py-1 rounded hover:bg-white hover:text-lime-500 text-black transition`}
          onClick={goToSignout}
        >
          {translations[language].LogOut}
        </button>
      </div>
    </div>
  );
}
