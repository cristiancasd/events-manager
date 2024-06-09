export const findProspectByUidPath = (prospectUid) => {
  return 'prospect/find/id/' + prospectUid;
};

export const deleteProspectByUidPath = (prospectUid) => {
  return 'prospect/delete/' + prospectUid;
};

export const findProspectByPhonePath = (commerceUid, phone) => {
  return 'prospect/find/phone/' + commerceUid + '?phone=' + phone;
};

export const getProspectsByUserPath = (userUid) => {
  return 'prospect/find/allbyuser/' + userUid;
};

export const createProspectPath = '/prospect/create';
export const editProspectPath = '/prospect/edit';
