import { h } from 'hyperapp';
import DefaultLayout from '../layouts/default';
import Content from '../components/content';
import Heading from '../components/heading';
import VideosList from '../components/video_list';
import StreamEditForm from '../components/stream_edit_form';

export default function EditStream({
    handleSave,
    handleCancel,
}) {
    return (
        <DefaultLayout>
            <Content>
                <Heading h1>Добавить стрим</Heading>
                <StreamEditForm
                    values={ { url: 'http://google.com' } }
                    handleSubmit={ handleSave }
                />
            </Content>
        </DefaultLayout>
    );
}
