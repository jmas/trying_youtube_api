import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export default function Heading({ h1, h2, h3, centered, classes={} }, children) {
    const Component = h1 ? 'h1': h2 ? 'h2': h3 ? 'h3': 'h1';
    return (
        <Component class={ cx(styles[Component], classes.container, centered ? styles.centered: null) }>
            { children }
        </Component>
    );
}
