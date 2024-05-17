import { useEffect } from 'react';

import { EventsLayout } from '../layout/EventsLayout';
import { setEventViewSelected } from '../../../store';
import { useDispatch } from 'react-redux';
import { optionsEventsView } from './eventsConstants';

export const EventsAttendeesPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setEventViewSelected(optionsEventsView.attendees));
  }, []);

  return <EventsLayout title="Attendees"></EventsLayout>;
};
