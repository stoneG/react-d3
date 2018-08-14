import React, { Component } from 'react'
import _ from 'lodash'

import Ring from './components/Ring'
import Speedometer from './components/Speedometer'
import MultipleSpeedometer from './components/MultipleSpeedometer'

import './App.css'

class App extends Component {
  state = {
    ring: 0.47,
    ring2: 0.36,
    ring3: 0.52,

    speed: 0.39,
    speed2: 0.59,
    speed3: 0.44,

    mspeed: 0.42,
    mspeed2: 0.55,
    mspeed3: 0.49,
  }

  getRandomInt = (max) => {
    return Math.ceiling(Math.random() * 100)
  }

  setRandomStream = (component, lower, upper, floating) => {
    return () => {
      this.setState({ [component]: _.random(lower, upper, floating) })
    }
  }

  toggleStream = (component) => {
    const intervalId = `${component}Stream`
    if (!this[intervalId]) {
      this[intervalId] = setInterval(this.setRandomStream(component, 0.4, 0.6, true), 1000)
    } else {
      clearInterval(this[intervalId])
      this[intervalId] = undefined
    }
  }

  render() {
    const { ring, ring2, ring3 } = this.state
    const { speed, speed2, speed3 } = this.state
    const { mspeed, mspeed2, mspeed3 } = this.state

    return (
      <div className="container">
        <h1 className="title">React & d3 d3mo</h1>
        <div className="viz-type">
          <div className="viz-container">
            <Ring angle={ring} size={200} />
            <button onClick={this.toggleStream.bind(this, 'ring')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <Ring angle={ring2} size={200} />
            <button onClick={this.toggleStream.bind(this, 'ring2')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <Ring angle={ring3} size={200} />
            <button onClick={this.toggleStream.bind(this, 'ring3')}>Toggle Data Stream</button>
          </div>
        </div>
        <div className="viz-type">
          <div className="viz-container">
            <Speedometer angle={speed} size={200} />
            <button onClick={this.toggleStream.bind(this, 'speed')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <Speedometer angle={speed2} size={200} />
            <button onClick={this.toggleStream.bind(this, 'speed2')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <Speedometer angle={speed3} size={200} />
            <button onClick={this.toggleStream.bind(this, 'speed3')}>Toggle Data Stream</button>
          </div>
        </div>
        <div className="viz-type">
          <div className="viz-container">
            <MultipleSpeedometer angle={mspeed} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <MultipleSpeedometer angle={mspeed2} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed2')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <MultipleSpeedometer angle={mspeed3} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed3')}>Toggle Data Stream</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
