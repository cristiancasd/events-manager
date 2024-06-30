import { UserValue } from '../../../domain/users.value';
import { UserCommerceTypeORMEntity } from '../../models/userCommerce.dto';
import { UserTypeORMEntity } from '../../models/users.dto';
import { UserEntity } from '../../../domain/users.entity';
import { connectDB } from '../../../../../database';

export async function buildUserEntityFromUserUtil(
  user: UserTypeORMEntity | null
): Promise<UserEntity | null> {
  if (!user) return null;
  const userCommerceRepository = connectDB.getRepository(
    UserCommerceTypeORMEntity
  );
  const userCommerce = await userCommerceRepository.findOne({
    where: { email: user.email },
    select: {
      email: true,
      password: true,
      id: true,
      role: true,
      isActive: true
    }
  });

  if (!userCommerce) return null;

  return new UserValue({
    id: userCommerce.id,
    name: user.name,
    document: user.document,
    email: user.email,
    phone: user.phone,
    role: userCommerce.role,
    isActive: userCommerce.isActive,
    commerceUserId: userCommerce.commerceUserId,
    commerceUid: userCommerce.commerce.id,
    levelUid: userCommerce.level.id
  });
}

export async function buildUserEntityFromUserCommerceUtil(
  userCommerce: UserCommerceTypeORMEntity | null
): Promise<UserEntity | null> {
  if (!userCommerce) return null;
  const userRepository = connectDB.getRepository(UserTypeORMEntity);

  console.log(
    'prueba... buildUserEntityFromUserCommerceUtil userCommerce',
    userCommerce
  );
  const user = await userRepository.findOneBy({ email: userCommerce.email });
  console.log('prueba... buildUserEntityFromUserCommerceUtil user', user);

  if (!user) return null;

  return new UserValue({
    id: userCommerce.id,
    name: user.name,
    document: user.document,
    email: user.email,
    phone: user.phone,
    role: userCommerce.role,
    isActive: userCommerce.isActive,
    commerceUserId: userCommerce.commerceUserId,
    commerceUid: userCommerce.commerce.id,
    levelUid: userCommerce.level.id
  });
}

export async function buildUserEntityUtil(
  user: UserTypeORMEntity,
  userCommerce: UserCommerceTypeORMEntity
): Promise<UserEntity> {
  return new UserValue({
    id: userCommerce.id,
    name: user.name,
    document: user.document,
    email: user.email,
    phone: user.phone,
    role: userCommerce.role,
    isActive: userCommerce.isActive,
    commerceUserId: userCommerce.commerceUserId,
    commerceUid: userCommerce.commerce.id,
    levelUid: userCommerce.level.id
  });
}
