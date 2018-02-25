import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import VideosPage from './pages/videos';
import StreamEditPage from './pages/stream_edit';

const defaultState = {
    word: 'word'
};

const actions = {
    click({ word }) {
        return state => ({
            ...state,
            word,
        });
    },
};

function view(state, actions) {
    const { word } = state;
    return (
        <StreamEditPage
            handleSave={ data => console.log('save', data) }
            handleCancel={ () => console.log('cancel') }
        />
    );
}

const wiredActions = logger({})(app)(defaultState, actions, view, document.getElementById('app'));
// console.log(wiredActions);
