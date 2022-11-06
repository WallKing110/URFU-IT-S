const fs = require("fs")
var arg = process.argv;

let inText = fs.readFileSync(arg[2], 'UTF-8');
let subString = fs.readFileSync(arg[3], 'UTF-8');
console.log(subString);

answer = [];
//main code
var time = performance.now();
for (let i = 0; i < inText.length - subString.length + 1; i++)
{
	for (var j = 0, flag = true; j < subString.length; j++)
		if (inText[i+j] != subString[j])
			{
				flag = false;
				break;
			}
	if (flag == true)
		answer.push (i+1);
}
time = performance.now() - time;
console.log("Вхождения на: ", answer);
console.log("Время работы алгоритма: ", time);