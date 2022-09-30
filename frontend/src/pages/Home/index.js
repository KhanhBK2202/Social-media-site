import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import RingLoader from "react-spinners/RingLoader";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import styles from './Home.module.scss'
import * as request from '~/utils/request'
import Pagination from '~/components/Pagination';
import Banner from '~/components/Layout/components/Banner';
import Slider from '~/components/Slider';
import HomePosts from '../HomePosts';
import Weather from '~/components/Weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

moment().format();
const cx = classNames.bind(styles);
const override = {
    position: 'relative',
    top: '50%',
    display: "block",
    margin: "0 auto",
};

function Home() {
    useEffect(() => {
        AOS.init({
            duaration: 3000
        })
    },[])
    // const user = useSelector((state) => state.auth.login?.currentUser)
    const [liked, setLiked] = useState(false)
    const [articles, setArticles] = useState([])
    // const [savedArticles, setSavedArticles] = useState([])
    const [tag, setTag] = useState([])
    const [loading, setLoading] = useState(true)
    // var savedId = []
    const [trending, setTrending] = useState([])
    const [followers, setFollowers] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        request
            .get('/me/stored/articles')
            .then(function(res) {
                setLoading(false)
                setArticles(res.data.articles)
            })
            .catch(e => console.log(e))
    },[liked])

    const handleCountLiked = (like) => {
        setLiked(like)
    }
    // const handleBookmarked = (like) => {
    //     setLiked(like)
    // }

    useEffect(() => {
        request
            .get('/tag/show')
            .then(res => setTag(res.data.tags))
            .catch(e => console.log(e))
    },[])

    useEffect(() => {
        request
            .get('/me/articles/trending')
            .then(res => setTrending(res.data.articles))
            .catch((err => console.log(err)))
    },[])

    useEffect(() => {
        request
            .get('/user/top/followers')
            .then(res => setFollowers(res.data.users))
            .catch((err => console.log(err)))
    },[])

    const handleViews = (articleId) => {
        request.put(`/article/views/${articleId}`)
    }

    const [searchResult, setSearchResult] = useState('')
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        for (const item of tag) {
            if (item.name === searchResult) {
                setFlag(true)
                return
            }
            setFlag(false)
        }
    },[searchResult, tag])
    return (
        <>
            <Banner/>
            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <RingLoader color="navy" loading={loading} cssOverride={override}/>
                    <HomePosts posts={currentPosts} setLike={handleCountLiked} setBookmark={handleCountLiked}/>
                    {/* {currentPosts.map((result, index) =>
                    (
                        <div key={index} id={result._id} className={cx('post')} style={{backgroundColor: index % 2 === 0 ? "white" : "#F5F5F5" }}>
                            <div className={cx('user')}>
                                <div className={cx('user-avatar')}>
                                    <img className={cx('user-avatar-img')} src={result.author.avatar} alt="avatar"/>
                                </div>
                                <Link to={`/profile/${result.author._id}`} className={cx('user-name')}>{result.author.username}</Link>
                            </div>
                            <Link to={`/detail/${result._id}`} onClick={() => handleViews(result._id)}>
                                <h2 className={cx('title')}>{result.title}</h2>
                            </Link>
                            <p className={cx('content')} dangerouslySetInnerHTML={{ __html: result.content }}></p>
                            <Link to={`/detail/${result._id}`} className={cx('read-more')}>
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
                                    <div className={cx('liked-number')}>
                                        {result.likes}
                                    </div>
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
                                        <li key={index} className={cx('tag-name-post')}>
                                            <Link to={`/post/${item}`}>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))} */}
                    
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={articles.length}
                        paginate={paginate}
                    />
                </div>

                <div className={cx('right')}>
                    {/* <div className={cx('right-inner')}> */}
                    <div className={cx('topic')}>
                        Topics
                        <input className={cx('topic-input')} placeholder='Search topic' onChange={(e) => setSearchResult(e.target.value)}/>
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-logo')} onClick={handleSearch}/> */}
                    </div>
                    {searchResult ? (
                        <ul className={cx('tag')}>
                            <li className={cx('tag-name')}>
                                {flag ? <Link to={`/post/${searchResult}`}>{searchResult}</Link> : 'No result'}
                            </li>
                        </ul>
                    ) : (
                        <ul className={cx('tag')}>
                            {tag.map((item, index) => (
                                <li key={index} className={cx('tag-name')}>
                                    <Link to={`/post/${item.name}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* </div> */}
                    

                    <div className={cx('trending')} data-aos="fade-left">
                        <h2 className={cx('trending-heading')}>Popular articles</h2>
                            
                        {trending.map((item, index) => (
                            <div key={index} className={cx('trending-post')}>
                                <span className={cx('trending-rank')}>
                                    0{index + 1}
                                </span>
                                <div className={cx('trending-detail')}>
                                    <Link to={`/detail/${item._id}/${item.slug}`} className={cx('trending-title')} onClick={() => handleViews(item._id)}>{item.title}</Link>
                                    <h4 className={cx('trending-author')}>
                                        <Link to={`/profile/${item.author._id}/${item.author.slug}`}>
                                            {item.author.username}
                                        </Link>
                                    </h4>
                                    <span className={cx('trending-date')}>
                                        {moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div data-aos="fade-left">
                        <Weather />
                    </div>
                </div>
                
            </div>
            
            <div data-aos="fade-up">
                <h1 className={cx('blogger-heading')}>Top 3 Bloggers</h1>
                <Slider followers={followers}/>
            </div>
        </>
    )
}

export default Home;