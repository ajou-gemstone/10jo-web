function timeParser(timeList) {
  var tmp = new Array();
  var result = new Array();

  timeList = timeList.replace(/^\s*/, "");

  tmp = timeList.split(" ");

  var day = tmp[0];

  if (day == '월') {
    day = 'A';
  } else if (day == '화') {
    day = 'B';
  } else if (day == '수') {
    day = 'C';
  } else if (day == '목') {
    day = 'D';
  } else if (day == '금') {
    day = 'E';
  } else if (day == '토') {
    day = 'F';
  } else if (day == '일') {
    day = 'G';
  }

  tmp = tmp[1].split("~");

  var time = new Array();

  for(var i=0;i<tmp.length;i++){
    if(tmp[i]=="07:00"){
      time.push("0");
    }
    else if(tmp[i]=="07:30"){
      time.push("1");
    }
    else if(tmp[i]=="08:00"){
      time.push("2");
    }
    else if(tmp[i]=="08:30"){
      time.push("3");
    }
    else if(tmp[i]=="09:00"){
      time.push("4");
    }
    else if(tmp[i]=="09:30"){
      time.push("5");
    }
    else if(tmp[i]=="10:00"){
      time.push("6");
    }
    else if(tmp[i]=="10:30"){
      time.push("7");
    }
    else if(tmp[i]=="11:00"){
      time.push("8");
    }
    else if(tmp[i]=="11:30"){
      time.push("9");
    }
    else if(tmp[i]=="12:00"){
      time.push("10");
    }
    else if(tmp[i]=="12:30"){
      time.push("11");
    }
    else if(tmp[i]=="13:00"){
      time.push("12");
    }
    else if(tmp[i]=="13:30"){
      time.push("13");
    }
    else if(tmp[i]=="14:00"){
      time.push("14");
    }
    else if(tmp[i]=="14:30"){
      time.push("15");
    }
    else if(tmp[i]=="15:00"){
      time.push("16");
    }
    else if(tmp[i]=="15:30"){
      time.push("17");
    }
    else if(tmp[i]=="16:00"){
      time.push("18");
    }
    else if(tmp[i]=="16:30"){
      time.push("19");
    }
    else if(tmp[i]=="17:00"){
      time.push("20");
    }
    else if(tmp[i]=="17:30"){
      time.push("21");
    }
    else if(tmp[i]=="18:00"){
      time.push("22");
    }
    else if(tmp[i]=="18:30"){
      time.push("23");
    }
    else if(tmp[i]=="19:00"){
      time.push("24");
    }
    else if(tmp[i]=="19:30"){
      time.push("25");
    }
    else if(tmp[i]=="20:00"){
      time.push("26");
    }
    else if(tmp[i]=="20:30"){
      time.push("27");
    }
    else if(tmp[i]=="16:00"){
      time.push("28");
    }
  }

  for(var i=0;i<time.length;i++){
    result.push(day+time[i]);
  }
  return result;
}

module.exports = timeParser;