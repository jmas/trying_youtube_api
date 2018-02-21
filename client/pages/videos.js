import { h } from 'hyperapp';
import DefaultLayout from '../layouts/default';
import Content from '../components/content';
import Heading from '../components/heading';
import VideosList from '../components/video_list';

const videosItems = Array(9).fill({ 
    userUrl: '#',
    userName: 'Alex M',
    pictureUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_ericswenson15-312x180.jpg',
    videoUrl: '#',
    title: 'Стрим: как сделать простое приложение при помощи React',
    tags: 'HTML, CSS, JS',
    viewing: 120,
    live: true,
});

export default function Videos() {
    return (
        <DefaultLayout>
            <Content>
                <Heading h1 centered>Онлайн трансляции</Heading>
                <VideosList items={ videosItems } />
            </Content>
        </DefaultLayout>
    );
}
