
import { CommerceUseCase } from "../features/commerce/application/commerceUseCase";
import { CommerceRepository } from "../features/commerce/domain/commerce.repository";
import { TypeOrmCommerceRepository } from "../features/commerce/infrastructure/repository/typeOrm.repository";
import { CommerceController } from "../features/commerce/presentation/controllers/commerce.ctrl";
import { EventsController, EventsRepository, EventsUseCase, TypeOrmEventRepository } from "../features/events";
import { LevelController, LevelRepository, LevelUseCase, TypeOrmLevelRepository } from "../features/levels";


export const configureDependencies = () => {

    const commerceRepository: CommerceRepository = new TypeOrmCommerceRepository();
    const commerceUseCase = new CommerceUseCase(commerceRepository);
    const commerceCtrl = new CommerceController(commerceUseCase);

    const eventRepository: EventsRepository = new TypeOrmEventRepository();
    const eventsUseCase = new EventsUseCase(eventRepository);
    const eventsCtrl = new EventsController(eventsUseCase);

    const levelRepository: LevelRepository = new TypeOrmLevelRepository();
    const levelUseCase = new LevelUseCase(levelRepository);
    const levelCtrl = new LevelController(levelUseCase);

    return {
        commerceRepository, commerceUseCase, commerceCtrl,
        eventRepository, eventsUseCase, eventsCtrl,
        levelRepository, levelUseCase, levelCtrl,
    };
};


