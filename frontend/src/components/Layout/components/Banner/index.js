import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);
function Banner() {
    
    return (
        <>
            <div className={cx('banner')}>
                <div className={cx('left')}>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535713875002-d1d0cf377fde_jeawcn.jpg' alt=''/>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1633332755192-727a05c4013d_e4tnou.jpg' alt=''/>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1499887142886-791eca5918cd_tficqr.jpg' alt=''/>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1592234403516-69d83a03f96b_yqakh9.jpg' alt=''/>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/original_wgwjec.jpg' alt=''/>
                    <img className={cx('img-left')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1586297135537-94bc9ba060aa_gsdi3c.jpg' alt=''/>
                </div>

                <div className={cx('mid')}>
                    <h1 className={cx('heading')}>Blog Chat for Everyone</h1>
                    <p className={cx('desc')}>Don’t focus on having a great blog. Focus on producing a blog that’s great for your readers.</p>
                </div>

                <div className={cx('right')}>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598335/banner/photo-1525357816819-392d2380d821_jnzbn8.jpg' alt=''/>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1509668521827-dd7d42a587e2_jlmwlq.jpg' alt=''/>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535931737580-a99567967ddc_g8ej5m.jpg' alt=''/>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1628157588553-5eeea00af15c_pej0jb.jpg' alt=''/>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1520611980017-9562f7d6dc82_wti62q.jpg' alt=''/>
                    <img className={cx('img-right')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/640x530_zdlza7.jpg' alt=''/>
                </div>
            </div>
        </>
    );
}

export default Banner;
