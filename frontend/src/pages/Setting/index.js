import classNames from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import styles from './Setting.module.scss';
import * as request from '~/utils/request'
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import moment from 'moment';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
moment().format();

function Setting() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const [profile, setProfile] = useState([])
    const [skill, setSkill] = useState([])
    const [company, setCompany] = useState([])
    const [school, setSchool] = useState([])

    const [newSkill, setNewSkill] = useState([])
    const [newCompany, setNewCompany] = useState([])
    const [newSchool, setNewSchool] = useState([])
    const [newBio, setNewBio] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newJob, setNewJob] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newDob, setNewDob] = useState('')

    const [newFacebook, setNewFacebook] = useState('')
    const [newInstagram, setNewInstagram] = useState('')
    const [newTwitter, setNewTwitter] = useState('')

    useEffect(() => {
        const removeBtn = document.querySelectorAll('.' + cx('remove-btn'));
        removeBtn.forEach((item, index) => {
            item.onclick = function () {
                const nameSibling = item.previousElementSibling.name
                const valueSibling = item.previousElementSibling.value
                if (valueSibling) {
                    switch (nameSibling) {
                        case 'skills[]':
                            request.remove(`/user/deleteSkill/${userId}/${valueSibling}`)
                            break;
                        case 'companies[]':
                            request.remove(`/user/deleteCompany/${userId}/${valueSibling}`)
                            break;
                        case 'schools[]':
                            request.remove(`/user/deleteSchool/${userId}/${valueSibling}`)
                            break;
                        default: 
                            console.log('Error')
                            break;
                    }
                }
                this.parentElement.remove()
            }
        }) 
    })
    
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
            .then(function(res) {
                setProfile(res.data.profile)
                setSkill(res.data.profile.skills)
                setCompany(res.data.profile.work)
                setSchool(res.data.profile.education)
            })
            .catch(e => console.log(e))
    },[userId])

    const handleDiscard = () => {
        navigate(-1)
    }

    var newSkillArray = []
    var newCompanyArray = []
    var newSchoolArray = []
    useEffect(() => {
        var skills = document.querySelectorAll('input[name="skills[]"]')
        skills.forEach((skill, index) => {
            skill.onchange= function (e) {
                skill.value = newSkill
            }
            newSkillArray.push(skill.value)
        })
    })

    useEffect(() => {
        var companies = document.querySelectorAll('input[name="companies[]"]')
        companies.forEach((company, index) => {
            company.onchange= function (e) {
                company.value = newCompany
            }
            newCompanyArray.push(company.value)
        })

        var schools = document.querySelectorAll('input[name="schools[]"]')
        schools.forEach((school, index) => {
            school.onchange= function (e) {
                school.value = newSchool
            }
            newSchoolArray.push(school.value)
        })
    })

    const handleAddSkill = () => {
        setSkill([...newSkillArray, ''])
    }

    const handleAddCompany = () => {
        setCompany([...newCompanyArray, ''])
    }

    const handleAddSchool = () => {
        setSchool([...newSchoolArray, ''])
    }

    const handleUpdateSkill = (userId) => {
        request.put(`/user/update/${userId}`, {skills: newSkillArray})
        navigate(-1)
    }

    const handleUpdateCompany = (userId) => {
        request.put(`/user/update/${userId}`, {work: newCompanyArray, education: newSchoolArray, job: newJob ? newJob : profile.job})
        navigate(-1)
    }

    const handleUpdateBio = (userId) => {
        request.put(`/user/update/${userId}`, {bio: newBio})
        navigate(-1)
    }

    const handleUpdatePersonal = (userId) => {
        request.put(`/user/update/${userId}`, {username: newUsername ? newUsername : profile.username, email: newEmail ? newEmail : profile.email, phone: newPhone ? newPhone : profile.phone, address: newAddress ? newAddress : profile.address, dob: newDob ? newDob : profile.dob })
        navigate(-1)
    }

    const handleUpdateSocial = (userId) => {
        request.put(`/user/update/${userId}`, {facebook: newFacebook ? newFacebook : profile.facebook, instagram: newInstagram ? newInstagram : profile.instagram, twitter: newTwitter ? newTwitter : profile.twitter})
        navigate(-1)
    }

    return (
        <div className={cx('body')}>
            <div className={cx('inner')}>
                <Sidebar setting='true' tabs={handleTabs} panes={handlePanes} active={handleActive}/>
            </div>

            <div className={cx('right-col')}>
                <div className={cx('right-col-inner', 'tab-p', 'active-pane')}>
                    <h1 className={cx('heading')}>Account setting</h1>

                    <span>Joined {moment([user.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('LL')} at {moment([user.createdAt], 'THH:mm:ss Z').format('LT')}</span>
                    <div className={cx('member')}>
                        <h3 className={cx('member-title')}>Personal Informations</h3>
                    </div>

                    <div className={cx('mt-5', 'wrapper')}>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.username} id="username" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewUsername(e.target.value)}}/>
                            <label htmlFor="username" className={cx('form__label')}>Username</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.email} id="email" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewEmail(e.target.value)}}/>
                            <label htmlFor="email" className={cx('form__label')}>Email</label>
                        </div>

                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.phone} id="phone" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewPhone(e.target.value)}}/>
                            <label htmlFor="phone" className={cx('form__label')}>Phone</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.address} id="address" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewAddress(e.target.value)}}/>
                            <label htmlFor="address" className={cx('form__label')}>Address</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.dob} id="dob" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewDob(e.target.value)}}/>
                            <label htmlFor="dob" className={cx('form__label')}>D.O.B (DD/MM/YYYY)</label>
                        </div>

                        <div className={cx('setting-btn')}>
                            <button onClick={handleDiscard} type="submit" className={cx('setting-btn-discard')}>Discard changes</button>
                            <button onClick={() => handleUpdatePersonal(userId)} type="submit" className={cx('setting-btn-update')}>Save</button>
                        </div>
                    </div>
                </div>
                <div className={cx('right-col-inner', 'tab-p')}>
                    <h1 className={cx('heading')}>Your bio</h1>
                    <div className={cx('member')}>
                        <h3 className={cx('member-title')}>Write a short introduction</h3>
                    </div>

                    <div className={cx('mt-5', 'wrapper')}>
                        <textarea defaultValue={profile.bio} className={cx('bio')} placeholder='Add a short bio...' onChange={(e) => setNewBio(e.target.value)}/>

                        <div className={cx('wrapper')}>
                            <div className={cx('setting-btn')}>
                                <button onClick={handleDiscard} type="submit" className={cx('setting-btn-discard')}>Discard changes</button>
                                <button onClick={() => handleUpdateBio(userId)} type="submit" className={cx('setting-btn-update')}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right-col-inner', 'tab-p')}>
                    <h1 className={cx('heading')}>Skills</h1>
                    <div className={cx('member')}>
                        <h3 className={cx('member-title')}>Core skills include: </h3>
                    </div>

                    <div className={cx('mt-5', 'wrapper')}>
                        {skill.length !== 0 ? (
                            skill.map((result, index) => (
                                <div key={index} className={cx('form')}>
                                    <input type="text" name="skills[]" id="skill" defaultValue={result} className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewSkill(e.target.value)}}/>
                                    <button className={cx('remove-btn')}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div> 
                            ))
                        ) : (
                            <h4>You have no skills here. Add one</h4>
                        )}
                        <div className={cx('add-btn')} onClick={handleAddSkill}>
                            + Add skill
                        </div>

                        <div className={cx('setting-btn')}>
                            <button onClick={handleDiscard} type="submit" className={cx('setting-btn-discard')}>Discard changes</button>
                            <button onClick={() => handleUpdateSkill(userId)} type="submit" className={cx('setting-btn-update')}>Save</button>
                        </div>
                    </div>
                </div>

                <div className={cx('right-col-inner', 'tab-p')}>
                    <h1 className={cx('heading')}>Work and Education</h1>

                    <br/>
                    <div className={cx('form')}>
                        <input type="text" defaultValue={profile.job} id="job" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewJob(e.target.value)}}/>
                        <label htmlFor="job" className={cx('form__label')}>Job title</label>
                    </div>

                    <div className={cx('member')}>
                        <h3 className={cx('member-title')}>Work</h3>
                    </div>
                    <div className={cx('mt-5', 'wrapper')}>
                        {company.length !== 0 ? (
                            company.map((result, index) => (
                                <div key={index} className={cx('form')}>
                                    <input type='text' defaultValue={result} name="companies[]" id='form-work' className={cx('form__input')} autoComplete='off' placeholder=' ' onChange={(e) => setNewCompany(e.target.value)}/>
                                    <button className={cx('remove-btn')}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div>   
                            ))
                        ) : (
                            <h4>You have no company here. Add one</h4>
                        )}
                    </div>
                    <div className={cx('add-btn')} onClick={handleAddCompany}>
                        + Add a workplace
                    </div>

                    <div className={cx('member')}>
                        <h3 className={cx('member-title')}>Education</h3>
                    </div>
                    <div className={cx('mt-5', 'wrapper')}>
                        {school.length !== 0 ? (
                            school.map((result, index) => (
                                <div key={index} className={cx('form')}>
                                    <input type='text' defaultValue={result} name="schools[]" id='form-edu' className={cx('form__input')} autoComplete='off' placeholder=' ' onChange={(e) => setNewSchool(e.target.value)}/>
                                    <button className={cx('remove-btn')}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div>   
                            ))
                        ) : (
                            <h4>You have no school here. Add one</h4>
                        )}
                    </div>

                    <div className={cx('add-btn')} onClick={handleAddSchool}>
                        + Add a school/college/university
                    </div>

                    <div className={cx('wrapper')}>
                        <div className={cx('setting-btn')}>
                            <button onClick={handleDiscard} type="submit" className={cx('setting-btn-discard')}>Discard changes</button>
                            <button onClick={() => handleUpdateCompany(userId)} type="submit" className={cx('setting-btn-update')}>Save</button>
                        </div>
                    </div>

                </div>

                <div className={cx('right-col-inner', 'tab-p')}>
                    <h1 className={cx('heading')}>Alternative contact medias</h1>

                    <div className={cx('mt-5', 'wrapper')}>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.facebook} id="Facebook" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewFacebook(e.target.value)}}/>
                            <label htmlFor="Facebook" className={cx('form__label')}>Link Facebook</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.instagram} id="Instagram" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewInstagram(e.target.value)}}/>
                            <label htmlFor="Instagram" className={cx('form__label')}>Link Instagram</label>
                        </div>
                        <div className={cx('form')}>
                            <input type="text" defaultValue={profile.twitter} id="Twitter" className={cx('form__input')} autoComplete="off" placeholder=" " onChange={(e) => {setNewTwitter(e.target.value)}}/>
                            <label htmlFor="Twitter" className={cx('form__label')}>Link Twitter</label>
                        </div>

                        <div className={cx('setting-btn')}>
                            <button onClick={handleDiscard} type="submit" className={cx('setting-btn-discard')}>Discard changes</button>
                            <button onClick={() => handleUpdateSocial(userId)} type="submit" className={cx('setting-btn-update')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Setting;
