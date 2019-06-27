let root = document.documentElement;
var cnv;
var w, h;
var gx = 4;
var gy = 3;
var myColors = [];
var needPages = false;
var page = 0;
var mySwatches = [];
var mySwatchesElts = [];
const numSwatches2Show = 5;

var gap = 4;
var topP = 0.1;
var leftP = 0.05;
var rightP = 0.05;
var botP = 0.1;
var squishedrightP = 0.2;
var originalrightP = 0.05;
var squishedleftP = 0.2;
var originalleftP = 0.05;

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

var inputs;
var inp1;
var inp2;
var inp3;
var inp4;

var removeButton;
var replaceButton;
var saveAsButton;

var rightArrow;
var leftArrow;

var addNewButton;
var downSwatches;
var upSwatches;
var swatchesHead = 0;
var swatchLabels;

var menuButton;
var menuTab;
var menuOut = false;

var loginButton;
var sigupButton;
var logoutButton;

var modalcover;
var lisumodal;
var lisumodalWP = 0.25;
// var lisumodalHP = 0.6;
var lisuTitle;
var lisuIn1Label;
var lisuIn1;
var lisuIn2Label;
var lisuIn2;
var lisuOk;
var lisuCancel;

var clickedLisu = "";

var settingsLabel;
var rowLabel;
var rowMin;
var rowPlus;
var colMin;
var colPlus;
var colLabel;

var allowedCol = "rgba(36, 251, 202, 0.75)";
var preventCol = "#E63952";

var yourSwatchesLabel;
var addNewSwatch;

var swalOpen = false;

function setup(){
   // deleteCookie("username"); //TODO DELETE WHEN LIVE
   w = window.innerWidth;
   h = window.innerHeight;

   cnv = createCanvas(w, h);
   cnv.position(0,0);
   background(color('#090821'));

   createMenu();
   createArrows();
   createAddNewButton();
   AddNewColor("whitesmoke", "F5F0F6");
   AddNewColor("watermelon", "E63952");
   AddNewColor("spacecadet", "241E4E");
   AddNewColor("raspberry", "9E0031");
   AddNewColor("tangerine", "FAA916");
   AddNewColor("light grape", "662AAF");
   AddNewColor("dark purple", "330036");
   AddNewColor("gold", "FFC700");
   AddNewColor("gunmetal", "2C363F");
   AddNewColor("seaweed", "44D1AF");
   AddNewColor("bleu", "003952");
   AddNewColor("cerulean", "007BA7");
   AddNewColor("eerie black", "1C1D20");
   AddNewColor("grey", "C4C8D3");
   AddNewColor("ball blue", "2AB7CA");
   AddNewColor("steel blue", "4A7AB4");
   AddNewColor("ceil", "8FB2CE");
   AddNewColor("bubbles", "E5F8FF");
   AddNewColor("ghostwhite", "F9FDFF");
   AddNewColor("vermilion", "D64933");
   AddNewColor("grape", "533A7B");
   AddNewColor("firebrick", "BA1C1A");
   AddNewColor("metallic seaweed", "028090");
   AddNewColor("bdazzled blue", "26547C");
   AddNewColor("orange yellow", "FFD166");
   AddNewColor("infrared", "EF476F");
   AddNewColor("caribbean green", "06D6A0");
   AddNewColor("jade", "00A86B");
   AddNewColor("mint", "24FBCA");

   finalizeAddNewButton();
   checkForPages();
   createSelectedSquareTab();
   createCurrColorDiv();
   createInputs();
   createSlidersDiv();
   createNewColorDiv();
   createButtons();
   createYourSwatches();

   checkLoggedIn();

   finishSetup();
}

function finishSetup(){
   select("#loadCover").style('z-index', -10);
}

function createArrows(){
   // leftArrow = createDiv('');
   // leftArrow.size(40,40);
   // leftArrow.position(leftP*w, h-(botP*h-40)/2-40);
   // leftArrow.id("leftArrow");
   // leftArrow.mousePressed(pressLeft);

   leftArrow = select("#leftwrapper");
   leftArrow.size(40,40);
   leftArrow.position(leftP*w, h-(botP*h-40)/2);
   leftArrow.mousePressed(pressLeft);
   select("#leftsvg").size(leftArrow.size().width, leftArrow.size().height);


   // rightArrow = createDiv('');
   // rightArrow.size(40,40);
   // rightArrow.position(w-rightP*w-40, h-(botP*h-40)/2-40);
   // rightArrow.id("rightArrow");
   // rightArrow.mousePressed(pressRight);

   rightArrow = select("#rightwrapper");
   rightArrow.size(40,40);
   rightArrow.position(w-rightP*w-40, h-(botP*h-40)/2);
   rightArrow.mousePressed(pressRight);
   select("#rightsvg").size(rightArrow.size().width, rightArrow.size().height);
}

function deleteCookie(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function pressLeft(){
   if(page!=0){
      page = page-1;
   }else{
      page = Math.floor(myColors.length/(gx*gy));
   }
   redrawSquares();
}

function pressRight(){
   if(page!=Math.floor(myColors.length/(gx*gy))){
      page = page+1;
   }else{
      page = 0;
   }
   redrawSquares();
}

function createSelectedSquareTab(){
   selectedSquareTab = createDiv('');
   // selectedSquareTab.position(w, topP*h-buttonHeightP*h);
   selectedSquareTab.position(w, 0);
   // selectedSquareTab.size(squishedrightP*w-2*gap-originalrightP*w, h-topP*h-botP*h+2*buttonHeightP*h);
   selectedSquareTab.size(squishedrightP*w-(2*gap+originalrightP*w)/3, h);
   selectedSquareTab.class('selectedSquareTab');
}

function createCurrColorDiv(){
   currColorDiv = createDiv('');
   currColorDiv.position((2*gap+originalrightP*w)/3, topP*h-buttonHeightP*h);
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
      copy2Clipboard(currColorText1.elt);
   });
   currColorText2W.mousePressed(()=>{
      copy2Clipboard(currColorText2.elt);
   });
   currColorText3W.mousePressed(()=>{
      copy2Clipboard(currColorText3.elt);
   });
}

function createInputs(){
   inputs = createDiv('');
   selectedSquareTab.child(inputs);
   inputs.position((2*gap+originalrightP*w)/3, topP*h-buttonHeightP*h+(h-topP*h-botP*h)/3+gap/2);
   inputs.size(squishedrightP*w-2*gap-originalrightP*w, buttonHeightP*h);
   inputs.addClass('inputsDiv');

   inp1 = createInput('');
   inp2 = createInput('');
   inp3 = createInput('');
   inp4 = createInput('');

   inp1.id('inp1');
   inp2.id('inp2');
   inp3.id('inp3');
   inp4.id('inp4');

   var pw = squishedrightP*w-2*gap-originalrightP*w;
   var vertgap = pw/30;
   inp1.size(pw/6, buttonHeightP*h);
   inp2.size(pw/6, buttonHeightP*h);
   inp3.size(pw/6, buttonHeightP*h);
   inp4.size(pw/3, buttonHeightP*h);

   inp1.position(vertgap, 0);
   inp2.position(pw/6+2*vertgap, 0);
   inp3.position(2*pw/6+3*vertgap, 0);
   inp4.position(3*pw/6+4*vertgap, 0);

   inputs.child(inp1);
   inputs.child(inp2);
   inputs.child(inp3);
   inputs.child(inp4);

   inp1.input(changedInput);
   inp2.input(changedInput);
   inp3.input(changedInput);
   inp4.input(changedHexInput);

   inp1.style("font-size", inp1.size().width/3+"px");
   inp2.style("font-size", inp2.size().width/3+"px");
   inp3.style("font-size", inp3.size().width/3+"px");
   inp4.style("font-size", inp4.size().width/6+"px");

}

function createSlidersDiv(){
   slidersDiv = createDiv('');
   slidersDiv.position((2*gap+originalrightP*w)/3, topP*h-buttonHeightP*h+(h-topP*h-botP*h)/3+buttonHeightP*h+2*gap);
   slidersDiv.size(squishedrightP*w-2*gap-originalrightP*w, (h-topP*h-botP*h)/3-3*gap);
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

   var slh = (h-topP*h-botP*h)/3-3*gap;

   slider1.size(squishedrightP*w-originalrightP*w-6*gap, slh/4);
   slider2.size(squishedrightP*w-originalrightP*w-6*gap, slh/4);
   slider3.size(squishedrightP*w-originalrightP*w-6*gap, slh/4);

   slider1.position(gap, slh/4-slh/8);
   slider2.position(gap, slh/2-slh/8);
   slider3.position(gap, 3*slh/4-slh/8);

   selectedSquareTab.child(slidersDiv);
   slidersDiv.child(slider1);
   slidersDiv.child(slider2);
   slidersDiv.child(slider3);
}

function createButtons(){
   var pw = squishedrightP*w-2*gap-originalrightP*w;
   var vertgap = pw/30;

   saveAsButton = createButton('Add');
   saveAsButton.position((2*gap+originalrightP*w)/3+vertgap, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   saveAsButton.size((pw-4*vertgap)/3, buttonHeightP*h);
   selectedSquareTab.child(saveAsButton);
   saveAsButton.addClass("tabButton");

   replaceButton = createButton('Replace');
   replaceButton.position((2*gap+originalrightP*w)/3+vertgap*2+(pw-4*vertgap)/3, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   replaceButton.size((pw-4*vertgap)/3, buttonHeightP*h);
   selectedSquareTab.child(replaceButton);
   replaceButton.addClass("tabButton");

   removeButton = createButton('Remove');
   removeButton.position((2*gap+originalrightP*w)/3+vertgap*3+2*(pw-4*vertgap)/3, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   removeButton.size((pw-4*vertgap)/3, buttonHeightP*h);
   selectedSquareTab.child(removeButton);
   removeButton.addClass("tabButton");
   removeButton.id("removeButton");

   saveAsButton.style('font-size', saveAsButton.size().width/6+"px");
   replaceButton.style('font-size', replaceButton.size().width/6+"px");
   removeButton.style('font-size', removeButton.size().width/6+"px");


   saveAsButton.mousePressed(()=>{
      if(newColorText2.html()!=currColorText2.html()){
         swalOpen = true;
         swal("What should the new color's name be?", {
            content: "input"
         })
         .then(name => {
            swalOpen = false;
            if(name){
               AddNewColor(name,newColorText3.html());
               myColors[selectedSquare].square.removeClass('selectedSquare');
               selectedSquare = myColors.length-1;
               myColors[selectedSquare].square.addClass('selectedSquare');
               // updateNewColor();
               selectColor(myColors.length-1);
               redrawSquares();
            }
         });
      }
   });

   replaceButton.mousePressed(()=>{
      if(newColorText2.html()!=currColorText2.html()){ //replace
         swalOpen = true;
         swal("What should the new color's name be?", {
            content: "input"
         })
         .then(name => {
            swalOpen = false;
            if(name){
               myColors[selectedSquare].name = name;
               var c = color(newColorText3.html());
               myColors[selectedSquare].r = red(c);
               myColors[selectedSquare].g = green(c);
               myColors[selectedSquare].b = blue(c);
               myColors[selectedSquare].hex = newColorText3.html().substring(1, 7);
               myColors[selectedSquare].square.style('background-color', c);
               myColors[selectedSquare].text.html(name);

               var fs = getFontSize(myColors[selectedSquare].name);
               // if(myColors[selectedSquare].name.length<10){
               //    fs = (squishedrightP*w-gap-originalrightP*w)/10;
               // }else{
               //    fs = (squishedrightP*w-gap-originalrightP*w)/myColors[selectedSquare].name.length;
               // }
               currColorText1.style('font-size', fs + "px");
               currColorText2.style('font-size', fs + "px");
               currColorText3.style('font-size', fs + "px");
               newColorText1.style('font-size', fs + "px");
               newColorText2.style('font-size', fs + "px");
               newColorText3.style('font-size', fs + "px");
               currColorDiv.style('background-color', color(myColors[selectedSquare].r,myColors[selectedSquare].g,myColors[selectedSquare].b));
               currColorText1.style('color', color(invertColor(myColors[selectedSquare].hex)));
               currColorText2.style('color', color(invertColor(myColors[selectedSquare].hex)));
               currColorText3.style('color', color(invertColor(myColors[selectedSquare].hex)));
               currColorText1.html(`${myColors[selectedSquare].name}`);
               currColorText2.html(`(${myColors[selectedSquare].r}, ${myColors[selectedSquare].g}, ${myColors[selectedSquare].b})`);
               currColorText3.html(`#${myColors[selectedSquare].hex}`);
               setNewColor(myColors[selectedSquare].r, myColors[selectedSquare].g, myColors[selectedSquare].b);
            }
         });
      }else{//rename
         swalOpen = true;
         swal("What should the new name be?", {
            content: "input"
         })
         .then(name => {
            swalOpen = false;
            if(name){
               myColors[selectedSquare].name = name;
               myColors[selectedSquare].text.html(name);
               var fs = getFontSize(myColors[selectedSquare].name);
               // if(myColors[selectedSquare].name.length<10){
               //    fs = (squishedrightP*w-gap-originalrightP*w)/10;
               // }else{
               //    fs = (squishedrightP*w-gap-originalrightP*w)/myColors[selectedSquare].name.length;
               // }
               currColorText1.style('font-size', fs + "px");
               currColorText2.style('font-size', fs + "px");
               currColorText3.style('font-size', fs + "px");
               newColorText1.style('font-size', fs + "px");
               newColorText2.style('font-size', fs + "px");
               newColorText3.style('font-size', fs + "px");
               currColorText1.html(`${myColors[selectedSquare].name}`);
               setNewColor(myColors[selectedSquare].r, myColors[selectedSquare].g, myColors[selectedSquare].b);
            }
         });
      }
   });

   removeButton.mousePressed(()=>{
      swalOpen = true;
      swal("Are you sure you want to remove this color from your palette?", {
         dangerMode: true,
         buttons: {
            cancel: "Cancel",
            confirm: {value: "OK", text: "Yes"}
         }
      })
      .then(value => {
         swalOpen = false;
         if(value=="OK"){
            removeColor();
         }
      });
   });
}

function removeColor(){
   if(myColors.length!=1){
      myColors[selectedSquare].square.removeClass('selectedSquare');
      myColors[selectedSquare].square.remove();
      myColors.splice(selectedSquare, 1);
      for(var i = 0; i<myColors.length; i++){
         myColors[i].ind = i;
         myColors[i].square.ind = i;
      }
      if(selectedSquare!=0){
         selectedSquare -= 1;
      }
      selectColor(selectedSquare);
      myColors[selectedSquare].square.addClass('selectedSquare');
   }else{
      rightP = originalrightP;
      myColors[selectedSquare].square.removeClass('selectedSquare');
      selectedSquareTab.position(w, 0);
      myColors[selectedSquare].square.remove();
      myColors.splice(selectedSquare, 1);
      for(var i = 0; i<myColors.length; i++){
         myColors[i].ind = i;
         myColors[i].square.ind = i;
      }
      selectedSquare = -1;
   }
   redrawSquares();
}

function createNewColorDiv(){
   newColorDiv = createDiv('');
   newColorDiv.position((2*gap+originalrightP*w)/3, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+2*buttonHeightP*h+gap);
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
      copy2Clipboard(newColorText1.elt);
   });
   newColorText2W.mousePressed(()=>{
      copy2Clipboard(newColorText2.elt);
   });
   newColorText3W.mousePressed(()=>{
      copy2Clipboard(newColorText3.elt);
   });
}

function selectColor(ind){
   var fs;
   if(myColors[ind].name.length<8){
      fs = (squishedrightP*w-gap-originalrightP*w)/10;
   }else{
      fs = (squishedrightP*w-gap-originalrightP*w)/(myColors[ind].name.length+2);
   }
   inp1.value(myColors[ind].r);
   inp2.value(myColors[ind].g);
   inp3.value(myColors[ind].b);
   inp4.value(myColors[ind].hex);

   currColorText1.style('font-size', fs + "px");
   currColorText2.style('font-size', fs + "px");
   currColorText3.style('font-size', fs + "px");
   newColorText1.style('font-size', fs + "px");
   newColorText2.style('font-size', fs + "px");
   newColorText3.style('font-size', fs + "px");
   currColorDiv.style('background-color', color(myColors[ind].r,myColors[ind].g,myColors[ind].b));
   currColorText1.style('color', color(invertColor(myColors[ind].hex)));
   currColorText2.style('color', color(invertColor(myColors[ind].hex)));
   currColorText3.style('color', color(invertColor(myColors[ind].hex)));
   newColorText1.style('color', color(invertColor(myColors[ind].hex)));
   newColorText2.style('color', color(invertColor(myColors[ind].hex)));
   newColorText3.style('color', color(invertColor(myColors[ind].hex)));
   // currColorText.html(`${myColors[myInd].name}<br />(${myColors[myInd].r}, ${myColors[myInd].g}, ${myColors[myInd].b})<br />#${myColors[myInd].hex}`);
   currColorText1.html(`${myColors[ind].name}`);
   currColorText2.html(`(${myColors[ind].r}, ${myColors[ind].g}, ${myColors[ind].b})`);
   currColorText3.html(`#${myColors[ind].hex}`);
   newColorDiv.style('background-color', color(myColors[ind].r,myColors[ind].g,myColors[ind].b));
   setNewColor(myColors[ind].r, myColors[ind].g, myColors[ind].b);
   slideTo(myColors[ind].r, slider1.value(), myColors[ind].g, slider2.value(), myColors[ind].b, slider3.value());
}

function AddNewColor(name,hex){
   hex = (hex.charAt(0)=="#") ? hex.substring(1,7): hex;
   let nsq = createDiv('');
   hex = hex.toUpperCase();
   var c = color("#"+hex);
   // let nsqText = createDiv(`${red(c)}, ${green(c)}, ${blue(c)} <br /> #${hex}`);
   let nsqText = createDiv(name);
   nsq.class('colorSquare');
   nsqText.class('colorSquareText');
   var fs = getFontSize(name);
   // if(name.length<10){
   //    fs = (((w-leftP*w-rightP*w)/gx)-gap)/10;
   // }else{
   //    fs = (((w-leftP*w-rightP*w)/gx)-gap)/name.length;
   // }
   nsqText.style('font-size', fs + "px");
   nsqText.style('color', invertColor(hex));
   nsq.child(nsqText);
   nsq.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
   let myInd = myColors.length;
   nsq.position(myInd%gx*((w-leftP*w-rightP*w)/gx)+leftP*w+Math.floor(myInd/(gx*gy))*w-page*w, Math.floor((myInd%(gx*gy))/gx)*((h-topP*h-botP*h)/gy)+topP*h);

   nsq.style('background-color', c);
   nsq.ind = myInd;
   nsq.mousePressed(()=>{
      rightP = squishedrightP;
      if(selectedSquare==nsq.ind){
         selectedSquare = -1;
         rightP = originalrightP;
         nsq.removeClass('selectedSquare');
         selectedSquareTab.position(w, 0);
         // selectedSquareTab.position(w, topP*h-buttonHeightP*h);
      }else{
         if(selectedSquare!=-1){
            myColors[selectedSquare].square.removeClass('selectedSquare');
         }
         selectedSquareTab.position(w-selectedSquareTab.size().width, 0);
         selectedSquare = nsq.ind;
         selectColor(nsq.ind);
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
   redrawSquares();
}

function getFontSize(name){
   var fs;
   // if(name.length<8){
      // fs = (((w-leftP*w-rightP*w)/gx)*3/4-gap)/10;
   // }else{
      fs = (((w-leftP*w-rightP*w)/gx)-gap)/(name.length+4);
   // }
   if(fs>30){
      fs = 30;
   }
   return fs;
}

function checkForPages(){
   if(myColors.length>=(gx*gy)){
      needPages = true;
      // page = 0;
      leftArrow.style('opacity', 1);
      leftArrow.style('z-index', 1);
      rightArrow.style('opacity', 1);
      rightArrow.style('z-index', 1);
   }else{
      needPages = false;
      page = 0;
      leftArrow.style('opacity', 0);
      leftArrow.style('z-index', -1);
      rightArrow.style('opacity', 0);
      rightArrow.style('z-index', -1);
   }
}

function slideTo(t1, f1, t2, f2, t3, f3){
   sliding = true;
   slider1To = t1;
   slider2To = t2;
   slider3To = t3;
   slider1From = f1;
   slider2From = f2;
   slider3From = f3;
   sliderStartTime = millis();
}

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
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
   checkForPages();
   for(var i = 0; i<myColors.length; i++){
      myColors[i].square.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
      myColors[i].square.position(i%gx*((w-leftP*w-rightP*w)/gx)+leftP*w+Math.floor(i/(gx*gy))*w-page*w, Math.floor((i%(gx*gy))/gx)*((h-topP*h-botP*h)/gy)+topP*h);
      // var fs;
      // if(myColors[i].name.length<10){
      //    fs = (((w-leftP*w-rightP*w)/gx)-gap)/12;
      // }else{
      //    fs = (((w-leftP*w-rightP*w)/gx)-gap)/(myColors[i].name.length+2);
      // }
      myColors[i].text.style('font-size', getFontSize(myColors[i].name) + "px");
   }

   leftArrow.position(leftP*w, h-(botP*h-40)/2-40);
   rightArrow.position(w-rightP*w-40, h-(botP*h-40)/2-40);
   addNewButton.position(myColors.length%gx*((w-leftP*w-rightP*w)/gx)+gap/2+leftP*w+Math.floor(myColors.length/(gx*gy))*w-page*w, Math.floor((myColors.length%(gx*gy))/gx)*(((h-topP*h-botP*h)/gy))+gap/2+topP*h);
   addNewButton.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
}

function updateNewColor(){
   var r = slider1.value();
   var g = slider2.value();
   var b = slider3.value();
   var c = color(r, g, b);
   var hex = rgb2Hex(r, g, b).toUpperCase();

   inp1.value(r);
   inp2.value(g);
   inp3.value(b);
   inp4.value(hex);

   setNewColor(r, g, b);
}

function copy2Clipboard(elm) {
   if (document.selection) {
     var range = document.body.createTextRange();
     range.moveToElementText(elm);
     range.select().createTextRange();
     document.execCommand("copy");
   } else if (window.getSelection) {
     var range = document.createRange();
      range.selectNode(elm);
      window.getSelection().addRange(range);
      document.execCommand("copy");
   }
}

function invertColor(hex) {
   return invertColorA(hex, true);
}

function invertColorA(hex, bw) {
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
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
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

function changedInput(){
   var r = limit((inp1.value().length==0 ? "0" : inp1.value()), 0, 255);
   var g = limit((inp2.value().length==0 ? "0" : inp2.value()), 0, 255);
   var b = limit((inp3.value().length==0 ? "0" : inp3.value()), 0, 255);

   var hex = rgb2Hex(r, g, b).toUpperCase();
   inp4.value(hex);
   handleInput(r, g, b);
}

function changedHexInput(){
   var i = (inp4.value().charAt(0)=="#") ? inp4.value(): "#"+inp4.value();
   if(isHex(i)){
      var c = color(i);
      var r = red(c);
      var g = green(c);
      var b = blue(c);
      inp1.value(r);
      inp2.value(g);
      inp3.value(b);
      handleInput(r, g, b);
   }
}

function handleInput(r, g, b){
   slideTo(r, slider1.value(), g, slider2.value(), b, slider3.value());
   setNewColor(r, g, b);
   // updateNewColor();
}

function setNewColor(r, g, b){
   var c = color(r, g, b);
   var hex = rgb2Hex(r, g, b).toUpperCase();
   newColorDiv.style('background-color', c);
   var colorNamed = -1;
   for(var i = 0; i<myColors.length; i++){
      if(r==myColors[i].r && g==myColors[i].g && b==myColors[i].b){
         colorNamed = i;
      }
   }
   if(colorNamed!=-1){
      newColorText1.html(`${myColors[colorNamed].name}`);
   }else{
      newColorText1.html(`New Color`);
   }
   newColorText2.html(`(${r}, ${g}, ${b})`);
   if(colorNamed!=-1){
      hideAdd();
      if(newColorText2.html()==currColorText2.html()){
         showReplace();
         replaceButton.html("Rename");
      }else{
         hideReplace();
      }
   }else{
      replaceButton.html("Replace");
      showReplace();
      showAdd();
   }
   newColorText3.html(`#${hex}`);
   root.style.setProperty('--slider1Left', "#"+rgb2Hex(0, g, b).toUpperCase());
   root.style.setProperty('--slider1Right', "#"+rgb2Hex(255, g, b).toUpperCase());
   root.style.setProperty('--slider2Left', "#"+rgb2Hex(r, 0, b).toUpperCase());
   root.style.setProperty('--slider2Right', "#"+rgb2Hex(r, 255, b).toUpperCase());
   root.style.setProperty('--slider3Left', "#"+rgb2Hex(r, g, 0).toUpperCase());
   root.style.setProperty('--slider3Right', "#"+rgb2Hex(r, g, 255).toUpperCase());
   newColorText1.style('color', invertColor(hex));
   newColorText2.style('color', invertColor(hex));
   newColorText3.style('color', invertColor(hex));
}

function hideReplace(){
   hideAdd();
   replaceButton.style('opacity', '0');
   replaceButton.style('cursor', 'default');
   replaceButton.elt.disabled = true;
   var pw = squishedrightP*w-2*gap-originalrightP*w;
   var vertgap = pw/30;
   replaceButton.position(0, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   removeButton.position((2*gap+originalrightP*w)/3+vertgap, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   removeButton.size(pw-2*vertgap, buttonHeightP*h);
}

function showReplace(){
   hideAdd();
   replaceButton.style('opacity', '1');
   replaceButton.style('cursor', 'pointer');
   replaceButton.elt.disabled = false;
}

function hideAdd(){
   // saveAsButton.size(0, 0);
   saveAsButton.style('opacity', '0');
   saveAsButton.style('cursor', 'default');
   saveAsButton.elt.disabled = true;
   var pw = squishedrightP*w-2*gap-originalrightP*w;
   var vertgap = pw/30;
   saveAsButton.position(0, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   replaceButton.position((2*gap+originalrightP*w)/3+vertgap, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   replaceButton.size((pw-3*vertgap)/2, buttonHeightP*h);
   removeButton.position((2*gap+originalrightP*w)/3+2*vertgap+(pw-3*vertgap)/2, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   removeButton.size((pw-3*vertgap)/2, buttonHeightP*h);
}

function showAdd(){
   // saveAsButton.size((pw-4*vertgap)/3, buttonHeightP*h);
   saveAsButton.style('opacity', '1');
   saveAsButton.style('cursor', 'pointer');
   saveAsButton.elt.disabled = false;
   var pw = squishedrightP*w-2*gap-originalrightP*w;
   var vertgap = pw/30;
   saveAsButton.position((2*gap+originalrightP*w)/3+vertgap, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   replaceButton.position((2*gap+originalrightP*w)/3+vertgap*2+(pw-4*vertgap)/3, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   replaceButton.size((pw-4*vertgap)/3, buttonHeightP*h);
   removeButton.position((2*gap+originalrightP*w)/3+vertgap*3+2*(pw-4*vertgap)/3, topP*h-buttonHeightP*h+2*(h-topP*h-botP*h)/3+buttonHeightP*h);
   removeButton.size((pw-4*vertgap)/3, buttonHeightP*h);
}

function isHex(hex){
   return /(^#[0-9A-F]{6}$)/i.test(hex);
}

function limit(num, min, max){
   return Math.min(Math.max(parseInt(num), min), max);
}

function createAddNewButton(){
   // addNewButton = createDiv('');
   // addNewButton.id('addNew');
   // addNewButton.position(myColors.length%gx*((w-leftP*w-rightP*w)/gx)+gap/2+leftP*w+Math.floor(myColors.length/(gx*gy))*w-page*w, Math.floor((myColors.length%(gx*gy))/gx)*(((h-topP*h-botP*h)/gy))+gap/2+topP*h);
   // addNewButton.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
   // addNewButton.style('opacity', 0);
   addNewButton = select(".svgwrapper");
   // addNewButton.id('addNew');
   addNewButton.position(myColors.length%gx*((w-leftP*w-rightP*w)/gx)+gap/2+leftP*w+Math.floor(myColors.length/(gx*gy))*w-page*w, Math.floor((myColors.length%(gx*gy))/gx)*(((h-topP*h-botP*h)/gy))+gap/2+topP*h);
   addNewButton.size(((w-leftP*w-rightP*w)/gx)-gap, ((h-topP*h-botP*h)/gy)-gap);
   addNewButton.style('opacity', 0);

   addNewButton.mousePressed(()=>{
      AddNewColor(generateName(), generateNewHex());
      rightP = squishedrightP;
      if(selectedSquare!=-1){
         myColors[selectedSquare].square.removeClass('selectedSquare');
      }
      selectedSquareTab.position(w-selectedSquareTab.size().width, 0);
      selectedSquare = myColors.length-1;
      selectColor(myColors.length-1);
      myColors[myColors.length-1].square.addClass('selectedSquare');
      redrawSquares();
   });
}

function generateNewHex(){
   var r = getRandomInt(0,255);
   var g = getRandomInt(0,255);
   var b = getRandomInt(0,255);
   var alreadyExists = false;
   for(var i = 0; i<myColors.length; i++){
      if(myColors[i].r==r && myColors[i].g==g && myColors[i].b==b){
         alreadyExists = true;
      }
   }
   if(alreadyExists){
      return generateNewHex();
   }else{
      return rgb2Hex(r, g, b);
   }
}

function finalizeAddNewButton(){
   addNewButton.style('opacity', 1);
   addNewButton.style('transition', "all 0.3s ease-in-out");
}

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateName(){
	var name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing","ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual","another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic","ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic","authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back","baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big","big-hearted","biodegradable","bite-sized","bitter","black","black-and-white","bland","blank","blaring","bleak","blind","blissful","blond","blue","blushing","bogus","boiling","bold","bony","boring","bossy","both","bouncy","bountiful","bowed","brave","breakable","brief","bright","brilliant","brisk","broken","bronze","brown","bruised","bubbly","bulky","bumpy","buoyant","burdensome","burly","bustling","busy","buttery","buzzing","calculating","calm","candid","canine","capital","carefree","careful","careless","caring","cautious","cavernous","celebrated","charming","cheap","cheerful","cheery","chief","chilly","chubby","circular","classic","clean","clear","clear-cut","clever","close","closed","cloudy","clueless","clumsy","cluttered","coarse","cold","colorful","colorless","colossal","comfortable","common","compassionate","competent","complete","complex","complicated","composed","concerned","concrete","confused","conscious","considerate","constant","content","conventional","cooked","cool","cooperative","coordinated","corny","corrupt","costly","courageous","courteous","crafty","crazy","creamy","creative","creepy","criminal","crisp","critical","crooked","crowded","cruel","crushing","cuddly","cultivated","cultured","cumbersome","curly","curvy","cute","cylindrical","damaged","damp","dangerous","dapper","daring","darling","dark","dazzling","dead","deadly","deafening","dear","dearest","decent","decimal","decisive","deep","defenseless","defensive","defiant","deficient","definite","definitive","delayed","delectable","delicious","delightful","delirious","demanding","dense","dental","dependable","dependent","descriptive","deserted","detailed","determined","devoted","different","difficult","digital","diligent","dim","dimpled","dimwitted","direct","disastrous","discrete","disfigured","disgusting","disloyal","dismal","distant","downright","dreary","dirty","disguised","dishonest","dismal","distant","distinct","distorted","dizzy","dopey","doting","double","downright","drab","drafty","dramatic","dreary","droopy","dry","dual","dull","dutiful","each","eager","earnest","early","easy","easy-going","ecstatic","edible","educated","elaborate","elastic","elated","elderly","electric","elegant","elementary","elliptical","embarrassed","embellished","eminent","emotional","empty","enchanted","enchanting","energetic","enlightened","enormous","enraged","entire","envious","equal","equatorial","essential","esteemed","ethical","euphoric","even","evergreen","everlasting","every","evil","exalted","excellent","exemplary","exhausted","excitable","excited","exciting","exotic","expensive","experienced","expert","extraneous","extroverted","extra-large","extra-small","fabulous","failing","faint","fair","faithful","fake","false","familiar","famous","fancy","fantastic","far","faraway","far-flung","far-off","fast","fat","fatal","fatherly","favorable","favorite","fearful","fearless","feisty","feline","female","feminine","few","fickle","filthy","fine","finished","firm","first","firsthand","fitting","fixed","flaky","flamboyant","flashy","flat","flawed","flawless","flickering","flimsy","flippant","flowery","fluffy","fluid","flustered","focused","fond","foolhardy","foolish","forceful","forked","formal","forsaken","forthright","fortunate","fragrant","frail","frank","frayed","free","French","fresh","frequent","friendly","frightened","frightening","frigid","frilly","frizzy","frivolous","front","frosty","frozen","frugal","fruitful","full","fumbling","functional","funny","fussy","fuzzy","gargantuan","gaseous","general","generous","gentle","genuine","giant","giddy","gigantic","gifted","giving","glamorous","glaring","glass","gleaming","gleeful","glistening","glittering","gloomy","glorious","glossy","glum","golden","good","good-natured","gorgeous","graceful","gracious","grand","grandiose","granular","grateful","grave","gray","great","greedy","green","gregarious","grim","grimy","gripping","grizzled","gross","grotesque","grouchy","grounded","growing","growling","grown","grubby","gruesome","grumpy","guilty","gullible","gummy","hairy","half","handmade","handsome","handy","happy","happy-go-lucky","hard","hard-to-find","harmful","harmless","harmonious","harsh","hasty","hateful","haunting","healthy","heartfelt","hearty","heavenly","heavy","hefty","helpful","helpless","hidden","hideous","high","high-level","hilarious","hoarse","hollow","homely","honest","honorable","honored","hopeful","horrible","hospitable","hot","huge","humble","humiliating","humming","humongous","hungry","hurtful","husky","icky","icy","ideal","idealistic","identical","idle","idiotic","idolized","ignorant","ill","illegal","ill-fated","ill-informed","illiterate","illustrious","imaginary","imaginative","immaculate","immaterial","immediate","immense","impassioned","impeccable","impartial","imperfect","imperturbable","impish","impolite","important","impossible","impractical","impressionable","impressive","improbable","impure","inborn","incomparable","incompatible","incomplete","inconsequential","incredible","indelible","inexperienced","indolent","infamous","infantile","infatuated","inferior","infinite","informal","innocent","insecure","insidious","insignificant","insistent","instructive","insubstantial","intelligent","intent","intentional","interesting","internal","international","intrepid","ironclad","irresponsible","irritating","itchy","jaded","jagged","jam-packed","jaunty","jealous","jittery","joint","jolly","jovial","joyful","joyous","jubilant","judicious","juicy","jumbo","junior","jumpy","juvenile","kaleidoscopic","keen","key","kind","kindhearted","kindly","klutzy","knobby","knotty","knowledgeable","knowing","known","kooky","kosher","lame","lanky","large","last","lasting","late","lavish","lawful","lazy","leading","lean","leafy","left","legal","legitimate","light","lighthearted","likable","likely","limited","limp","limping","linear","lined","liquid","little","live","lively","livid","loathsome","lone","lonely","long","long-term","loose","lopsided","lost","loud","lovable","lovely","loving","low","loyal","lucky","lumbering","luminous","lumpy","lustrous","luxurious","mad","made-up","magnificent","majestic","major","male","mammoth","married","marvelous","masculine","massive","mature","meager","mealy","mean","measly","meaty","medical","mediocre","medium","meek","mellow","melodic","memorable","menacing","merry","messy","metallic","mild","milky","mindless","miniature","minor","minty","miserable","miserly","misguided","misty","mixed","modern","modest","moist","monstrous","monthly","monumental","moral","mortified","motherly","motionless","mountainous","muddy","muffled","multicolored","mundane","murky","mushy","musty","muted","mysterious","naive","narrow","nasty","natural","naughty","nautical","near","neat","necessary","needy","negative","neglected","negligible","neighboring","nervous","new","next","nice","nifty","nimble","nippy","nocturnal","noisy","nonstop","normal","notable","noted","noteworthy","novel","noxious","numb","nutritious","nutty","obedient","obese","oblong","oily","oblong","obvious","occasional","odd","oddball","offbeat","offensive","official","old","old-fashioned","only","open","optimal","optimistic","opulent","orange","orderly","organic","ornate","ornery","ordinary","original","other","our","outlying","outgoing","outlandish","outrageous","outstanding","oval","overcooked","overdue","overjoyed","overlooked","palatable","pale","paltry","parallel","parched","partial","passionate","past","pastel","peaceful","peppery","perfect","perfumed","periodic","perky","personal","pertinent","pesky","pessimistic","petty","phony","physical","piercing","pink","pitiful","plain","plaintive","plastic","playful","pleasant","pleased","pleasing","plump","plush","polished","polite","political","pointed","pointless","poised","poor","popular","portly","posh","positive","possible","potable","powerful","powerless","practical","precious","present","prestigious","pretty","precious","previous","pricey","prickly","primary","prime","pristine","private","prize","probable","productive","profitable","profuse","proper","proud","prudent","punctual","pungent","puny","pure","purple","pushy","putrid","puzzled","puzzling","quaint","qualified","quarrelsome","quarterly","queasy","querulous","questionable","quick","quick-witted","quiet","quintessential","quirky","quixotic","quizzical","radiant","ragged","rapid","rare","rash","raw","recent","reckless","rectangular","ready","real","realistic","reasonable","red","reflecting","regal","regular","reliable","relieved","remarkable","remorseful","remote","repentant","required","respectful","responsible","repulsive","revolving","rewarding","rich","rigid","right","ringed","ripe","roasted","robust","rosy","rotating","rotten","rough","round","rowdy","royal","rubbery","rundown","ruddy","rude","runny","rural","rusty","sad","safe","salty","same","sandy","sane","sarcastic","sardonic","satisfied","scaly","scarce","scared","scary","scented","scholarly","scientific","scornful","scratchy","scrawny","second","secondary","second-hand","secret","self-assured","self-reliant","selfish","sentimental","separate","serene","serious","serpentine","several","severe","shabby","shadowy","shady","shallow","shameful","shameless","sharp","shimmering","shiny","shocked","shocking","shoddy","short","short-term","showy","shrill","shy","sick","silent","silky","silly","silver","similar","simple","simplistic","sinful","single","sizzling","skeletal","skinny","sleepy","slight","slim","slimy","slippery","slow","slushy","small","smart","smoggy","smooth","smug","snappy","snarling","sneaky","sniveling","snoopy","sociable","soft","soggy","solid","somber","some","spherical","sophisticated","sore","sorrowful","soulful","soupy","sour","Spanish","sparkling","sparse","specific","spectacular","speedy","spicy","spiffy","spirited","spiteful","splendid","spotless","spotted","spry","square","squeaky","squiggly","stable","staid","stained","stale","standard","starchy","stark","starry","steep","sticky","stiff","stimulating","stingy","stormy","straight","strange","steel","strict","strident","striking","striped","strong","studious","stunning","stupendous","stupid","sturdy","stylish","subdued","submissive","substantial","subtle","suburban","sudden","sugary","sunny","super","superb","superficial","superior","supportive","sure-footed","surprised","suspicious","svelte","sweaty","sweet","sweltering","swift","sympathetic","tall","talkative","tame","tan","tangible","tart","tasty","tattered","taut","tedious","teeming","tempting","tender","tense","tepid","terrible","terrific","testy","thankful","that","these","thick","thin","third","thirsty","this","thorough","thorny","those","thoughtful","threadbare","thrifty","thunderous","tidy","tight","timely","tinted","tiny","tired","torn","total","tough","traumatic","treasured","tremendous","tragic","trained","tremendous","triangular","tricky","trifling","trim","trivial","troubled","true","trusting","trustworthy","trusty","truthful","tubby","turbulent","twin","ugly","ultimate","unacceptable","unaware","uncomfortable","uncommon","unconscious","understated","unequaled","uneven","unfinished","unfit","unfolded","unfortunate","unhappy","unhealthy","uniform","unimportant","unique","united","unkempt","unknown","unlawful","unlined","unlucky","unnatural","unpleasant","unrealistic","unripe","unruly","unselfish","unsightly","unsteady","unsung","untidy","untimely","untried","untrue","unused","unusual","unwelcome","unwieldy","unwilling","unwitting","unwritten","upbeat","upright","upset","urban","usable","used","useful","useless","utilized","utter","vacant","vague","vain","valid","valuable","vapid","variable","vast","velvety","venerated","vengeful","verifiable","vibrant","vicious","victorious","vigilant","vigorous","villainous","violet","violent","virtual","virtuous","visible","vital","vivacious","vivid","voluminous","wan","warlike","warm","warmhearted","warped","wary","wasteful","watchful","waterlogged","watery","wavy","wealthy","weak","weary","webbed","wee","weekly","weepy","weighty","weird","welcome","well-documented","well-groomed","well-informed","well-lit","well-made","well-off","well-to-do","well-worn","wet","which","whimsical","whirlwind","whispered","white","whole","whopping","wicked","wide","wide-eyed","wiggly","wild","willing","wilted","winding","windy","winged","wiry","wise","witty","wobbly","woeful","wonderful","wooden","woozy","wordy","worldly","worn","worried","worrisome","worse","worst","worthless","worthwhile","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];

	var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","news","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president","unit","category","cigarette","context","introduction","opportunity","performance","driver","flight","length","magazine","newspaper","relationship","teaching","cell","dealer","debate","finding","lake","member","message","phone","scene","appearance","association","concept","customer","discussion","housing","inflation","insurance","mood","woman","advice","blood","effort","expression","importance","opinion","payment","reality","responsibility","situation","skill","statement","wealth","application","city","county","depth","estate","foundation","grandmother","heart","perspective","photo","recipe","studio","topic","collection","imagination","passion","percentage","resource","setting","ad","agency","college","connection","criticism","debt","description","memory","patience","secretary","solution","administration","aspect","attitude","director","personality","psychology","recommendation","response","selection","storage","version","alcohol","argument","complaint","contract","emphasis","highway","loss","membership","possession","preparation","steak","union","agreement","currency","employment","engineering","entry","interaction","limit","mixture","preference","region","republic","seat","tradition","virus","actor","classroom","delivery","device","difficulty","drama","election","engine","football","guidance","hotel","match","owner","priority","protection","suggestion","tension","variation","anxiety","atmosphere","awareness","bread","climate","comparison","confusion","construction","elevator","emotion","employee","employer","guest","height","leadership","mall","manager","operation","recording","respect","sample","transportation","boring","charity","cousin","disaster","editor","efficiency","excitement","extent","feedback","guitar","homework","leader","mom","outcome","permission","presentation","promotion","reflection","refrigerator","resolution","revenue","session","singer","tennis","basket","bonus","cabinet","childhood","church","clothes","coffee","dinner","drawing","hair","hearing","initiative","judgment","lab","measurement","mode","mud","orange","poetry","police","possibility","procedure","queen","ratio","relation","restaurant","satisfaction","sector","signature","significance","song","tooth","town","vehicle","volume","wife","accident","airport","appointment","arrival","assumption","baseball","chapter","committee","conversation","database","enthusiasm","error","explanation","farmer","gate","girl","hall","historian","hospital","injury","instruction","maintenance","manufacturer","meal","perception","pie","poem","presence","proposal","reception","replacement","revolution","river","son","speech","tea","village","warning","winner","worker","writer","assistance","breath","buyer","chest","chocolate","conclusion","contribution","cookie","courage","desk","drawer","establishment","examination","garbage","grocery","honey","impression","improvement","independence","insect","inspection","inspector","king","ladder","menu","penalty","piano","potato","profession","professor","quantity","reaction","requirement","salad","sister","supermarket","tongue","weakness","wedding","affair","ambition","analyst","apple","assignment","assistant","bathroom","bedroom","beer","birthday","celebration","championship","cheek","client","consequence","departure","diamond","dirt","ear","fortune","friendship","funeral","gene","girlfriend","hat","indication","intention","lady","midnight","negotiation","obligation","passenger","pizza","platform","poet","pollution","recognition","reputation","shirt","speaker","stranger","surgery","sympathy","tale","throat","trainer","uncle","youth","time","work","film","water","money","example","while","business","study","game","life","form","air","day","place","number","part","field","fish","back","process","heat","hand","experience","job","book","end","point","type","home","economy","value","body","market","guide","interest","state","radio","course","company","price","size","card","list","mind","trade","line","care","group","risk","word","fat","force","key","light","training","name","school","top","amount","level","order","practice","research","sense","service","piece","web","boss","sport","fun","house","page","term","test","answer","sound","focus","matter","kind","soil","board","oil","picture","access","garden","range","rate","reason","future","site","demand","exercise","image","case","cause","coast","action","age","bad","boat","record","result","section","building","mouse","cash","class","period","plan","store","tax","side","subject","space","rule","stock","weather","chance","figure","man","model","source","beginning","earth","program","chicken","design","feature","head","material","purpose","question","rock","salt","act","birth","car","dog","object","scale","sun","note","profit","rent","speed","style","war","bank","craft","half","inside","outside","standard","bus","exchange","eye","fire","position","pressure","stress","advantage","benefit","box","frame","issue","step","cycle","face","item","metal","paint","review","room","screen","structure","view","account","ball","discipline","medium","share","balance","bit","black","bottom","choice","gift","impact","machine","shape","tool","wind","address","average","career","culture","morning","pot","sign","table","task","condition","contact","credit","egg","hope","ice","network","north","square","attempt","date","effect","link","post","star","voice","capital","challenge","friend","self","shot","brush","couple","exit","front","function","lack","living","plant","plastic","spot","summer","taste","theme","track","wing","brain","button","click","desire","foot","gas","influence","notice","rain","wall","base","damage","distance","feeling","pair","savings","staff","sugar","target","text","animal","author","budget","discount","file","ground","lesson","minute","officer","phase","reference","register","sky","stage","stick","title","trouble","bowl","bridge","campaign","character","club","edge","evidence","fan","letter","lock","maximum","novel","option","pack","park","quarter","skin","sort","weight","baby","background","carry","dish","factor","fruit","glass","joint","master","muscle","red","strength","traffic","trip","vegetable","appeal","chart","gear","ideal","kitchen","land","log","mother","net","party","principle","relative","sale","season","signal","spirit","street","tree","wave","belt","bench","commission","copy","drop","minimum","path","progress","project","sea","south","status","stuff","ticket","tour","angle","blue","breakfast","confidence","daughter","degree","doctor","dot","dream","duty","essay","father","fee","finance","hour","juice","luck","milk","mouth","peace","pipe","stable","storm","substance","team","trick","afternoon","bat","beach","blank","catch","chain","consideration","cream","crew","detail","gold","interview","kid","mark","mission","pain","pleasure","score","screw","sex","shop","shower","suit","tone","window","agent","band","bath","block","bone","calendar","candidate","cap","coat","contest","corner","court","cup","district","door","east","finger","garage","guarantee","hole","hook","implement","layer","lecture","lie","manner","meeting","nose","parking","partner","profile","rice","routine","schedule","swimming","telephone","tip","winter","airline","bag","battle","bed","bill","bother","cake","code","curve","designer","dimension","dress","ease","emergency","evening","extension","farm","fight","gap","grade","holiday","horror","horse","host","husband","loan","mistake","mountain","nail","noise","occasion","package","patient","pause","phrase","proof","race","relief","sand","sentence","shoulder","smoke","stomach","string","tourist","towel","vacation","west","wheel","wine","arm","aside","associate","bet","blow","border","branch","breast","brother","buddy","bunch","chip","coach","cross","document","draft","dust","expert","floor","god","golf","habit","iron","judge","knife","landscape","league","mail","mess","native","opening","parent","pattern","pin","pool","pound","request","salary","shame","shelter","shoe","silver","tackle","tank","trust","assist","bake","bar","bell","bike","blame","boy","brick","chair","closet","clue","collar","comment","conference","devil","diet","fear","fuel","glove","jacket","lunch","monitor","mortgage","nurse","pace","panic","peak","plane","reward","row","sandwich","shock","spite","spray","surprise","till","transition","weekend","welcome","yard","alarm","bend","bicycle","bite","blind","bottle","cable","candle","clerk","cloud","concert","counter","flower","grandfather","harm","knee","lawyer","leather","load","mirror","neck","pension","plate","purple","ruin","ship","skirt","slice","snow","specialist","switch","trash","tune","zone","anger","award","bid","bitter","boot","bug","camp","candy","carpet","cat","champion","channel","clock","comfort","cow","crack","engineer","entrance","fault","grass","guy","hell","highlight","incident","island","joke","jury","leg","lip","mate","motor","nerve","passage","pen","pride","priest","prize","promise","resident","resort","ring","roof","rope","sail","scheme","script","sock","station","toe","tower","truck","witness","can","will","other","use","make","good","look","help","go","great","being","still","public","read","keep","start","give","human","local","general","specific","long","play","feel","high","put","common","set","change","simple","past","big","possible","particular","major","personal","current","national","cut","natural","physical","show","try","check","second","call","move","pay","let","increase","single","individual","turn","ask","buy","guard","hold","main","offer","potential","professional","international","travel","cook","alternative","special","working","whole","dance","excuse","cold","commercial","low","purchase","deal","primary","worth","fall","necessary","positive","produce","search","present","spend","talk","creative","tell","cost","drive","green","support","glad","remove","return","run","complex","due","effective","middle","regular","reserve","independent","leave","original","reach","rest","serve","watch","beautiful","charge","active","break","negative","safe","stay","visit","visual","affect","cover","report","rise","walk","white","junior","pick","unique","classic","final","lift","mix","private","stop","teach","western","concern","familiar","fly","official","broad","comfortable","gain","rich","save","stand","young","heavy","lead","listen","valuable","worry","handle","leading","meet","release","sell","finish","normal","press","ride","secret","spread","spring","tough","wait","brown","deep","display","flow","hit","objective","shoot","touch","cancel","chemical","cry","dump","extreme","push","conflict","eat","fill","formal","jump","kick","opposite","pass","pitch","remote","total","treat","vast","abuse","beat","burn","deposit","print","raise","sleep","somewhere","advance","consist","dark","double","draw","equal","fix","hire","internal","join","kill","sensitive","tap","win","attack","claim","constant","drag","drink","guess","minor","pull","raw","soft","solid","wear","weird","wonder","annual","count","dead","doubt","feed","forever","impress","repeat","round","sing","slide","strip","wish","combine","command","dig","divide","equivalent","hang","hunt","initial","march","mention","spiritual","survey","tie","adult","brief","crazy","escape","gather","hate","prior","repair","rough","sad","scratch","sick","strike","employ","external","hurt","illegal","laugh","lay","mobile","nasty","ordinary","respond","royal","senior","split","strain","struggle","swim","train","upper","wash","yellow","convert","crash","dependent","fold","funny","grab","hide","miss","permit","quote","recover","resolve","roll","sink","slip","spare","suspect","sweet","swing","twist","upstairs","usual","abroad","brave","calm","concentrate","estimate","grand","male","mine","prompt","quiet","refuse","regret","reveal","rush","shake","shift","shine","steal","suck","surround","bear","brilliant","dare","dear","delay","drunk","female","hurry","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];

	var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
	return name;
}

function createMenu(){
   menuTab = createDiv('');
   menuTab.size(squishedleftP*w-(2*gap+originalleftP*w)/3, h);
   menuTab.position(-menuTab.size().width, 0);
   menuTab.id("menuTab");

   createMenuButton();
   menuTab.child(menuButton);

   createLogIn();
   menuTab.child(loginButton);

   createSignup();
   menuTab.child(signupButton);

   createLogout();
   menuTab.child(logoutButton);

   createSettings();
}

function createMenuButton(){
   menuButton = select(".menubuttonwrapper");
   var x = (2*gap+originalleftP*w)/3-gap;
   menuButton.size(x, x*1.5);
   menuButton.position(menuTab.size().width-1, (h/2)-x*0.75);
   menuButton.style('opacity', 1);

   menuButton.mousePressed(menuButtonPressed);
}

function menuButtonPressed(){
   menuOut = !menuOut;
   if(menuOut){
      select("#menubuttonsvg").style('transform', 'rotate(180deg)');
      menuButton.addClass("menubuttonwrapperout");
      menuButton.removeClass("menubuttonwrapperin");
      menuTab.position(0,0);
      leftP = squishedleftP;
   }else{
      select("#menubuttonsvg").style('transform', 'rotate(0deg)');
      menuButton.removeClass("menubuttonwrapperout");
      menuButton.addClass("menubuttonwrapperin");
      menuTab.position(-menuTab.size().width, 0);
      leftP = originalleftP;
   }
   redrawSquares();
}

function createLogIn(){
   loginButton = createButton("Log In");
   loginButton.size(menuTab.size().width*2/3, 50);
   loginButton.position(menuTab.size().width/6, (h/4)-loginButton.size().height-25);
   loginButton.style('font-size', loginButton.size().width/8+"px");
   loginButton.id("login");

   lisumodal = select("#lisuModal");
   lisumodal.size(lisumodalWP*w, 1.618*lisumodalWP*w);
   lisumodal.position((w-lisumodal.size().width)/2, -lisumodal.size().height*2);
   var lms = lisumodal.size();

   lisuTitle = select("#lisuTitle");
   lisuTitle.size(lms.width*3/4, lms.height/8-2*gap);
   lisuTitle.position(lms.width/8, lms.height/8+gap);
   lisuTitle.style('font-size', lisuTitle.size().width/10+"px");

   lisuIn1Label = select("#lisuInp1Label");
   lisuIn1Label.size(lms.width*3/4, lms.height/8-2*gap);
   lisuIn1Label.position(lms.width/8, 2*lms.height/8+gap);
   lisuIn1Label.style('font-size', lisuIn1Label.size().width/12+"px");

   lisuIn1 = select("#lisuIn1");
   lisuIn1.size(lms.width*3/4, lms.height/8-2*gap);
   lisuIn1.position(lms.width/8, 3*lms.height/8+gap);
   lisuIn1.style('font-size', lisuIn1.size().width/15+"px");

   lisuIn2Label = select("#lisuInp2Label");
   lisuIn2Label.size(lms.width*3/4, lms.height/8-2*gap);
   lisuIn2Label.position(lms.width/8, 4*lms.height/8+gap);
   lisuIn2Label.style('font-size', lisuIn2Label.size().width/12+"px");

   lisuIn2 = select("#lisuIn2");
   lisuIn2.size(lms.width*3/4, lms.height/8-2*gap);
   lisuIn2.position(lms.width/8, 5*lms.height/8+gap);
   lisuIn2.style('font-size', lisuIn2.size().width/15+"px");

   lisuCancel = select("#lisuCancel");
   lisuCancel.size(lms.width/7-2*gap, lms.width/7-2*gap);
   lisuCancel.position(lms.width-lisuCancel.size().width-gap, gap);
   lisuCancel.mousePressed(cancelPressed);

   lisuOk = select("#lisuOk");
   lisuOk.size(7*lms.width/8-2*gap, lms.height/10-2*gap);
   lisuOk.position(lms.width/16+gap, 6.5*lms.height/8+gap);

   modalcover = select("#modalCover");
   modalcover.size(w, h);
   modalcover.position(0,0);


   modalcover.mousePressed(()=>{
      cancelPressed();
   });

   loginButton.mousePressed(loginPressed);

   lisuOk.mousePressed(lisuOK);

   // marble = select("#marble");
   // marble.position(-300, 0);
   // marble.size(300, 300);
   // lisumodal.child(marble);
}

function lisuOK(){
   if(clickedLisu=="login"){
      if(lisuIn1.value().length>0 && lisuIn2.value().length>0){
         $.post("/login", {username: lisuIn1.value(), pass:lisuIn2.value()}, (data, status) => {
            if(data.status!=="success"){
               console.log(data.status);
            }else{
               if(data.outcome=="DNE"){ //user does not exist
                  lisuTitle.html("User does not exist!");
               }else if(data.outcome=="exists"){
                  if(data.body){
                     lisuTitle.html("You're in!");
                     document.cookie = `username=${lisuIn1.value()}`;
                     document.cookie = `sessID=${data.sessID}`;
                     mySwatches = data.swatches;
                     logMenuIn();
                     setTimeout(()=>{
                        cancelPressed();
                     },600);
                  }else{
                     lisuTitle.html("Wrong password!");
                  }
               }
            }
         });
      }
   }else if(clickedLisu=="signup"){
      if(lisuIn1.value().length>0 && lisuIn2.value().length>0){
         $.post("/signup", {username: lisuIn1.value(), pass:lisuIn2.value()}, (data, status) => {
            if(data.status!=="success"){
               console.log(data.status);
            }else{
               if(data.body=="you have signed up"){
                  lisuTitle.html("Success!");
                  document.cookie = `username=${lisuIn1.value()}`;
                  document.cookie = `sessID=${data.sessID}`;
                  // checkLoggedIn();
                  // myswatches = data.swatches;
                  // getMySwatches();
                  logMenuIn();
                  setTimeout(()=>{
                     cancelPressed();
                  },600);
               }else{
                  lisuTitle.html("Username taken.");
               }
            }
         });
      }
   }
}

function checkLoggedIn(){
   var c = getCookie("username") && getCookie("sessID");
   if(c){
      $.post("/newSessID", {username: getCookie("username"), sessID:getCookie("sessID")}, (data, status) => {
         if(data.status!=="success"){
            console.log(data.status);
            console.log("yOU ARE BEING LOGGED OUT");
            logMenuOut();
         }else{
            document.cookie = `sessID=${data.sessID}`;
            mySwatches = data.swatches;
            logMenuIn();
         }
      });
   }else{
      logMenuOut();
   }
   return c;
}

function getMySwatches(){
   $.post("/pullSwatches", {username: getCookie("username"), sessID: getCookie("sessID")}, (data, status) => {
      if(data.status!=="success"){
         console.log(data.outcome);
      }else{
         mySwatches = data.body;
      }
   });
}

function updateServerSwatches(){
   $.post("/pushSwatches", {username: getCookie("username"), sessID: getCookie("sessID"), swatchesLength: mySwatches.length, swatches: mySwatches}, (data, status) => {
      if(data.status!=="success"){
         console.log(data.status);
      }else{
         mySwatches = data.body;
      }
   });
}

function logMenuIn(){
   loginButton.position(loginButton.position().x, -Math.abs(loginButton.position().y));
   signupButton.position(signupButton.position().x, -Math.abs(signupButton.position().y));
   logoutButton.position(logoutButton.position().x, h-Math.abs(h-logoutButton.position().y));

   rowLabel.position(menuTab.size().width/4, (h*5/8));
   colLabel.position(menuTab.size().width/4, (h*6/8));
   rowMin.position(rowMin.position().x, (h*5/8));
   rowPlus.position(rowPlus.position().x, (h*5/8));
   colMin.position(colMin.position().x, (h*6/8));
   colPlus.position(colPlus.position().x, (h*6/8));

   addNewSwatch.position(addNewSwatch.position().x, Math.abs(addNewSwatch.position().y));
   swatchLabels.position(swatchLabels.position().x, topP*h);
   if(mySwatches.length>numSwatches2Show){
      downSwatches.position(downSwatches.position().x, Math.abs(downSwatches.position().y));
      upSwatches.position(upSwatches.position().x, Math.abs(upSwatches.position().y));
   }

   yourSwatchesLabel.position(yourSwatchesLabel.position().x, Math.abs(yourSwatchesLabel.position().y));
   if(mySwatches.length!=0){
      yourSwatchesLabel.html("Your Swatches");
      if(mySwatchesElts.length!=mySwatches.length){
         var i = 0;
         while(mySwatchesElts.length<mySwatches.length){
            createNewSwatch(mySwatches[i]);
            i++;
         }
         while(mySwatchesElts.length>mySwatches.length){
            mySwatchesElts[0].remove();
            mySwatchesElts.splice(0, 1);
            var i=0;
            while(i<mySwatches.length){
               mySwatchesElts[i].position(menuTab.size().width/10, gap/2+topP*h+i*mySwatchesElts[i].size().height);
               i++;
            }
         }
      }
      swatchesHead = mySwatchesElts.length-1;
      for(var i = mySwatchesElts.length-1; i>swatchesHead; i--){
         mySwatchesElts[i].position(mySwatchesElts[i].position().x, -mySwatchesElts[i].size().height-100);
      }
      for(var i = swatchesHead; i>=0; i--){
         if(i<=swatchesHead-numSwatches2Show){
            mySwatchesElts[i].position(mySwatchesElts[i].position().x, swatchLabels.size().height+100);
         }else{
            mySwatchesElts[i].position(menuTab.size().width/10, gap/2+(swatchesHead-i)*(mySwatchesElts[i].size().height+gap));
         }
      }
   }
}

function logMenuOut(){
   loginButton.position(loginButton.position().x, Math.abs(loginButton.position().y));
   signupButton.position(signupButton.position().x, Math.abs(signupButton.position().y));
   logoutButton.position(logoutButton.position().x, h+Math.abs(h-logoutButton.position().y));

   rowLabel.position(menuTab.size().width/4, (h*4/6));
   colLabel.position(menuTab.size().width/4, (h*5/6));
   rowMin.position(rowMin.position().x, (h*4/6));
   rowPlus.position(rowPlus.position().x, (h*4/6));
   colMin.position(colMin.position().x, (h*5/6));
   colPlus.position(colPlus.position().x, (h*5/6));

   addNewSwatch.position(addNewSwatch.position().x, -Math.abs(addNewSwatch.position().y));
   downSwatches.position(downSwatches.position().x, -Math.abs(downSwatches.position().y));
   upSwatches.position(upSwatches.position().x, -Math.abs(upSwatches.position().y));

   yourSwatchesLabel.position(yourSwatchesLabel.position().x, -Math.abs(yourSwatchesLabel.position().y));
   swatchLabels.position(swatchLabels.position().x, -swatchLabels.size().height);
   for(var i = 0; i<mySwatchesElts.length; i++){
      mySwatchesElts[i].position(mySwatchesElts[i].position().x, -mySwatchesElts[i].position().y);
   }

   deleteCookie("username");
   deleteCookie("sessID");
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

function cancelPressed(){
   lisumodal.position((w-lisumodal.size().width)/2, -lisumodal.size().height*2);
   modalcover.style("opacity", 0);
   modalcover.style("z-index", -1);
}

function loginPressed(){
   lisuTitle.html("Welcome back!");
   select("#lisuOkInner").html("Log In");
   lisumodal.position((w-lisumodal.size().width)/2, (h-lisumodal.size().height)/2);
   clickedLisu="login";
   lisuIn1.value("");
   lisuIn2.value("");

   modalcover.style("z-index", 3);
   modalcover.style("opacity", 0.9);
}

function createSignup(){
   signupButton = createButton("Sign Up");
   signupButton.size(menuTab.size().width*2/3, 50);
   signupButton.position(menuTab.size().width/6, (h/4)+25);
   signupButton.style('font-size', signupButton.size().width/8+"px");
   signupButton.id("signup");

   signupButton.mousePressed(signupPressed);
}

function signupPressed(){
   lisuTitle.html("Join us!");
   select("#lisuOkInner").html("Sign up");
   lisumodal.position((w-lisumodal.size().width)/2, (h-lisumodal.size().height)/2);
   clickedLisu="signup";
   lisuIn1.value("");
   lisuIn2.value("");

   modalcover.style("z-index", 3);
   modalcover.style("opacity", 0.9);
}

function createSettings(){
   var pw = menuTab.size().width;

   root.style.setProperty('--rowPlusCol', allowedCol);
   root.style.setProperty('--rowMinCol', allowedCol);
   root.style.setProperty('--colPlusCol', allowedCol);
   root.style.setProperty('--colMinCol', allowedCol);

   settingsLabel = select('#settingsLabel');
   settingsLabel.size(pw*2/3, 50);
   settingsLabel.position(pw/6, (h/2));
   settingsLabel.style("font-size", settingsLabel.size().width/8+"px");
   menuTab.child(settingsLabel);

   rowLabel = select('#rowLabel');
   rowLabel.size(pw/2, 30);
   rowLabel.position(pw/4, (h*5/8));
   rowLabel.style("font-size", settingsLabel.size().width/8+"px");
   menuTab.child(rowLabel);

   rowMin = createButton('');
   rowMin.size(pw/8, rowLabel.size().height);
   rowMin.position(rowLabel.position().x-rowMin.size().width, rowLabel.position().y);
   rowMin.id("rowMin");
   menuTab.child(rowMin);

   rowPlus = createButton('');
   rowPlus.size(pw/8, rowLabel.size().height);
   rowPlus.position(rowLabel.position().x+rowLabel.size().width, rowLabel.position().y);
   rowPlus.id("rowPlus");
   menuTab.child(rowPlus);

   colLabel = select('#colLabel');
   colLabel.size(pw/2, 30);
   colLabel.position(pw/4, (h*6/8));
   colLabel.style("font-size", settingsLabel.size().width/8+"px");
   menuTab.child(colLabel);

   colMin = createButton('');
   colMin.size(pw/8, colLabel.size().height);
   colMin.position(colLabel.position().x-colMin.size().width, colLabel.position().y);
   colMin.id("colMin");
   menuTab.child(colMin);

   colPlus = createButton('');
   colPlus.size(pw/8, colLabel.size().height);
   colPlus.position(colLabel.position().x+colLabel.size().width, colLabel.position().y);
   colPlus.id("colPlus");
   menuTab.child(colPlus);

   rowPlus.mousePressed(rowplusPressed);
   rowMin.mousePressed(rowminPressed);
   colPlus.mousePressed(colplusPressed);
   colMin.mousePressed(colminPressed);
}

function rowminPressed(){
   gy = Math.min(Math.max(gy-1, 1), 6);
   root.style.setProperty('--rowPlusCol', allowedCol);
   rowPlus.style('cursor', 'pointer');
   if(gy==1){
      root.style.setProperty('--rowMinCol', preventCol);
      rowMin.style('cursor', 'default');
   }
   redrawSquares();
}

function rowplusPressed(){
   gy = Math.min(Math.max(gy+1, 1), 6);
   root.style.setProperty('--rowMinCol', allowedCol);
   rowMin.style('cursor', 'pointer');
   if(gy==6){
      root.style.setProperty('--rowPlusCol', preventCol);
      rowPlus.style('cursor', 'default');
   }
   myColors.length>=(gx*gy)
   if(page+1>Math.ceil(myColors.length/(gx*gy))){
      page = Math.ceil(myColors.length/(gx*gy))-1;
   }
   redrawSquares();
}

function colplusPressed(){
   gx = Math.min(Math.max(gx+1, 1), 6);
   root.style.setProperty('--colMinCol', allowedCol);
   colMin.style('cursor', 'pointer');
   if(gx==6){
      root.style.setProperty('--colPlusCol', preventCol);
      colPlus.style('cursor', 'default');
   }
   redrawSquares();
}

function colminPressed(){
   gx = Math.min(Math.max(gx-1, 1), 6);
   root.style.setProperty('--colPlusCol', allowedCol);
   colPlus.style('cursor', 'pointer');
   if(gx==1){
      root.style.setProperty('--colMinCol', preventCol);
      colMin.style('cursor', 'default');
   }
   redrawSquares();
}

function createLogout(){
   logoutButton = select("#logoutButton");
   logoutButton.size(menuTab.size().width*2/3, 50);
   logoutButton.position(menuTab.size().width/6, menuTab.size().height*7/8);

   logoutButton.mousePressed(()=>{
      logMenuOut();
   });
}

function keyPressed(){
   if(keyCode===LEFT_ARROW){
      if(lisumodal.position().y<0 && needPages && !swalOpen){
         pressLeft();
      }
   }else if(keyCode===RIGHT_ARROW){
      if(lisumodal.position().y<0 && needPages && !swalOpen){
         pressRight();
      }
   }else if(keyCode===191){//slash
      if(lisumodal.position().y<0 && !swalOpen){
         menuButtonPressed();
      }
   }else if(keyCode===189){//-
      if(lisumodal.position().y<0 && !swalOpen){
         rowminPressed();
      }
   }else if(keyCode===187){//=
      if(lisumodal.position().y<0 && !swalOpen){
         rowplusPressed();
      }
   }else if(keyCode===219){//[
      if(lisumodal.position().y<0 && !swalOpen){
         colminPressed();
      }
   }else if(keyCode===221){//]
      if(lisumodal.position().y<0 && !swalOpen){
         colplusPressed();
      }
   }else if(keyCode===27){//escape
      if(lisumodal.position().y>0){
         cancelPressed();
      }
   }
}

function createYourSwatches(){
   var mtw = menuTab.size().width;
   yourSwatchesLabel = createDiv('No swatches');
   yourSwatchesLabel.size(mtw*2/3, 25);
   yourSwatchesLabel.position(mtw/6, -(topP*h-25));
   yourSwatchesLabel.style('font-size', yourSwatchesLabel.size().width/(yourSwatchesLabel.html().length)+"px");
   yourSwatchesLabel.id("yourSwatchesLabel");
   menuTab.child(yourSwatchesLabel);

   addNewSwatch = select('#addNewSwatch');
   addNewSwatch.size(mtw/2, 30);
   addNewSwatch.position(mtw/4, -((h/2)-addNewSwatch.size().height));
   addNewSwatch.id("addNewSwatch");
   menuTab.child(addNewSwatch);
   addNewSwatch.mousePressed(addAsNew);

   swatchLabels = createDiv('');
   swatchLabels.size(mtw, Math.abs(addNewSwatch.position().y)-topP*h);
   swatchLabels.position(0, -swatchLabels.size().height);
   swatchLabels.id("swatchLabels");
   menuTab.child(swatchLabels);

   downSwatches = select('#downSwatches');
   downSwatches.size(mtw/6, 30);
   downSwatches.position(19*mtw/24, addNewSwatch.position().y);
   menuTab.child(downSwatches);
   downSwatches.mousePressed(()=>{
      if(swatchesHead>=numSwatches2Show){
         swatchesHead-=1;
         for(var i = mySwatchesElts.length-1; i>swatchesHead; i--){
            mySwatchesElts[i].position(mySwatchesElts[i].position().x, -mySwatchesElts[i].size().height-100);
         }
         for(var i = swatchesHead; i>=0; i--){
            if(i<=swatchesHead-numSwatches2Show){
               mySwatchesElts[i].position(mySwatchesElts[i].position().x, swatchLabels.size().height+100);
            }else{
               mySwatchesElts[i].position(menuTab.size().width/10, gap/2+(swatchesHead-i)*(mySwatchesElts[i].size().height+gap));
            }
         }
      }
      if(select("#upSwatchesCircle").hasClass("deniedCircle")){
         select("#upSwatches").toggleClass("pointerCursor");
         select("#upSwatchesCircle").toggleClass("deniedCircle");
         select("#upSwatchesCircle").toggleClass("allowedCircle");
         var lines = selectAll(".upSwatcheslines");
         for(var i = 0; i<lines.length; i++){
            lines[i].toggleClass("showUp");
         }
      }
      if(swatchesHead==numSwatches2Show-1){
         if(select("#downSwatchesCircle").hasClass("allowedCircle")){
            select("#downSwatches").toggleClass("pointerCursor");
            select("#downSwatchesCircle").toggleClass("deniedCircle");
            select("#downSwatchesCircle").toggleClass("allowedCircle");
            var lines = selectAll(".downSwatcheslines");
            for(var i = 0; i<lines.length; i++){
               lines[i].toggleClass("showDown");
            }
         }
      }
   });

   upSwatches = select('#upSwatches');
   upSwatches.size(mtw/6, 30);
   upSwatches.position(mtw/24, addNewSwatch.position().y);
   menuTab.child(upSwatches);
   upSwatches.mousePressed(()=>{
      if(swatchesHead<mySwatchesElts.length-1){
         swatchesHead+=1;
         for(var i = mySwatchesElts.length-1; i>swatchesHead; i--){
            mySwatchesElts[i].position(mySwatchesElts[i].position().x, -mySwatchesElts[i].size().height-100);
         }
         for(var i = swatchesHead; i>=0; i--){
            if(i<=swatchesHead-numSwatches2Show){
               mySwatchesElts[i].position(mySwatchesElts[i].position().x, swatchLabels.size().height+100);
            }else{
               mySwatchesElts[i].position(menuTab.size().width/10, gap/2+(swatchesHead-i)*(mySwatchesElts[i].size().height+gap));
            }
         }
      }
      if(select("#downSwatchesCircle").hasClass("deniedCircle")){
         select("#downSwatches").toggleClass("pointerCursor");
         select("#downSwatchesCircle").toggleClass("deniedCircle");
         select("#downSwatchesCircle").toggleClass("allowedCircle");
         var lines = selectAll(".downSwatcheslines");
         for(var i = 0; i<lines.length; i++){
            lines[i].toggleClass("showDown");
         }
      }
      if(swatchesHead==mySwatchesElts.length-1){
         if(select("#upSwatchesCircle").hasClass("allowedCircle")){
            select("#upSwatches").toggleClass("pointerCursor");
            select("#upSwatchesCircle").toggleClass("deniedCircle");
            select("#upSwatchesCircle").toggleClass("allowedCircle");
            var lines = selectAll(".upSwatcheslines");
            for(var i = 0; i<lines.length; i++){
               lines[i].toggleClass("showUp");
            }
         }
      }
   });

}

function addAsNew(){
   swalOpen = true;
   swal("What should the new swatch's name be?", {
      content: "input"
   })
   .then(name => {
      swalOpen = false;
      if(name){
         yourSwatchesLabel.html("Your Swatches");
         var simpColors = [];
         for(var i=0; i<myColors.length; i++){
            simpColors.push({
               name: myColors[i].name,
               hex: myColors[i].hex
            });
         }
         var newSwatch = {
            name: name,
            colors: simpColors
         };
         mySwatches.push(newSwatch);
         createNewSwatch(newSwatch);
         if(mySwatches.length>numSwatches2Show){
            downSwatches.position(downSwatches.position().x, Math.abs(downSwatches.position().y));
            upSwatches.position(upSwatches.position().x, Math.abs(upSwatches.position().y));
         }
         $.post("/pushSwatches", {username: getCookie("username"), sessID: getCookie("sessID"), swatches: mySwatches}, (data, status) => {
            if(data.status!=="success"){
               console.log(data.status);
            }else{
               mySwatches = data.body;
            }
         });
      }
   });
}

function createNewSwatch(swatch){
   var bw = 0.5;
   var swatchLabel = createDiv('');
   swatchLabel.size(menuTab.size().width*4/5, -gap+(Math.abs(addNewSwatch.position().y)-topP*h)/numSwatches2Show);
   // swatchLabel.position(menuTab.size().width/10, gap/2+topP*h+(mySwatchesElts.length%numSwatches2Show)*(swatchLabel.size().height+gap));
   swatchLabel.position(menuTab.size().width/10, gap/2);
   swatchLabel.addClass('swatchLabel');
   swatchLabels.child(swatchLabel);

   var swatchLabelInner = createDiv('');
   swatchLabelInner.addClass('swatchLabelInner');
   swatchLabel.child(swatchLabelInner);

   var deleteSwatch = createDiv('');
   deleteSwatch.size(swatchLabelInner.size().height*bw, swatchLabelInner.size().height);
   deleteSwatch.position(swatchLabelInner.size().width-deleteSwatch.size().width, 0);
   deleteSwatch.addClass('deleteSwatch');
   swatchLabelInner.child(deleteSwatch);

   var dw = deleteSwatch.size().width;

   var deleteSwatchInner = createDiv('');
   deleteSwatchInner.addClass('deleteSwatchInner');
   deleteSwatchInner.size(dw, dw);
   deleteSwatch.child(deleteSwatchInner);

   var renameSwatch = createDiv('');
   renameSwatch.size(swatchLabelInner.size().height*bw, swatchLabelInner.size().height);
   renameSwatch.position(swatchLabelInner.size().width-renameSwatch.size().width-deleteSwatch.size().width, 0);
   renameSwatch.addClass('renameSwatch');
   swatchLabelInner.child(renameSwatch);

   var renameSwatchInner = createDiv('');
   renameSwatchInner.addClass('renameSwatchInner');
   renameSwatchInner.size(dw, dw);
   renameSwatch.child(renameSwatchInner);

   var duplicateSwatch = createDiv('');
   duplicateSwatch.size(swatchLabelInner.size().height*bw, swatchLabelInner.size().height);
   duplicateSwatch.position(swatchLabelInner.size().width-duplicateSwatch.size().width-renameSwatch.size().width-deleteSwatch.size().width, 0);
   duplicateSwatch.addClass('duplicateSwatch');
   swatchLabelInner.child(duplicateSwatch);

   var duplicateSwatchInner = createDiv('');
   duplicateSwatchInner.addClass('duplicateSwatchInner');
   duplicateSwatchInner.size(dw, dw);
   duplicateSwatch.child(duplicateSwatchInner);

   var appendSwatch = createDiv('');
   appendSwatch.size(swatchLabelInner.size().height*bw, swatchLabelInner.size().height);
   appendSwatch.position(swatchLabelInner.size().width-appendSwatch.size().width-duplicateSwatch.size().width-renameSwatch.size().width-deleteSwatch.size().width, 0);
   appendSwatch.addClass('appendSwatch');
   swatchLabelInner.child(appendSwatch);

   var appendSwatchInner = createDiv('');
   appendSwatchInner.addClass('appendSwatchInner');
   appendSwatchInner.size(dw, dw);
   appendSwatch.child(appendSwatchInner);

   var swatchText = createDiv('');
   swatchText.size(swatchLabelInner.size().width-4*swatchLabelInner.size().height*bw, swatchLabelInner.size().height);
   swatchText.position(0, 0);
   swatchText.addClass('swatchText');
   swatchLabelInner.child(swatchText);

   var swatchTextInner = createDiv(swatch.name);
   swatchTextInner.size(swatchLabelInner.size().width-4*swatchLabelInner.size().height*bw, swatchLabelInner.size().height/2);
   swatchTextInner.position(0, swatchLabelInner.size().height/4);
   swatchTextInner.addClass('swatchTextInner');
   swatchText.child(swatchTextInner);

   // let swatchIndex = mySwatchesElts.length;
   let myElt = swatchLabel;
   myElt.swatchIndex = mySwatchesElts.length;

   swatchTextInner.mousePressed(()=>{
      if(mySwatches[myElt.swatchIndex].colors.length>myColors.length){
         while(mySwatches[myElt.swatchIndex].colors.length>myColors.length){
            AddNewColor(mySwatches[myElt.swatchIndex].colors[myColors.length].name, mySwatches[myElt.swatchIndex].colors[myColors.length].hex);
         }
      }else{
         while(mySwatches[myElt.swatchIndex].colors.length<myColors.length){
            selectedSquare = myColors.length-1;
            removeColor();
         }
      }
      for(var i = 0; i<mySwatches[myElt.swatchIndex].colors.length; i++){
         myColors[i].hex = mySwatches[myElt.swatchIndex].colors[i].hex;
         myColors[i].name = mySwatches[myElt.swatchIndex].colors[i].name;
         var c = color("#"+myColors[i].hex);
         myColors[i].r = red(c);
         myColors[i].g = green(c);
         myColors[i].b = blue(c);
         var fs = getFontSize(name);
         myColors[i].text.style('font-size', fs + "px");
         myColors[i].text.style('color', invertColor(myColors[i].hex));
         myColors[i].square.style('background-color', c);
         myColors[i].text.html(mySwatches[myElt.swatchIndex].colors[i].name);
      }
      selectColor(Math.min(Math.max(parseInt(selectedSquare), 0), myColors.length-1));
      redrawSquares();
   });

   deleteSwatch.mousePressed(()=>{
      swalOpen = true;
      swal("Are you sure you want to delete this swatch?", {
         dangerMode: true,
         buttons: {
            cancel: "Cancel",
            confirm: {value: "OK", text: "Yes"}
         }
      })
      .then(value => {
         swalOpen = false;
         if(value=="OK"){
            var myswatchesempty = (mySwatches.length==1);
            mySwatches.splice(myElt.swatchIndex, 1);
            mySwatchesElts[myElt.swatchIndex].remove();
            mySwatchesElts.splice(myElt.swatchIndex, 1);
            var i = myElt.swatchIndex;
            while(i<mySwatches.length){
               // mySwatchesElts[i].position(menuTab.size().width/10, gap/2+topP*h+i*mySwatchesElts[i].size().height);
               mySwatchesElts[i].swatchIndex = i;
               i++;
            }
            if(swatchesHead>mySwatchesElts.length-1){
               swatchesHead = mySwatchesElts.length-1;
            }else if(swatchesHead<numSwatches2Show){
               swatchesHead = numSwatches2Show;
            }
            for(var i = mySwatchesElts.length-1; i>swatchesHead; i--){
               mySwatchesElts[i].position(mySwatchesElts[i].position().x, -mySwatchesElts[i].size().height-100);
            }
            for(var i = swatchesHead; i>=0; i--){
               if(i<=swatchesHead-numSwatches2Show){
                  mySwatchesElts[i].position(mySwatchesElts[i].position().x, swatchLabels.size().height+100);
               }else{
                  mySwatchesElts[i].position(menuTab.size().width/10, gap/2+(swatchesHead-i)*(mySwatchesElts[i].size().height+gap));
               }
            }
            if(mySwatches.length<=numSwatches2Show){
               downSwatches.position(downSwatches.position().x, -Math.abs(downSwatches.position().y));
               upSwatches.position(upSwatches.position().x, -Math.abs(upSwatches.position().y));
            }
            if(myswatchesempty){
               console.log("swatches is empty");
               yourSwatchesLabel.html("No Swatches");
               mySwatches = [];
               mySwatchesElts = [];
            }
            updateServerSwatches();
         }
      });
   });

   renameSwatch.mousePressed(()=>{
      swalOpen = true;
      swal("To what should the swatch be renamed?", {
         content: "input"
      })
      .then(name => {
         swalOpen = false;
         if(name){
            var elts = document.querySelectorAll('.swatchTextInner');
            for (i = 0; i<elts.length; i++) {
               console.log(elts[i].innerHTML, mySwatches[myElt.swatchIndex].name, elts[i].innerHTML==mySwatches[myElt.swatchIndex].name);
               if(elts[i].innerHTML==mySwatches[myElt.swatchIndex].name){
                  elts[i].innerHTML = name;
                  break;
               }
            }
            mySwatches[myElt.swatchIndex].name=name;
         }
      });
   });

   duplicateSwatch.mousePressed(()=>{
      swalOpen = true;
      swal("What should the duplicate swatch's name be?", {
         content: "input"
      })
      .then(name => {
         swalOpen = false;
         if(name){
            var simpColors = [];
            for(var i=0; i<mySwatches[myElt.swatchIndex].colors.length; i++){
               simpColors.push({
                  name: mySwatches[myElt.swatchIndex].colors[i].name,
                  hex: mySwatches[myElt.swatchIndex].colors[i].hex
               });
            }
            var newSwatch = {
               name: name,
               colors: simpColors
            };
            mySwatches.push(newSwatch);
            createNewSwatch(newSwatch);
            if(mySwatches.length>numSwatches2Show){
               downSwatches.position(downSwatches.position().x, Math.abs(downSwatches.position().y));
               upSwatches.position(upSwatches.position().x, Math.abs(upSwatches.position().y));
            }
            $.post("/pushSwatches", {username: getCookie("username"), sessID: getCookie("sessID"), swatches: mySwatches}, (data, status) => {
               if(data.status!=="success"){
                  console.log(data.status);
               }else{
                  mySwatches = data.body;
               }
            });
         }
      });
   });

   appendSwatch.mousePressed(()=>{
      var swatchColors = mySwatches[myElt.swatchIndex].colors;
      var counter = 0;
      for(var i = 0; i<myColors.length; i++){
         var colorInSwatch = false;
         for(var j = 0; j<swatchColors.length; j++){
            if(myColors[i].hex == swatchColors[j].hex){
               colorInSwatch = true;
               break;
            }
         }
         if(!colorInSwatch){
            counter++;
            mySwatches[myElt.swatchIndex].colors.push({
               name: myColors[i].name,
               hex: myColors[i].hex,
            });
         }
      }
      if(counter==0){
         swal('Did not have any colors to append.');
      }else{
         swal(`Appended ${counter} colors.`);
      }
   });

   mySwatchesElts.push(swatchLabel);
   swatchesHead = mySwatchesElts.length-1;
   for(var i = swatchesHead-1; i>=0; i--){
      if(i<=mySwatchesElts.length-1-numSwatches2Show){
         mySwatchesElts[i].position(mySwatchesElts[i].position().x, swatchLabels.size().height+100);
      }else{
         mySwatchesElts[i].position(menuTab.size().width/10, gap/2+(swatchesHead-i)*(mySwatchesElts[i].size().height+gap));
      }
   }
   if(select("#upSwatchesCircle").hasClass("allowedCircle")){
      select("#upSwatches").toggleClass("pointerCursor");
      select("#upSwatchesCircle").toggleClass("deniedCircle");
      select("#upSwatchesCircle").toggleClass("allowedCircle");
      var lines = selectAll(".upSwatcheslines");
      for(var i = 0; i<lines.length; i++){
         lines[i].toggleClass("showUp");
      }
   }
   updateServerSwatches();
}

//delete, rename, duplicate, append
