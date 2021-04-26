// 根据时间戳获取年月日时分秒
// 根据时间戳获取年月日时分秒
function getYMDHMS(time) {
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    date = time.getDate(),
    hours = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds();

  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  return {
    year: year,
    month: month,
    date: date,
    hours: hours,
    minute: minute,
    second: second
  }; //不想要对象的情况下 直接返回 //return year+'年'+ month+'月'+date+'日'+hours+':'+minute+':'+second
}
