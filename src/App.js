import React, { Component } from 'react'
import _ from 'lodash'

import Ring from './components/Ring'

import './App.css'

class App extends Component {
  state = {
    ring: 0.47,
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
    switch (component) {
      case 'ring':
        if (!this.ringStream) {
          this.ringStream = setInterval(this.setRandomStream(component, 0, 1, true), 1000)
        } else {
          clearInterval(this.ringStream)
        }
    }
  }

  render() {
    const { ring } = this.state

    return (
      <div className="container">
        <h1 className="title">React & d3 d3mo</h1>
        <Ring angle={ring} />
        <button onClick={this.toggleStream.bind(this, 'ring')}>{!this.ringStream ? 'Start' : 'Stop'} Data Stream</button>
      </div>
    )
  }
}

export default App
