//var G = {'B':['T+B','T'], 'T':['M','M*T'], 'M':['a','b']}
var readLine = require('readline-sync');
var G = {}
var L1 = []
var L2 = []
//var str = "a*b"
var str = ""
var n
var sos = 'q'
var step
var Term = ['!','a','*','b','+',')','(']
var i, j, k
i=j=k=0
var head = ' s '+'| L1'+" ".repeat(18)+"| L2"+" ".repeat(18)+"| w"+" ".repeat(11)+"| steps"
var down = "-".repeat(90)
var f = true
leftDown();

function inputRule() {
	var numbRule = 1
	var rule = ' '
	console.log('input rules')
	readLine.question();
	rule = readLine.getRawInput()
	while(rule != '\0') {
		var temp = rule.split('->')
		if(Object.keys(G).indexOf(temp[0])==-1)
			G[temp[0]] = []
		G[temp[0]].push([temp[1].slice(0,-1), numbRule])
		numbRule++
		readLine.question();
		rule = readLine.getRawInput()
	}
	
}

function normWork() {
	
	var k = L2.length-1
	if (Term.includes(L2[k])) {
		//console.log("OK")
		if(L2[k]==str[i]) {
			step = "2"
			L1.push([L2.pop(), 0])
			++i
			if(i==n) {
				if(!L2.length) {
					step = step+", 3"
					sos = 't'}
				else {
					step = step+", 3'"
					sos = 'b'}
			}
			else {
				if(!L2.length) {
					step = step+", 3'"
					sos = 'b'}
			}
		}
		else {
		step = "4"
		sos = 'b'}
	}
	else {
		step = "1"
		var key = L2[k]
		//console.log(key)
		//console.log(G[key])
		var temp = G[key]
		//var temp1 = temp[1]
		
		
		L1.push([L2.pop(), 1])
		//console.log(temp)
		for (var l=0; l<temp[0][0].split("").reverse().length;l++) {
			L2.push(temp[0][0].split("").reverse()[l])
		}
		
		//console.log(L1, L2)
		//var temp2 = temp[0].reverse()
	}
}


function retWork() {
	//console.log("sos: ",sos, "L1: ", L1, "L2: ", L2, "w: ", str[i] )
	j=L1.length-1

	if(L1[j]==undefined && i==0) {

				f = false
				step = "6б"
				console.log("ERROR")
				process.exit(0)

			}

	else if(Term.includes(L1[j][0])) {
		L2.push(L1.pop()[0])
		--i
		step = "5"
	}
	else {
		//console.log(L1[j])
		if(L1[j][1]<G[L1[j][0][0]].length) {
			var A = L1[j][0]
			var numb = L1[j][1]
			var m=0
			for(var l=L2.length-1;G[A][numb-1][0].split("").includes(L2[l])&&m<G[A][numb-1][0].split("").length;l--,m++) {
				//console.log(L2 , L2[l])
				L2.pop()
				//console.log("after: ", L2)
			}
			L1[j][1]++
			numb++
			//console.log("before ", L2)
			//console.log("after ", L2)
			//console.log(G[A][numb-1].split("").reverse())
			for (var l=0; l<G[A][numb-1][0].split("").reverse().length;l++) {
			L2.push(G[A][numb-1][0].split("").reverse()[l])
			}
			step = "6a"
			sos = 'q'
		}
		else {
			

			{
				step = "6в"
				var A = L1[j][0]
				var numb = L1[j][1]
				var m=0
				for(var l=L2.length-1;G[A][numb-1][0].split("").includes(L2[l])&&m<G[A][numb-1][0].split("").length;l--,m++) {L2.pop()}
				L2.push(L1.pop()[0])
			}
		}
	}
}

function endWork(){f = false}

function displayWork() {
	var l1='' 
	var l2='' 
	var w=''
	var max = 20
	for (var l=0; l<L1.length;l++) {
	l1 = l1+L1[l][0]
	if(L1[l][1]) l1=l1+L1[l][1]
	}
	for (var l=L2.length-1;l>=0;l--)
	l2 = l2+L2[l]
	for (var l=i; l<str.length;l++)
	w = w+str[l]

	console.log(' '+sos+' '+'| '+l1+" ".repeat(max-l1.length)+"| "+l2+" ".repeat(max-l2.length)+"| "+w+" ".repeat(12-w.length)+"| "+step)

	
}

function printRules() {
	var rulesOrder = ''
	for (var l = 0; l<L1.length; l++) {
		var N = L1[l][0]
		var rule = L1[l][1]
		if(!Term.includes(N)){
			rulesOrder += ( G[N][rule-1][1] + " " )
		}
	}

	console.log(rulesOrder)

}

function leftDown() {
	inputRule()
	console.log(G)
	L2 = [Object.keys(G)[0]]
	str = readLine.question("input string: ");
	n = str.length
	console.log(head)
	console.log(down)
	while(f){
		
		switch(sos) {
			case 'q':
			normWork()
			displayWork()
			break

			case 'b':
			retWork()
			displayWork()
			break
			
			case 't':
			endWork()
			//break
			//return
			
			default:
			break

		}
		//displayWork()
	}
	if(sos = "t")
		printRules()

};