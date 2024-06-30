export const registerAttendeeUserPath = '/attendee/user/create';

export const listAttendeesUserByEventAndLevelPath = (eventUid, levelUid) => {
  return 'attendee/user/find/' + eventUid + '?levelUid=' + levelUid;
};
