import { TicketUseCase } from "../../../tickets";

export const  seedTicketsService=async (ticketUseCase: TicketUseCase, commerceUid: string, levelUid1: string,levelUid2:string)=>  {
    let ticketUid1='';
    let ticketUid2='';

    const ticket1 ={
      id: '',
      name: "Ticket Level 1",
      saleFee: 95000,
      presaleFee: 70000,
      levelUid: levelUid1,
      commerceUid,
    }

    const ticket2 ={
      id: '',
      name: "Ticket Level 2",
      saleFee: 384500,
      presaleFee: 250000,
      levelUid: levelUid2,
      commerceUid,
    }

    try{
      const ticketsFound= await ticketUseCase.getTicketsByCommerce(commerceUid);

      ticketsFound.map(data=>{
        if(data.name.toLocaleLowerCase()==ticket1.name.toLocaleLowerCase()) ticketUid1=data.id
        if(data.name.toLocaleLowerCase()==ticket2.name.toLocaleLowerCase()) ticketUid2=data.id
      })

      if(ticketUid1===''){
        const ticket1Created= await ticketUseCase.createTicket(ticket1)
        ticketUid1= ticket1Created.id;
      }

      if(ticketUid2===''){
        const ticket2Created= await ticketUseCase.createTicket(ticket2)
      ticketUid2= ticket2Created.id;
      }

    }catch(err){}
    return { ticketUid1, ticketUid2 };
  }