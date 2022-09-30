import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SearchArticle.module.scss'
import * as request from '~/utils/request'
import Pagination from '~/components/Pagination';
import RingLoader from "react-spinners/RingLoader";
import HomePosts from '../HomePosts';

const cx = classNames.bind(styles);
const override = {
    position: 'relative',
    top: '150px',
    display: "block",
    margin: "0 auto",
};

function SearchArticle() {
    // const user = useSelector((state) => state.auth.login?.currentUser)
    const [liked, setLiked] = useState(false)
    const [articles, setArticles] = useState([])
    // const [savedArticles, setSavedArticles] = useState([])
    const [loading, setLoading] = useState(true)
    // var savedId = []

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const { searchArticle } = useParams()
    useEffect(() => {
        request
            .get(`/me/search/${searchArticle}`)
            .then(function(res) {
                setLoading(false)
                setArticles(res.data.articles)
            })
            .catch(e => console.log(e))
    },[searchArticle, liked])

    const handleCountLiked = (like) => {
        setLiked(like)
    }

    const handleBookmarked = (like) => {
        setLiked(like)
    }
    
    return (
        <div className={cx('wrapper')}>
            <RingLoader color="navy" loading={loading} cssOverride={override}/>
            <h1 className={cx('heading')}>
                {currentPosts.length} 
                {currentPosts.length > 1 ? ' Results' : ' Result'} 
            </h1>
            <HomePosts posts={currentPosts} setLike={handleCountLiked} setBookmark={handleBookmarked}/>
            
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={articles.length}
                paginate={paginate}
            />

        </div>
    )
}

export default SearchArticle;