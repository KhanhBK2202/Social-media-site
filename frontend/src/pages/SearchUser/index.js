import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";

import styles from './SearchUser.module.scss'
import * as request from '~/utils/request'
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);
const override = {
    position: 'relative',
    top: '150px',
    display: "block",
    margin: "0 auto",
};

function SearchUser() {
    // const user = useSelector((state) => state.auth.login?.currentUser)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    var { searchUser } = useParams()
    searchUser = searchUser.slice(1)
    useEffect(() => {
        if (searchUser) {
            request
                .get(`/user/search/${searchUser}`)
                .then(function(res) {
                    setLoading(false)
                    setUsers(res.data.users)
                })
                .catch(e => console.log(e))
        }
    },[searchUser])

    return (
        <div className={cx('wrapper')}>
            <RingLoader color="navy" loading={loading} cssOverride={override}/>
            <h1 className={cx('user-total')}>
                {users.length} 
                {users.length > 1 ? ' results' : ' result'}
            </h1>
            {currentPosts.map((result, index) => (
                <Link to={`/profile/${result._id}/${result.slug}`} key={index} className={cx('user')}>
                    <img src={result.avatar} className={cx('user-avatar')} alt='...'/>
                    <div>
                        <h2 className={cx('user-name')}>{result.username}</h2>
                        <span className={cx('user-bio')}>{result.bio}</span>
                    </div>
                </Link>
            ))}

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={users.length}
                paginate={paginate}
            />

        </div>
    )
}

export default SearchUser;