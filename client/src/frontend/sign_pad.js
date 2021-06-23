import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import call from './service';    
import styles from './styles.module.css'
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
  render () {
  let {trimmedDataURL} = this.state
  return <div className={styles.container}>
    <div className={styles.sigContainer}>
      {console.log("hello")}
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
    </div>
    {trimmedDataURL
      ? <img className={styles.sigImage}
        src={trimmedDataURL} />
      : null}
  </div>
  }
}
export default About;