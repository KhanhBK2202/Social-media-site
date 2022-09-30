import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import moment from 'moment';

import styles from './Dashboard.module.scss'
import * as request from '~/utils/request'

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Table from '~/components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faTrashCan } from '@fortawesome/free-regular-svg-icons';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

moment().format();
const cx = classNames.bind(styles);

function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    const [users, setUsers] = useState([])
    const [tag, setTag] = useState([])
    const [comments, setComments] = useState([])
    
    useEffect(() => {
        request
            .get('/user/showAll')
            .then(res => setUsers(res.data.profileDashboard))
            .catch(err => console.log('Error: ' + err))
    },[loading])

    useEffect(() => {
        request
            .get('/me/stored/articles')
            .then((res) => setArticles(res.data.articlesDashboard))
            .catch(e => console.log(e))
    },[loading])

    useEffect(() => {
        request
            .get('/tag/show')
            .then(res => setTag(res.data.tags))
            .catch(e => console.log(e))
    },[loading])

    useEffect(() => {
        request
            .get('/me/showAllComment')
            .then(res => setComments(res.data.comment))
            .catch(err => console.log(err))
    },[loading])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    
    var userDate = []
    var postDate = []
    users.map((item) => (
        userDate.push(moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('L'))
    ))
    articles.map((item) => (
        postDate.push(moment([item.createdAt], "YYYY-MM-DDTHH:mm:ss Z").format('L'))
    ))
    var userList = [...new Set(userDate)];
    var postList = [...new Set(postDate)];
    
    var date = userList.concat(postList.filter((item) => userList.indexOf(item) < 0));
    
    const [groupUser, setGroupUser] = useState([])
    useEffect(() => {
        request
            .get('/user/group')
            .then(res => setGroupUser(res.data.users))
            .catch(err => console.log(err))
    },[])

    var userss = []
    date.forEach((item1) => {
        var flag = false
        groupUser.forEach((item2) => {
            if (item2._id === item1) {
                flag = true
                userss.push(item2.count)
            }
        })
        if (flag === false)
            userss.push(0)
    })

    const [groupPost, setGroupPost] = useState([])
    useEffect(() => {
        request
            .get('/me/group/article')
            .then(res => setGroupPost(res.data.posts))
            .catch(err => console.log(err))
    },[])

    var posts = []
    date.forEach((item1) => {
        var flag = false
        groupPost.forEach((item2) => {
            if (item2._id === item1) {
                flag = true
                posts.push(item2.count)
            }
        })
        if (flag === false)
            posts.push(0)
    })
    
    const data = {
        labels: date,
        datasets: [
            {
                label: 'Users',
                data: userss,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4
            },
            {
                label: 'Posts',
                data: posts,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.4
            },
        ],
    };

    var period
    const hours = new Date().getHours()
    if (hours >= 4 && hours < 11) {
        period = 'morning'
    }
    else if (hours >= 11 && hours < 14) {
        period = 'afternoon'
    }
    else if (hours >= 14 && hours < 18) {
        period = 'evening'
    }
    else {
        period = 'night'
    }

    const handleLoading = load => setLoading(load);

    const [tags] = useState([])
    useEffect(() => {
        const tagsName = document.querySelectorAll('.' + cx('tag-name'))
        tagsName.forEach((tag, index) => {
            tag.onclick = function () {
                if (tags.includes(tag.innerText))
                {
                    tag.style.backgroundColor = 'var(--body-color)'
                    tag.style.color = 'var(--text-color)'
                    tags.splice(index, 1)
                    for( var i = 0; i < tags.length; i++){
                        if (tags[i] === tag.innerText) { 
                            tags.splice(i, 1); 
                        }
                    }
                }
                else {
                    tag.style.backgroundColor = '#e9e9eb'
                    tag.style.color = 'var(--black)'
                    tags.push(tag.innerText)
                }
            }
        })
    })

    const handleAlert = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'block'
        const confirm = document.querySelector('.' + cx('confirm'))
        confirm.onclick = function () {
            setLoading(!loading)
            // for (const tag of tags) {
            //     request.remove(`/tag/${tag}`)
            //     request.remove(`/article/delete/${tag}`)
            // }
            tags.forEach(function (tag) {
                request.remove(`/tag/${tag}`)
                request.remove(`/article/delete/${tag}`)
            })
            modal.style.display = 'none'
        }
    }

    const handleCancel = () => {
        const modal = document.querySelector('.modal__alert')
        modal.style.display = 'none'
    }

    return (
        <>
            <div className={cx('modal__alert')}>
                <div className={cx('modal__overlay')}></div>
                <div className={cx('modal__body-alert')}>
                    <FontAwesomeIcon icon={faCircleQuestion} className={cx('question-icon')}/>
                    <div className={cx('modal__confirm')}>
                        <h2>Are you sure to delete this tag?</h2>
                        <span>You can't undo this operation</span>
                    </div>
                    <div className={cx('confirm-btn')}>
                        <div className={cx('confirm')}>Yes</div>
                        <div onClick={handleCancel}>Cancel</div>
                    </div>
                </div>
            </div>

            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <h1 className={cx('hello')}>Good {period}, Sir</h1>
                    <div className={cx('left-inner')}>
                        
                        <div className={cx('amount__card')}>
                            <div className={cx('amount__contentBx')}>
                                <h2 className={cx('amount__contentBx-name')}>Total users</h2>
                                <div className={cx('amount__contentBx-size')}>
                                    <h1 className={cx('amount__contentBx-size-label')}>{users.length}</h1>
                                </div>
                            </div>
                        </div>

                        <div className={cx('amount__card')}>
                            <div className={cx('amount__contentBx')}>
                                <h2 className={cx('amount__contentBx-name')}>Total posts</h2>
                                <div className={cx('amount__contentBx-size')}>
                                    <h1 className={cx('amount__contentBx-size-label')}>{articles.length}</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('left-inner')}>
                        <div className={cx('chart')}>
                            {/* <canvas id="myChart" width="400" height="400"></canvas> */}
                            <Line options={options} data={data} />
                        </div>
                    </div>
                </div>

                <div className={cx('right')}>
                    <h2 className={cx('heading')}>Users</h2>
                    {users.length !== 0 && 
                        <Table colNames={['No', 'Avatar', 'Name', 'Email', 'Posts', 'Followers', 'Following', 'Date', '']} list={users} category='user' loading={handleLoading}/>
                    }
                    <br/>
                    <h2 className={cx('heading')}>Posts</h2>
                    {articles.length !== 0 && 
                        <Table colNames={['No', 'Title', 'Author', 'Like', 'Comment', 'Date', '']} list={articles} category='article' loading={handleLoading}/>
                    } 
                </div>
            </div>

            <div className={cx('mid')}>
                <div className={cx('mid-left')}>
                    <h2 className={cx('heading')}>Comments ({comments.length})</h2>
                    {comments.length !== 0 && 
                        <Table colNames={['No', 'Content', 'Author', 'Article', 'Date', '']} list={comments} category='comment' loading={handleLoading}/>
                    }
                </div>

                <div className={cx('mid-right')}>
                    <h2 className={cx('heading')}>
                        Tags ({tag.length})
                        <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon')} onClick={handleAlert}/>
                    </h2>
                    <ul className={cx('tag')}>
                        {tag.map((item, index) => (
                            <li key={index} className={cx('tag-name')}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </>
    )
}

export default Dashboard;