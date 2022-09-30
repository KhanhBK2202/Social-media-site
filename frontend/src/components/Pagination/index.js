import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [load, setLoad] = useState(false)
    useEffect(() => {
        const pageItem = document.querySelectorAll('.' + cx('page-item'))
        if (pageItem.length === 0)  
            setLoad(!load)
        
        else if (pageItem.length !== 0)
            pageItem[0].classList.toggle(cx('active'))
    },[])

    const handlePaginate = (number) => {
        paginate(number)
        const pageItem = document.querySelectorAll('.' + cx('page-item'))
        for (const item of pageItem){
            if (item.classList.value.includes(cx('active'))) {
                item.classList.toggle(cx('active'))
                break
            }
        }
        pageItem[number-1].classList.toggle(cx('active'))
    }

    return (
        <nav>
            <ul className={cx('pagination')}>
                {pageNumbers.map(number => (
                    <li key={number} className={cx('page-item')}>
                        <Link onClick={() => handlePaginate(number)} to='' className={cx('page-link')}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;