const fs = require("fs")
var arg = process.argv;

var mode = arg[2];
var fileInput = arg[3];
var fileOutput = arg[4]; 

let inText = fs.readFileSync(fileInput, "utf-8");
let outText = "";
//КОДИРОВКА
if (mode == "encode")
{
	for (var str_point=0, repeat_count = 1, str_result = ''; str_point <= inText.length; ++str_point) {
		if (inText.charAt(str_point) == inText.charAt(str_point+1)) repeat_count++;
		else {
			if (repeat_count >= 4){
				str_result +="#" + String.fromCharCode(repeat_count) + inText.charAt(str_point);
			}
			else{
				while (repeat_count >0){
					str_result += inText.charAt(str_point-repeat_count+1)
					repeat_count--;
				}
			}
			repeat_count = 1;
		}
	}
	fs.writeFile(fileOutput, str_result);
	
	let fileInputSize = fs.statSync(fileInput).size;
	let fileOutputSize = fs.statSync(fileOutput).size;
	console.log(`Размер изначального файла: ${fileInputSize}`)
	console.log(`Размер файла на выходе: ${fileOutputSize}`)
	console.log(`Коэффициент сжатия: ${fileInputSize/fileOutputSize}`)
}
else//ДеКодировка
{
	let counter = 0;
	let str_result = '';
	while (true){
		if (counter == inText.length) break;
		if (inText.charAt(counter) == "#"){
			let str_temp = "";
			for (let k = 0; k < inText.charCodeAt(counter+1); k++){
				str_temp += inText.charAt(counter+2);
			}
			str_result += str_temp;
			counter+=3;
		}
		else{
			str_result += inText.charAt(counter);
			counter+=1;
		}
	}
	fs.writeFileSync(fileOutput, str_result);
}
