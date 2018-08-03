import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactFauxDOM, { withFauxDOM } from 'react-faux-dom'

import '../styles/Ring.css'

class Ring extends Component {

  componentDidMount() {
    const { angle } = this.props

    const faux = this.props.connectFauxDOM('div', 'chart')
    const width = 400
    const height = 400

    const tau = 2 * Math.PI
    const svg = d3.select(faux)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const background = g.append('path')
      .datum({ endAngle: tau })
      .style('fill', '#ddd')
      .attr('d', this.arc)

    const foreground = g.append('path')
      .datum({ endAngle: angle * tau })
      .style('fill', '#46ACC2')
      .attr('d', this.arc)

    this.changeAngle = (newAngle) => {
      foreground.transition()
          .duration(750)
          .attrTween('d', this.arcTween(newAngle * tau))
      this.props.animateFauxDOM(2000)
    }
  }

  componentDidUpdate(prevProps) {
    const { angle } = this.props
    if (prevProps.angle != angle) {
      this.changeAngle(angle)
    }
  }

  arc = d3.arc()
    .innerRadius(100)
    .outerRadius(140)
    .startAngle(0)

  arcTween(newAngle) {
    return (d) => {
      var interpolate = d3.interpolate(d.endAngle, newAngle)
      return (t) => {
        d.endAngle = interpolate(t)
        return this.arc(d)
      }
    }
  }

  render() {
    return <div>
      {this.props.chart}
    </div>
  }
}

export default withFauxDOM(Ring)
