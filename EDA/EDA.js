const fs = require("fs");
var arg = process.argv;

var textIn = fs.readFileSync(arg[2], "utf-8");
var subStr = fs.readFileSync(arg[3], "utf-8");

const ssl = subStr.length;

var alph = new Array();
//Определяем алфавит строки subStr
for(i = 0; i < ssl; i++)
	alph[subStr.charAt(i)] = 0;
//В двумерном массиве del храним таблицу переходов
del = new Array(ssl+1);
for(j=0;j<=ssl;j++)
	del[j] = new Array();
//Инициализируем таблицу переходов
for(i in alph)
	del[0][i] = 0;
//Формируем таблицу переходов
for(j=0;j<ssl;j++){
	prev = del[j][subStr.charAt(j)];
	del[j][subStr.charAt(j)] = j+1;
	for(i in alph)
		del[j+1][i] = del[prev][i];
}
//Находим позиции вхождений подстроки
let state = 0;
var positions = new Array();
var time = performance.now();
for (let i = 0; i<textIn.length; i++){
	if (textIn.charAt(i) in alph)
		state = del[state][textIn.charAt(i)];
	else
		state = 0;
	if (state == ssl)
		positions.push(i-ssl);
}
time = performance.now() - time;
console.log("Вхождения на: ", positions);
console.log("Время работы алгоритма: ", time);