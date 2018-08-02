const allDiceDiv = document.querySelector('.dice');
const rollAllDiv = document.querySelector('.roll-all');
const acesSpan = document.getElementById('aces');
const twosSpan = document.getElementById('twos');
const threesSpan = document.getElementById('threes');
const foursSpan = document.getElementById('fours');
const fivesSpan = document.getElementById('fives');
const sixesSpan = document.getElementById('sixes');
const threeOkSpan = document.getElementById('threeOk');
const fourOkSpan = document.getElementById('fourOk');
const lgSpan = document.getElementById('LG');
const smSpan = document.getElementById('SM');
const fhSpan = document.getElementById('FH');
const chSpan = document.getElementById('CH');
const yzSpan = document.getElementById('YZ');
const bonusSpan = document.getElementById('bonus');
const uppTotalSpan = document.getElementById('upper-total');
const uppBonusSpan = document.getElementById('upper-bonus');
const totUppSpan = document.getElementById('total-upper');
const lowTotalSpan = document.getElementById('lower-total');
const totalUpperSpan = document.getElementById('grand-total');
const totalScoreSpan = document.getElementById('grand-total');
const msgSpan = document.getElementById('message');
const buttonText = document.getElementById('roll-dice');
const sortButton = document.getElementById('sort-dice');
const die1Span = document.getElementById('die1');
const die2Span = document.getElementById('die2');
const die3Span = document.getElementById('die3');
const die4Span = document.getElementById('die4');
const die5Span = document.getElementById('die5');
const die1Img = document.getElementById('die1-img');
const die2Img = document.getElementById('die2-img');
const die3Img = document.getElementById('die3-img');
const die4Img = document.getElementById('die4-img');
const die5Img = document.getElementById('die5-img');

let total = {
	upper: 0,
	grandUpper: 0,
	lower: 0,
	totalScore: 0,
	boardCount: 0
}

let dice = {
	value: [null, null, null, null, null],
    choices: [false, false, false, false, false],
	rollNum: 0
}

let upperBoard = {
	aces: null,
	twos: null,
	threes: null,
	fours: null,
	fives: null,
	sixes: null
}

let lowerBoard = {
	threeOk: null,
	fourOk: null,
	lgStraight: null,
	smStraight: null,
	fullHouse: null,
	chance: null,
	yahtzee: null,
	bonus: null
}

//Updates scorecard
function score () {
	if (total.upper >= 63) {
		total.grandUpper = total.upper+35;
		uppBonusSpan.innerHTML = 35;
	} else {
	total.grandUpper = total.upper;
}
	uppTotalSpan.innerHTML = total.upper;
	totUppSpan.innerHTML = total.grandUpper;
	lowTotalSpan.innerHTML = total.lower;
	total.totalScore = total.grandUpper + total.lower;
	totalScoreSpan.innerHTML = total.totalScore;
	dice.rollNum = 0;
}

//Adds points to total score and resets for next turn.
function bankPoints (v, name) {
	if (total.boardCount<13) {
	total.upper = upperBoard.aces + upperBoard.twos + upperBoard.threes + upperBoard.fours + upperBoard.fives + upperBoard.sixes;
	total.lower = lowerBoard.threeOk + lowerBoard.fourOk + lowerBoard.lgStraight + lowerBoard.smStraight + lowerBoard.fullHouse + lowerBoard.chance + lowerBoard.yahtzee + lowerBoard.bonus;
	msgSpan.innerHTML = `You marked your ${v}! Next turn...`;
	score();
	reset();
	firstLoad();
	console.log(total.boardCount);
}
	else {
	msgSpan.innerHTML = `Game over!!!`;
	buttonText.innerHTML = 'New Game';
	reset();
	buttonText.addEventListener('click', newGame);
	}
}

let newGame = function () {
	upperBoard.aces = null;
	upperBoard.twos = null;
	upperBoard.threes = null;
	upperBoard.fours = null;
	upperBoard.fives = null;
	upperBoard.sixes = null;
	lowerBoard.threeOk = null;
	lowerBoard.fourOk = null;
	lowerBoard.lgStraight = null;
	lowerBoard.smStraight = null;
	lowerBoard.fullHouse = null;
	lowerBoard.chance = null;
	lowerBoard.yahtzee = null;
	lowerBoard.bonus = null;
	total.upper = 0;
	total.grandUpper = 0;
	total.lower = 0;
	total.totalScore = 0;
	total.boardCount = 0;
	score();
	firstLoad();
	buttonText.removeEventListener('click', newGame);
}

// Wipes potential points from scorelowerBoard.
function reset () {
	if (typeof upperBoard.aces !== 'number') acesSpan.innerHTML= "..."; acesSpan.classList.remove('active');
	if (typeof upperBoard.twos !== 'number') twosSpan.innerHTML= "..."; twosSpan.classList.remove('active');
	if (typeof upperBoard.threes !== 'number') threesSpan.innerHTML= "..."; threesSpan.classList.remove('active');
	if (typeof upperBoard.fours !== 'number') foursSpan.innerHTML= "..."; foursSpan.classList.remove('active');
	if (typeof upperBoard.fives !== 'number') fivesSpan.innerHTML= "..."; fivesSpan.classList.remove('active');
	if (typeof upperBoard.sixes !== 'number') sixesSpan.innerHTML= "..."; sixesSpan.classList.remove('active');
	if (typeof lowerBoard.threeOk !== 'number') threeOkSpan.innerHTML= "..."; threeOkSpan.classList.remove('active');
	if (typeof lowerBoard.fourOk !== 'number') fourOkSpan.innerHTML= "..."; fourOkSpan.classList.remove('active');
	if (typeof lowerBoard.fullHouse !== 'number') fhSpan.innerHTML= "..."; fhSpan.classList.remove('active');
	if (typeof lowerBoard.smStraight !== 'number') smSpan.innerHTML= "..."; smSpan.classList.remove('active');
	if (typeof lowerBoard.lgStraight !== 'number') lgSpan.innerHTML= "..."; lgSpan.classList.remove('active');
	if (typeof lowerBoard.yahtzee !== 'number') yzSpan.innerHTML= "..."; yzSpan.classList.remove('active');
	if (typeof lowerBoard.chance !== 'number') chSpan.innerHTML= "..."; chSpan.classList.remove('active');
	if (typeof lowerBoard.bonus !== 'number') bonusSpan.innerHTML= "..."; bonusSpan.classList.remove('active');
}

// Assigns a random number if dice is selected to roll.
function roll () {
	for (i=0; i<5; i++) {
	let newNumber = 1 + Math.floor(Math.random()*6);
	if (dice.choices[i]) {
		dice.value[i] = newNumber;
		dice.choices[i] = true;
	} else {
		dice.value[i] = dice.value[i];
		dice.choices[i] = false;
	}
}
	return dice.value[i];
}

function next () {
	reset();
	roll();//dice.value = [2,2,2,2,2];//
	for (i=0; i<=dice.value.length; i++) {
		turn(i, dice.value);
	}
	upperPointsLoop();
	lowerPointsLoop();
}

// Checks Roll Number and allows you to roll dice.
function rollDice() {
	if (dice.rollNum === 0) {
	msgSpan.innerHTML = 'Select dice to keep, or select points on Scorecard.';
	buttonText.innerHTML = 'Roll Again';
	next();
} else if (dice.rollNum === 1) {
	msgSpan.innerHTML = 'One more roll!!!';
	buttonText.innerHTML = 'Last Roll';
	next();
} else if (dice.rollNum === 2) {
	msgSpan.innerHTML = "Choose from point options to End Turn";
	buttonText.innerHTML = 'Roll Dice';
	next();
}
else {
	msgSpan.innerHTML = "No more rolls. Select points on Scorecard";
	buttonText.innerHTML = 'Roll Dice';
	}
	dice.rollNum++;
}

// Determines which dice image to display.
function turn(dieOrd, num) {
		switch(dieOrd) {
		case 0:
		die1Img.src = `die${num[dieOrd]}.svg`;
		break;
		case 1:
		die2Img.src = `die${num[dieOrd]}.svg`;
		break;
		case 2:
		die3Img.src = `die${num[dieOrd]}.svg`;
		break;
		case 3:
		die4Img.src = `die${num[dieOrd]}.svg`;
		break;
		case 4:
		die5Img.src = `die${num[dieOrd]}.svg`;
		break;
	}
}

	function selector (idx) {
		console.log(idx);
		switch(idx) {
		case 0:
		selectDie1();
		break;
		case 1:
		selectDie2();
		break;
		case 2:
		selectDie3();
		break;
		case 3:
		selectDie4();
		break;
		case 4:
		selectDie5();
		break;
		}
	}

// Sorted array for point calculations without changing original array.
function sort(arr) {
  return arr.concat().sort();
}

function upperPointsLoop() {
const sorted_arr = sort(dice.value);
	for (i = 0; i < sorted_arr.length; i++) {
	let ord = sorted_arr[i];
	let ord2 = sorted_arr[i+1];
	let ord3 = sorted_arr[i+2];
	let ord4 = sorted_arr[i+3];
	let ord5 = sorted_arr[i+4];
	console.log(sorted_arr);
	console.log(dice);
	//1s
    if (upperBoard.aces === null) upperPoints(1);
    //2s
    if (upperBoard.twos === null) upperPoints(2);
    //3s
    if (upperBoard.threes === null) upperPoints(3);
    //4s
    if (upperBoard.fours === null) upperPoints(4);
    //5s
    if (upperBoard.fives === null) upperPoints(5);
    //6s
    if (upperBoard.sixes === null) upperPoints(6);
	}
}

// Checks sorted dice array for points.
function lowerPointsLoop() {
	const sorted_arr = sort(dice.value);
	for (i = 0; i < sorted_arr.length; i++) {
	let ord = sorted_arr[i];
	let ord2 = sorted_arr[i+1];
	let ord3 = sorted_arr[i+2];
	let ord4 = sorted_arr[i+3];
	let ord5 = sorted_arr[i+4];
	console.log(sorted_arr);
	console.log(dice);
    //SM Straight
	if (lowerBoard.smStraight === null && ord2 === ord+1 && ord3 === ord+2 && ord4 === ord+3 || lowerBoard.smStraight === null && ord3 === ord2+1 && ord4 === ord2+2 && ord5 === ord2+3 || lowerBoard.smStraight === null && ord2 === ord+1 && ord4 === ord+2 && ord5 === ord+3) {
	    lowerPoints("SM", 30);
    	} else if (lowerBoard.smStraight === null) {
    			lowerPoints("SM", 0);
    		}
	//LG Straight
	if (lowerBoard.lgStraight === null && ord2 === ord+1 && ord3 === ord+2 && ord4 === ord+3 && ord5 === ord+4) {
		lowerPoints("LG", 40);
    	} else if (lowerBoard.lgStraight === null) {
    			lowerPoints("LG", 0);
    		}
	//Full House
	if (lowerBoard.fullHouse === null && ord2 === ord && ord3 === ord2 && ord5 === ord4 || lowerBoard.fullHouse === null && ord2 === ord && ord3 === ord4 && ord4 === ord5) {
	    lowerPoints("FH", 25);
    	} else if (lowerBoard.fullHouse === null) {
    			lowerPoints("FH", 0);
    		}
	//Yahtzee
	if (lowerBoard.yahtzee === null && sorted_arr.every(x => x === ord)) {
	    lowerPoints("YZ", 50);
	    msgSpan.innerHTML = 'You rolled Yahtzee!!!';
		} else if (lowerBoard.yahtzee === null) {
    			lowerPoints("YZ", 0);
    		}
	//Bonus Yahtzee
	if (lowerBoard.yahtzee && sorted_arr.every(x => x === ord)) {
		lowerPoints("YZ+", 100);
		msgSpan.innerHTML = 'You rolled another Yahtzee!!!';
		}

	//Chance
	if (!lowerBoard.chance) {
		let chanceOkPts = dice.value.reduce((a, b) => a + b, 0);
	    lowerPoints("CH", chanceOkPts);
    	}
    //4 of a kind
	if (lowerBoard.fourOk === null && ord2 === ord && ord3 === ord && ord4 === ord || lowerBoard.fourOk === null && ord3 === ord2 && ord4 === ord2 && ord5 === ord2) {
		let fourOkPts = dice.value.reduce((a, b) => a + b, 0);
		lowerPoints("fourOk", fourOkPts);
    	} else {
    		if (lowerBoard.fourOk === null) {
    			lowerPoints("fourOk", 0);
    		}
    	}
    //3 of a kind
	if (lowerBoard.threeOk === null && ord2 === ord && ord3 === ord || lowerBoard.threeOk === null && ord3 === ord2 && ord4 === ord2 || lowerBoard.threeOk === null && ord4 === ord3 && ord5 === ord3) {
		let threeOkPts = dice.value.reduce((a, b) => a + b, 0);
	    lowerPoints("threeOk", threeOkPts);
		} else {
			if (lowerBoard.threeOk === null) {
    			lowerPoints("threeOk", 0);
    		}
    	}
    		break;
    	}
    	console.log(lowerBoard);
    }

//Banks points based on user selection.
function keepUpperPoints (ord, pts) {
	switch(ord) {
		case 1:
			upperBoard.aces = pts;
			acesSpan.innerHTML = upperBoard.aces;
			bankPoints("aces", ord);
			acesSpan.classList.add('keep');
		break;
		case 2:
			upperBoard.twos = pts;
			twosSpan.innerHTML = upperBoard.twos;
			bankPoints("twos", ord);
			twosSpan.classList.add('keep');
		break;
		case 3:
			upperBoard.threes = pts;
			threesSpan.innerHTML = upperBoard.threes;
			bankPoints("threes", ord);
			threesSpan.classList.add('keep');
		break;
		case 4:
			upperBoard.fours = pts;
			foursSpan.innerHTML = upperBoard.fours;
			bankPoints("fours", ord);
			foursSpan.classList.add('keep');
		break;
		case 5:
			upperBoard.fives = pts;
			fivesSpan.innerHTML = upperBoard.fives;
			bankPoints("fives", ord);
			fivesSpan.classList.add('keep');
		break;
		case 6:
			upperBoard.sixes = pts;
			sixesSpan.innerHTML = upperBoard.sixes;
			bankPoints("sixes", ord);
			sixesSpan.classList.add('keep');
		break;
	}
	console.log(lowerBoard);
}

//Banks points based on user selection.
function keepLowerPoints (abr, v) {
	switch(abr) {
	case "SM":
	if (smSpan.classList.contains('active')) {
		lowerBoard.smStraight = v;
		smSpan.innerHTML = lowerBoard.smStraight;
		total.lower += lowerBoard.smStraight;
		bankPoints("Small Straight", abr);
		smSpan.classList.add('keep');
	}
	break;
	case "LG":
	if (lgSpan.classList.contains('active')) {
		lowerBoard.lgStraight = v;
		lgSpan.innerHTML = lowerBoard.lgStraight;
		total.lower += lowerBoard.lgStraight;
		bankPoints("Large Straight", abr);
		lgSpan.classList.add('keep');
	}
	break;
	case "FH":
	if (fhSpan.classList.contains('active')) {
		lowerBoard.fullHouse = v;
		fhSpan.innerHTML = lowerBoard.fullHouse;
		total.lower += lowerBoard.fullHouse;
		bankPoints("Full House", abr);
		fhSpan.classList.add('keep');
	}
	break;
	case "fourOk":
	if (fourOkSpan.classList.contains('active')) {
		lowerBoard.fourOk = v;
		fourOkSpan.innerHTML = lowerBoard.fourOk;
		total.lower += lowerBoard.fourOk;
		bankPoints("4 of a kind", abr);
		fourOkSpan.classList.add('keep');
	}
	break;
	case "threeOk":
	if (threeOkSpan.classList.contains('active')) {
		lowerBoard.threeOk = v;
		threeOkSpan.innerHTML = lowerBoard.threeOk;
		total.lower += lowerBoard.threeOk;
		bankPoints("3 of a kind", abr);
		threeOkSpan.classList.add('keep');
	}
	break;
	case "CH":
	if (chSpan.classList.contains('active')) {
		lowerBoard.chance = v;
		chSpan.innerHTML = lowerBoard.chance;
		total.lower += lowerBoard.chance;
		bankPoints("Chance", abr);
		chSpan.classList.add('keep');
	}
	break;
	case "YZ":
	if (yzSpan.classList.contains('active')) {
		lowerBoard.yahtzee = v;
		yzSpan.innerHTML = lowerBoard.yahtzee;
		total.lower += lowerBoard.yahtzee;
		bankPoints("Yahtzee", abr);
		yzSpan.classList.add('keep');
	}
	break;
	case "YZ+":
	if (bonusSpan.classList.contains('active')) {
		lowerBoard.bonus += v;
		bonusSpan.innerHTML = lowerBoard.bonus;
		total.lower += lowerBoard.bonus;
		bankPoints("Yahtzee Bonus", abr);
		bonusSpan.classList.add('keep');
	}
	break;
	}
	console.log(lowerBoard);
}

//Adds EventListener to potential points.
function upperPoints (ord) {
	let cnt = 0;
    		for (t=0; t<dice.value.length; t++) {
    			if(dice.value[t]===ord) {
    				cnt++;
    		}
    	}
	let pts = ord*cnt;

	switch(ord) {
		case 1:
	    	acesSpan.innerHTML = `+${pts}`;
	    	acesSpan.classList.add('active');
	    	acesSpan.addEventListener('click', function () {
	    		keepUpperPoints(ord, pts);
			});
		break;
		case 2:
	    	twosSpan.innerHTML = `+${pts}`;
	    	twosSpan.classList.add('active');
	    	twosSpan.addEventListener('click', function() {keepUpperPoints(ord, pts);});
		break;
		case 3:
			threesSpan.innerHTML = `+${pts}`;
	    	threesSpan.classList.add('active');
	    	threesSpan.addEventListener('click', function() {keepUpperPoints(ord, pts);});
		break;
		case 4:
			foursSpan.innerHTML = `+${pts}`;
	    	foursSpan.classList.add('active');
	    	foursSpan.addEventListener('click', function() {keepUpperPoints(ord, pts);});
		break;
		case 5:
			fivesSpan.innerHTML = `+${pts}`;
	    	fivesSpan.classList.add('active');
	    	fivesSpan.addEventListener('click', function() {keepUpperPoints(ord, pts);});
		break;
		case 6:
			sixesSpan.innerHTML = `+${pts}`;
	    	sixesSpan.classList.add('active');
	    	sixesSpan.addEventListener('click', function() {keepUpperPoints(ord, pts);});
		break;
	}
}

//Adds EventListener to potential points.
function lowerPoints (name, val) {
	console.log(name);
	console.log(val);
	switch(name) {
	case "LG":
		lgSpan.innerHTML = `+${val}`;
	    lgSpan.classList.add('active');
		lgSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
		console.log(name);
	break;
	case "SM":
		smSpan.innerHTML = `+${val}`;
	    smSpan.classList.add('active');
		smSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "YZ":
		yzSpan.innerHTML = `+${val}`;
	    yzSpan.classList.add('active');
		yzSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "FH":
		fhSpan.innerHTML = `+${val}`;
	    fhSpan.classList.add('active');
		fhSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "fourOk":
	    fourOkSpan.innerHTML = `+${val}`;
	    fourOkSpan.classList.add('active');
		fourOkSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "threeOk":
	    threeOkSpan.innerHTML = `+${val}`;
	    threeOkSpan.classList.add('active');
		threeOkSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "CH":
		chSpan.innerHTML = `+${val}`;
	    chSpan.classList.add('active');
		chSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	case "YZ+":
		bonusSpan.innerHTML = `+${val}`;
		bonusSpan.classList.remove('keep');
		bonusSpan.classList.add('active');
		bonusSpan.addEventListener('click', function() {keepLowerPoints(name, val);});
	break;
	}
}

// Allows user selection of dice.
function selectDie1() {
	if (!dice.choices[0] || !dice.value[0]) {
		dice.choices[0] = true;
		die1Img.classList.remove('red-glow');
		die1Img.classList.add('green-glow');
		return true;
	}
	else {
		dice.choices[0] = false;
		die1Img.classList.remove('green-glow');
		die1Img.classList.add('red-glow');
		return false;
	}
}		

function selectDie2() {
	if (!dice.choices[1] || !dice.value[1]) {
		dice.choices[1] = true;
		die2Img.classList.remove('red-glow');
		die2Img.classList.add('green-glow');
		return true;
	}
	else {
		dice.choices[1] = false;
		die2Img.classList.remove('green-glow');
		die2Img.classList.add('red-glow');
		return false;
	}
}	

function selectDie3() {
	if (!dice.choices[2] || !dice.value[2]) {
		dice.choices[2] = true;
		die3Img.classList.remove('red-glow');
		die3Img.classList.add('green-glow');
		return true;
	}
	else {
		dice.choices[2] = false;
		die3Img.classList.remove('green-glow');
		die3Img.classList.add('red-glow');
		return false;
	}
}				

function selectDie4() {
	if (!dice.choices[3] || !dice.value[3]) {
		dice.choices[3] = true;
		die4Img.classList.remove('red-glow');
		die4Img.classList.add('green-glow');
		return true;
	}
	else {
		dice.choices[3] = false;
		die4Img.classList.remove('green-glow');
		die4Img.classList.add('red-glow');
		return false;
	}
}	

function selectDie5() {
	if (!dice.choices[4] || !dice.value[4]) {
		dice.choices[4] = true;
		die5Img.classList.remove('red-glow');
		die5Img.classList.add('green-glow');
		return true;
	}
	else {
		dice.choices[4] = false;
		die5Img.classList.remove('green-glow');
		die5Img.classList.add('red-glow');
		return false;
	}
}

// Changes all variables back to default;
function firstLoad() {
buttonText.innerHTML = 'Roll Dice';
dice.value = [null, null, null, null, null];
dice.choices[0]=false;
selectDie1();
dice.choices[1]=false;
selectDie2();
dice.choices[2]=false;
selectDie3();
dice.choices[3]=false;
selectDie4();
dice.choices[4]=false;
selectDie5();
total.boardCount++;
}

// Event Handlers for user interaction.
die1Span.addEventListener('click', function() {
	selectDie1();
});

die2Span.addEventListener('click', function() {
	selectDie2();
});

die3Span.addEventListener('click', function() {
	selectDie3();
});

die4Span.addEventListener('click', function() {
	selectDie4();
});

die5Span.addEventListener('click', function() {
	selectDie5();
});

firstLoad();