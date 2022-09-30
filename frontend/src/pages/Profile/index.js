import { useEffect, useState, Suspense, lazy } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import moment from 'moment';
import CountUp from 'react-countup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faBriefcase, faCircleCheck, faGraduationCap, faXmark } from '@fortawesome/free-solid-svg-icons';
import RingLoader from 'react-spinners/RingLoader';

import styles from './Profile.module.scss'
import * as request from '~/utils/request';
import Sidebar from '../../components/Layout/DefaultLayout/Sidebar'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

moment().format();
const cx = classNames.bind(styles)
const Articles = lazy(() => import('../Articles'));
const override = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: "block",
    margin: "0 auto",
    zIndex: '1',
};

function Profile() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const accessToken = user?.accessToken
    const id = user?._id
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // let axiosJWT = createAxios(user, dispatch, logOutSuccess)
    // const handleLogout = () => {
    //     request.logOut(dispatch, id, navigate, accessToken, axiosJWT)
    // }
    const [loading, setLoading] = useState(false)

    const [profile, setProfile] = useState([])
    const [skill, setSkill] = useState([])
    const [work, setWork] = useState([])
    const [education, setEducation] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState(false)
    const [articles, setArticles] = useState([])
    const [savedArticles, setSavedArticles] = useState([])
    const [files, setFiles] = useState([])

    const uploadCover = (e) => {
        setFiles(e.target.files)
        
        const image = document.getElementById('output-cover');
        // const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        // const uploadLabel = document.querySelector('.' + cx('upload-label'))
        // uploadIcon.style.display = 'none'
        // uploadLabel.style.display = 'none'
        image.style.display = 'flex'

        var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                image.src = img.src;
		    };
        }
    }

    const uploadImage = (e) => {
        setFiles(e.target.files)
        
        const image = document.getElementById('output');
        // const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        // const uploadLabel = document.querySelector('.' + cx('upload-label'))
        // uploadIcon.style.display = 'none'
        // uploadLabel.style.display = 'none'
        image.style.display = 'flex'

        var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                image.src = img.src;
		    };
        }
    }

    var tabs = []
    var panes = []
    var tabActive
    var tabActiveClass
    const handleTabs = tab => tabs = tab

    const handlePanes = pane => panes = pane

    const handleActive = (activeTab) => {
        if (activeTab) {
            tabActive = activeTab
            tabActiveClass = activeTab.classList[2]
        }
    }

    useEffect(() => {
        // Handle tabs
        // const tabs = document.querySelectorAll('.tab-i');
        // const panes = document.querySelectorAll('.tab-p');
        tabs.forEach((tab, index) => {
            const pane = panes[index];
            tab.onclick = function () {

                tabs.forEach((tab, index) => {
                    if (tab.classList === tabActive.classList) {
                        tabActive.classList.remove(tabActiveClass);
                    }
                })
                // const tabActive = document.querySelector('.' + cx('active-tab'));
                // tabActive.classList.remove(cx('active-tab'));

                const paneActive = document.querySelector('.' + cx('active-pane'));
                paneActive.classList.remove(cx('active-pane'));
    
                this.classList.add(tabActiveClass);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                tabActive = tab
                pane.classList.add(cx('active-pane'));
            };
        })
    });

    const { userId } = useParams()
    useEffect(() => {
        request
            .get(`/user/${userId}`)
            .then((res) => {
                setProfile(res.data.profile)
                setSkill(res.data.profile.skills)
                setWork(res.data.profile.work)
                setEducation(res.data.profile.education)
                setFollowers(res.data.profile.followers)
                setFollowing(res.data.profile.following)
                setSavedArticles(res.data.bookmark)
            })
            .catch(e => console.log('Get user failed: ' + e))
    },[userId, follow, loading])

    useEffect(() => {
        request
            .get(`/me/written/${userId}`)
            .then(res => {
                // const refresh = document.querySelector('.' + cx('refresh-icon'))
                // if (refresh)
                //     refresh.classList.toggle(cx('refresh-move'))
                setArticles(res.data.articles)
            })
            .catch((err) => console.log('Get articles failed: ' + err))
    },[userId, loading])

    const handleFollow = (profileId) => {
        if (!user) navigate('/signin')
        if (followers.includes(id)) handleUnfollowing(id, profileId)
        else handleFollowing(id, profileId)
        setFollow(!follow)
    }

    const handleFollowing = (id1, id2) => {
        request.put(`/user/${id1}/follow/${id2}`, { following: id2 })
        request.put(`/user/${id2}/follow/${id1}`, { followers: id1 })
    }

    const handleUnfollowing = (id1, id2) => {
        request.remove(`/user/${id1}/unfollow/${id2}`)
        request.remove(`/user/${id1}/unfollowed/${id2}`)
    }

    useEffect(() => {
        const follow = document.querySelector('.' + cx('follow'))
        if (follow) {
            if (followers.includes(id))
                follow.innerText = 'Unfollow'
            else follow.innerText = 'Follow'
        } 
    })

    useEffect(() => {
        const line = document.querySelector('.' + cx('line'))
        const activeSection = document?.querySelector('.' + cx('active-section'))

        const tabs = document?.querySelectorAll('.' + cx('myArticles'))
        const panes = document.querySelectorAll('.' + cx('posts'))

        line.style.left = activeSection?.offsetLeft + "px";
        line.style.width = activeSection?.offsetWidth + "px";
        
        tabs.forEach((tab, index) => {
            const pane = panes[index];
            tab.onclick = function () {
                const activeSection = document?.querySelector('.' + cx('active-section'))
                activeSection.classList.remove(cx('active-section'));

                const activePaneSection = document.querySelector('.' + cx('active-pane-section'))
                activePaneSection.classList.remove(cx('active-pane-section'));

                line.style.left = this.offsetLeft + "px";
                line.style.width = this.offsetWidth + "px";

                this.classList.add(cx('active-section'));
                pane.classList.add(cx('active-pane-section'));
            };
        });
    })

    const handleUploadAvatar = (e) => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[1].style.display = 'flex'

        const image = document.getElementById('output');
        image.style.display = 'flex'
        if (id !== userId) {
            image.style.border = '1px solid #333'
            image.style.cursor = 'default'
        }
    }
    const handleSubmitImage = async (e) => {
        setLoading(true)
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'avatar')
        const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
            method: 'POST',
            body: data,
            // headers: { 'Content-Type': 'application/json' },
        })
        const file = await res.json()
        await request.put(`/user/update/${id}`, {avatar: file.secure_url})

        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[1].style.display = 'none'
        setLoading(false)
    }

    const handleUploadCover = (e) => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[0].style.display = 'flex'

        const image = document.getElementById('output-cover');
        image.style.display = 'flex'
        if (id !== userId) {
            image.style.border = '1px solid #333'
            image.style.cursor = 'default'
        }
    }
    const handleSubmitCover = async (e) => {
        setLoading(true)
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'cover image')
        const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
            method: 'POST',
            body: data,
        })
        const file = await res.json()
        await request.put(`/user/update/${id}`, {cover: file.secure_url})

        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[0].style.display = 'none'
        setLoading(false)
    }

    const handleClose = (index) => {
        const modal = document.querySelectorAll('.' + cx('modal'))
        modal[index].style.display = 'none'
        // const image = document.getElementById('output');
        // image.src = avatar
        // const cover = document.getElementById('output-cover');
        // cover.src = cover
        window.location.reload();
    }

    // const [clockState, setClockState] = useState();

    // useEffect(() => {
    //     setInterval(() => {
    //         const date = new Date();
    //         setClockState(date.toLocaleTimeString());
    //     }, 1000);
    // }, []);

    useEffect(() => {
        const section = document.querySelector('.' + cx('section'))
        if (id === userId)
            section.style.display = 'flex'
    })

    const handleRefresh = () => {
        // const refresh = document.querySelector('.' + cx('refresh-icon'))
        // refresh.classList.toggle(cx('refresh-move'))
        setLoading(!loading)
    }

    var array = [].concat(savedArticles).reverse()
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('avatar')}>
                    <img onClick={handleUploadAvatar} className={cx('avatar-img')} src={profile.avatar} alt="..."/>
                </div>
                <h1 className={cx('avatar-name')}>
                    {profile.username}
                    {profile.isAdmin && <FontAwesomeIcon icon={faCircleCheck} className={cx('avatar-admin')}/>}  
                </h1>
                <h3 className={cx('job')}>{profile.job}</h3>
                {id && id !== userId && <button className={cx('follow')} onClick={() => handleFollow(userId)}>Follow
                </button>}

                <div className={cx('total')}>
                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            <CountUp duration={1} start={0} end={articles.length}/>
                        </h1>
                        {articles.length > 1 ? ' Posts' : ' Post'}
                    </div>

                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            <CountUp duration={1} start={0} end={followers.length}/>
                        </h1>
                        Followers
                    </div>

                    <div className={cx('total-post')}>
                        <h1 className={cx('total-number')}>
                            <CountUp duration={1} start={0} end={following.length}/>
                        </h1>
                        Following
                    </div>
                </div>
                <Sidebar setting='false' tabs={handleTabs} panes={handlePanes} active={handleActive}/>
            </div>

            <div className={cx('right')}>
                <div className={cx('cover')}>
                    <img onClick={handleUploadCover} className={cx('cover-img')} src={profile.cover} alt="cover"/>
                </div>

                <div className={cx('right-inner')}>
                    <div className={cx('right-inner__left')}>
                        {id === userId && (
                            <div className={cx('refresh-icon')} onClick={handleRefresh}>
                                <FontAwesomeIcon icon={faArrowsRotate}/>
                            </div>
                        )}
                        <div className={cx('right-col-inner', 'tab-p', 'active-pane')}>
                            <div className={cx('section')}>
                                <div className={cx('myArticles', 'active-section')}>
                                    My Articles
                                </div>
                                <div className={cx('myArticles')}>
                                    Favorited Articles
                                </div>
                                <div className={cx('createArticles')}>
                                    <Link to="/create/post">
                                        Create new article
                                    </Link>
                                </div>
                                <div className={cx('line')}></div>
                            </div>

                            <div className={cx('posts', 'active-pane-section')}>
                                {articles.length !== 0 ? (
                                    <Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}>
                                        <Articles articles={articles} id={id} userId={userId} save={'false'}/>
                                    </Suspense>
                                ) : (
                                    <h1 className={cx('no-post')}>There no article here</h1>
                                )}
                            </div>

                            <div className={cx('posts')}>
                                {savedArticles.length !== 0 ? (
                                    <Suspense fallback={<div style={{textAlign: 'center'}}>Loading...</div>}>
                                        <Articles articles={array} id={id} userId={userId}/>
                                    </Suspense>
                                ) : (
                                    <h1 className={cx('no-post')}>There no saved article here</h1>
                                )}
                                
                            </div>
                        </div>

                        <div className={cx('right-col-inner', 'tab-p')}>
                            <div className={cx('post')}>
                                <h1 className={cx('post-title')}>Contact information</h1>
                                <br/>

                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Phone:</h2>
                                    <span className={cx('member-info')}>{profile.phone}</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Email:</h2>
                                    <span className={cx('member-info')}>{profile.email}</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>Address:</h2>
                                    <span className={cx('member-info')}>{profile.address}</span>
                                </div>
                                <div className={cx('member')}>
                                    <h2 className={cx('member-title')}>D.O.B:</h2>
                                    <span className={cx('member-info')}>{profile.dob}</span>
                                </div>
                            </div>       
                        </div>

                        <div className={cx('right-col-inner', 'tab-p')}>
                            <div className={cx('post')}>
                                <h1 className={cx('post-title')}>Work and Education</h1>
                                <br/>

                                {(work.length !== 0 || education.length !== 0) ? (
                                    <>
                                        <div className={cx('member-knowledge')}>
                                            <h2 className={cx('member-title')}>Work</h2>
                                            <ul className={cx('list')}>
                                                {work.map((result, index) => (
                                                    <li key={index} className={cx('list-item')}>
                                                        <FontAwesomeIcon icon={faBriefcase} className={cx('list-item-icon')}/>
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={cx('member-knowledge')}>
                                            <h2 className={cx('member-title')}>Education</h2>
                                            <ul className={cx('list')}>
                                                {education.map((result, index) => (
                                                    <li key={index} className={cx('list-item')}>
                                                        <FontAwesomeIcon icon={faGraduationCap} className={cx('list-item-icon')}/>
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <h1>There no information here</h1>
                                )}
                            </div>
                        </div>
                        

                    </div>

                    <div className={cx('right-inner__right')}>
                        <div className={cx('user-intro')}>
                            <h2 className={cx('user-intro__heading')}>BIOGRAPHY</h2>
                            <p className={cx('user-intro__bio')}>{profile.bio ? profile.bio : "This user is very nice but don't leave any trace!"}</p>
                        </div>

                        <div className={cx('user-skill')}>
                            <h2 className={cx('user-intro__heading')}>SKILLS</h2>
                            <ul className={cx('tag')}>
                                {skill.map((result, index) => (
                                    <li key={index} className={cx('tag-name')}>{result}</li>
                                ))}
                            </ul>
                        </div>

                        <ul className={cx('user-social')}>
                            <li className={cx('user-social-icon')}>
                                <a href={profile.facebook} target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faFacebookF} className={cx('social-icon')}/>
                                </a>
                            </li>
                            <li className={cx('user-social-icon')}>
                                <a href={profile.instagram} target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} className={cx('social-icon')}/>
                                </a>
                            </li>
                            <li className={cx('user-social-icon')}>
                                <a href={profile.twitter} target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} className={cx('social-icon')}/>
                                </a>
                            </li>
                        </ul>

                        {/* <h1 className={cx('time')}>{clockState}</h1> */}
                    </div>
                </div>
            </div>
            
            {id === userId ? (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body')}>
                        <RingLoader color="navy" loading={loading} cssOverride={override}/>
                        <div className={cx('close-btn')} onClick={() => handleClose(0)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                        
                        <form className={cx('')} >
                            <img id='output-cover' alt='' src={profile.cover} className={cx('cover-upload')}></img>
                
                            <label htmlFor='fileCoverInput' className={cx('label-upload-cover')}>
                                {/* <FontAwesomeIcon icon={faFileCirclePlus} className={cx('upload-icon')}/>
                                <span className={cx('upload-label')}>Select a JPG file to upload</span> */}
                            </label> 
                            <input id="fileCoverInput"
                                type="file"
                                name="fileCover"
                                onChange={uploadCover}
                            />
                            <div className={cx('upload-btn')} onClick={handleSubmitCover}>Upload</div>
                        </form>
                    
                        {/* <FontAwesomeIcon icon={faFileCirclePlus} className={cx('upload-icon')}/> */}
                            
                    </div>
                </div>
            ) : (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body')}>
                        <div className={cx('close-btn')} onClick={() => handleClose(0)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                        
                        <img id='output-cover' alt='' src={profile.cover} className={cx('cover-upload')}></img>
                    
                    </div>
                </div>
            )}

            {id === userId ? (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body')}>
                        <RingLoader color="navy" loading={loading} cssOverride={override}/>
                        <div className={cx('close-btn')} onClick={() => handleClose(1)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                        
                            <form className={cx('')} >
                                <img id='output' alt='' src={profile.avatar} className={cx('image-upload')}></img>
                    
                                <label htmlFor='fileInput' className={cx('label-upload')}>
                                    {/* <FontAwesomeIcon icon={faFileCirclePlus} className={cx('upload-icon')}/>
                                    <span className={cx('upload-label')}>Select a JPG file to upload</span> */}
                                </label> 
                                <input id="fileInput"
                                    type="file"
                                    name="file"
                                    onChange={uploadImage}
                                />
                                <div className={cx('upload-btn')} onClick={handleSubmitImage}>Upload</div>
                            </form>
                        
                            {/* <FontAwesomeIcon icon={faFileCirclePlus} className={cx('upload-icon')}/> */}
                            
                    </div>
                </div>
            ) : (
                <div className={cx('modal')}>
                    <div className={cx('modal__overlay')}></div>
                    <div className={cx('modal__body')}>
                        <div className={cx('close-btn')} onClick={() => handleClose(1)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </div>
                        
                        <img id='output' alt='' src={profile.avatar} className={cx('image-upload')}></img>
                    
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
