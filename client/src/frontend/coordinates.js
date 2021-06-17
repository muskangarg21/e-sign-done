// function getPositionx(el) {
//     var xPosition = 0;
//     // var yPosition = 0;
   
//     while (el) {
//       if (el.tagName == "BODY") {
//         // deal with browser quirks with body/window/document and page scroll
//         var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
//         // var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
   
//         xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
//         //yPosition += (el.offsetTop - yScrollPos + el.clientTop);
//       } else {
//         xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//         //yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
//       }
//       console.log(xPosition);
//       el = el.offsetParent;
//     }
//     return {
//        xPosition,
//     //   y: yPosition
//     };
//   }
// function getPositiony(el) {
//     // var xPosition = 0;
//     var yPosition = 0;

//     while (el) {
//         if (el.tagName == "BODY") {
//         // deal with browser quirks with body/window/document and page scroll
//         //var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
//         var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

//         //xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
//         yPosition += (el.offsetTop - yScrollPos + el.clientTop);
//         } else {
//         //xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
//         yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
//         }

//         el = el.offsetParent;
//     }
// return {
//     // [x: xPosition , y: yPosition].join('-');
// //   x: xPosition,
//    yPosition
// };
// }
// function getClickPosition(e,theThing) {
//     var parentPositionx = getPositionx(e.currentTarget);
//     var parentPositiony = getPositiony(e.currentTarget);
//     var xPosition = e.clientX - parentPositionx - (theThing.clientWidth / 2);
//     var yPosition = e.clientY - parentPositiony - (theThing.clientHeight / 2);

//     theThing.style.left = xPosition + "px";
//     theThing.style.top = yPosition + "px";
//   }
// module.exports = {
//     getPositionx,
//     getPositiony,
//     getClickPosition,

// }

// import React, { Component } from 'react'
// import './coordinates.css';

// class Coord extends Component {
//     render () {
//         // let centerX = document.documentElement.clientWidth / 2;
//         // let centerY = document.documentElement.clientHeight / 2;
        
//         // let elem = document.elementFromPoint(centerX, centerY);
//         // elem.style.background = "red";
//         // // if the coordinates happen to be out of the window, then elem = null
//         // elem.style.background = ''; // Error!\
//         // alert(elem.tagName);
//         // console.log(elem.tagName);
//         // console.log(centerX);
//         // console.log(centerY);
//         let box= document.querySelector("div.box");
//         console.log(box);
//         // const rect = box.getBoundingClientRect();
//         // console.log(rect);
//         // let centerX = document.documentElement.clientWidth / 2;
//         // let centerY = document.documentElement.clientHeight / 2;

//         // let elem = document.elementFromPoint(centerX, centerY);

//         // elem.style.background = "red";
//         // alert(elem.tagName);
//         // console.log(elem.tagName);
//         // console.log(centerX);
//         // console.log(centerY);

  
//         return <div className="box"></div>
//         } 
// }
//   export default Coord