import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export default function VideoPreview({
    userUrl,
    pictureUrl,
    videoUrl,
    userName,
    title='',
    tags='',
    viewing=0,
    live=false,
}) {
    return (
        <div class={ styles.container }>
            <a href={ videoUrl } class={ cx(styles.pictureLink, live ? styles.live: null) }>
                <img src={ pictureUrl } alt={ title } class={ styles.picture } />
            </a>
            <div class={ styles.user }>
                <a href={ userUrl }>{ userName }</a>
            </div>
            <div class={ styles.title }>
                <a href={ videoUrl }>{ title }</a>
            </div>
            <div class={ styles.misc }>
                <span class={ styles.tags }></span>
                <span class={ styles.viewing }>{ viewing } смотрят</span>
            </div>
        </div>
    );
}
