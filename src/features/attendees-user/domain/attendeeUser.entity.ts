import { AttendeeUserBasicDataEntity } from "./attendeeUserBasicData.entity";

export interface AttendeeUserEntity {
    id: string;
    eventUid: string;
    userData: AttendeeUserBasicDataEntity;
  }
  