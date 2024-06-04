export const findTicketByLevelUid = (levelUid, tickets) => {
  const ticketFound = tickets.find(data => data.levelUid == levelUid);
  
  
  
  return ticketFound 
  ?  {
    ...ticketFound,
    presaleFee:ticketFound.presaleFee.toLocaleString('es-CO'),
    saleFee:ticketFound.saleFee.toLocaleString('es-CO'),
  }
  
  : {
    id:"",
    name:"",
    presaleFee:0,
    saleFee:0,
    levelUid:"",
    commerceUid:"",
  };

};



