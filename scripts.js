var usersNames = []
for (i = 0; i < main.user.options.length; i++) {
  usersNames.push(main.user.options[i].text)
  
}

var daysLeft = { 0: 21, 1: 21, 2: 21, 3: 21, 4: 21 };
var otherDaysLeft = { 0: 15, 1: 15, 2: 15, 3: 15, 4: 15 };
var sickLeaveDays = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
var personalLeaveMinutes = { 0: 1020, 1: 1020, 2: 1020, 3: 1020, 4: 1020 };
var businessTripDays = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
var lessOneDay = 'Дата окончания не может быть раньше начала.'
var userSex = { 0: 1, 1: 0, 2: 1, 3: 0, 4: 1 };
var text = '';

function globalVar() {
  user = main.user.options.selectedIndex;
  start = new Date($('#start').val());
  finish = new Date($('#finish').val());
  days = (finish - start) / 86400 / 1000 + 1;
}

function setDate() {
	var today = new Date();
	var lastDate = new Date (today.getTime() + 15638400000);
	var min = today.toISOString().slice(0, 10);
	var max = lastDate.toISOString().slice(0, 10);
	var minmin = min;
	var finishmax = new Date (lastDate.getTime() + 2592000000);
	var maxmax = finishmax.toISOString().slice(0, 10);
	$('#start')[0].min = min;
	$('#start')[0].max = max;
	$('#finish')[0].min = minmin;
	$('#finish')[0].max = maxmax;
}

function remClass (index, className) {
    return (className.match (/\balert-\S+/g) || []).join(' ');
}

function selectHours() {
  var a = $("#start")[0];
  var b = $("#finish")[0];
  if (main.type.options.selectedIndex == 3) {
    a.type = 'datetime-local';
    b.type = 'datetime-local';
  }
  else {
    a.type = 'date';
    b.type = 'date';
  }
}

function reset() {
	$('#start').val("");
	$('#finish').val("");
	$("#start")[0].type = 'date';
	$("#finish")[0].type = 'date';
	main.user.options.selectedIndex = 0;
	main.type.options.selectedIndex = 0;
	$('#result').html('Результат').removeClass(remClass).addClass("alert-secondary");
}

/* function _selectDays_ (num) {
	var day = [' день ',' дня ',' дней '];
	var a = num.toString().slice(-2);
	var b = num % 10;
	if (num == 2 || num == 3 || num == 4)
		return day[1];
	if (b == 1 && a != '11')
		return day[0];
	if (b > 1 && b < 5 && '121314'.indexOf(a) < 0 && a.length > 1)
		return day[1];
	else
		return day[2]
} */

function selectDaysMath (num) {
	var day = [' день ',' дня ',' дней '];
	var a = num % 10;
	var b = num % 100;
	if (a == 1 && b != 11)
		return day[0]
	if (a > 1 && a < 5 && b != 12 && b != 13 && b != 14) 
		return day[1];
	else 
		return day[2];
	
}

function selectVacationType() {
  if ($('#start').val() == '' || $('#finish').val() == '') {
	$('#result').html('Введите обе даты!').removeClass(remClass).addClass("alert-danger");
    return
  }
  
    if (start > finish) {
$('#start').val('')
$('#finish').val('')
$('#result').html(lessOneDay).removeClass(remClass).addClass("alert-danger");
   return
  }

	if (userSex[main.user.options.selectedIndex]) {
		text = ' оформил '
	}
	else 
		text = ' оформила '
  
  switch (main.type.options.selectedIndex) {
    case 0: simpleVacation();
      break;
    case 1: otherVacation();
      break;
    case 2: sickLeave();
      break;
    case 3: personalLeave();
      break;
    case 4: businessTrip();
      break;
  }
}

function simpleVacation() {

  if (days > 15) {
	$('#result').html('Больше 15 дней подряд брать запрещено!').removeClass(remClass).addClass("alert-danger");
    return
  }
  
  if (days > daysLeft[user]) {
	$('#result').html('У вас не осталось так много дней отпуска. Остаток: ' + daysLeft[user] + ' дней').removeClass(remClass).addClass("alert-warning");
    return
  }

  daysLeft[user] -= days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selectDaysMath(days) + 'отпуска.').removeClass(remClass).addClass("alert-success");

}

function otherVacation() {

  if (days > otherDaysLeft[user]) {
	$('#result').html('У вас не осталось так много дней отпуска. Остаток: ' + otherDaysLeft[user] + ' дней').removeClass(remClass).addClass("alert-warning");
    return
  }
  otherDaysLeft[user] -= days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selectDaysMath(days) + 'отпуска за свой счёт.').removeClass(remClass).addClass("alert-success");
}

function sickLeave() {
  
  sickLeaveDays[user] += days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selectDaysMath(days) + 'больничного.').removeClass(remClass).addClass("alert-success");
}

function personalLeave() {
  var minutes = (finish - start) / 1000 / 60;
  
  if (minutes > personalLeaveMinutes[user]) {
    $('#result').html('У вас не осталось так много времени личного отсутствия. Остаток: ' + Math.floor(personalLeaveMinutes[user] / 60) + ' часов ' + personalLeaveMinutes[user] % 60 + ' минут').removeClass(remClass).addClass("alert-danger");
    return
  }

  personalLeaveMinutes[user] -= minutes
  $('#result').html('Сотрудник ' + usersNames[user] + text + Math.floor(minutes / 60) + ' часов ' + minutes % 60 + ' минут личного отсутствия.').removeClass(remClass).addClass("alert-success");
}

function businessTrip() {

  businessTripDays[user] += days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selectDaysMath(days) + 'командировки.').removeClass(remClass).addClass("alert-success");
}
