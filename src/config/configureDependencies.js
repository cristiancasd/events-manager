"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependencies = void 0;
const commerceUseCase_1 = require("../features/commerce/application/commerceUseCase");
const typeOrm_repository_1 = require("../features/commerce/infrastructure/repository/typeOrm.repository");
const commerce_ctrl_1 = require("../features/commerce/presentation/controllers/commerce.ctrl");
const events_1 = require("../features/events");
const levels_1 = require("../features/levels");
const user_1 = require("../features/user");
const auth_1 = require("../features/auth");
// In this method you choose the dependencies to use
const configureDependencies = () => {
    const commerceRepository = new typeOrm_repository_1.TypeOrmCommerceRepository();
    const commerceUseCase = new commerceUseCase_1.CommerceUseCase(commerceRepository);
    const commerceCtrl = new commerce_ctrl_1.CommerceController(commerceUseCase);
    const eventRepository = new events_1.TypeOrmEventRepository();
    const eventsUseCase = new events_1.EventsUseCase(eventRepository);
    const eventsCtrl = new events_1.EventsController(eventsUseCase);
    const levelRepository = new levels_1.TypeOrmLevelRepository(commerceUseCase);
    const levelUseCase = new levels_1.LevelUseCase(levelRepository);
    const levelCtrl = new levels_1.LevelController(levelUseCase);
    const userRepository = new user_1.TypeOrmUserRepository(commerceUseCase, levelUseCase);
    const userUseCase = new user_1.UserUseCase(userRepository);
    const userCtrl = new user_1.UserController(userUseCase);
    const authRepository = new auth_1.AuthRepositoryImpl();
    const authUseCase = new auth_1.AuthUseCase(authRepository);
    const authCtrl = new auth_1.AuthController(authUseCase);
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
    };
};
exports.configureDependencies = configureDependencies;
