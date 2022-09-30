import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import * as request from '~/utils/request'
import { useState } from 'react';

const cx = classNames.bind(styles);

function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        request.registerUser(newUser, dispatch, navigate)
    }

    return (
        <div className={cx('body')}>
            <h1 className={cx('heading')}>Create new account</h1>
            <div className={cx('member')}>
                <h2 className={cx('member-title')}>Already A Member?</h2>
                <Link to="/signin" className={cx('member-login')}>Sign in</Link>
            </div>

            <div className={cx('mt-5', 'wrapper')}>
                <div className={cx('form')}>
                    <input type="text" id="username" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setUsername(e.target.value)}}/>
                    <label htmlFor="username" className={cx('form__label')}>Username</label>
                </div>
                <div className={cx('form')}>
                    <input type="text" id="email" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setEmail(e.target.value)}}/>
                    <label htmlFor="email" className={cx('form__label')}>Email</label>
                </div>
                <div className={cx('form')}>
                    <input type="password" id="password" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setPassword(e.target.value)}}/>
                    <label htmlFor="password" className={cx('form__label')}>Password</label>
                </div>

                <button onClick={handleSubmit} type="submit" className={cx('signup-btn')}>Create account</button>
            </div>
        </div>
    );
}

export default Signup;
