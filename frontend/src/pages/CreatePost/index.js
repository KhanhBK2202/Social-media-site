import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CreatePost.module.scss';
import RichTextEditor from '~/components/RichTextEditor';
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CreatePost() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [tag, setTag] = useState([])
    const [newTag, setNewTag] = useState()
    const author = user._id
    const [tags] = useState([])
    const [content, setContent] = useState('')
    const sendContent = (data) => {
        setContent(data)
    }
    
    const handleSubmit = () => {
        if (tags.length === 0 && !newTag){
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

        // if (listTag.length > 3){
        //     const modal = document.querySelector('.modal__alert')
        //     const modalCate = document.querySelector('.modal__alert h2')
        //     modalCate.innerText = 'You can create maximum 3 tags'
        //     modal.style.display = 'block'
        //     return
        // }

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

        var listNewTag
        if (listTag) {
            for (const item of listTag) {
                request.post('/tag/create', { name: item })
            }
            listNewTag = tags.concat(listTag)
        }

        request
            .post('/me/create/articles', {title, author, tags: listNewTag, content})
            .then(data => {
                request.put(`/user/${author}/article`, {articles: data._id})
            })
            .catch(e => console.log(e))

        navigate(-1)
    }

    useEffect(() => {
        if (!user) {
            navigate('/signin')
        }
    })

    useEffect(() => {
        request
            .get('/tag/show')
            .then(res => setTag(res.data.tags))
            .catch(e => console.log(e))
    },[])

    useEffect(() => {
        const tagsName = document.querySelectorAll('.' + cx('tag-name'))
        tagsName.forEach((tag, index) => {
            tag.onclick = function () {
                if (tags.includes(tag.innerText))
                {
                    tag.style.backgroundColor = 'var(--body-color)'
                    tag.style.color = 'var(--text-color)'
                    tags.splice(index, 1)
                    for( var i = 0; i < tags.length; i++){
                        if (tags[i] === tag.innerText) { 
                            tags.splice(i, 1); 
                        }
                    }
                }
                else {
                    tag.style.backgroundColor = '#e9e9eb'
                    tag.style.color = 'var(--black)'
                    tags.push(tag.innerText)
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
                <input type="text" id="title" placeholder="Write your title here" className={cx('title-input')} onChange={(e) => {setTitle(e.target.value)}}/>
                <RichTextEditor sendContent={sendContent} />
            </div>
            <div className={cx('tag')}>
                <ul className={cx('available-tag')}>
                    {tag.map((item, index) => (
                        <li key={index} className={cx('tag-name')}>{item.name}</li>
                    ))}
                </ul>
                <input type="text" id="tag" placeholder="Create your own tag here (separated by comma)" className={cx('tag-input')} autoComplete='off' onChange={(e) => {setNewTag(e.target.value)}}/>
            </div>
            <div className={cx('btn')}>
                <button type="submit" onClick={handleSubmit} className={cx('sbm-btn')}>Post</button>
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

export default CreatePost;
