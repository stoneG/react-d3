import React, { Component } from 'react'

import Ring from './components/Ring'

import './App.css'

class App extends Component {
  state = {
    ring: 47,
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
        <h1 className="title">CAM d3 d3mo</h1>
        <Ring angle={ring} />
        <p onClick={this.randomize.bind(this, 'ring')}>Randomize Data</p>
      </div>
    )
  }
}

export default App
