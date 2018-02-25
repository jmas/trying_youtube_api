import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export const BUTTON_SEMTYPE_PRIMARY = 'primary';
export const BUTTON_SEMTYPE_SECONDARY = 'secondary';
export const BUTTON_SEMTYPE_SUCCESS = 'success';
export const BUTTON_SEMTYPE_WARNING = 'warning';
export const BUTTON_SEMTYPE_ALERT = 'alert';

export const BUTTON_TYPE_SUBMIT = 'submit';
export const BUTTON_TYPE_BUTTON = 'button';

export default function Button({
    type=BUTTON_TYPE_SUBMIT,
    semType=BUTTON_SEMTYPE_SECONDARY,
    disabled,
    classes={},
    ...props,
}, children) {
    return (
        <button
            { ...props }
            type={ type }
            disabled={ disabled }
            class={ cx(styles.button, styles[semType], classes.button) }
            role={ 'button' }
        >{ children }</button>
    );
}
