import { useEffect } from 'react';

import { EventsLayout } from "../layout/EventsLayout"
import { setEventViewSelected } from "../../../store";
import { useDispatch } from 'react-redux';
import { optionsEventsView } from "./eventsConstants";

export const EventsRegisterPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setEventViewSelected(optionsEventsView.register));
    }, []);
    return (<EventsLayout title='Register'>

    </EventsLayout>)
}