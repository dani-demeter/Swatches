let root = document.documentElement;
var cnv;
var w, h;
var gx = 5;
var gy = 4;
var myColors = [];

var gap = 4;
var topP = 0.1;
var leftP = 0.02;
var rightP = 0.02;
var botP = 0.1;
var squishedrightP = 0.2;
var originalrightP = 0.02;

var selectedSquare = -1;
var selectedSquareTab;
var currColorDiv;
var currColorText1W;
var currColorText2W;
var currColorText3W;
var currColorText1;
var currColorText2;
var currColorText3;
var slidersDiv;
var slider1;
var slider2;
var slider3;
var newColorDiv;
var newColorText1W;
var newColorText2W;
var newColorText3W;
var newColorText1;
var newColorText2;
var newColorText3;

var colorModeBtn;
var cMode = "RGB";

var buttonHeightP = 0.05;

var sliding = false;
var slider1To = 0;
var slider2To = 0;
var slider3To = 0;
var slider1From = 0;
var slider2From = 0;
var slider3From = 0;
var sliderStartTime = 0;
var sliderDur = 300;

function setup(){
   w = window.innerWidth;
   h = window.innerHeight;
   cnv = createCanvas(w, h);
   cnv.position(0,0);
   background(color('#090821'));

   AddNewColor("whitesmoke", "F5F0F6");
   AddNewColor("ballblue", "2AB7CA");
   AddNewColor("spacecadet", "241E4E");
   AddNewColor("raspberry", "9E0031");
   AddNewColor("tangerine", "FAA916");
   AddNewColor("grape-light", "662AAF");
   AddNewColor("purple-dark", "330036");
   AddNewColor("gold", "FFC700");
   AddNewColor("gunmetal", "2C363F");
   AddNewColor("ceil", "8FB2CE");
   AddNewColor("bubbles", "E5F8FF");
   AddNewColor("cerulean", "007BA7");


   createSelectedSquareTab();
   createCurrColorDiv();
   createSlidersDiv();
   createColorModeBtn();
   createNewColorDiv();
}

function createSelectedSquareTab(){
   selectedSquareTab = createDiv('');
   selectedSquareTab.position(w, topP*h-buttonHeightP*h);
   selectedSquareTab.size(squishedrightP*w-gap-originalrightP*w, h-topP*h-botP*h);
   selectedSquareTab.class('selectedSquareTab');
}

function createCurrColorDiv(){
   currColorDiv = createDiv('');
   currColorDiv.position(0, 0);
   currColorDiv.size(squishedrightP*w-2*gap-originalrightP*w, (h-topP*h-botP*h)/3-gap);
   currColorDiv.class('currColorDiv');
   selectedSquareTab.child(currColorDiv);

   currColorText1W = createDiv('');
   currColorDiv.child(currColorText1W);
   currColorText1W.id('currColorText1W');
   currColorText2W = createDiv('');
   currColorDiv.child(currColorText2W);
   currColorText2W.id('currColorText2W');
   currColorText3W = createDiv('');
   currColorDiv.child(currColorText3W);
   currColorText3W.id('currColorText3W');

   currColorText1 = createDiv('');
   currColorText1W.child(currColorText1);
   currColorText1.addClass('currColorText');
   currColorText2 = createDiv('');
   currColorText2W.child(currColorText2);
   currColorText2.addClass('currColorText');
   currColorText3 = createDiv('');
   currColorText3W.child(currColorText3);
   currColorText3.addClass('currColorText');

   currColorText1W.mousePressed(()=>{
      copy2Clipboard(currColorText1W.elt);
   });
   currColorText2W.mousePressed(()=>{
      copy2Clipboard(currColorText2W.elt);
   });
   currColorText3W.mousePressed(()=>{
      copy2Clipboard(currColorText3W.elt);
   });
}

function createSlidersDiv(){
   slidersDiv = createDiv('');
   slidersDiv.position(0, (h-topP*h-botP*h)/3+buttonHeightP*h);
   slidersDiv.size(squishedrightP*w-2*gap-originalrightP*w, (h-topP*h-botP*h)/3-gap);
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

   // slider1.size(squishedrightP*w-originalrightP*w-6*gap, (((h-topP*h-botP*h)/3))/8);
   // slider2.size(squishedrightP*w-originalrightP*w-6*gap, (((h-topP*h-botP*h)/3))/8);
   // slider3.size(squishedrightP*w-originalrightP*w-6*gap, (((h-topP*h-botP*h)/3))/8);

   slider1.position(3*gap, (((h-topP*h-botP*h)/3))/4-(((h-topP*h-botP*h)/3))/16);
   slider2.position(3*gap, (((h-topP*h-botP*h)/3))/2-(((h-topP*h-botP*h)/3))/16);
   slider3.position(3*gap, 3*(((h-topP*h-botP*h)/3))/4-(((h-topP*h-botP*h)/3))/16);

   selectedSquareTab.child(slidersDiv);
   slidersDiv.child(slider1);
   slidersDiv.child(slider2);
   slidersDiv.child(slider3);
}

function createColorModeBtn(){
   colorModeBtn = createDiv('');
   colorModeBtn.addClass("colorModeBtn");
   var sstw = squishedrightP*w-2*gap-originalrightP*w;
   colorModeBtn.position(sstw/4,2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   colorModeBtn.size(sstw/2, buttonHeightP*h);
   selectedSquareTab.child(colorModeBtn);

   var rgbtW = createDiv('');
   rgbtW.position(0, 0);
   rgbtW.size(sstw/4, buttonHeightP*h);
   rgbtW.addClass("rgbhsltW");

   var hsltW = createDiv('');
   hsltW.position(sstw/4,0);
   hsltW.size(sstw/4, buttonHeightP*h);
   hsltW.addClass("rgbhsltW");

   var rgbt = createDiv("RGB");
   rgbt.addClass("rgbhslt");

   var hslt = createDiv("HSL");
   hslt.addClass("rgbhslt");

   rgbtW.child(rgbt);
   hsltW.child(hslt);
   colorModeBtn.child(rgbtW);
   colorModeBtn.child(hsltW);

   colorModeBtn.mousePressed(()=>{
      cMode = (cMode=="RGB") ? "HSL" : "RGB";
      root.style.setProperty('--rgbhslp', (cMode=="RGB") ? "-100%" : "0%");
   });

}

function createNewColorDiv(){
   newColorDiv = createDiv('');
   newColorDiv.position(0, 2*(h-topP*h-botP*h)/3+2*buttonHeightP*h+gap);
   newColorDiv.size(squishedrightP*w-2*gap-originalrightP*w, (h-topP*h-botP*h)/3-gap);
   newColorDiv.class('newColorDiv');
   selectedSquareTab.child(newColorDiv);

   newColorText1W = createDiv('');
   newColorDiv.child(newColorText1W);
   newColorText1W.id('newColorText1W');
   newColorText2W = createDiv('');
   newColorDiv.child(newColorText2W);
   newColorText2W.id('newColorText2W');
   newColorText3W = createDiv('');
   newColorDiv.child(newColorText3W);
   newColorText3W.id('newColorText3W');

   newColorText1 = createDiv('');
   newColorText1W.child(newColorText1);
   newColorText1.addClass('newColorText');
   newColorText2 = createDiv('');
   newColorText2W.child(newColorText2);
   newColorText2.addClass('newColorText');
   newColorText3 = createDiv('');
   newColorText3W.child(newColorText3);
   newColorText3.addClass('newColorText');

   newColorText1W.mousePressed(()=>{
      copy2Clipboard(newColorText1W.elt);
   });
   newColorText2W.mousePressed(()=>{
      copy2Clipboard(newColorText2W.elt);
   });
   newColorText3W.mousePressed(()=>{
      copy2Clipboard(newColorText3W.elt);
   });
}

function AddNewColor(name,hex){
   let nsq = createDiv('');
   hex = hex.toUpperCase();
   var c = color("#"+hex);
   // let nsqText = createDiv(`${red(c)}, ${green(c)}, ${blue(c)} <br /> #${hex}`);
   let nsqText = createDiv(name);
   nsq.class('colorSquare');
   nsqText.class('colorSquareText');
   var fs;
   if(name.length<10){
      fs = (((w-leftP*w-rightP*w)/gx)-gap)/10;
   }else{
      fs = (((w-leftP*w-rightP*w)/gx)-gap)/name.length;
   }
   nsqText.style('font-size', fs + "px");
   nsq.child(nsqText);
   nsq.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
   let myInd = myColors.length;
   nsq.position(myInd%gx*((w-leftP*w-rightP*w)/gx)+gap/2+leftP*w, Math.floor(myInd/gx)*(((h-topP*h-botP*h)/gy))+gap/2+topP*h);
   nsq.style('background-color', c);
   nsq.mousePressed(()=>{
      rightP = squishedrightP;
      if(selectedSquare==myInd){
         selectedSquare = -1;
         rightP = originalrightP;
         nsq.removeClass('selectedSquare');
         selectedSquareTab.position(w, topP*h-buttonHeightP*h);
      }else{
         if(selectedSquare!=-1){
            myColors[selectedSquare].square.removeClass('selectedSquare');
         }
         selectedSquareTab.position(w+gap/2-squishedrightP*w+originalrightP*w/2, topP*h-buttonHeightP*h);
         selectedSquare = myInd;
         var fs;
         if(myColors[myInd].name.length<10){
            fs = (squishedrightP*w-gap-originalrightP*w)/10;
         }else{
            fs = (squishedrightP*w-gap-originalrightP*w)/myColors[myInd].name.length;
         }
         currColorText1.style('font-size', fs + "px");
         currColorText2.style('font-size', fs + "px");
         currColorText3.style('font-size', fs + "px");
         newColorText1.style('font-size', fs + "px");
         newColorText2.style('font-size', fs + "px");
         newColorText3.style('font-size', fs + "px");
         currColorDiv.style('background-color', color(myColors[myInd].r,myColors[myInd].g,myColors[myInd].b));
         currColorText1.style('color', color(invertColor(myColors[myInd].hex)));
         currColorText2.style('color', color(invertColor(myColors[myInd].hex)));
         currColorText3.style('color', color(invertColor(myColors[myInd].hex)));
         newColorText1.style('color', color(invertColor(myColors[myInd].hex)));
         newColorText2.style('color', color(invertColor(myColors[myInd].hex)));
         newColorText3.style('color', color(invertColor(myColors[myInd].hex)));
         // currColorText.html(`${myColors[myInd].name}<br />(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})<br />#${myColors[myInd].hex}`);
         currColorText1.html(`${myColors[myInd].name}`);
         currColorText2.html(`(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})`);
         currColorText3.html(`#${myColors[myInd].hex}`);
         newColorDiv.style('background-color', color(myColors[myInd].r,myColors[myInd].g,myColors[myInd].b));
         // newColorText.html(`${myColors[myInd].name}<br />(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})<br />#${myColors[myInd].hex}`);
         newColorText1.html(`${myColors[myInd].name}`);
         newColorText2.html(`(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})`);
         newColorText3.html(`#${myColors[myInd].hex}`);

         root.style.setProperty('--slider1Left', "#"+rgb2Hex(0, myColors[myInd].g, myColors[myInd].b).toUpperCase());
         root.style.setProperty('--slider1Right', "#"+rgb2Hex(255, myColors[myInd].g, myColors[myInd].b).toUpperCase());
         root.style.setProperty('--slider2Left', "#"+rgb2Hex(myColors[myInd].r, 0, myColors[myInd].b).toUpperCase());
         root.style.setProperty('--slider2Right', "#"+rgb2Hex(myColors[myInd].r, 255, myColors[myInd].b).toUpperCase());
         root.style.setProperty('--slider3Left', "#"+rgb2Hex(myColors[myInd].r, myColors[myInd].g, 0).toUpperCase());
         root.style.setProperty('--slider3Right', "#"+rgb2Hex(myColors[myInd].r, myColors[myInd].g, 255).toUpperCase());

         sliding = true;
         slider1To = myColors[myInd].r;
         slider2To = myColors[myInd].g;
         slider3To = myColors[myInd].b;
         slider1From = slider1.value();
         slider2From = slider2.value();
         slider3From = slider3.value();
         sliderStartTime = millis();
         // updateNewColor();

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
      text: nsqText,
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
      myColors[i].square.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
      myColors[i].square.position(i%gx*((w-leftP*w-rightP*w)/gx)+gap/2+leftP*w, Math.floor(i/gx)*(((h-topP*h-botP*h)/gy))+gap/2+topP*h);
      var fs;
      if(myColors[i].name.length<10){
         fs = (((w-leftP*w-rightP*w)/gx)-gap)/10;
      }else{
         fs = (((w-leftP*w-rightP*w)/gx)-gap)/myColors[i].name.length;
      }
      myColors[i].text.style('font-size', fs + "px");
   }
}

function updateNewColor(){
   var r = slider1.value();
   var g = slider2.value();
   var b = slider3.value();
   var c = color(r, g, b);
   var hex = rgb2Hex(r, g, b).toUpperCase();
   newColorDiv.style('background-color', c);
   var colorNamed = -1;
   for(var i = 0; i<myColors.length; i++){
      if(r==myColors[i].r && g==myColors[i].g && b==myColors[i].b){
         colorNamed = i;
      }
   }
   var fs;
   if(colorNamed!=-1){
      newColorText1.html(`${myColors[colorNamed].name}`);
      if(myColors[colorNamed].name.length<10){
         fs = (squishedrightP*w-gap-originalrightP*w)/10;
      }else{
         fs = (squishedrightP*w-gap-originalrightP*w)/myColors[colorNamed].name.length;
      }
   }else{
      newColorText1.html(`New Color`);
      fs = (((w-leftP*w-rightP*w)/gx)-gap)/9;
   }
   currColorText1.style('font-size', fs + "px");
   currColorText2.style('font-size', fs + "px");
   currColorText3.style('font-size', fs + "px");
   newColorText1.style('font-size', fs + "px");
   newColorText2.style('font-size', fs + "px");
   newColorText3.style('font-size', fs + "px");
   newColorText2.html(`(${r}, ${g}, ${b})`);
   newColorText3.html(`#${hex}`);
   root.style.setProperty('--slider1Left', "#"+rgb2Hex(0, g, b).toUpperCase());
   root.style.setProperty('--slider1Right', "#"+rgb2Hex(255, g, b).toUpperCase());
   root.style.setProperty('--slider2Left', "#"+rgb2Hex(r, 0, b).toUpperCase());
   root.style.setProperty('--slider2Right', "#"+rgb2Hex(r, 255, b).toUpperCase());
   root.style.setProperty('--slider3Left', "#"+rgb2Hex(r, g, 0).toUpperCase());
   root.style.setProperty('--slider3Right', "#"+rgb2Hex(r, g, 255).toUpperCase());
   // newColorText.style('color', invertColor(hex));
   newColorText1.style('color', invertColor(hex));
   newColorText2.style('color', invertColor(hex));
   newColorText3.style('color', invertColor(hex));
}

function windowResized() {
   w = window.innerWidth;
   h = window.innerHeight;
   // resizeCanvas(w, h);
   redrawSquares();
   if(selectedSquare==-1){
      selectedSquareTab.position(w, topP*h-buttonHeightP*h);
   }else{
      selectedSquareTab.position(w+gap/2-squishedrightP*w+originalrightP*w/2, topP*h-buttonHeightP*h);
   }
   background(color('#090821'));
}

function copy2Clipboard(elm) {
  if(document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(elm);
    range.select();
    document.execCommand("Copy");
  }
  else if(window.getSelection) {

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
  }
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

function draw(){
   if(sliding){
      if(millis()>sliderStartTime+sliderDur){
         sliding = false;
         slider1.value(slider1To);
         slider2.value(slider2To);
         slider3.value(slider3To);
         updateNewColor();
      }else{
         var x = (millis()-sliderStartTime)/sliderDur;
         var y;
         if(x<0.5){
            y = 2*x*x;
         }else{
            y = 2*(1-(x-1)*(x-1)-0.5);
         }
         var s1d = slider1To - slider1From;
         var s2d = slider2To - slider2From;
         var s3d = slider3To - slider3From;
         slider1.value(slider1From+s1d*y);
         slider2.value(slider2From+s2d*y);
         slider3.value(slider3From+s3d*y);
      }
   }
}
