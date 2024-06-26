import { useEffect } from 'react';

import { EventsLayout } from '../layout/EventsLayout';
import { setCurrentPage, setEventViewSelected } from '../../../store';
import { useDispatch } from 'react-redux';
import { optionsEventsView } from './eventsConstants';
import { pagesOptions } from '../../../shared';

export const EventsStatsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(pagesOptions.stats));
    dispatch(setEventViewSelected(optionsEventsView.stats));
  }, []);

  return <EventsLayout title="Estadisticas"></EventsLayout>;
};
