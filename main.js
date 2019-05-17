let root = document.documentElement;
var cnv;
var w, h;
var gx = 5;
var gy = 4;
var myColors = [];

var gap = 4;
var topBrd = 50;
var leftBrd = 50;
var rightBrd = 50;
var botBrd = 50;
var squishedRightBrd = 250;
var originalRightBrd = 50;

var selectedSquare = -1;
var selectedSquareTab;
var currColorDiv;
var currColorText;
var slidersDiv;
var slider1;
var slider2;
var slider3;
var newColorDiv;
var newColorText;
var sliderMode = 'rgb';
function setup(){
   w = window.innerWidth;
   h = window.innerHeight;
   cnv = createCanvas(w, h);
   cnv.position(0,0);
   cnv.background(color('#090821'));

   AddNewColorHex("whitesmoke", "F5F0F6");
   AddNewColorHex("ballblue", "2AB7CA");
   AddNewColorHex("spacecadet", "241E4E");
   AddNewColorHex("raspberry", "9E0031");
   AddNewColorHex("tangerine", "FAA916");
   AddNewColorHex("grape-light", "662AAF");
   AddNewColorHex("purple-dark", "330036");
   AddNewColorHex("gold", "FFC700");
   AddNewColorHex("gunmetal", "2C363F");
   AddNewColorHex("ceil", "8FB2CE");
   AddNewColorHex("bubbles", "E5F8FF");
   AddNewColorHex("cerulean", "007BA7");

   selectedSquareTab = createDiv('');
   selectedSquareTab.position(w, topBrd);
   selectedSquareTab.size(squishedRightBrd-gap-originalRightBrd, h-topBrd-botBrd);
   selectedSquareTab.class('selectedSquareTab');

   currColorDiv = createDiv('');
   currColorDiv.position(0, 0);
   currColorDiv.size(squishedRightBrd-2*gap-originalRightBrd, (h-topBrd-botBrd)/3-gap);
   currColorDiv.class('currColorDiv');
   selectedSquareTab.child(currColorDiv);

   currColorText = createDiv('');
   currColorText.class('currColorText');
   currColorDiv.child(currColorText);

   slidersDiv = createDiv('');
   slidersDiv.position(0, (h-topBrd-botBrd)/3);
   slidersDiv.size(squishedRightBrd-2*gap-originalRightBrd, (h-topBrd-botBrd)/3-gap);
   slidersDiv.class('slidersDiv');

   slider1 = createSlider(0, 255, 50);
   slider2 = createSlider(0, 255, 50);
   slider3 = createSlider(0, 255, 50);

   slider1.input(updateNewColor);
   slider2.input(updateNewColor);
   slider3.input(updateNewColor);

   slider1.id("slider1");
   slider2.id("slider2");
   slider3.id("slider3");

   slider1.addClass("slider");
   slider2.addClass("slider");
   slider3.addClass("slider");

   slider1.size(squishedRightBrd-originalRightBrd-4*gap, (((h-topBrd-botBrd)/3))/8);
   slider2.size(squishedRightBrd-originalRightBrd-4*gap, (((h-topBrd-botBrd)/3))/8);
   slider3.size(squishedRightBrd-originalRightBrd-4*gap, (((h-topBrd-botBrd)/3))/8);

   slider1.position(gap, (((h-topBrd-botBrd)/3))/4-(((h-topBrd-botBrd)/3))/16);
   slider2.position(gap, (((h-topBrd-botBrd)/3))/2-(((h-topBrd-botBrd)/3))/16);
   slider3.position(gap, 3*(((h-topBrd-botBrd)/3))/4-(((h-topBrd-botBrd)/3))/16);

   selectedSquareTab.child(slidersDiv);
   slidersDiv.child(slider1);
   slidersDiv.child(slider2);
   slidersDiv.child(slider3);

   newColorDiv = createDiv('');
   newColorDiv.position(0, 2*(h-topBrd-botBrd)/3);
   newColorDiv.size(squishedRightBrd-2*gap-originalRightBrd, (h-topBrd-botBrd)/3-gap);
   newColorDiv.class('newColorDiv');
   selectedSquareTab.child(newColorDiv);

   newColorText = createDiv('');
   newColorText.class('newColorText');
   newColorDiv.child(newColorText);
}

function AddNewColorRGB(name, r, g, b){
   // nsq = createDiv(`${r}, ${g}, ${b}`);
   var hex = rgb2Hex(r, g, b).toUpperCase();
   AddNewColorHex(name,hex);
}

function AddNewColorHex(name,hex){
   let nsq = createDiv('');
   hex = hex.toUpperCase();
   var c = color("#"+hex);
   // let nsqText = createDiv(`${red(c)}, ${green(c)}, ${blue(c)} <br /> #${hex}`);
   let nsqText = createDiv(name);
   nsq.class('colorSquare');
   nsqText.class('colorSquareText');
   nsq.child(nsqText);
   nsq.size(((w-leftBrd-rightBrd)/gx)-gap, ((h-topBrd-botBrd)/gy)-gap);
   let myInd = myColors.length;
   nsq.position(myInd%gx*((w-leftBrd-rightBrd)/gx)+gap/2+leftBrd, Math.floor(myInd/gx)*(((h-topBrd-botBrd)/gy))+gap/2+topBrd);
   nsq.style('background-color', c);

   nsq.mousePressed(()=>{
      rightBrd = squishedRightBrd;
      if(selectedSquare==myInd){
         selectedSquare = -1;
         rightBrd = originalRightBrd;
         nsq.removeClass('selectedSquare');
         selectedSquareTab.position(w, topBrd);
      }else{
         if(selectedSquare!=-1){
            myColors[selectedSquare].square.removeClass('selectedSquare');
         }
         selectedSquareTab.position(w+gap/2-squishedRightBrd+originalRightBrd/2, topBrd);
         selectedSquare = myInd;
         currColorDiv.style('background-color', color(myColors[myInd].r,myColors[myInd].g,myColors[myInd].b));
         currColorText.style('color', color(invertColor(myColors[myInd].hex)));
         currColorText.html(`${myColors[myInd].name}<br />(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})<br />#${myColors[myInd].hex}`);
         newColorDiv.style('background-color', color(myColors[myInd].r,myColors[myInd].g,myColors[myInd].b));
         newColorText.html(`${myColors[myInd].name}<br />(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})<br />#${myColors[myInd].hex}`);
         slider1.value(myColors[myInd].r);
         slider2.value(myColors[myInd].g);
         slider3.value(myColors[myInd].b);
         updateNewColor();

         nsq.addClass('selectedSquare');
      }
      redrawSquares();
   });
   myColors.push({
      name: name,
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

function updateNewColor(){
   var r = slider1.value();
   var g = slider2.value();
   var b = slider3.value();
   var c = color(r, g, b);
   var hex = rgb2Hex(r, g, b).toUpperCase();
   newColorDiv.style('background-color', c);
   newColorText.html(`Unnamed Color <br />(${r}, ${g}, ${b})<br />#${hex}`);
   root.style.setProperty('--slider1Left', "#"+rgb2Hex(0, g, b).toUpperCase());
   root.style.setProperty('--slider1Right', "#"+rgb2Hex(255, g, b).toUpperCase());
   root.style.setProperty('--slider2Left', "#"+rgb2Hex(r, 0, b).toUpperCase());
   root.style.setProperty('--slider2Right', "#"+rgb2Hex(r, 255, b).toUpperCase());
   root.style.setProperty('--slider3Left', "#"+rgb2Hex(r, g, 0).toUpperCase());
   root.style.setProperty('--slider3Right', "#"+rgb2Hex(r, g, 255).toUpperCase());
}


function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
