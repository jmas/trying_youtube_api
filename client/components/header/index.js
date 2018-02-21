import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';
import List from '../list';

function HeaderListItem({ name }) {
    return (
        <a href="#">{ name }</a>
    );
}

const firstMenuItems = [
    { name: 'Стримы' },
    { name: 'Тэги' },
];

const secondMenuItems = [
    { name: 'Войти' },
    { name: 'Добавить стрим' },
];

const menuClasses = {
    item: styles.menuItem,
};

export default function Header() {
    return (
        <div class={ styles.container }>
            <div class={ styles.limiter }>
                <div class={ styles.first }>
                    <List
                        items={ firstMenuItems }
                        itemComponent={ HeaderListItem }
                        classes={ menuClasses }
                        horizontal
                    />
                </div>
                <div class={ styles.second }>
                    <List
                        items={ secondMenuItems }
                        itemComponent={ HeaderListItem }
                        classes={ menuClasses }
                        horizontal
                    />
                </div>
            </div>
        </div>
    );
}
