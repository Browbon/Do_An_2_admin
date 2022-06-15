export const getMonthList = (months, monthList) => {
  const list = [];
  for (let index = 0; index < months; index++) {
    let monthIndex = new Date().getMonth() - index;
    if (monthIndex < 0) monthIndex = 12;
    list.push(monthList[monthIndex]);
  }
  return list;
};
