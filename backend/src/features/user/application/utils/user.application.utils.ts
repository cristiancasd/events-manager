import { UserCommerceEntity } from '../../domain/userCommerce.entity';
import { UserCoreEntity } from '../../domain/userCore.entity';
import { UserEntity } from '../../domain/users.entity';
import { UserValue } from '../../domain/users.value';

export async function buildUserEntityApplicationUtil(
  user: UserCoreEntity,
  userCommerce: UserCommerceEntity
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
    commerceUid: userCommerce.commerceUid,
    levelUid: userCommerce.levelUid
  });
}
