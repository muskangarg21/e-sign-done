import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import SignaturePad from 'react-signature-canvas'
import call from './service';    
import styles from './styles.module.css'
//import {getPositionx,getPositiony,getClickPosition,} from './coordinates';
import './coordinates.css';

// function getClickPosition(e,theThing) {
//     var parentPositionx = getPositionx(e.currentTarget);
//     var parentPositiony = getPositiony(e.currentTarget);
//     var xPosition = e.clientX - parentPositionx - (theThing.clientWidth / 2);
//     var yPosition = e.clientY - parentPositiony - (theThing.clientHeight / 2);

//     theThing.style.left = xPosition + "px";
//     theThing.style.top = yPosition + "px";
//   }

class About extends Component {
  state = {trimmedDataURL: null}
  value = {data: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
    call('POST', 'signimage', this.sigPad.getTrimmedCanvas()
    .toDataURL('image/png')).then((result) => {
      console.log('post request result:', result);
    }).catch(err => {
      console.log("conn:", err)
    })
  }
  // getClickPosition = (e, theThing) => {
  //       var parentPositionx = getPositionx(e.currentTarget);
  //       var parentPositiony = getPositiony(e.currentTarget);
  //       var xPosition = e.clientX - parentPositionx - (theThing.clientWidth / 2);
  //       var yPosition = e.clientY - parentPositiony - (theThing.clientHeight / 2);
    
  //       theThing.style.left = xPosition + "px";
  //       theThing.style.top = yPosition + "px";
  //     }

  render () {
    let {trimmedDataURL} = this.state
    // let box= document.querySelector("div.contentContainer");
    // let theThing = document.querySelector("#thing");
    // console.log(box);
    // console.log(theThing);
    // let e={box: box, theThing: theThing};
    // console.log(e);
    // if(box){
    //   let parentPositionx = getPositionx(box);
    //   let parentPositiony = getPositiony(box);
    //   let xPosition = box.clientX - parentPositionx - (theThing.clientWidth / 2);
    //   let yPosition = box.clientY - parentPositiony - (theThing.clientHeight / 2);
    //   theThing.style.left = xPosition + "px";
    //   theThing.style.top = yPosition + "px";
    //   console.log(xPosition);
    //   console.log(yPosition);
    // }
    // if(box){
    //   box.addEventListener("click", getClickPosition(box, theThing), false);
    // }
    return <div className={styles.container}>
      <div className={styles.sigContainer}>
        <SignaturePad canvasProps={{className: styles.sigPad}}
          ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div>
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Submit
        </button>
        {/* <div className="contentContainer">
          <img id="thing" alt="the thing" height="6" src="//www.kirupa.com/images/smiley_red.png" width="7"/>
        </div> */}
        {/* <div>{getPositionx(box) }</div>
        <div>{getPositiony(box) }</div> */}
      </div>
      {trimmedDataURL
        ? <img className={styles.sigImage}
          src={trimmedDataURL} />
        : null}
    </div>
  }
}
export default About;