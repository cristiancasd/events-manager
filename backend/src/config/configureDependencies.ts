import { CommerceUseCase } from '../features/commerce/application/commerceUseCase';
import { CommerceRepository } from '../features/commerce/domain/commerce.repository';
import { TypeOrmCommerceRepository } from '../features/commerce/infrastructure/repository/typeOrm.repository';
import { CommerceController } from '../features/commerce/presentation/controllers/commerce.ctrl';
import {
  EventsController,
  EventsRepository,
  EventsUseCase,
  TypeOrmEventRepository
} from '../features/events';
import {
  LevelController,
  LevelRepository,
  LevelUseCase,
  TypeOrmLevelRepository
} from '../features/levels';
import {
  TypeOrmUserRepository,
  UserController,
  UserRepository,
  UserUseCase
} from '../features/user';

import {
  AuthController,
  AuthRepository,
  AuthUseCase,
  AuthRepositoryImpl
} from '../features/auth';
import {
  ProspectRepository,
  ProspectsController,
  ProspectsTypeORMRepository,
  ProspectsUseCase
} from '../features/prospects';

import { AttendeeUserRepository } from '../features/attendees-user';
import { AttendeeUserRepositoryImpl } from '../features/attendees-user/infrastructure/repository/attendeesUser.typeOrm.repository';
import { AttendeesUserUseCase } from '../features/attendees-user/application/attendeesUser.useCase';
import { AttendeesUserController } from '../features/attendees-user/presentation/controllers/attendeesUser.ctrl';
import {
  AttendeeProspectRepository,
  AttendeesProspectUseCase
} from '../features/attendees-prospect';
import { AttendeesProspectController } from '../features/attendees-prospect/presentation/controllers/attendeesProspect.ctrl';
import { AttendeeProspectRepositoryImpl } from '../features/attendees-prospect/infrastructure/repository/attendeesProspecttypeOrm.repository';
import {
  TicketController,
  TicketRepository,
  TicketRepositoryImpl,
  TicketUseCase
} from '../features/tickets';
import {
  UserTicketController,
  UserTicketRepository,
  UserTicketRepositoryImpl,
  UserTicketUseCase
} from '../features/user-ticket';
import { SeedController, SeedUseCase } from '../features/seed';
import {
  TicketProspectFeeController,
  TicketProspectFeeRepository,
  TicketProspectFeeRepositoryImpl,
  TicketProspectfeeUseCase
} from '../features/tickets-prospects-fee';
import {
  ProspectTicketController,
  ProspectTicketRepository,
  ProspectTicketRepositoryImpl,
  ProspectTicketUseCase
} from '../features/prospect-ticket';

// In this method you choose the dependencies to use
export const configureDependencies = () => {
  const authRepository: AuthRepository = new AuthRepositoryImpl();
  const authUseCase = new AuthUseCase(authRepository);
  const authCtrl = new AuthController(authUseCase);

  const commerceRepository: CommerceRepository =
    new TypeOrmCommerceRepository();
  const commerceUseCase = new CommerceUseCase(commerceRepository);
  const commerceCtrl = new CommerceController(commerceUseCase);

  const eventRepository: EventsRepository = new TypeOrmEventRepository();
  const eventsUseCase = new EventsUseCase(eventRepository);
  const eventsCtrl = new EventsController(eventsUseCase);

  const levelRepository: LevelRepository = new TypeOrmLevelRepository(
    commerceUseCase
  );
  const levelUseCase = new LevelUseCase(levelRepository);
  const levelCtrl = new LevelController(levelUseCase);

  const userRepository: UserRepository = new TypeOrmUserRepository(
    commerceUseCase,
    levelUseCase
  );
  const userUseCase = new UserUseCase(
    authUseCase,
    commerceUseCase,
    userRepository
  );
  const userCtrl = new UserController(userUseCase);

  const prospectsRepository = new ProspectsTypeORMRepository(userUseCase);
  const prospectsUseCase = new ProspectsUseCase(prospectsRepository);
  const prospectsCtrl = new ProspectsController(prospectsUseCase);

  const userTicketRepository: UserTicketRepository =
    new UserTicketRepositoryImpl(userUseCase, eventsUseCase);
  const userTicketUseCase = new UserTicketUseCase(userTicketRepository);
  const userTicketCtrl = new UserTicketController(userTicketUseCase);

  const attendeeUserRepository: AttendeeUserRepository =
    new AttendeeUserRepositoryImpl(eventsUseCase, userUseCase);
  const attendeeUserUseCase = new AttendeesUserUseCase(
    attendeeUserRepository,
    userTicketUseCase
  );
  const attendeeUserCtrl = new AttendeesUserController(attendeeUserUseCase);

  const attendeeProspectRepository: AttendeeProspectRepository =
    new AttendeeProspectRepositoryImpl(eventsUseCase, prospectsUseCase);
  const attendeeProspectUseCase = new AttendeesProspectUseCase(
    attendeeProspectRepository
  );
  const attendeeProspectCtrl = new AttendeesProspectController(
    attendeeProspectUseCase
  );

  const ticketRepository: TicketRepository = new TicketRepositoryImpl(
    commerceUseCase,
    levelUseCase
  );
  const ticketUseCase = new TicketUseCase(ticketRepository);
  const ticketCtrl = new TicketController(ticketUseCase);

  const ticketProspectFeeRepository: TicketProspectFeeRepository =
    new TicketProspectFeeRepositoryImpl(commerceUseCase);
  const ticketProspectFeeUseCase = new TicketProspectfeeUseCase(
    ticketProspectFeeRepository
  );
  const ticketProspectFeeCtrl = new TicketProspectFeeController(
    ticketProspectFeeUseCase
  );

  const prospectTicketRepository: ProspectTicketRepository =
    new ProspectTicketRepositoryImpl(prospectsUseCase, eventsUseCase);
  const prospectTicketUseCase = new ProspectTicketUseCase(
    prospectTicketRepository
  );
  const prospectTicketCtrl = new ProspectTicketController(
    prospectTicketUseCase
  );

  const seedUseCase = new SeedUseCase(
    authUseCase,
    commerceUseCase,
    eventsUseCase,
    levelUseCase,
    userUseCase,
    prospectsUseCase,
    attendeeUserUseCase,
    attendeeProspectUseCase,
    ticketUseCase,
    userTicketUseCase
  );

  const seedCtrl = new SeedController(seedUseCase);

  return {
    commerceRepository,
    commerceUseCase,
    commerceCtrl,
    eventRepository,
    eventsUseCase,
    eventsCtrl,
    levelRepository,
    levelUseCase,
    levelCtrl,
    userRepository,
    userUseCase,
    userCtrl,
    authCtrl,
    authUseCase,
    prospectsCtrl,
    prospectsUseCase,
    attendeeUserCtrl,
    attendeeUserUseCase,
    attendeeProspectCtrl,
    attendeeProspectUseCase,
    ticketCtrl,
    ticketUseCase,
    ticketProspectFeeCtrl,
    ticketProspectFeeUseCase,
    userTicketCtrl,
    userTicketUseCase,
    prospectTicketCtrl,
    prospectTicketUseCase,
    seedCtrl,
    seedUseCase
  };
};
