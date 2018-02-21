import { h } from 'hyperapp';
import List from '../list';
import VideoPreview from '../video_preview';
import styles from './styles.css';

export default function VideoList({ items }) {
    return (
        <List
            items={ items }
            itemComponent={ VideoPreview }
            classes={ styles }
            horizontal
        />
    );
}
