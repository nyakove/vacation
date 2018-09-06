function selDays (num) {
	var day = [' день ',' дня ',' дней '];
	if (num >= 5 && num <= 20)
		return day[2];
	else if (num == 1)
		return day[0];
	else if (num > 1 && num <5 ) 
		return day[1];
	
	var a = num.toString();
	if (a.length >= 2 && parseInt(a.slice(-2)) < 20 && parseInt(a.slice(-2)) >= 5) {
		return day[2]
	}
	else if  (a.length >= 2 && parseInt(a.slice(-1)) > 1 && parseInt(a.slice(-1)) < 5) {
		return day[1]
	}
	else if (a.length >= 2 && a.slice(-2) == "01")
		return day[0]
	
	else if (a.length >= 2 && parseInt(a.slice(-1)) == 1 && parseInt(a.slice(-2)) > 11)
		return day[0]
	
	else return day[2]
}


function selectDays (num) {
	var day = [' день ',' дня ',' дней '];
	var a = num.toString();
	if (num % 10 == 1 && parseInt(a.slice(-2)) != 11)
		return day[0];
	if (num % 10 > 1 && num % 10 < 5 && parseInt(a.slice(-2)) != 12 && parseInt(a.slice(-2)) != 13 && parseInt(a.slice(-2)) != 14)
		return day[1]
	else return day[2]
}

function _selectDays_ (num) {
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
}

var t1 = performance.now();
for (i=0; i<1000000; i++) {
	selectDays(i);
}
var t2 = performance.now();

console.log('selectDays(): ' + (t2-t1) + ' ms');

var t3 = performance.now();
for (j=0; j<10000000; j++) {
	_selectDays_(j);
}
var t4 = performance.now();

console.log('_selectDays_(): ' + (t4-t3) + ' ms')

var t5 = performance.now();
for (k=0; k<1000000; k++) {
	selDays(k);
}
var t6 = performance.now();

console.log('selDays(): ' + (t6-t5) + ' ms');


