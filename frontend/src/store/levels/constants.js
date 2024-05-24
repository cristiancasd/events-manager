export const getLevelPath = (commerceUid) => {
  return 'level/find/commerce/' + commerceUid;
};

export const deleteLevelPath = (commerceUid,levelUid) => {
  return 'level/delete/' + commerceUid+'/'+levelUid;
};


export const createLevelPath = 'level/create';
export const editLevelPath = 'level/edit';
