import { h } from 'hyperapp';
import Alert, { ALERT_TYPE_WARNING } from '../alert';
import cx from 'classnames';
import styles from './styles.css';

export default function ControlWrapper({
    label,
    helpText=null,
    error=null,
}, children) {
    return (
        <div class={ cx(styles.container, !!error ? styles.hasError: null) }>
            { label
                ? <label class={ styles.label }>{ label }:</label>
                : null
            }
            { helpText
                ? <div class={ styles.helpText }>{ helpText }</div>
                : null
            }
            <div  class={ styles.control }>
                { children }
            </div>
            { error
                ?
                    <div class={ styles.error }>
                        <Alert message={ error } type={ ALERT_TYPE_WARNING } classes={ { container: styles.errorAlertContainer } } />
                    </div>
                : null
            }
        </div>
    );
}
