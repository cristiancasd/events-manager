
import { CommerceUseCase } from "../features/commerce/application/commerceUseCase";
import { CommerceRepository } from "../features/commerce/domain/commerce.repository";
import { TypeOrmCommerceRepository } from "../features/commerce/infrastructure/repository/typeOrm.repository";
import { CommerceController } from "../features/commerce/presentation/controllers/commerce.ctrl";
import { EventsController, EventsRepository, EventsUseCase, TypeOrmEventRepository } from "../features/events";



export const configureDependencies = () => {

    const commerceRepository: CommerceRepository = new TypeOrmCommerceRepository();
    const commerceUseCase = new CommerceUseCase(commerceRepository);
    const commerceCtrl = new CommerceController(commerceUseCase);


    const eventRepository: EventsRepository = new TypeOrmEventRepository();
    const eventsUseCase = new EventsUseCase(eventRepository);
    const eventsCtrl = new EventsController(eventsUseCase);

    return {
        commerceRepository, commerceUseCase, commerceCtrl,
        eventRepository, eventsUseCase, eventsCtrl,
    };
};


