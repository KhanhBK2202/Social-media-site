import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Signin.module.scss';
import * as request from '~/utils/request';
import { useDispatch } from 'react-redux'

const cx = classNames.bind(styles);

function Signin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = () => {
        const newUser = {
            email: email,
            password: password
        }
        request.loginUser(newUser, dispatch, navigate)
    }

    return (
        <div className={cx('body')}>
            <h1 className={cx('heading')}>Sign in</h1>
            <div className={cx('member')}>
                <h2 className={cx('member-title')}>Need An Account?</h2>
                <Link to="/signup" className={cx('member-login')}>Sign up</Link>
            </div>

            <div className={cx('mt-5', 'wrapper')}>
                <div className={cx('form')}>
                    <input type="text" id="email" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email" className={cx('form__label')}>Email</label>
                </div>
                <div className={cx('form')}>
                    <input type="password" id="password" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password" className={cx('form__label')}>Password</label>
                </div>

                <button onClick={handleSubmit} className={cx('signin-btn')}>Sign in</button>
            </div>
        </div>
    );
}

export default Signin;
