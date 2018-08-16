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

    mspeed: [{ name: 'kiki', amount: 0.42}, { name: 'other', amount: 0.18 }, { name: 'remaining', amount: 0.4 }],
    mspeed2: [{ name: 'kb', amount: 0.4}, { name: 'other', amount: 0.15 }, { name: 'remaining', amount: 0.45 }],
    mspeed3: [{ name: 'resha', amount: 0.3}, { name: 'other', amount: 0.19 }, { name: 'remaining', amount: 0.51 }],
  }

  getRandomInt = (max) => {
    return Math.ceiling(Math.random() * 100)
  }

  setRandomStream = (component, lower, upper, floating) => {
    return () => {
      this.setState({ [component]: _.random(lower, upper, floating) })
    }
  }

  setMSpeed = (component) => {
    const names = ['kiki', 'kb', 'resha', 'jt']
    return () => {
      const rand = Math.random()
      if (rand < 0.75) {
        this.setState(({ [component]: [oldLady] }) => {
          const lady = { ...oldLady, amount: _.random(0.2, 0.3, true) }
          const other = { name: 'other', amount: _.random(0.2, 0.3, true) }
          const remaining = { name: 'remaining', amount: 1 - lady.amount - other.amount }
          return { [component]: [lady, other, remaining] }
        })
      } else {
        this.setState(() => {
          const lady = { name: _.sample(names), amount: _.random(0.2, 0.3, true) }
          const other = { name: 'other', amount: _.random(0.2, 0.3, true) }
          const remaining = { name: 'remaining', amount: 1 - lady.amount - other.amount }
          return { [component]: [lady, other, remaining] }
        })
      }
    }
  }

  toggleStream = (component) => {
    const intervalId = `${component}Stream`
    if (!this[intervalId]) {
      if (_.startsWith(component, 'mspeed')) {
        this[intervalId] = setInterval(this.setMSpeed(component), 1000)
      } else {
        this[intervalId] = setInterval(this.setRandomStream(component, 0.4, 0.6, true), 1000)
      }
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
            <MultipleSpeedometer data={mspeed} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <MultipleSpeedometer data={mspeed2} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed2')}>Toggle Data Stream</button>
          </div>
          <div className="viz-container">
            <MultipleSpeedometer data={mspeed3} size={200} />
            <button onClick={this.toggleStream.bind(this, 'mspeed3')}>Toggle Data Stream</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
