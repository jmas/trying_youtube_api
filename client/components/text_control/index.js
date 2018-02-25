import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export default function TextControl({
    multiline,
    value,
    hasError,
    ...props,
}) {
    const classNames = cx(styles.control, hasError ? styles.hasError: null);
    return (
        multiline
            ?
                <textarea { ...props } class={ classNames }>{ value }</textarea>
            :
                <input type={ 'text' } { ...props } value={ value } class={ classNames } />
    );
}
