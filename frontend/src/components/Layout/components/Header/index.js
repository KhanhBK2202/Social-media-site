import classNames from 'classnames/bind';
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { createAxios } from '../../../../createInstance'
import styles from './Header.module.scss';
import * as request from '~/utils/request';
import { logOutSuccess } from '~/redux/authSlice';
import Search from '~/components/Search';
import { faAnglesRight, faArrowRightFromBracket, faBars, faHouse, faShieldHalved, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let axiosJWT = createAxios(user, dispatch, logOutSuccess)
    const handleLogout = () => {
        request.logOut(dispatch, id, navigate, accessToken, axiosJWT)
    }

    useEffect(() => {
        var darkBtn = document.querySelector('.' + cx('dark-btn'))
        darkBtn.onclick = function () {
            darkBtn.classList.toggle(cx('dark-on'))
            document.body.classList.toggle(cx('dark-theme'))

            if (localStorage.getItem('theme') === 'light') {
                localStorage.setItem('theme', 'dark')
            }
            else {
                localStorage.setItem('theme', 'light')
            }
        }

        if (localStorage.getItem('theme') === 'light') {
            darkBtn.classList.remove(cx('dark-on'))
            document.body.classList.remove(cx('dark-theme'))
        }
        else if (localStorage.getItem('theme') === 'dark') {
            darkBtn.classList.add(cx('dark-on'))
            document.body.classList.add(cx('dark-theme'))
        }
        else {
            localStorage.setItem('theme', 'light')
        }
    })
    
    return (
        <header className={cx('header')}>
            <Link to="/" className={cx('logo')}>CyberBlog</Link>
            <Search />
            <div className={cx('nav')}>
                {user && user.isAdmin && <Link to='/dashboard' className={cx('nav-item')}>
                    <FontAwesomeIcon icon={faShieldHalved}/>
                </Link>}
                <Link to="/" className={cx('nav-item')}>Home</Link>
                {user ? (
                    <>
                        <Link to={`/profile/${user._id}/${user.slug}`} className={cx('nav-item')}>
                            Hi, <strong>{user.username}</strong>
                        </Link>
                        <Link to="/signin" className={cx('nav-item')} onClick={handleLogout}>
                            Log out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className={cx('nav-item')}>Sign in</Link>
                        <Link to="/signup" className={cx('nav-item')}>Sign up</Link>
                    </>
                )}
                <div className={cx('dark-btn', 'nav-item')}>
                    <span></span>
                </div>
                {/* <label className={cx('nav-item')}>
                    <input type='checkbox' className={cx('checkbox')}/>
                    <span className={cx('check')}></span>
                </label> */}
            </div>
            
            {/* Sidebar */}
            <label htmlFor="sidebar-menu-input" className={cx('header__top-list', 'header__top-item-btn')}>
                <FontAwesomeIcon icon={faBars} className={cx('header__top-item')}/>
            </label>
            <input type="checkbox" name="" className={cx('sidebar-input')} id="sidebar-menu-input"></input>
            <label htmlFor="sidebar-menu-input" className={cx('sidebar-overlay')}></label>
            <div className={cx('sidebar-menu')}>
                <label htmlFor="sidebar-menu-input" className={cx('close-btn')}>
                    <FontAwesomeIcon icon={faAnglesRight}/>
                </label>
                <div className={cx('sidebar-menu-list')}>
                    <Link to="/" className={cx('sidebar-menu-item')}>
                        Home
                    </Link>
                    {user ? (
                        <>
                            <Link to={`/profile/${user._id}/${user.slug}`} className={cx('sidebar-menu-item')}>Hi, <strong>{user.username}</strong></Link>
                            <Link to="/signin" className={cx('sidebar-menu-item')} onClick={handleLogout}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className={cx('sidebar-menu-item')}>Sign in</Link>
                            <Link to="/signup" className={cx('sidebar-menu-item')}>Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
