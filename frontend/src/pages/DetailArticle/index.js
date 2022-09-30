import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart as farHeart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion, faAnglesRight, faHeart as fasHeart, faTrashCan, faXmark, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import * as request from '~/utils/request';
import styles from './DetailArticle.module.scss';

moment().format();
const cx = classNames.bind(styles);
const override = {
    position: 'relative',
    top: '130%',
    display: "block",
    margin: "0 auto",
};

function DetailArticle() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const id = user?._id
    const { articleId } = useParams()
    const [article, setArticle] = useState([])
    const [tag, setTag] = useState([])
    const [loading, setLoading] = useState(true)
    const [sameAuthor, setSameAuthor] = useState([])
    const [author, setAuthor] = useState([])

    const [content, setContent] = useState('')
    const [comment, setComment] = useState([])
    
    const [liked, setLiked] = useState(false)
    const [savedArticles, setSavedArticles] = useState([])
    var savedId = []
    const navigate = useNavigate()
    useEffect(() => {
        request
            .get(`/me/article/${articleId}`)
            .then(function(res) {
                setArticle(res.data.articles)
                setTag(res.data.articles.tags)
                setAuthor(res.data.articles.author)
                setLoading(false)
            })
            .catch(err => console.log(err))
    },[articleId, liked, loading])

    useEffect(() => {
        if (author?._id) {
            request
                .get(`/me/written/${author._id}/${articleId}`)
                .then(res => setSameAuthor(res.data.articles))
                .catch(err => console.log(err))
        }
    },[articleId, author?._id, loading])

    useEffect(() => {
        if (user) {
            request
                .get(`/user/${user._id}`)
                .then(function(res) {
                    setLoading(false)
                    setSavedArticles(res.data.profile.articlesLike)
                })
                .catch(e => console.log(e))
        }
    },[user, liked])

    savedArticles.forEach(article => {
        savedId.push(article._id)
    })

    const handleCountLiked = (articleId) => {
        if (!user) {
            navigate('/signin')
        }
        else {
            setLiked(!liked)
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

    useEffect(() => {
        request
            .get(`/me/showComment/${articleId}`)
            .then(res => setComment(res.data.comment))
            .catch(err => console.log(err))
    },[articleId, loading])
    
    const handlePopup = () => {
        const modal = document.querySelector('.' + cx('modal'))
        modal.style.display = 'flex'
    }

    const handleClose = () => {
        const modal = document.querySelector('.' + cx('modal'))
        modal.style.display = 'none'
    }

    const handleFocus = () => {
        const commentBtn = document.querySelector('.' + cx('comment-btn'))
        commentBtn.style.display = 'flex'
    }

    const handleCancel = () => {
        const commentBtn = document.querySelector('.' + cx('comment-btn'))
        commentBtn.style.display = 'none'
    }

    const handleSubmit = () => {
        if (content) {
            request
                .post(`/me/comment/${articleId}`, {content: content, author: user._id, article: articleId})
                .then(data => {
                    request.put(`/me/article/${articleId}/comment`, { comments: data._id })
                    setLoading(!loading)
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        const submitBtn = document.querySelector('.' + cx('comment-submit'))
        if (content && submitBtn) {
            submitBtn.style.backgroundImage = '-webkit-linear-gradient(0deg, #8490ff 0%, #62bdfc 100%)'
            submitBtn.style.cursor = 'pointer'
        }
        else if (submitBtn)
        {
            submitBtn.style.backgroundImage = 'initial'
            submitBtn.style.cursor = 'default'
        }
    })

    const handleShowUp = (index) => {
        const settingPanel = document.querySelectorAll('.' + cx('setting-panel'))
        settingPanel.forEach((item) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == index) {
                // item.classList.toggle(cx('setting-close-panel'))
                if (item.style.display === 'none')
                    item.style.display = 'block'
                else item.style.display = 'none'
            }
        })
        // settingPanel.style.display = 'block'
    }

    // const [editMode, setEditMode] = useState(false)
    const handleEdit = (index) => {
        // setEditMode(true)
        const settingPanel = document.querySelectorAll('.' + cx('setting-panel'))
        settingPanel.forEach((item) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == index){
                // item.classList.toggle(cx('setting-close-panel'))
                item.style.display = 'none'
            }
        })
        // settingPanel.style.display = 'none'

        const settingSave = document.querySelectorAll('.' + cx('setting-save'))
        settingSave.forEach((item) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == index)
                // item.classList.toggle(cx('setting-close-save'))
                item.style.display = 'block'
        })
        // settingSave.style.display = 'block'
        const contentComment = document.querySelectorAll('.' + cx('comment-row__detail-content'))
        contentComment[index].style.display = 'none'
        const newComment = document.querySelectorAll('.' + cx('new-comment'))
        newComment[index].style.display = 'block'
    }

    const handleAlert = (commentId) => {
        const modalComment = document.querySelector('.' + cx('modal'))
        modalComment.style.display = 'none'
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'block'
        const confirm = document.querySelector('.' + cx('confirm'))
        confirm.onclick = function () {
            request.remove(`/me/comment/delete/${commentId}`)
            request.remove(`/me/article/${articleId}/comment/delete/${commentId}`)
            setLoading(!loading)
            modal.style.display = 'none'
        }
    }

    const handleCancelWarning = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'none'
    }

    // const handleDelete = (commentId) => {
    //     request
    //         .remove(`/me/comment/delete/${commentId}`)
    //         .then(setLoading(!loading))
    //         .catch(error => console.log(error))
    // }

    const [newContent, setNewContent] = useState('')
    const handleSave = (commentId, index) => {
        // setEditMode(false)
        const contentComment = document.querySelectorAll('.' + cx('comment-row__detail-content'))
        contentComment[index].style.display = 'block'
        const newComment = document.querySelectorAll('.' + cx('new-comment'))
        newComment[index].style.display = 'none'
        request
            .put(`/me/comment/update/${commentId}`, {content: newContent})
            .then(setLoading(!loading))
            .catch(error => console.log(error))
    }

    const handleCancelEdit = (index) => {
        // const setting = document.querySelector('.' + cx('setting-btn'))
        // const settingPanel = document.querySelectorAll('.' + cx('setting-panel'))
        const settingSave = document.querySelectorAll('.' + cx('setting-save'))
        // settingPanel.forEach((item) => {
        //     // eslint-disable-next-line eqeqeq
        //     if (item.id == index)
        //         item.style.display = 'none'
        // })
        settingSave.forEach((item) => {
            // eslint-disable-next-line eqeqeq
            if (item.id == index)
                // item.classList.toggle(cx('setting-close-save'))
                item.style.display = 'none'
        })
        // setting.style.display = 'none'
        // settingPanel[index].style.display = 'none'
        // settingSave[index].style.display = 'none'
        // setLoading(!loading)
        const contentComment = document.querySelectorAll('.' + cx('comment-row__detail-content'))
        contentComment[index].style.display = 'block'
        const newComment = document.querySelectorAll('.' + cx('new-comment'))
        newComment[index].style.display = 'none'
        
        // setEditMode(false)
    }
    
    return (
        <div>
            <div className={cx('wrapper')}>
                <RingLoader color="navy" loading={loading} cssOverride={override}/>
                <div className={cx('published')}>
                    Published
                    <span className={cx('published-date')}>
                        {moment([article.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([article.createdAt], 'THH:mm:ss Z').format('LT')}
                    </span>
                </div>
                <h1 className={cx('title')}>{article.title}</h1>

                <ul className={cx('tag')}>
                    {tag.map((item, index) => (
                        <li key={index} className={cx('tag-name')}>
                            <Link to={`/post/${item}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className={cx('content')} dangerouslySetInnerHTML={{ __html: article.content }}></p>

                <div className={cx('utils')}>
                    <div className={cx('like')}>
                        <div className={cx('heart-icon')} onClick={() => handleCountLiked(article._id)}>
                            {savedId.includes(article._id) ? (
                                <FontAwesomeIcon icon={fasHeart}/>
                            ) : (
                                <FontAwesomeIcon icon={farHeart}/>
                            )}
                        </div>
                        {/* <span className={cx('number')}>{article.likes}</span> */}
                    </div>
                    <div className={cx('comment')} onClick={handlePopup}>
                        <div className={cx('comment-icon')}>
                            <FontAwesomeIcon icon={faComment}/>
                        </div>
                        <span className={cx('number')}>{comment.length}</span>
                    </div>
                </div>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <img className={cx('user-avatar-img')} src={author.avatar} alt="avatar"/>
                    </div>
                    <Link to={`/profile/${author._id}/${author.slug}`} className={cx('user-name')}>{author.username}</Link>
                </div>

                {sameAuthor.length !== 0 && (
                    <div className={cx('same-author')}>
                        <h2 className={cx('post-list-title')}>
                            Other posts of <strong>{article.author.username}</strong>
                        </h2>
                        <ul className={cx('post-list')}>
                            {sameAuthor.filter((item, idx) => idx < 5).map((post, index) => (
                                <li key={index} className={cx('post-item')}>
                                    <FontAwesomeIcon icon={faAnglesRight} className={cx('icon-left')}/>
                                    <Link to={`/detail/${post._id}/${post.slug}`} onClick={() => setLoading(!loading)}>
                                        {post.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Comment modal */}
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body')}>
                        <div className={cx('comment-label')}>
                            <h2 className={cx('comment-heading')}>
                                {comment.length}
                                {comment.length > 1 ? ' Comments' : ' Comment'}
                            </h2>
                            <div className={cx('close-btn')} onClick={handleClose}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>
                        </div>

                        {id && 
                            <>
                                <input type='text' placeholder='Write your comment...' className={cx('comment-input')} onFocus={handleFocus} onChange={(e) => setContent(e.target.value)}/>
                            
                                <div className={cx('comment-btn')}>
                                    <div className={cx('comment-cancel')} onClick={handleCancel}>Cancel</div>
                                    <div className={cx('comment-submit')} onClick={handleSubmit}>Comment</div>
                                </div>
                            </>
                        }

                        <br/>
                        {comment.map((comment, index) => (
                            <div key={index} className={cx('comment-row')}>
                                <Link to={`/profile/${comment.author._id}/${comment.author.slug}`}>
                                    <img className={cx('comment-row__avatar')} src={comment.author.avatar} alt="name"/>
                                </Link>
                                <div className={cx('comment-row__wrapper')}> {/*onMouseOver={() => handleMouseOver(id === comment.author._id ? index : -1)} onMouseLeave={() => handleMouseLeave(id === comment.author._id ? index : -1)}> */}
                                    <div className={cx('comment-row__detail')}>
                                        <h3 className={cx('comment-row__detail-author')}>
                                            <Link to={`/profile/${comment.author._id}/${comment.author.slug}`}>
                                                <strong>{comment.author.username}</strong>
                                            </Link>
                                        </h3>
                                        <input className={cx('new-comment')} defaultValue={comment.content} onChange={(e) => setNewContent(e.target.value)}/>
                                    
                                        <p className={cx('comment-row__detail-content')}>{comment.content}</p>
                                    </div>
                                    <div className={cx('comment-row__utils')}>
                                        {/* <span className={cx('comment-row__util')}>Like</span>
                                        <span className={cx('comment-row__util')}>Reply</span> */}

                                        {id === comment.author._id && (
                                            <div id={index} className={cx('comment-row__util', 'setting-btn')} onClick={() => handleShowUp(index)}>
                                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                                                <div id={index} className={cx('setting-panel')}>
                                                    <div className={cx('setting-item')} onClick={() => handleEdit(index)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-left')}/>
                                                        Edit
                                                    </div>
                                                    <div className={cx('setting-item')} onClick={() => handleAlert(comment._id)}>
                                                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-left')}/>
                                                        Delete
                                                    </div>
                                                </div>
                                                <div id={index} className={cx('setting-save')}>
                                                    <div className={cx('save-btn')} onClick={() => handleCancelEdit(index)}>Cancel</div>
                                                    <div className={cx('save-btn')} onClick={() => handleSave(comment._id, index)}>Save</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>

            </div>
            
            <div className={cx('modal__alert')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body-alert')}>
                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('question-icon')}/>
                    <div className={cx('modal__confirm')}>
                        <h2>Are you sure to delete this comment?</h2>
                        <span>You can't undo this operation</span>
                    </div>
                    <div className={cx('confirm-btn')}>
                        <div className={cx('confirm')}>Yes</div>
                        <div onClick={handleCancelWarning}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailArticle;
