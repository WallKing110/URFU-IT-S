const fs = require("fs")
var arg = process.argv;

let inText = fs.readFileSync(arg[3], "utf-8");

function arrSort (arr){
for (let i = 0; i < arr.length-1; i++){
	let temp;
	for (let j = i+1; j < arr.length; j++){
		if (arr[i][0]>arr[j][0]){
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}				
	}
}
return arr;
}

function BuildTree(arr){
	if (arr.length == 1) return arr;
	let temp1 = arr.shift();
	let temp2 = arr.shift();
	arr.unshift([temp1[0]+temp2[0], temp1, temp2]);
	arr = arrSort(arr);
	return BuildTree(arr);
}

function SetCode (arr, code){
	if (arr.length > 2) return [SetCode(arr[1], code+'1'), SetCode(arr[2], code+'0')];
	else arr.push(code);
}

function CreateTable(arr, table){
	let arr1 = arr;
	for (let i = 0; i<arr1.length; i++){
		table+=arr1[i][1]+' '+arr1[i][0]+'\n';
	}
	return table;
}

function CreateCodeTable(arr){
	if (Array.isArray(arr[1]) == false){
		return arr[1]+' '+arr[2]+'\n';
	}
	else {
		return [CreateCodeTable(arr[1]), CreateCodeTable(arr[2])];
	}
}

function FindLettersCode (arr, letter) {
	if (arr[1] == letter){
		return arr[2];
	}
	if (Array.isArray(arr[1])==true){
		return [FindLettersCode(arr[1], letter), FindLettersCode(arr[2], letter)];
	}
}

if (arg[2] == 'encode'){
	alphInt = new Array ();
	alphChar = new Array ();
	for (let i = 0; i<inText.length; i++)
	{
		if (alphChar.includes(inText.charAt(i)))
		{
			alphInt[alphChar.indexOf(inText.charAt(i))]++;
		}
		else{
			alphChar.push (inText.charAt(i));
			alphInt[alphChar.indexOf(inText.charAt(i))] = 1;
		}
	}
	var alph = new Array();
	for (let i = 0; i < alphInt.length; i++) alph[i] = [alphInt[i], alphChar[i]];
	for (let i = 0; i < alph.length-1; i++){
		let temp;
		for (let j = i+1; j < alph.length; j++){
			if (alph[i][0]>alph[j][0]){
				temp = alph[i];
				alph[i] = alph[j];
				alph[j] = temp;
			}				
		}
	}
	fs.writeFileSync(arg[5], CreateTable(alph, ''))
	BuildTree(alph);
	alph = alph[0];
	if (Array.isArray(alph[1])) SetCode(alph, '');
	else alph.push ('1');
	let code = '';
	code += CreateCodeTable(alph);
	code = code.replace(/,/g, '');
	fs.writeFileSync(arg[6], code);
	let strRes = '';
	for (let i = 0; i < inText.length; i++){
		strRes+=FindLettersCode(alph, inText.charAt(i));
	}
	strRes = strRes.replace(/,/g, '');
	fs.writeFileSync(arg[4], strRes);
}
else {
	let code = fs.readFileSync(arg[5], "utf-8");
	code = code.split('\n');
	for (let i = 0; i< code.length; i++){
		code [i] = code[i].split(' ');
	}
	code.pop();
	let i = 0;
	let strRes = '';
	while ((inText.indexOf('0')>-1) || (inText.indexOf('1')> -1)){
		if (inText.startsWith(code[i][1])){ 
			strRes += code[i][0];
			inText = inText.replace(code[i][1], '');
		}
		else{
			i++;
			if (i>code.length-1) i = 0;
		}
	}
	fs.writeFileSync(arg[4], strRes);
	return 1;
}
