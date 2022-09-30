import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <Link to="/" className={cx('logo')}>CyberBlog</Link>
            <div className={cx('description')}>
                Smarter meetings, all in one place
            </div>
            <div className={cx('copyright')}>
                <span>&copy; CyberBlog 2022</span>
                <ul className={cx('copyright-list')}>
                    <li className={cx('copyright-item')}>Term</li>
                    <li className={cx('copyright-item')}>Cookie Policy</li>
                    <li className={cx('copyright-item')}>Privacy Policy</li>
                    <li className={cx('copyright-item')}>License</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
