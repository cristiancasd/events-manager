import { CriteriaOptionsLocation, CriteriaOptionsStatus } from "../../../core";
import { CommerceEntity } from "./commerce.entity";
import { LocationEntity } from "./location.entity";

export interface CommerceRepository {
  createCommerce(commerce: CommerceEntity): Promise<CommerceEntity>;
  deleteCommerce(uid: string): Promise<Boolean>;
  disableCommerce(uid: string): Promise<Boolean>;
  enableCommerce(uid: string): Promise<Boolean>;

  findCommerceById(uid: string, onlyActive?: Boolean): Promise<CommerceEntity>;
  findCommerces(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<CommerceEntity[]>;



  //updateCommerce(uid: string, commerce: CommerceEntity): Promise<CommerceEntity | null>;
  //findCommerceByUid(commerce: CommerceEntity): Promise<CommerceEntity | null>;
  //findCommerceByCriteria(option: CriteriaOptionsLocation, data: string): Promise<CommerceEntity | null>;

  //getAllCommerce(commerce: CommerceEntity): Promise<CommerceEntity | null>;
}
