import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export default function List({
    items=[],
    itemComponent=null,
    classes={},
    horizontal,
}) {
    const ItemComponent = itemComponent;
    if (!itemComponent) {
        throw `Property 'itemComponent' is required!`;
    }
    return (
        <ul class={ cx(styles.container, classes.container, horizontal ? styles.horizontal: null) }>
            { items.map((item, index) => (
                <li class={ cx(styles.item, classes.item) } key={ index }>
                    <ItemComponent {...item} />
                </li>
            )) }
        </ul>
    );
}
