import { h, app } from 'hyperapp';

export default function Form({
    values={},

    handleSubmit,
    createForm,
    ...props,
}) {
    return (
        <div oncreate={ element => app({ values, ...props }, {
            handleChange: event => state => ({ values: { ...state.values, [event.target.name]: event.target.value } }),
            handleSubmit: event => state => { event.preventDefault(); handleSubmit(state); },
        }, (props, { handleChange, handleSubmit }) => createForm({ handleChange, handleSubmit, ...props }), element) }></div>
    );
}
