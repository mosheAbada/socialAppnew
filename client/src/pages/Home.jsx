import React, { useState, useEffect } from 'react';
import PopUp from '../components/PopUp';
import CategoryBar from '../components/CategoryBar';
import FoodNewsWindow from '../components/FoodNewsWindow';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Import LanguageSwitcher
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Import LanguageContext
import AccessibilityButton from '../components/AccessibilityButton';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [comment, setComment] = useState('');
  const [renderPosts, setRenderPosts] = useState(false);
  const [categoryChosen, setCategoryChoose] = useState('');
  const [showAllComments, setShowAllComments] = useState({});

  const { language } = useLanguage(); // Use the language context

  useEffect(() => {
    setLogIn(!!user);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/getposts');
        const data = response.data.map((post) => ({
          ...post,
          commentTry: false,
        }));
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [renderPosts]);

  const updateComment = (updatepostId) => {
    axios
      .put('/addComment', {
        updatepostId,
        userComment: user?.firstname,
        comment,
      })
      .then((res) => {
        navigate('/');
        setRenderPosts(!renderPosts);
        setComment('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/deletePost/${postId}`);
      setRenderPosts(!renderPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (postId, commentIndex) => {
    try {
      await axios.delete(`/deleteComment/${postId}/${commentIndex}`);
      setRenderPosts(!renderPosts);
    } catch (err) {
      console.log(err);
    }
  };

  // Define translations
  const translations = {
    en: {
      welcome: `Nice to see you: ${user?.firstname} ${user?.lastname}`,
      postButton: 'Post +',
      homePage: 'HOME PAGE:',
      Subject: ': Subject ',
      commentSection: 'Comment Section:',
      seeMore: 'see more',
      seeLess: 'see less',
      comment: 'Comment',
      submit: 'Submit',
      placeholder: 'Comment here',
      deletePost: 'Delete Post',
      deleteComment: 'Delete ',
    },
    he: {
      welcome: `נעים לראות אותך: ${user?.firstname} ${user?.lastname}`,
      postButton: 'פוסט +',
      homePage: 'דף הבית:',
      Subject: ': מתכון ל ',
      commentSection: ' : תגובות',
      seeMore: 'ראה עוד',
      seeLess: 'ראה פחות',
      comment: 'הגב',
      submit: 'שלח',
      placeholder: 'כתוב כאן תגובה',
      deletePost: 'מחק פוסט',
      deleteComment: 'מחק ',
    },
  };

  return (
    <div className="w-full bg-slate-300 flex flex-col z-30">
      <div className=" bg-lime-500 m-2 px-5 py-2 flex  top-56 justify-between items-center fixed  rounded-md z-50 md:top-40 sm:top-56  ">
        <CategoryBar setCategoryChoose={setCategoryChoose} />
      </div>
      <div className="bg-lime-500 m-2 px-5 py-2 flex justify-between  items-center fixed top-20 rounded-md ">
        <LanguageSwitcher />
      </div>
      <div className="flex flex-row w-full">
        <div className="w-1/4 p-4  top-16">
          <FoodNewsWindow />
        </div>
        <div>
          <AccessibilityButton />
        </div>
        <div className="w-3/4 p-4 ml-auto flex flex-col">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              logIn ? '' : 'hidden'
            } bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded-full fixed bottom-5 right-5 shadow-md active:shadow-none active:scale-90 z-10`}
          >
            {translations[language].postButton}
          </button>
          <div
            className={`${
              isOpen ? '' : 'hidden'
            } p-4 bg-gray-100 rounded-lg shadow-lg`}
          >
            <h1 className="font-bold">{translations[language].homePage}</h1>
            <p className="m-3 font-semibold">
              {translations[language].welcome}
            </p>
            <PopUp
              renderPosts={renderPosts}
              setRenderPosts={setRenderPosts}
              setIsOpen={setIsOpen}
              user={user?.firstname}
            />
          </div>
          <div className="mt-20">
            {posts
              .filter(
                (post) =>
                  categoryChosen === '' || post.postSub === categoryChosen
              )
              .map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-700 rounded-lg p-6 mb-4 flex shadow-md"
                >
                  <div className="w-2/3 pr-4">
                    <p className="font-bold text-lg border-b-2 border-black">
                      {post.user} :
                    </p>
                    <p className="font-semibold text-md border-b-2 border-black">
                      {post.postSub} {translations[language].Subject}
                    </p>
                    <p className="font-normal text-md">{post.postVal}</p>
                    {user?.email === 'moshe@gmail.com' && (
                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-red-500 mt-2"
                      >
                        {translations[language].deletePost}
                      </button>
                    )}
                  </div>
                  <div className="w-1/3 pl-4 border-l border-black">
                    <p className="text-center font-semibold text-md border-b-2 border-black">
                      {translations[language].commentSection}
                    </p>
                    {post.comments
                      .slice(
                        0,
                        showAllComments[post._id] ? post.comments.length : 3
                      )
                      .map((p, index) => (
                        <div key={index} className="text-center flex">
                          <p className="font-semibold">{p.userComment} :</p>
                          <p>{p.comment}</p>
                          {user?.email === 'moshe@gmail.com' && (
                            <button
                              onClick={() => deleteComment(post._id, index)}
                              className="text-red-500 ml-2"
                            >
                              {translations[language].deleteComment}
                            </button>
                          )}
                        </div>
                      ))}
                    {post.comments.length > 3 && (
                      <div className="">
                        <button
                          onClick={() =>
                            setShowAllComments((prev) => ({
                              ...prev,
                              [post._id]: !prev[post._id],
                            }))
                          }
                          className="text-lime-500 underline mt-2"
                        >
                          {showAllComments[post._id]
                            ? translations[language].seeLess
                            : translations[language].seeMore}
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() =>
                        setPosts((prevPosts) =>
                          prevPosts.map((p) =>
                            p._id === post._id
                              ? { ...p, commentTry: !p.commentTry }
                              : p
                          )
                        )
                      }
                      className={`${
                        logIn ? '' : 'hidden'
                      } bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded mt-2`}
                    >
                      {translations[language].comment}
                    </button>
                    <div className={`${post.commentTry ? '' : 'hidden'} mt-2`}>
                      <input
                        type="text"
                        name="comment"
                        className="border-2 border-black w-full p-2 mb-2"
                        placeholder={translations[language].placeholder}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          setRenderPosts(!renderPosts);
                          setPosts((prevPosts) =>
                            prevPosts.map((p) =>
                              p._id === post._id
                                ? { ...p, commentTry: false }
                                : p
                            )
                          );
                          updateComment(post._id);
                        }}
                        className="bg-lime-400 rounded-md p-2 shadow-md w-full"
                      >
                        {translations[language].submit}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
