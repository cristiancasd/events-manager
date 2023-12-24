import { CriteriaOptionsStatus, OptionsValidations } from "../../../core";
import { CommerceEntity } from "./commerce.entity";
import { LocationEntity } from "./location.entity";

export interface CommerceRepository {
  createCommerce(commerce: CommerceEntity): Promise<CommerceEntity>;
  deleteCommerce(uid: string): Promise<boolean>;
  disableCommerce(uid: string): Promise<boolean>;
  enableCommerce(uid: string): Promise<boolean>;
  findCommerceById(uid: string, onlyActive?: boolean): Promise<CommerceEntity>;
  findCommerces(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<CommerceEntity[]>;
  findByUniqueColumn(option: OptionsValidations, data: string): Promise<CommerceEntity>;
}
