export const getLevelNameById = (levelUid, levels) => {
  let name = '';
  levels.map((data) => {
    if (data.id == levelUid) name = data.name;
  });
  return name;
};



