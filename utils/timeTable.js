function timeTable(tableList, date, startTime, lastTime) {
  var week = ['일', '월', '화', '수', '목', '금', '토'];
  var dayOfWeek = week[new Date(date).getDay()];
  var timeTable = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
  ];
  var day;

  var tableArray = new Array();

  for(j=0;j<=27;j++){
    tableArray.push('A');
  }

  for(var i=0;i<tableList.length;i++){
    tableArray[parseInt(tableList[i]['TIME'])]=tableList[i]['roomStatus'];
  }

  return tableArray;
}

module.exports = timeTable;
