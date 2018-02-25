import { h } from 'hyperapp';
import Form from '../../helpers/form';
import ControlWrapper from '../control_wrapper';
import TextControl from '../text_control';
import Button, { BUTTON_TYPE_SUBMIT, BUTTON_TYPE_BUTTON, BUTTON_SEMTYPE_SUCCESS, BUTTON_SEMTYPE_ALERT } from '../button';
import Spacer, { SPACER_SIZE_MEDIUM } from '../spacer';

export default function EditStreamForm({
    values={},
    errors={},
    handleSubmit,
}) {
    return (
        <Form
            values={ values }
            createForm={ ({ values, handleChange, handleSubmit }) => (
                <form onsubmit={ handleSubmit }>
                    <ControlWrapper
                        label={ 'Ссылка на страницу проекта' }
                        helpText={ 'Поддерживается Github' }
                        error={ errors.url }
                    >
                        <TextControl
                            name={'url'}
                            onchange={ handleChange }
                            value={ values.url }
                            hasError={ !!errors.url }
                        />
                    </ControlWrapper>
                    <ControlWrapper
                        label={ 'Описание проекта' }
                        helpText={ 'Поддерживается Markdown разметка' }
                        error={ errors.description }
                    >
                        <TextControl
                            multiline
                            rows={ 5 }
                            name={'description'}
                            onchange={ handleChange }
                            value={ values.description }
                            hasError={ !!errors.description }
                        />
                    </ControlWrapper>
                    <ControlWrapper
                        label={ 'Тэги' }
                        error={ errors.tags }
                    >
                        <TextControl
                            name={'tags'}
                            onchange={ handleChange }
                            value={ values.tags }
                            hasError={ !!errors.tags }
                        />
                    </ControlWrapper>
                    <Button
                        type={ BUTTON_TYPE_SUBMIT }
                        semType={ BUTTON_SEMTYPE_SUCCESS }
                    >Добавить стрим</Button>
                    <Spacer size={ SPACER_SIZE_MEDIUM } inline />
                    <Button
                        type={ BUTTON_TYPE_BUTTON }
                    >Отмена</Button>
                </form>
            ) }
            handleSubmit={ handleSubmit }
        />
    );
}
