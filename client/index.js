import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import VideosPage from './pages/videos';

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
        <VideosPage />
    );
}

const wiredActions = logger({})(app)(defaultState, actions, view, document.getElementById('app'));
// console.log(wiredActions);
