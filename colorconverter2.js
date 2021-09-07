"use strict";

window.addEventListener("DOMContentLoaded", start)
//step one --> getting selected color from user

function start(){
    let colorPicker = document.querySelector("input")
    // NOT necessary colorPicker.addEventListener("input", getColor, false)
    colorPicker.addEventListener("change", trackColor, false)
}
/*NOT necessary
 function getColor() {
    let color = document.querySelector("input").value
    console.log(color) // redeclare the variable in the right function so it gets the right color. 
} */

//tracking the changes
function trackColor(event) {
    let currentColor = event.target.value
    transformColorFunc(currentColor)
}

//once selected, taking the hex number
function transformColorFunc(hexNum) {
let rgbNum = transformColorRgb(hexNum);
let hslNum = transformColorHsl(rgbNum);

  displayHex(hexNum);
  displayRgb(rgbNum);
  displayHsl( hslNum);
  displayColor(rgbNum);
}

function transformColorRgb(hexNum) {
//setting the variables
    let hexNumberOnly = hexNum.substring(1) //we remove the hashtag and divide the string into three rgb components
    let redPart = hexNumberOnly.substring(0,2);
    let greenPart = hexNumberOnly.substring(2,4);
    let bluePart = hexNumberOnly.substring(4);
 
    // actual format transformation
    let r = transformRedPart(redPart);
    let g = transformGreenPart(greenPart);
    let b = transformBluePart(bluePart);

    return {r, g, b} // better return an object {r,g,b}
}

//the functions that transform the rgb values to hex go here
function transformRedPart(redPart) {
 const redParsed = parseInt(redPart, 16);
 return redParsed
}
function transformGreenPart(greenPart) {
    const greenParsed = parseInt(greenPart, 16);
 return greenParsed
}
function transformBluePart(bluePart) {
    const blueParsed = parseInt(bluePart, 16);
 return blueParsed
}

function transformColorHsl(rgbNum) {
   
   let r = rgbNum.r
   let g = rgbNum.g
   let b = rgbNum.b
   console.log("R is " + r)
   console.log("G is " + g)
   console.log("B is " + b)

   r/= 255;
   g /= 255;
   b /= 255;
 
   let h, s, l;
 
   const min = Math.min(r,g,b);
   const max = Math.max(r,g,b);
  
   if( max === min ) {
     h = 0;
   } else
   if (max === r) {
     h = 60 * (0 + (g - b) / (max - min) );
   } else
   if (max === g) {
     h = 60 * (2 + (b - r) / (max - min) );
   } else
   if (max === b) {
     h = 60 * (4 + (r - g) / (max - min) );
   }
  
   if (h < 0) {h = h + 360; }
  
   l = (min + max) / 2;
  
   if (max === 0 || min === 1 ) {
     s = 0;
   } else {
     s = (max - l) / ( Math.min(l,1-l));
   }
   // multiply s and l by 100 to get the value in percent, rather than [0,1]
   s *= 100;
   l *= 100;
   //avoid too many decimals
   h = h.toFixed(2)
   s = s.toFixed(2)
   l = l.toFixed(2)

   return h + ", "+ s + "%, "  + l+"%" 
}
function displayHex(hexNum) {
    document.querySelector("#hex p").textContent = hexNum;
}

function displayRgb(rgbNum) {
  let rgbString = `${rgbNum.r}, ${rgbNum.g}, ${rgbNum.b}`
  document.querySelector("#rgb p").textContent = rgbString;
}

function displayHsl(hslNum) {
  document.querySelector("#hsl p").textContent = hslNum;  
}

function displayColor(rgbNum){
  let rgbString = rgbToCss(rgbNum)
document.querySelector("#colordisplay").style.backgroundColor = rgbString
}

function rgbToCss(rgbNum){
  let red = (rgbNum.r).toString()
    console.log (red);
    let green = (rgbNum.g).toString()
    console.log (green);
    let blue = (rgbNum.b).toString()
    console.log (blue)
    return `rgb( ${red}, ${green}, ${blue})` 
}