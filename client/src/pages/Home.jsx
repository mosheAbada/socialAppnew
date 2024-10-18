import React, { useState, useEffect } from 'react';
import PopUp from '../components/PopUp';
import CategoryBar from '../components/CategoryBar';
import FoodNewsWindow from '../components/FoodNewsWindow';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Import LanguageSwitcher
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Import LanguageContext
import AccessibilityButton from '../components/AccessibilityButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InstagramCard from '../components/InstagramCard';
import { useScreensize } from '../hooks/useScreenSize';

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
  const { screenSize } = useScreensize();
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
      commentSection: 'Comments :',
      seeMore: 'see more',
      seeLess: 'see less',
      comment: 'Comment',
      submit: 'Submit',
      placeholder: 'Comment here',
      deletePost: <DeleteOutlineIcon />,
      deleteComment: <DeleteOutlineIcon />,
    },
    he: {
      welcome: `נעים לראות אותך : ${user?.firstname} ${user?.lastname}`,
      postButton: 'פוסט +',
      homePage: 'דף הבית:',
      Subject: ': מתכון ל ',
      commentSection: ' : תגובות',
      seeMore: 'ראה עוד',
      seeLess: 'ראה פחות',
      comment: 'הגב',
      submit: 'שלח',
      placeholder: 'כתוב כאן תגובה',
      deletePost: <DeleteOutlineIcon />,
      deleteComment: <DeleteOutlineIcon />,
    },
  };

  return (
    <div className="w-full bg-slate-300 flex flex-col z-30">
      <div className="flex w-full justify-center">
        <div className=" bg-lime-500 m-2 px-3 py-2 flex absolute top-24 justify-center items-center rounded-md z-10  ">
          <CategoryBar setCategoryChoose={setCategoryChoose} />
        </div>
      </div>
      {screenSize.dynamicWidth > 1300 ? (
        <div className=" fixed top-32 left-4">
          <InstagramCard />
        </div>
      ) : null}

      <div className="flex flex-row w-full">
        <div>
          <AccessibilityButton />
        </div>
        <div className="w-full justify-center items-center grid">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              logIn ? '' : 'hidden'
            }  bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded-full fixed bottom-5 right-5 shadow-md active:shadow-none active:scale-90 z-10`}
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
          <div className="mt-44 w-full">
            {posts
              .filter(
                (post) =>
                  categoryChosen === '' || post.postSub === categoryChosen
              )
              .map((post, i) => (
                <div>
                  {i % 3 == 0 && i != 0 ? (
                    <div className="p-4  top-16">
                      <FoodNewsWindow />
                    </div>
                  ) : null}

                  <div
                    key={post._id}
                    className="border border-gray-700 rounded-lg p-6 mb-4 flex shadow-md gap-4"
                  >
                    <div className="w-1/2 relative">
                      <p className="font-bold text-lg border-b-2 border-black">
                        {post.user} :
                      </p>
                      <p className="font-semibold text-md border-b-2 border-black">
                        {post.postSub}
                      </p>
                      <p className="font-normal text-md">{post.postVal}</p>
                      {user?.email === 'moshe@gmail.com' && (
                        <button
                          onClick={() => deletePost(post._id)}
                          className="text-red-500 mt-2 absolute bottom-0 right-0"
                        >
                          {translations[language].deletePost}
                        </button>
                      )}
                    </div>
                    <div className=" pl-3 border-l border-black w-full">
                      <p className="text-center font-semibold text-md border-b-2 border-black">
                        {translations[language].commentSection}
                      </p>
                      {post.comments
                        .slice(
                          0,
                          showAllComments[post._id] ? post.comments.length : 3
                        )
                        .map((p, index) => (
                          <div
                            key={index}
                            className=" text-center flex justify-between w-full"
                          >
                            <div className=" shadow-md shadow-slate-500 rounded-md  p-1 w-full flex my-2 ">
                              <p className="font-semibold">{p.userComment} :</p>
                              <p>{p.comment}</p>
                            </div>
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
                      <div
                        className={`${post.commentTry ? '' : 'hidden'} mt-2`}
                      >
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
                </div>
              ))}
          </div>
        </div>
      </div>
      {screenSize.dynamicWidth < 1300 ? (
        <div className=" ">
          <InstagramCard />
        </div>
      ) : null}
    </div>
  );
}
