export const normalizeEventsArray = (eventsList) => {
  let eventsNormalized = [];

  if (eventsList.length) {
    eventsNormalized = eventsList.map((event) => {
      return {
        ...event,
        date: event.date.split('T')[0],
      };
    });
  }
  return eventsNormalized;
};
