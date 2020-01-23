// row = index % 12
// column = floor(index/12)

var allIxs = [];
for (let i = 0; i < 141; i++) {
    allIxs[i] = i;
}

var smileyIxs = [141, 142, 143];
var hIxs = []; // indices of hour squares
var mIxs = []; // indices of minute squares
var sIxs = []; // indices of second squares

var prevMin = -1;

function setup() {
	createCanvas(600, 600); // make an HTML canvas element width x height pixels
    textFont('Courier');
    textSize(33);
    textAlign(CENTER, CENTER);
    setUpRandomIxs();
    
}

function draw() {
	background(250);
    
    // 24 hrs + 60 mins + 60 secs - 3 zero hr/min/sec = need 141 squares
    // last three squares just be my initials
    fill(190);
    text('J', (141 % 12) * 50 + 9 + 16.5, (floor(141 / 12)) * 50 + 9 + 16.5);
    text('X', (142 % 12) * 50 + 9 + 16.5, (floor(142 / 12)) * 50 + 9 + 16.5);
    text('C', (143 % 12) * 50 + 9 + 16.5, (floor(143 / 12)) * 50 + 9 + 16.5);
    drawGrid();

}

function setUpRandomIxs() {
    // shuffle the list of all possible indices, then the first 23 are for
    // hours, the next 59 are for minutes, and the last 59 are for seconds.
    // will reshuffle with every refresh/reload
    allIxs = shuffle(allIxs);
    // hours
    for (let i = 0; i < 23; i++) {
        hIxs.push(allIxs[i]);
    }
    // minutes
    for (let i = 0; i < 59; i++) {
        mIxs.push(allIxs[i + 23]);
    }
    // seconds
    for (let i = 0; i < 59; i++) {
        sIxs.push(allIxs[i + 23 + 59]);
    }
}

// REFERENCE: https://editor.p5js.org/aferriss/sketches/SJQrX2Stf
function drawGrid() {
    var jump = 50;
    var count = 0;
    
    for (let i = 0; i < hIxs.length; i++) {
        if (i < hour()) {
            colorSquare(hIxs[i], 0, 109, 176);
        } else {
            colorSquare(hIxs[i], 220, 220, 220);
        }
    }
    
    for (let i = 0; i < mIxs.length; i++) {
        var m = minute();
        if (i < m) {
            colorSquare(mIxs[i], 0, 207, 165);
        } else {
            colorSquare(mIxs[i], 220, 220, 220);
        }
        if (prevMin != m) {
            print(m);
            prevMin = m;
        }
    }
    
    for (let i = 0; i < sIxs.length; i++) {
        if (i < second()) {
            colorSquare(sIxs[i], 193, 160, 255);
        } else {
            colorSquare(sIxs[i], 220, 220, 220);
        }
    }

}

function colorSquare(ix, r, g, b) {
    var row = ix % 12;
    var col = floor(ix / 12);
    noStroke();
    fill(r, g, b);
    rect(row * 50 + 9, col * 50 + 9, 33, 33);
}


