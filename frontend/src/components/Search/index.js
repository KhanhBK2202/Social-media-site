import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [search, setSearch] = useState('')
    if (search !== '') {
        const input = document.querySelector('input')
        input.style.width = '350px'
    }
    
    return (
        <>
            <div className={cx('container-search-btn')}>
                <input type="text" placeholder="Search for articles (or @users)" onChange={e => setSearch(e.target.value)}/>
                {search.startsWith('@') ? (
                    <Link to={`/users/search/${search}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('container-search-logo')}/>
                    </Link>
                ) : (
                    <Link to={`/articles/search/${search}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('container-search-logo')}/>
                    </Link>
                )}
            </div>
        </>
    )
}

export default Search;
