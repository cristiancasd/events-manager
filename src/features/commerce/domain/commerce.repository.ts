import { CriteriaOptionsLocation, CriteriaOptionsStatus, OptionsValidations } from "../../../core";
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


  //updateCommerce(uid: string, commerce: CommerceEntity): Promise<CommerceEntity | null>;
  //findCommerceByUid(commerce: CommerceEntity): Promise<CommerceEntity | null>;
  //findCommerceByCriteria(option: CriteriaOptionsLocation, data: string): Promise<CommerceEntity | null>;

  //getAllCommerce(commerce: CommerceEntity): Promise<CommerceEntity | null>;
}
