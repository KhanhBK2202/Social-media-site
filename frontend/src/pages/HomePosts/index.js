import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import moment from 'moment';
import { faBookmark as farBookmark, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faAnglesUp, faEye, faBookmark as fasBookmark, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './HomePosts.module.scss'
import * as request from '~/utils/request'

moment().format();
const cx = classNames.bind(styles);

function HomePosts({posts, setLike, setBookmark}) {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [liked, setLiked] = useState(false)
    const [savedArticles, setSavedArticles] = useState([])
    const [bookmarkedArticles, setBookmarkedArticles] = useState([])
    var savedId = []
    var bookmarkedId = []

    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            request
                .get(`/user/${user._id}`)
                .then(function(res) {
                    // setLiked(false)
                    setSavedArticles(res.data.profile.articlesLike)
                    setBookmarkedArticles(res.data.profile.bookmark)
                })
                .catch(e => console.log(e))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[liked])

    savedArticles.forEach(article => {
        savedId.push(article._id)
    })

    const handleCountLiked = (articleId) => {
        if (!user) {
            navigate('/signin')
        }
        else {
            setLiked(!liked)
            setLike(liked)
            if (savedId.includes(articleId)) {
                handleDecreaseLike(articleId)
                handleUnsavedArticle(articleId)
                handleUnsavedUser(articleId)
            }
            else {
                handleIncreaseLike(articleId)
                handleSavedArticle(articleId)
                handleSavedUser(articleId)
            }
        }
    }

    const handleIncreaseLike = (articleId) => {
        request.put(`/article/incLikes/${articleId}`)
    }
    // Save articles which user like 
    const handleSavedArticle = (articleId) => {
        request.put(`/me/saved/${user._id}`, { articlesLike: articleId })
    }

    // Save user who like that article
    const handleSavedUser = (articleId) => {
        request.put(`/article/saved/usersLike/${articleId}`, { usersLike: user._id })
    }

    const handleDecreaseLike = (articleId) => {
        request.put(`/article/decLikes/${articleId}`)
    }

    // Unsave articles which user like 
    const handleUnsavedArticle = (articleId) => {
        request.remove(`/me/unsaved/${user._id}/${articleId}`)
    }

    // Unsave user who unlike that article
    const handleUnsavedUser = (articleId) => {
        request.remove(`/article/unsaved/usersLike/${user._id}/${articleId}/`)
    }

    const handleViews = (articleId) => {
        request.put(`/article/views/${articleId}`)
    }

    bookmarkedArticles.forEach(article => {
        bookmarkedId.push(article._id)
    })

    const handleBookmarked = (articleId) => {
        if (!user) {
            navigate('/signin')
        }
        else {
            setLiked(!liked)
            setBookmark(liked)
            if (bookmarkedId.includes(articleId)) {
                handleUnbookmarkedArticle(articleId)
            }
            else {
                handleBookmarkedArticle(articleId)
            }
        }
    }

    // Save articles which user bookmark 
    const handleBookmarkedArticle = (articleId) => {
        request.put(`/me/saved/${user._id}`, { bookmark: articleId })
    }

    // Unsave articles which user like 
    const handleUnbookmarkedArticle = (articleId) => {
        request.remove(`/me/unbookmarked/${user._id}/${articleId}`)
    }

    window.onscroll = function() {scrollFunction()};
    const scrollFunction = () => {
        const mybutton = document.getElementById("ScrollTopBtn");
        // When the user scrolls down 500px from the top of the document, show the button
        if (mybutton) {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
    }

    const GoToTopFunction = () =>  {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    
    return (
        <div className={cx('body')}>
            {posts.map((result, index) =>
            (
                <div key={index} id={result._id} className={cx('post')} style={{backgroundColor: index % 2 === 0 ? "var(--post-color)" : "var(--comment-color)" }}>
                    <div className={cx('user')}>
                        <div className={cx('user-avatar')}>
                            <img className={cx('user-avatar-img')} src={result.author.avatar} alt="avatar"/>
                        </div>
                        <div className={cx('user-name')}>
                            <Link to={`/profile/${result.author._id}/${result.author.slug}`} className={cx('username')}>{result.author.username}</Link>
                            <div className={cx('post-date')}>
                                {moment(result.createdAt).fromNow()}
                            </div>
                        </div>

                        <div className={cx('bookmark-icon')} onClick={() => handleBookmarked(result._id)}>
                            {bookmarkedId.includes(result._id) ? (
                                <FontAwesomeIcon icon={fasBookmark} className={cx('bookmark')}/>
                            ) : (
                                <FontAwesomeIcon icon={farBookmark} className={cx('bookmark')}/>
                            )}
                        </div>
                        
                    </div>
                    <Link to={`/detail/${result._id}/${result.slug}`} onClick={() => handleViews(result._id)}>
                        <h2 className={cx('title')}>{result.title}</h2>
                    </Link>
                    <p className={cx('content')} dangerouslySetInnerHTML={{ __html: result.content }}></p>
                    <Link to={`/detail/${result._id}/${result.slug}`} className={cx('read-more')} onClick={() => handleViews(result._id)}>
                        Read more &gt;
                    </Link>
                    <div className={cx('liked')}>
                        <>
                            <div className={cx('heart-icon')} onClick={() => handleCountLiked(result._id)}>
                                {savedId.includes(result._id) ? (
                                    <FontAwesomeIcon icon={fasHeart}/>
                                ) : (
                                    <FontAwesomeIcon icon={farHeart}/>
                                )}
                            </div>
                            {/* <div className={cx('liked-number')}>
                                {result.likes}
                            </div> */}
                        </>
                        <div className={cx('views')}>
                            <FontAwesomeIcon icon={faEye} className={cx('views-total')}/>
                            <span className={cx('views-total')}>
                                {result.views}
                                {result.views > 1 ? ' views': ' view'}
                            </span>
                        </div>
                        <ul className={cx('tag-post')}>
                            {result?.tags.map((item, index) => (
                                <li key={index} className={cx('tag-name')}>
                                    <Link to={`/post/${item}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}

            <button onClick={GoToTopFunction} id="ScrollTopBtn" className={cx('scroll-top-btn')} title="Go to top">
                <FontAwesomeIcon icon={faAnglesUp}/>
            </button>
        </div>
    )
}

export default HomePosts;