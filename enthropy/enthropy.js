var fs = require("fs");
var arg = process.argv;

var fileInput = arg[2];
let file = fs.readFileSync(fileInput, "utf-8");

var alphSize = 0;
var alphQuant = 0;
alph = new Array();
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

var enthropy = 0;
for (i in alph){
	alph[i] /= alphQuant;
	enthropy -= alph[i]* Math.log(alph[i])
}
enthropy /= Math.log(alphSize)

console.log(enthropy);

