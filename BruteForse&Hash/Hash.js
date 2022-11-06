const fs = require("fs");
var arg = process.argv;

let inText = fs.readFileSync(arg[2], "utf-8");
let subString = fs.readFileSync(arg[3], "utf-8");

answer = [];
//calc of pre-hashes
var hashOfSub = 0;
var hashOfText = 0;
for (let i = 0; i < subString.length; i++)
	{
		hashOfSub += subString.charCodeAt(i);
		hashOfText += inText.charCodeAt(i);
	}

for (var j = 0, flag = true; j < subString.length; j++)
	if (inText[j] != subString[j])
		{
			flag = false;
			break;
		}
if (flag == true)
	answer.push (1);

//calc of subStrings in text
var time = performance.now();
for (let i = 1; i < inText.length; i++)
{
	hashOfText = hashOfText + inText.charCodeAt(i+subString.length-1)-inText.charCodeAt(i-1);
	if (hashOfText != hashOfSub)
		null;
	else
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
}
time = performance.now() - time;

console.log("Вхождения на: ", answer);
console.log("Время работы алгоритма: ", time);