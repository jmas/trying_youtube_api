import { h } from 'hyperapp';
import Header from '../../components/header';
import styles from './styles.css';

export default function Layout(props, children) {
    return (
        <div class={ styles.container }>
            <Header />
            { children }
        </div>
    );
}
