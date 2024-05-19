import {
  CommerceUserRoles,
  CriteriaOptionsLocation,
  NotFoundError,
  errorHandlerUseCase
} from '../../../core';
import { AttendeesProspectUseCase } from '../../attendees-prospect';
import { AttendeesUserUseCase } from '../../attendees-user/application/attendeesUser.useCase';
import { AuthUseCase } from '../../auth';
import { CommerceEntity, CommerceUseCase } from '../../commerce';
import { EventsUseCase } from '../../events';
import { EventEntity } from '../../events/domain/event.entity';
import { LevelUseCase } from '../../levels';
import { LevelEntity } from '../../levels/domain/level.entity';
import { ProspectsUseCase } from '../../prospects';
import { TicketEntity, TicketUseCase } from '../../tickets';
import { UserUseCase } from '../../user';
import { UserTicketUseCase } from '../../user-ticket';
import { SeedUseCaSeInterface } from '../domain/seed.useCase';
import {
  seedCommerceService,
  seedEventsService,
  seedLevelsService,
  seedTicketsService,
  seedUsersService
} from './services';

export class SeedUseCase implements SeedUseCaSeInterface {
  constructor(
    private readonly _authUseCase: AuthUseCase,
    private readonly _commerceUseCase: CommerceUseCase,
    private readonly _eventsUseCase: EventsUseCase,
    private readonly _levelUseCase: LevelUseCase,
    private readonly _userUseCase: UserUseCase,
    private readonly _prospectsUseCase: ProspectsUseCase,
    private readonly _attendeeUserUseCase: AttendeesUserUseCase,
    private readonly _attendeeProspectUseCase: AttendeesProspectUseCase,
    private readonly _ticketUseCase: TicketUseCase,
    private readonly _userTicketUseCase: UserTicketUseCase
  ) {}

  @errorHandlerUseCase
  async createSeed(): Promise<boolean> {
    const { commerceUid } = await seedCommerceService(this._commerceUseCase);
    const { levelUid1, levelUid2 } = await seedLevelsService(
      this._levelUseCase,
      commerceUid
    );
    /*const {userUid1, userUid2}= await seedUsersService(this._userUseCase,commerceUid,levelUid1, levelUid2)
    const {eventUid1, eventUid2}= await seedEventsService(this._eventsUseCase, commerceUid)
    const {ticketUid1,ticketUid2}= await seedTicketsService(this._ticketUseCase, commerceUid, levelUid1, levelUid2)*/

    const seedUsersPromise = seedUsersService(
      this._userUseCase,
      commerceUid,
      levelUid1,
      levelUid2
    );
    const seedEventsPromise = seedEventsService(
      this._eventsUseCase,
      commerceUid
    );
    const seedTicketsPromise = seedTicketsService(
      this._ticketUseCase,
      commerceUid,
      levelUid1,
      levelUid2
    );

    const [usersResult, eventsResult, ticketsResult] = await Promise.all([
      seedUsersPromise,
      seedEventsPromise,
      seedTicketsPromise
    ]);

    const { userUid1, userUid2 } = usersResult;
    const { eventUid1, eventUid2 } = eventsResult;
    const { ticketUid1, ticketUid2 } = ticketsResult;

    return true;

    // ---------------------------------Create commerce-----------------------------//
    /*let commerceUid=''

    const commerce: CommerceEntity= {
      nick: "example-nick",
      name: "ex. Name",
      phone: "3000000000",
      email: "example@example.co",
      countryCode: "EXAMPLE",
      city: "cali",
      dateFinish: "3000-10-10",
      totalFreePresale: 4,
      isActive:true,
      id:''
    }
    try{
      const commerceCreated =await this._commerceUseCase.createCommerce(commerce)
      commerceUid = commerceCreated.id;
    }
      catch(err){
        const commerceFound =await this._commerceUseCase.findCommerces( undefined,
          {
            name :'EXAMPLE',
            type : CriteriaOptionsLocation.country
          }

        )
        commerceUid = commerceFound[0].id;
    }*/

    // ---------------------------------Create levels-----------------------------//
    /*let levelUid1='';
    let levelUid2='';

    const level1: LevelEntity={
        id:'',
        name: "example level 1",
        typeId: 4,
        commerceUid, 
    }
    const level2: LevelEntity={
      id:'',
      name: "example level 2",
      typeId: 4,
      commerceUid, 
    }
    try{

      const levelsFound= await this._levelUseCase.findLevelsByCommerce(commerceUid);

      levelsFound.map(data=>{
        if(data.name.toLowerCase()==level1.name.toLowerCase()) levelUid1=data.id;
        if(data.name.toLowerCase()==level2.name.toLowerCase()) levelUid2=data.id;
      })

      if(levelUid1===''){
        const levelCreated1= await this._levelUseCase.createLevel(level1)
        levelUid1= levelCreated1.id;
      }

      if(levelUid2===''){
        const levelCreated2= await this._levelUseCase.createLevel(level2)
        levelUid2= levelCreated2.id;
      }

    }catch(err){
      
    }*/

    // ---------------------------------Create users-----------------------------//
    /*let userUid1='';
    let userUid2='';

    const user1={
      id:'',
      name: "User 1 Name",
      password: "user1name",
      phone: "1111",
      document:"11111111",
      commerceUserId: "L11111",
      email: "user1@user1.com",
      role: CommerceUserRoles.user,
      levelUid: levelUid1,
      commerceUid,
      isActive: true,
      freeSpace:"prueba"
    };

    const user2={
      id:'',
      name: "User 2 Name",
      password: "user2name",
      phone: "2222",
      document:"222222",
      commerceUserId: "L2222",
      email: "user2@user2.com",
      role: CommerceUserRoles.admin,
      levelUid: levelUid2,
      commerceUid,
      isActive: true,
      freeSpace:"prueba"
    };
    
    try{
      const user1Created= await this._userUseCase.createUser(user1)
      userUid1= user1Created.id;
    }catch(err){
      const userFound= await this._userUseCase.findUserCommerceByEmail(commerceUid, user1.email);
      userUid1=userFound.id;
    }

    try{
      const user2Created= await this._userUseCase.createUser(user2)
      userUid2= user2Created.id;
    }catch(err){
      const userFound= await this._userUseCase.findUserCommerceByEmail(commerceUid, user2.email);
      userUid2=userFound.id;
    }*/

    // --------------------------------- create Events -----------------------------//
    /*let eventUid1='';
    let eventUid2='';

    const event1: EventEntity={
      id: '',
      name: "STS Jul 2040",
      date: new Date("2040-07-10"),
      description: "description 1",
      url: "event1.com",
      commerceUid,
    }

    const event2: EventEntity={
      id: '',
      name: "STS ENE 2000",
      date: new Date("2000-01-10"),
      description: "description 1",
      url: "event0.com",
      commerceUid,
    }


    try{
      const eventsFound= await this._eventsUseCase.findEventsByCommerce(commerceUid);

      eventsFound.map(data=>{
        if(data.name.toLocaleLowerCase()==event1.name.toLocaleLowerCase()) eventUid1=data.id
        if(data.name.toLocaleLowerCase()==event2.name.toLocaleLowerCase()) eventUid2=data.id
      })

      if(eventUid1===''){
        const event1Created= await this._eventsUseCase.createEvent(event1)
      eventUid1= event1Created.id;
      }

      if(eventUid2===''){
        const event2Created= await this._eventsUseCase.createEvent(event2)
        eventUid2= event2Created.id;
      }

    }catch(err){}*/

    // --------------------------------- create tickets -----------------------------//
    /*let ticketUid1='';
    let ticketUid2='';

    const ticket1: TicketEntity ={
      id: '',
      name: "Ticket Level 1",
      saleFee: 95000,
      presaleFee: 70000,
      levelUid: levelUid1,
      commerceUid,
    }

    const ticket2: TicketEntity ={
      id: '',
      name: "Ticket Level 2",
      saleFee: 384500,
      presaleFee: 250000,
      levelUid: levelUid2,
      commerceUid,
    }

    try{
      const ticketsFound= await this._ticketUseCase.getTicketsByCommerce(commerceUid);

      ticketsFound.map(data=>{
        if(data.name.toLocaleLowerCase()==ticket1.name.toLocaleLowerCase()) ticketUid1=data.id
        if(data.name.toLocaleLowerCase()==ticket2.name.toLocaleLowerCase()) ticketUid2=data.id
      })

      if(ticketUid1===''){
        const ticket1Created= await this._ticketUseCase.createTicket(ticket1)
        ticketUid1= ticket1Created.id;
      }

      if(ticketUid2===''){
        const ticket2Created= await this._ticketUseCase.createTicket(ticket2)
      ticketUid2= ticket2Created.id;
      }

    }catch(err){}
*/

    return true;
  }
}
