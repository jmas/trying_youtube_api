import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export const ALERT_TYPE_SUCCESS = 'success';
export const ALERT_TYPE_WARNING = 'warning';
export const ALERT_TYPE_ALERT = 'alert';
export const ALERT_TYPE_INFO = 'info';

export default function Alert({
    message,
    type,
    box,
    classes={},
}) {
    return (
        <div class={ cx(styles.container, styles[type] || styles.info, box ? styles.box: styles.text, classes.container) }>{ message }</div>
    );    
}
