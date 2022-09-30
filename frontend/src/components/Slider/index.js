import React from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import classNames from 'classnames/bind';
import styles from './Slider.module.scss'

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import { Parallax, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Slider ({followers}) {
    
    return (
        <div className={cx('wrapper')}>
            {/* <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className={cx('mySwiper')}
            >
                <div
                    slot="container-start"
                    className={cx('parallax-bg')}
                    data-swiper-parallax="-23%"
                ></div>
                {followers.map((follower, index) => (
                    <SwiperSlide key={index} className={cx('swiper-slide')}>
                        <Link key={index} to={`/profile/${follower._id}`} className={cx('blogger-card')}>
                            <div className={cx('blogger-detail')}>
                                <h2 className={cx('follower-amount')}>{follower.followers.length} followers</h2>
                                <FontAwesomeIcon icon={faQuoteLeft} className={cx('quote-icon')}/>
                                <p className={cx('blogger-bio')}>{follower.bio}</p>
                                <div className={cx('blogger-info')}>
                                    <span className={cx('blogger-name')}>{follower.username}</span>
                                    <span className={cx('blogger-job')}>{follower.job}</span>
                                </div>
                            </div>
                            <div className={cx()}>
                                <img className={cx('blogger-avatar')} src={follower.avatar} alt=''/>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            {followers.map((follower, index) => (
                <Link key={index} to={`/profile/${follower._id}/${follower.slug}`} className={cx('product__card')}>
                    <h2 className={cx('product__contentBx-name')}>{follower.username}</h2>
                    <div className={cx('product__imgBx')}>
                        <img className={cx('product__imgBx-img')} src={follower.avatar} alt=""/>
                    </div>
                    <div className={cx('product__contentBx')}>
                        
                        <div className={cx('product__contentBx-size')}>
                            <h1 className={cx('product__contentBx-size-label')}>{follower.job}</h1>
                        </div>
                        <div className={cx('product__contentBx-color')}>
                            <h3 className={cx('product__contentBx-color-label')}>{follower.followers.length} Followers</h3>
                        </div>
                        <div className={cx('price')}>
                            <p className={cx('price-label')}>{follower.bio}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
export default Slider
