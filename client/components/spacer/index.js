import { h } from 'hyperapp';
import cx from 'classnames';
import styles from './styles.css';

export const SPACER_SIZE_SMALL = 'small';
export const SPACER_SIZE_MEDIUM = 'medium';
export const SPACER_SIZE_LARGE = 'large';
export const SPACER_SIZE_XLARGE = 'xlarge';

export default function Spacer({
    size,
    inline,
}) {
    return (
        <span class={ cx(styles.spacer, inline ? styles.inline: null, styles[size]) } />
    );
}
