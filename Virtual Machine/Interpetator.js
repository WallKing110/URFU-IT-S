const fs = require("fs");
const readline = require("readline-sync");
let arg = process.argv;

mem = new Array();

let textInArr = fs.readFileSync(arg[2]).toString().split(/\r\n|\s/);
for (let i = 0; i < textInArr.length; i++)
{
	if (/^\-?(0|[1-9]\d*)$/.test(textInArr[i]))
		mem[i] = +textInArr[i];
	else
		mem[i] = textInArr[i];
}

var ip = 0;
while (mem[ip] != "exit")
{
	switch (mem[ip]){
		case "in":
			mem[mem[ip+1]+textInArr.length-1] = +readline.question("Enter value: ");
			ip+=2;
			break;
		case "out":
			console.log(mem[mem[ip+1]+textInArr.length-1]);
			ip+=2;
			break;
		case "set":
			mem[mem[ip+1]+textInArr.length-1] = +mem[ip+2];
			ip+=3;
			break;
		case "add":
			mem[mem[ip+3]+textInArr.length-1] = mem[mem[ip+1]+textInArr.length-1] + mem[mem[ip+2]+textInArr.length-1];
			ip+=4
			break;
		case "mul":
			mem[mem[ip+3]+textInArr.length-1] = mem[mem[ip+1]+textInArr.length-1]*mem[mem[ip+2]+textInArr.length-1];
			ip+=4
			break;
		case "inc":
			mem[mem[ip+1]+textInArr.length-1]++;
			ip+=2;
			break;
		case "cmpg":
			if (mem[mem[ip+1]+textInArr.length-1] > mem[mem[ip+2]+textInArr.length-1])
				mem[mem[ip+3]+textInArr.length-1] = true;
			else
				mem[mem[ip+3]+textInArr.length-1] = false;
			ip+=4;
			break;
		case "jmit":
			if (mem[mem[ip+1]+textInArr.length-1] == true)
			{
				let iterForJump = 0;
				for (counter = 0; counter != mem[ip+2]; iterForJump++){
					if (typeof mem[iterForJump] == "string")
						counter++;
				}
				ip = iterForJump-1;
			}
			else
				ip+=3;
			break;
		case "div":
			mem[mem[ip+3]+textInArr.length-1] = mem[mem[ip+1]+textInArr.length-1] / mem[mem[ip+2]+textInArr.length-1];
			ip+=4
			break;
		case "mod":
			mem[mem[ip+3]+textInArr.length-1] = mem[mem[ip+1]+textInArr.length-1] % mem[mem[ip+2]+textInArr.length-1];
			ip+=4;
			break;
		case "cmp":
			if (mem[mem[ip+1]+textInArr.length-1] == mem[mem[ip+2]+textInArr.length-1])
				mem[mem[ip+3]+textInArr.length-1] = true;
			else
				mem[mem[ip+3]+textInArr.length-1] = false
			ip+=4;
			break;
		case "jmif":
			if (mem[mem[ip+1]+textInArr.length-1] == false)
			{
				let iterForJump = 0;
				for (let counter = 0; counter != mem[ip+2]; iterForJump++){
					if (typeof mem[iterForJump] == "string")
						counter++;
				}
				ip = iterForJump-1;
			}
			else
				ip+=3;
			break;
		case "jmp":
			let iterForJump = 0;
				for (let counter = 0; counter != mem[ip+1]; iterForJump++){
					if (typeof mem[iterForJump] == "string")
						counter++;
				}
			ip = iterForJump-1;
			break;
	}
}
console.log("That's all.");
return 1;