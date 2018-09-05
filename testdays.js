function selDays (num) {
	var day = ['день','дня','дней'];
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

console.log(20 + days[seldays(20)])
console.log(seldays(1))
console.log(seldays(50))