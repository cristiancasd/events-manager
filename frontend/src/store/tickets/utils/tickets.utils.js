export const findTicketByLevelUid = (levelUid, tickets) => {
  const ticketFound = tickets.find((data) => data.levelUid == levelUid);

  return ticketFound
    ? {
        ...ticketFound,
        presaleFee: ticketFound.presaleFee,
        saleFee: ticketFound.saleFee,
      }
    : {
        id: '',
        name: '',
        presaleFee: 0,
        saleFee: 0,
        levelUid: '',
        commerceUid: '',
      };
};
