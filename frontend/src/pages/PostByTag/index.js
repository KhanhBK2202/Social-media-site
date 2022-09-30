import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import RingLoader from "react-spinners/RingLoader";

import styles from './PostByTag.module.scss'
import * as request from '~/utils/request'
import Pagination from '~/components/Pagination';
import HomePosts from '../HomePosts';

const cx = classNames.bind(styles);
const override = {
    position: 'relative',
    top: '50%',
    display: "block",
    margin: "0 auto",
};

function PostByTag() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [liked, setLiked] = useState(false)
    const [articles, setArticles] = useState([])
    const [savedArticles, setSavedArticles] = useState([])
    const [tag, setTag] = useState([])
    const [loading, setLoading] = useState(true)
    var savedId = []

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
    // const currentAuthors = author.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const { tagName } = useParams()
    useEffect(() => {
        request
            .get(`/me/posts/${tagName}`)
            .then((res) => {
                setLoading(false)
                setArticles(res.data.articles)
            })
            .catch(e => console.log(e))
    },[tagName, liked])

    useEffect(() => {
        if (user) {
            request
                .get(`/user/${user._id}`)
                .then(res => setSavedArticles(res.data.profile.articlesLike))
                .catch(e => console.log(e))
        }
    },[user])

    savedArticles.forEach(article => {
        savedId.push(article._id)
    })

    const handleCountLiked = (like) => {
        setLiked(like)
    }

    useEffect(() => {
        request
            .get('/tag/show')
            .then(res => setTag(res.data.tags))
            .catch(e => console.log(e))
    },[])

    // const handleBookmarked = (like) => {
    //     setLiked(like)
    // }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <h1 className={cx('heading')}>{tagName}</h1>
                <h1 className={cx('heading')}>
                    {currentPosts.length} 
                    {currentPosts.length > 1 ? ' Results' : ' Result'} 
                </h1>
                <RingLoader color="navy" loading={loading} cssOverride={override}/>
                <HomePosts posts={currentPosts} setLike={handleCountLiked} setBookmark={handleCountLiked}/>
                
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={articles.length}
                    paginate={paginate}
                />
            </div>

            <div className={cx('right')}>
                <div className={cx('right-inner')}>
                    <ul className={cx('tag')}>
                        {tag.map((item, index) => (
                            <li key={index} className={cx('tag-name')}>
                                <Link to={`/post/${item.name}`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default PostByTag;