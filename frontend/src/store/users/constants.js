export const findUserByUidPath = (userUid) => {
  return 'user/find/id/' + userUid;
};

export const findUserByEmailPath = (commerceUid, email) => {
  return 'user/find/email/' + commerceUid + '?email=' + email;
};

export const findUserByCustomIdOrDocumentPath = (commerceUid, data) => {
  return 'user/find/data/' + commerceUid + '?data=' + data;
};

export const getUsersByLevelPath = (commerceUid, levelUid) => {
  return 'user/find/level/' + commerceUid + '/' + levelUid;
};
