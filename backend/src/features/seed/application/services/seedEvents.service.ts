import { EventsUseCase } from "../../../events";

export const  seedEventsService=async (eventsUseCase: EventsUseCase, commerceUid: string)=>  {
  let eventUid1='';
  let eventUid2='';

  const event1={
    id: '',
    name: "STS Jul 2040",
    date: new Date("2040-07-10"),
    description: "description 1",
    url: "event1.com",
    commerceUid,
  }

  const event2={
    id: '',
    name: "STS ENE 2000",
    date: new Date("2000-01-10"),
    description: "description 1",
    url: "event0.com",
    commerceUid,
  }


  try{
    const eventsFound= await eventsUseCase.findEventsByCommerce(commerceUid);

    eventsFound.map(data=>{
      if(data.name.toLocaleLowerCase()==event1.name.toLocaleLowerCase()) eventUid1=data.id
      if(data.name.toLocaleLowerCase()==event2.name.toLocaleLowerCase()) eventUid2=data.id
    })

    if(eventUid1===''){
      const event1Created= await eventsUseCase.createEvent(event1)
    eventUid1= event1Created.id;
    }

    if(eventUid2===''){
      const event2Created= await eventsUseCase.createEvent(event2)
      eventUid2= event2Created.id;
    }

  }catch(err){}
    return { eventUid1, eventUid2 };
  }