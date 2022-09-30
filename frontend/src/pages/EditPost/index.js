import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './EditPost.module.scss';
import RichTextEditor from '~/components/RichTextEditor';
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function EditPost() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [tag, setTag] = useState([])
    const [newTag, setNewTag] = useState()
    const [content, setContent] = useState('')
    const [tagArticle, setTagArticle] = useState([])
    const sendContent = (data) => {
        setContent(data)
    }

    const [articles, setArticles] = useState([])
    const { articleId } = useParams()

    const handleSubmit = () => {
        if (tagArticle.length === 0 && !newTag){
            const modal = document.querySelector('.modal__alert')
            const modalCate = document.querySelector('.modal__alert h2')
            modalCate.innerText = 'You must choose at least one tag'
            modal.style.display = 'block'
            return
        }

        var listTag = []
        if (newTag) {
            listTag = newTag.split(',');
            listTag.forEach((item, index) => {
                listTag[index] = item.trim()
            })
        }

        for (const item1 of tag) {
            for (const item2 of listTag) {
                if (item1.name === item2) {
                    const modal = document.querySelector('.modal__alert')
                    const modalCate = document.querySelector('.modal__alert h2')
                    modalCate.innerText = 'The tag has already exist'
                    modal.style.display = 'block'
                    return
                }
            }
        }
        
        if (!title) {
            const modal = document.querySelector('.modal__alert')
            const modalCate = document.querySelector('.modal__alert h2')
            modalCate.innerText = 'Must have title'
            modal.style.display = 'block'
            return
        }
        // if (newTag) {
        //     request.post('/tag/create', { name: newTag })
        //     tagArticle.push(newTag)
        // }
        var listNewTag
        if (listTag) {
            for (const item of listTag) {
                request.post('/tag/create', { name: item })
            }
            listNewTag = tagArticle.concat(listTag)
        }
        request.put(`/me/update/article/${articleId}`, {title: title, tags: listNewTag, content})
        navigate(-1)
    }

    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
        request
            .get(`/me/article/${articleId}`)
            .then(function(res) {
                setTitle(res.data.articles.title)
                setArticles(res.data.articles)
                setTagArticle(res.data.articles.tags)
            })
            .catch(e => console.log(e))
    },[articleId, navigate, user])

    useEffect(() => {
        request
            .get('/tag/show')
            .then(res => setTag(res.data.tags))
            .catch(e => console.log(e))
    },[])

    useEffect(() => {
        const tagsName = document.querySelectorAll('.' + cx('tag-name'))
        tagsName.forEach((tag, index) => {
            if (tagArticle.includes(tag.innerText)) {
                tag.style.backgroundColor = '#e9e9eb'
                tag.style.color = 'var(--black)'
            }
        })
    })

    useEffect(() => {
        const tagsName = document.querySelectorAll('.' + cx('tag-name'))
        tagsName.forEach((tag, index) => {
            tag.onclick = function () {
                if (tagArticle.includes(tag.innerText))
                {
                    tag.style.backgroundColor = 'var(--body-color)'
                    tag.style.color = 'var(--text-color)'
                    tagArticle.splice(index, 1)
                    for( var i = 0; i < tagArticle.length; i++){
                        if (tagArticle[i] === tag.innerText) { 
                            tagArticle.splice(i, 1); 
                        }
                    }
                }
                else {
                    tag.style.backgroundColor = '#e9e9eb'
                    tag.style.color = 'var(--black)'
                    tagArticle.push(tag.innerText)
                }
            }
        })
    })

    const handleCancel = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'none'
    }

    return (
        <>
            <div className={cx('editor')}>
                <input type="text" id="title" defaultValue={articles.title} className={cx('title-input')} onChange={(e) => {setTitle(e.target.value)}}/>
                {articles.content &&
                    <RichTextEditor sendContent={sendContent} content={articles.content}/>
                }
            </div>
            <div className={cx('tag')}>
                <ul className={cx('available-tag')}>
                    {tag.map((item, index) => (
                        <li key={index} className={cx('tag-name')}>{item.name}</li>
                    ))}
                </ul>
                <input type="text" id="tag" placeholder="Create your own tag here or choose one of above tags" className={cx('tag-input')} autoComplete='off' onChange={(e) => {setNewTag(e.target.value)}}/>
            </div>
            <div className={cx('btn')}>
                <button type="submit" onClick={handleSubmit} className={cx('sbm-btn')}>Save</button>
            </div>

            <div className={cx('modal__alert')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body-alert')}>
                    <FontAwesomeIcon icon={faCircleXmark} className={cx('question-icon')}/>
                    <div className={cx('modal__confirm')}>
                        <h2></h2>
                    </div>
                    <div className={cx('confirm-btn')}>
                        <div className={cx('confirm')} onClick={handleCancel}>OK</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditPost;
