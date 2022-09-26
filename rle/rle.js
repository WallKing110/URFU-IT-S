const fs = require("fs")
var arg = process.argv;

let inText = fs.readFileSync(arg[3], "utf-8");
//КОДИРОВКА
if (arg[2] == "encode")
{
	for (var str_point=0, repeat_count = 1, str_result = ''; str_point <= inText.length; ++str_point) {
		if ((inText.charAt(str_point) == inText.charAt(str_point+1))&&(repeat_count != 256)) repeat_count++;
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
	fs.writeFileSync(arg[4], str_result);
	
	let fileInSize = fs.statSync(arg[3]).size;
	let fileOutSize = fs.statSync(arg[4]).size;
	console.log(`Размер изначального файла: ${fileInSize}`)
	console.log(`Размер файла на выходе: ${fileOutSize}`)
	console.log(`Коэффициент сжатия: ${fileInSize/fileOutSize}`)
}
else//ДеКодировка
{
	let counter = 0;
	let outText = "";
	while (counter != inText.length){
		if (inText.charAt(counter) == "#"){
			let str_temp = "";
			for (let k = 0; k < inText.charCodeAt(counter+1); k++){
				str_temp += inText.charAt(counter+2);
			}
			outText += str_temp;
			counter+=3;
		}
		else{
			outText += inText.charAt(counter);
			counter+=1;
		}
	}
	fs.writeFileSync(arg[4], outText);
}
