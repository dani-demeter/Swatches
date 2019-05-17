var cnv;
var w, h;
var gx = 4;
var gy = 3;
var myColors = [];

var gap = 4;
var topBrd = 50;
var leftBrd = 50;
var rightBrd = 50;
var botBrd = 50;

var selectedSquare = -1;
function setup(){
   w = window.innerWidth;
   h = window.innerHeight;
   cnv = createCanvas(w, h);
   cnv.position(0,0);
   cnv.background(color('#090821'));
   AddNewColorHex("F5F0F6");
   AddNewColorHex("2AB7CA");
   AddNewColorHex("241E4E");
   AddNewColorHex("9E0031");
   AddNewColorHex("FAA916");
   AddNewColorHex("662AAF");
   AddNewColorHex("330036");
   AddNewColorHex("FFC700");
   AddNewColorHex("2C363F");
   AddNewColorHex("8FB2CE");
   AddNewColorHex("E5F8FF");
   AddNewColorHex("007BA7");
}

function AddNewColorRGB(r, g, b){
   // nsq = createDiv(`${r}, ${g}, ${b}`);
   var hex = rgb2Hex(r, g, b).toUpperCase();
   AddNewColorHex(hex);
}

function AddNewColorHex(hex){
   let nsq = createDiv('');
   hex = hex.toUpperCase();
   var c = color("#"+hex);
   let nsqText = createDiv(`${red(c)}, ${green(c)}, ${blue(c)} <br /> #${hex}`);
   nsq.class('colorSquare');
   nsqText.class('colorSquareText');
   nsq.child(nsqText);
   nsq.size(((w-leftBrd-rightBrd)/gx)-gap, ((h-topBrd-botBrd)/gy)-gap);
   let myInd = myColors.length;
   nsq.position(myInd%gx*((w-leftBrd-rightBrd)/gx)+gap/2+leftBrd, Math.floor(myInd/gx)*(((h-topBrd-botBrd)/gy))+gap/2+topBrd);
   nsq.style('background-color', c);
   // nsqText.style('color', c);

   nsq.mousePressed(()=>{
      rightBrd = 250;
      if(selectedSquare==myInd){
         selectedSquare = -1;
         rightBrd = 50;
      }else{
         selectedSquare = myInd;
      }
      redrawSquares();
   });
   myColors.push({
      r: red(c),
      g: green(c),
      b: blue(c),
      hex: hex,
      square: nsq,
      ind: myInd
   });
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function rgbToHexHelper(rgb){
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function rgb2Hex(r,g,b) {
  var red = rgbToHexHelper(r);
  var green = rgbToHexHelper(g);
  var blue = rgbToHexHelper(b);
  return red+green+blue;
}

function redrawSquares(){
   for(var i = 0; i<myColors.length; i++){
      myColors[i].square.size(((w-leftBrd-rightBrd)/gx)-gap, ((h-topBrd-botBrd)/gy)-gap);
      myColors[i].square.position(i%gx*((w-leftBrd-rightBrd)/gx)+gap/2+leftBrd, Math.floor(i/gx)*(((h-topBrd-botBrd)/gy))+gap/2+topBrd);
   }
}

// function invertColor(hex) {
//     if (hex.indexOf('#') === 0) {
//         hex = hex.slice(1);
//     }
//     // convert 3-digit hex to 6-digits.
//     if (hex.length === 3) {
//         hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//     }
//     if (hex.length !== 6) {
//         throw new Error('Invalid HEX color.');
//     }
//     // invert color components
//     var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
//         g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
//         b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
//     // pad each with zeros and return
//     return '#' + padZero(r) + padZero(g) + padZero(b);
// }
//
// function padZero(str, len) {
//     len = len || 2;
//     var zeros = new Array(len).join('0');
//     return (zeros + str).slice(-len);
// }
