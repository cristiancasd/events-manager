
import { CommerceUseCase } from "../features/commerce/application/commerceUseCase";
import { CommerceRepository } from "../features/commerce/domain/commerce.repository";
import { TypeOrmCommerceRepository } from "../features/commerce/infrastructure/repository/typeOrm.repository";
import { CommerceController } from "../features/commerce/presentation/controllers/commerce.ctrl";

export const configureDependencies = () => {

    const commerceRepository: CommerceRepository = new TypeOrmCommerceRepository();
    const commerceUseCase = new CommerceUseCase(commerceRepository);
    const commerceCtrl = new CommerceController(commerceUseCase);

    return {
        commerceRepository, commerceUseCase, commerceCtrl,
    };
};


