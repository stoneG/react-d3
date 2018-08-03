import React, { Component } from 'react'

import Ring from './components/Ring'

import './App.css'

class App extends Component {
  state = {
    ring: 0.47,
  }

  getRandomInt = (max) => {
    return Math.ceiling(Math.random() * 100)
  }

  randomize = (component) => {
    switch (component) {
      case 'ring':
        this.setState({ ring: Math.random() })
    }
  }

  render() {
    const { ring } = this.state

    return (
      <div className="container">
        <h1 className="title">React & d3 d3mo</h1>
        <Ring angle={ring} />
        <button onClick={this.randomize.bind(this, 'ring')}>Randomize Data</button>
      </div>
    )
  }
}

export default App
