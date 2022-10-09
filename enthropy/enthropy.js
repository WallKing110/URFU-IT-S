const fs = require("fs");
let arg = process.argv;

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

let file = fs.readFileSync(arg[2], "utf-8");

/*if (file.length == 1){
	console.log('1');
	return 1
}*/
var alphSize = 0;
var alphQuant = 0;
alph = new Array();//Инициализация массива
for (let i = 0; i<file.length;i++){
	if (file.charAt(i) in alph){
	alph[file.charAt(i)]++;
	}
	else{
		alph[file.charAt(i)] = 1;
		alphSize++;
	}
	alphQuant+=1;
}

let enthropy = 0;
for (i in alph){
	alph[i] /= alphQuant;//Вероятность вместо элементов
	console.log(i, '|', alph[i]);
	if (alphSize == 0){
		enthropy = 0;
		break;
	}
	enthropy -= alph[i]* getBaseLog(alphSize,alph[i])//Подсчет элемента массива как элемента суммы энтропии+сложение
}

console.log("Энтропия равна ", enthropy);