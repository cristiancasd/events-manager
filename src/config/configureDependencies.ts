
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


// In this method you choose the dependencies to use
export const configureDependencies = () => {
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
  const userUseCase = new UserUseCase(userRepository);
  const userCtrl = new UserController(userUseCase);


  const authRepository: AuthRepository = new AuthRepositoryImpl();
  const authUseCase = new AuthUseCase(authRepository);
  const authCtrl = new AuthController(authUseCase);

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
  };
};
