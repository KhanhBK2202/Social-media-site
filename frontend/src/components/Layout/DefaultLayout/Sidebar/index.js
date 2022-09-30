import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faAddressCard, faAnglesLeft, faBriefcase, faGear, faNewspaper, faPaperPlane, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss'

moment().format();
const cx = classNames.bind(styles)

function Sidebar({setting, tabs, panes, active}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const id = user?._id
    const navigate = useNavigate()

    const { userId } = useParams()
    
    tabs(document.querySelectorAll('.tab-i'));
    panes(document.querySelectorAll('.tab-p'));
    active(document.querySelector('.' + cx('active-tab')));

    return (
        <div className={cx('left-col')}>

            <ul className={cx('user-info')}>
                <li className={cx('user-info-item', 'tab-i', 'active-tab')}>
                    <div className={cx('user-info-item__link', 'active-link')}>
                        <div className={cx('item')}>
                            {setting === 'true' ? (
                                <>
                                    <FontAwesomeIcon icon={faUser} className={cx('item-icon')}/>
                                    Profile
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faNewspaper} className={cx('item-icon')}/>
                                    Posts
                                </>
                            )}
                        </div>
                        &gt;
                    </div>
                </li>

                {setting === 'false' && (
                    <li className={cx('user-info-item', 'tab-i')}>
                        <div className={cx('user-info-item__link')}>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faAddressCard} className={cx('item-icon')}/>
                                About
                            </div>
                            &gt;
                        </div>
                    </li>
                )}

                {setting === 'true' && <li className={cx('user-info-item', 'tab-i')}>
                    <div className={cx('user-info-item__link')}>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faAddressBook} className={cx('item-icon')}/>
                            Bio
                        </div>
                        &gt;
                    </div>
                </li>}

                {setting === 'true' && (
                    <li className={cx('user-info-item', 'tab-i')}>
                        <div className={cx('user-info-item__link')}>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faStar} className={cx('item-icon')}/>
                                Skills
                            </div>
                            &gt;
                        </div>
                    </li>
                )}

                <li className={cx('user-info-item', 'tab-i')}>
                    <div className={cx('user-info-item__link')}>
                        <div className={cx('item')}>
                            <FontAwesomeIcon icon={faBriefcase} className={cx('item-icon')}/>
                            Work and Education
                        </div>
                        &gt;
                    </div>
                </li>

                {setting === 'true' && (
                    <li className={cx('user-info-item', 'tab-i')}>
                        <div className={cx('user-info-item__link')}>
                            <div className={cx('item')}>
                                <FontAwesomeIcon icon={faPaperPlane} className={cx('item-icon')}/>
                                Social Networks
                            </div>
                            &gt;
                        </div>
                    </li>
                )}
                
            </ul>


            <div className={cx('tools')}>
                {id && id === userId && (
                    <div className={cx('tools-item')}>
                        {setting === 'true' ? (
                            <Link to="/" className={cx('item')} onClick={() => {navigate(-1)}}>
                                <FontAwesomeIcon icon={faAnglesLeft} className={cx('item-icon')}/>
                                <span className={cx('tools-label')}> Go back</span>
                            </Link>
                        ) : (
                            <Link to={`/setting/${userId}`} className={cx('item')}>
                                <FontAwesomeIcon icon={faGear} className={cx('item-icon')}/>
                                <span className={cx('tools-label')}>Setting</span>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
