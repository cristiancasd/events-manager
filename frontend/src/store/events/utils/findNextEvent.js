export const findNextEvent = (eventsList) => {
  const dateToday = new Date().toISOString().split('T')[0];
  let nextEvent = null;

  if (eventsList.length) {
    eventsList.forEach((event) => {
      if (
        !nextEvent ||
        Math.abs(new Date(event.date) - new Date(dateToday)) < Math.abs(new Date(nextEvent.date) - new Date(dateToday))
      ) {
        if (event.date >= dateToday) nextEvent = event;
      }
    });
  }
  return nextEvent;
};
