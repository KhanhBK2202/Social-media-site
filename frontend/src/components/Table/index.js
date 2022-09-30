import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Table.module.scss'
import moment from 'moment';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import * as request from '~/utils/request';
import { useState } from 'react';

moment().format()
const cx = classNames.bind(styles);

function Table({colNames, list, category, loading}) {

    const [change, setChange] = useState(false)
    const handleAlert = (deletedId, cate, authorId) => {
        const modal = document.querySelector('.modal__alert')
        const modalCate = document.querySelector('.modal__alert h2')
        if (cate === 'user')
            modalCate.innerText = 'Are you sure to delete this user?'
        else if (cate === 'post')
            modalCate.innerText = 'Are you sure to delete this post?'
        else if (cate === 'comment')
            modalCate.innerText = 'Are you sure to delete this comment?'
        modal.style.display = 'block'
        const confirm = document.querySelector('.' + cx('confirm'))
        confirm.onclick = function () {
            setChange(!change)
            loading(change)
            if (cate === 'user') {
                request.remove(`/user/delete/${deletedId}`)
            }
            else if (cate === 'post') {
                request.remove(`/me/article/delete/${deletedId}`)
                request.remove(`/me/allComments/delete/${deletedId}`)
                request.remove(`/user/${authorId}/article/delete/${deletedId}`)
            }
            else if (cate === 'comment') {
                request.remove(`/me/comment/delete/${deletedId}`)
                request.remove(`/me/article/${authorId}/comment/delete/${deletedId}`)
            }
            modal.style.display = 'none'
        }
    }

    const handleCancel = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'none'
    }

    return (
        <div className={cx('container')}>
            <table className={cx('table')}>
                <thead >
                    <tr>
                        {colNames.map((headerItem, index) => (
                            <th key={index} style={{textAlign: 'center', backgroundColor: 'var(--body-color)'}}>
                                {headerItem.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {category === 'user' &&
                        list.map((item, index) => (
                            <tr key={index} style={{textAlign: 'center'}}>
                                <td>{index + 1}</td>
                                <td >
                                    <img src={item.avatar} alt='avatar' style={{borderRadius: '50%', width: '32px', height: '32px'}}/>
                                </td>
                                <td>
                                    <Link to={`/profile/${item._id}/${item.slug}`}>
                                        {item.username}
                                    </Link>
                                </td>
                                <td>{item.email}</td>
                                <td>{item.articles.length}</td>
                                <td>{item.followers.length}</td>
                                <td>{item.following.length}</td>
                                <td>
                                    {moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([item.createdAt], 'THH:mm:ss Z').format('LT')}
                                </td>
                                <td>
                                    {!item.isAdmin && 
                                        <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} onClick={() => handleAlert(item._id, 'user', '')}/>
                                    }
                                </td>
                            </tr>
                    ))}
                    {category === 'article' && (
                        list.map((item, index) =>
                            <tr key={index} style={{textAlign: 'center'}}>
                                <td>{index + 1}</td>
                                <td >
                                    <Link to={`/detail/${item._id}/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/profile/${item.author._id}/${item.author.slug}`}>
                                        {item.author.username}
                                    </Link>
                                </td>
                                <td>{item.likes}</td>
                                <td>{item.comments ? item.comments.length : '0'}</td>
                                <td>
                                    {moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([item.createdAt], 'THH:mm:ss Z').format('LT')}
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} onClick={() => handleAlert(item._id, 'post', item.author._id)}/>
                                </td>
                            </tr>
                    ))}
                    {category === 'comment' && (
                        list.map((item, index) =>
                            <tr key={index} style={{textAlign: 'center'}}>
                                <td>{index + 1}</td>
                                <td>{item.content}</td>
                                <td>
                                    <Link to={`/profile/${item.author._id}/${item.author.slug}`}>
                                        {item.author.username}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/detail/${item.article._id}/${item.article.slug}`}>
                                        {item.article.title}
                                    </Link>
                                </td>
                                <td>
                                    {moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([item.createdAt], 'THH:mm:ss Z').format('LT')}
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} onClick={() => handleAlert(item._id, 'comment', item.article._id)}/>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>

            <div className={cx('modal__alert')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body-alert')}>
                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('question-icon')}/>
                    <div className={cx('modal__confirm')}>
                        <h2></h2>
                        <span>You can't undo this operation</span>
                    </div>
                    <div className={cx('confirm-btn')}>
                        <div className={cx('confirm')}>Yes</div>
                        <div onClick={handleCancel}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;