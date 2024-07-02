export const findTicketProspectFeeByTypeUid = (type, tickets) => {
  const ticketFound = tickets.find((data) => data.name == type);

  return ticketFound
    ? {
        ...ticketFound,      
      }
    : {
        id: '',
        name: '',
        fee: 0,
        commerceUid: '',
      };
};
