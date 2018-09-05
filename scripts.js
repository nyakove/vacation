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


function setDate() {
	var start = new Date();
	var finish = new Date (start.getTime() + 15638400000);
	var min = start.toISOString().slice(0, 10);
	var max = finish.toISOString().slice(0, 10);
	var minmin = min;
	var finishmax = new Date (finish.getTime() + 2592000000);
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

function selDays (num) {
	var day = [' день ',' дня ',' дней '];
	if (num >= 5 && num <= 20)
		return day[2];
	else if (num == 1)
		return day[0];
	else if (num > 1 && num <5 ) 
		return day[1];
	
	var a = num.toString();
	if (a.length >= 2 && parseInt(a.slice(-2)) < 20 && parseInt(a.slice(-2)) >= 5) 
		return day[2]
	
	else if  (a.length >= 2 && parseInt(a.slice(-1)) > 1 && parseInt(a.slice(-1)) < 5) 
		return day[1]
	
	else if (a.length >= 2 && parseInt(a.slice(-1)) == 1 && parseInt(a.slice(-2)) != 11)
		return day[0]
	
	else return day[2]
}

function selectVacationType() {
  if ($('#start').val() == '' || $('#finish').val() == '') {
	$('#result').html('Введите обе даты!').removeClass(remClass).addClass("alert-danger");
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
  var user = main.user.options.selectedIndex;
  var start = new Date($('#start').val());
  var finish = new Date($('#finish').val());
  var days = (finish - start) / 86400 / 1000 + 1;

  if (start > finish) {
$('#start').val('')
$('#finish').val('')
$('#result').html(lessOneDay).removeClass(remClass).addClass("alert-danger");
   return
  }

  if (days > 15) {
	$('#result').html('Больше 15 дней подряд брать запрещено!').removeClass(remClass).addClass("alert-danger");
    return
  }
  if (days > daysLeft[user]) {
	$('#result').html('У вас не осталось так много дней отпуска. Остаток: ' + daysLeft[user] + ' дней').removeClass(remClass).addClass("alert-warning");
    return
  }

  daysLeft[user] -= days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selDays(days) + 'отпуска.').removeClass(remClass).addClass("alert-success");

}

function otherVacation() {
  var user = main.user.options.selectedIndex;
  var start = new Date($('#start').val());
  var finish = new Date($('#finish').val());
  var days = (finish - start) / 86400 / 1000 + 1;

  if (start > finish) {
	$('#start').val('')
	$('#finish').val('')
	$('#result').html(lessOneDay).removeClass(remClass).addClass("alert-danger");
    return
  }

  if (days > otherDaysLeft[user]) {
	$('#result').html('У вас не осталось так много дней отпуска. Остаток: ' + otherDaysLeft[user] + ' дней').removeClass(remClass).addClass("alert-warning");
    return
  }
  otherDaysLeft[user] -= days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selDays(days) + 'отпуска за свой счёт.').removeClass(remClass).addClass("alert-success");
}

function sickLeave() {
  var user = main.user.options.selectedIndex;
  var start = new Date($('#start').val());
  var finish = new Date($('#finish').val());
  var days = (finish - start) / 86400 / 1000 + 1;
  
  if (start > finish) {
	$('#start').val('')
	$('#finish').val('')
	$('#result').html(lessOneDay).removeClass(remClass).addClass("alert-danger");
    alert(lessOneDay);
    return
  }
  sickLeaveDays[user] += days;
  $('#result').html('Сотрудник ' + usersNames[user] + text + days + selDays(days) + 'больничного.').removeClass(remClass).addClass("alert-success");
}

function personalLeave() {
  var user = main.user.options.selectedIndex;
  var start = new Date(document.getElementById("start").value);
  var finish = new Date(document.getElementById("finish").value);
  var minutes = (finish - start) / 1000 / 60;
  
  if (start >= finish) {
    document.getElementById("start").value = '';
    document.getElementById("finish").value = '';
    alert('Дата окончания не может быть раньше начала!');
    return
  }
  
  if (minutes > personalLeaveMinutes[user]) {
    alert('У вас не осталось так много времени личного отсутствия. Остаток: ' + Math.floor(personalLeaveMinutes[user] / 60) + ' часов ' + personalLeaveMinutes[user] % 60 + ' минут');
    return
  }

  personalLeaveMinutes[user] -= minutes
  console.log('Сотрудник ' + usersNames[user] + text + Math.floor(minutes / 60) + ' часов ' + minutes % 60 + ' минут личного отсутствия.')
}

function businessTrip() {

  var user = main.user.options.selectedIndex;
  var start = new Date($('#start').val());
  var finish = new Date($('#finish').val());
  var days = (finish - start) / 86400 / 1000 + 1;

  if (start >= finish) {
    document.getElementById("start").value = '';
    document.getElementById("finish").value = '';
    alert('Дата окончания не может быть раньше начала. Если вы хотите взять отпуск меньше целого дня, воспользуйтесь типом \"Личное\"');
    return
  }
  businessTripDays[user] += days;
  console.log('Сотрудник ' + usersNames[user] + text + days + ' дней командировки.')
}
