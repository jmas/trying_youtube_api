import { h } from 'hyperapp';
import styles from './styles.css';

export default function Content(props, children) {
    return (
        <div class={ styles.container }>
            <div class={ styles.limiter }>
                { children }
            </div>
        </div>
    );
}
