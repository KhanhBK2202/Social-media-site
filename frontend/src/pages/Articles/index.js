import { Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCircleQuestion, faCommentDots, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import styles from './Articles.module.scss'
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';

moment().format();
const cx = classNames.bind(styles)

function Articles({articles, id, userId, save, setDelete}) {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const handleViews = (articleId) => {
        request.put(`/article/views/${articleId}`)
    }

    const handleAlert = (articleId) => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'block'
        const confirm = document.querySelector('.' + cx('confirm'))
        confirm.onclick = function () {
            request.remove(`/me/article/delete/${articleId}`)
            request.remove(`/me/allComments/delete/${articleId}`)
            request.remove(`/user/${user._id}/article/delete/${articleId}`)
            window.location.reload()
        }
    }

    const handleCancel = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'none'
    }

    return (
        articles.map((article, index) => (
            <div key={index} className={cx('post')}>
                <h1 className={cx('post-title')}>
                    <Link to={`/detail/${article._id}/${article.slug}`} onClick={() => handleViews(article._id)} className={cx('post-link')}>
                        {article.title}
                    </Link>
                </h1>
                <div className={cx('post-util')}>
                    <div className={cx('post-createdAt')}>
                        <FontAwesomeIcon icon={faCalendarDays} className={cx('icon-left')}/>
                        {moment([article.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([article.createdAt], 'THH:mm:ss Z').format('LT')}
                    </div>
                    <div className={cx('post-createdAt')}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-left', 'post-comment-icon')}/>
                        <span className={cx('post-comment-link')}>
                            {article.views}
                            {article.views > 1 ? ' Views' : ' View'}
                        </span>
                    </div>
                    <div className={cx('post-comment')}>
                        <FontAwesomeIcon icon={faCommentDots} className={cx('icon-left', 'post-comment-icon')}/>
                        <span className={cx('post-comment-link')}>
                            {article.comments?.length}
                            {article.comments?.length > 1 ? ' Comments' : ' Comment'}
                        </span>
                    </div>

                    {id === userId && save === 'false' && (
                        <div className={cx('post-btn')}>
                            <Link to={`/edit/${article._id}`}>
                                <FontAwesomeIcon icon={faPenToSquare} className={cx('post-edit-icon')}/>
                            </Link>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('post-delete-icon')} onClick={() => handleAlert(article._id)}/>
                        </div>
                    )}
                    
                </div>
                
                <div className={cx('modal__alert')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body-alert')}>
                        <FontAwesomeIcon icon={faCircleQuestion} className={cx('question-icon')}/>
                        <div className={cx('modal__confirm')}>
                            <h2>Are you sure to delete this post?</h2>
                            <span>You can't undo this operation</span>
                        </div>
                        <div className={cx('confirm-btn')}>
                            <div className={cx('confirm')}>Yes</div>
                            <div onClick={handleCancel}>Cancel</div>
                        </div>
                    </div>
                </div>

                <p className={cx('post-content')} dangerouslySetInnerHTML={{ __html: article.content }}></p>
                <Link to={`/detail/${article._id}/${article.slug}`} className={cx('read-more')} onClick={() => handleViews(article._id)}>Read more &gt;</Link>
                <ul className={cx('tag')} style={{justifyContent: 'center'}}>
                    {article.tags.map((item, index) => (
                        <li key={index} className={cx('tag-name')}>
                            <Link to={`/post/${item}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ))
    )
}

export default Articles;
