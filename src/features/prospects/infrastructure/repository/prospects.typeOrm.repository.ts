import { ProspectTypeORMEntity } from '..';
import {
  BadRequestError,
  DataBaseError,
  NotFoundError,
  codeCommerceNotFound,
  codeProspectNotFound,
  commerceIdInvalidMessage,
  errorHandlerTypeOrm,
  errorMessageCommerceNotFound,
  errorMessageProspectNotFound,
  errorMsgDb,
  userCommerceInvalidMessage
} from '../../../../core';
import { connectDB } from '../../../../database';
import { UserUseCase } from '../../../user';
import {
  ProspectEntity,
  ProspectRepository,
  ProspectValue
} from '../../domain';

export class ProspectsTypeORMRepository implements ProspectRepository {
  constructor(private userCommerceUseCase: UserUseCase) {}

  @errorHandlerTypeOrm
  async createProspect(data: ProspectEntity): Promise<ProspectEntity> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);

    const userCommerce = await this.userCommerceUseCase.findUserByUid(
      data.userCommerceUid
    );

    if (userCommerce.commerceUid != data.commerceUid)
      throw new BadRequestError(
        errorMessageCommerceNotFound,
        codeCommerceNotFound
      );

    // Create users DB
    const prospect = prospectRepository.create({
      ...data,
      userCommerce
    });

    // Save on DB
    const prospectSaved: ProspectTypeORMEntity = await prospectRepository.save({
      ...prospect,
      userCommerce
    });

    return new ProspectValue({
      ...prospectSaved,
      userCommerceUid: prospectSaved.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async findProspectByPhone(
    commerceUid: string,
    phone: string
  ): Promise<ProspectEntity> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);

    const queryBuilder = prospectRepository
      .createQueryBuilder('prospect')
      .leftJoinAndSelect('prospect.userCommerce', 'userCommerce')
      .where('prospect.phone = :phone', { phone })
      .andWhere('prospect.commerceUid = :commerceUid', { commerceUid });

    const prospect = await queryBuilder.getOne();

    if (!prospect)
      throw new NotFoundError(
        errorMessageProspectNotFound,
        codeProspectNotFound
      );
    return new ProspectValue({
      ...prospect,
      userCommerceUid: prospect.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async findProspectByUid(prospectUid: string): Promise<ProspectEntity> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);

    const queryBuilder = prospectRepository
      .createQueryBuilder('prospect')
      .leftJoinAndSelect('prospect.userCommerce', 'userCommerce')
      .where('prospect.id = :prospectUid', { prospectUid });

    const prospect = await queryBuilder.getOne();

    if (!prospect)
      throw new NotFoundError(
        errorMessageProspectNotFound,
        codeProspectNotFound
      );

    return new ProspectValue({
      ...prospect,
      userCommerceUid: prospect.userCommerce.id
    });
  }

  @errorHandlerTypeOrm
  async findProspectsByUserCommerce(
    userCommerceUid: string
  ): Promise<ProspectEntity[]> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);
    const queryBuilder = prospectRepository
      .createQueryBuilder('prospect')
      .leftJoinAndSelect('prospect.userCommerce', 'userCommerce')
      .where('userCommerce.id = :userCommerceUid', {
        userCommerceUid
      });

    const prospects = await queryBuilder.getMany();

    if (!prospects)
      throw new NotFoundError(
        errorMessageProspectNotFound,
        codeProspectNotFound
      );

    const prospectsArray: ProspectEntity[] = [];
    prospects.forEach((prospect) => {
      const prospectEntity = new ProspectValue({
        ...prospect,
        userCommerceUid: prospect.userCommerce.id
      });
      prospectsArray.push(prospectEntity);
    });
    return prospectsArray;
  }

  @errorHandlerTypeOrm
  async editProspect(data: ProspectEntity): Promise<ProspectEntity> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);
    const prospectFound = await prospectRepository.findOneBy({ id: data.id });

    if (!prospectFound)
      throw new NotFoundError(
        errorMessageProspectNotFound,
        codeProspectNotFound
      );

    if (data.commerceUid != prospectFound.userCommerce.commerce.id)
      throw new BadRequestError(commerceIdInvalidMessage);

    if (data.userCommerceUid != prospectFound.userCommerce.id)
      throw new BadRequestError(userCommerceInvalidMessage);

    // Save on DB
    const prospectSaved = await prospectRepository.save({
      ...prospectFound!,
      ...data
    });

    if (!prospectSaved) throw new DataBaseError(errorMsgDb);

    return new ProspectValue({
      ...prospectSaved,
      userCommerceUid: prospectSaved.userCommerce.id,
      commerceUid: prospectSaved.userCommerce.commerce.id
    });
  }

  @errorHandlerTypeOrm
  async deleteProspect(uid: string): Promise<void> {
    const prospectRepository = connectDB.getRepository(ProspectTypeORMEntity);
    const prospectToDelete = await prospectRepository.findOneBy({ id: uid });

    if (!prospectToDelete)
      throw new NotFoundError(
        errorMessageProspectNotFound,
        codeProspectNotFound
      );
    const result = await prospectRepository.remove(prospectToDelete);
    if (result) return;
    throw new NotFoundError(errorMessageProspectNotFound, codeProspectNotFound);
  }
}
