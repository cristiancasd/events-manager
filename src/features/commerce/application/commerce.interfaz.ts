import { CriteriaOptionsStatus, OptionsValidations } from "../../../core";
import { CommerceEntity } from "../domain/commerce.entity";
import { LocationEntity } from "../domain/location.entity";

export interface ICommerceService {
    validateDuplicatedData(option: OptionsValidations, data: string): Promise<boolean>;
    createCommerce(input: CommerceEntity): Promise<CommerceEntity>;
    deleteCommerceByUid(uid: string): Promise<boolean>;
    disableCommerceByUid(uid: string): Promise<boolean>;
    enableCommerceByUid(uid: string): Promise<boolean>;
    findComerceByUid(uid: string): Promise<CommerceEntity>;
    findCommerces(status?: CriteriaOptionsStatus, location?: LocationEntity): Promise<CommerceEntity[]>;
}
