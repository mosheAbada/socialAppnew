import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  /* two methods for navigate between pages 1.Link 2.useNavigate */
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  function goToSignin() {
    navigate('/signin');
  }
  function goToSignup() {
    navigate('/signup');
  }
  function goToSignuot() {
    localStorage.removeItem('user');
    navigate('/signin');
  }
  //btn navbar with all the logic for hide btn for series of situations. (user log in)
  return (
    <div className="bg-blue-500 p-4 flex w-full justify-between items-center border-b border-black-400">
      <Link to={'/'}>
        <button className="font-bold"> home page </button>
      </Link>
      <div>
        <h1 className=" font-bold text-2xl ml-10">
          come {user?.firstname} make your meal
        </h1>
      </div>
      <div>
        <button
          className={`${
            user ? 'hidden' : ' '
          } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
          onClick={goToSignin}
        >
          log in
        </button>
        <button
          className={`${
            user ? 'hidden' : ' '
          } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90`}
          onClick={goToSignup}
        >
          sign up
        </button>
        <button
          className={`${
            user ? '' : 'hidden'
          } m-2 font-bold px-2 py-1 rounded hover:bg-white active:scale-90 `}
          onClick={user ? goToSignuot : goToHome}
        >
          log out
        </button>
      </div>
    </div>
  );
}
