import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactFauxDOM, { withFauxDOM } from 'react-faux-dom'

import '../styles/Speedometer.css'

class Speedometer extends Component {
  static defaultProps = {
    size: 400,
  }

  componentDidMount() {
    const { angle, size } = this.props

    const width = size
    const height= size

    const faux = this.props.connectFauxDOM('div', 'chart')

    const tau = 0.65 * Math.PI
    const svg = d3.select(faux)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const background = g.append('path')
      .datum({ startAngle: -0.65 * Math.PI, endAngle: tau })
      .style('fill', '#ddd')
      .attr('d', this.arc)

    const foreground = g.append('path')
      .datum({ startAngle: -0.65 * Math.PI, endAngle: (angle * 1.3 * Math.PI) + (-0.65 * Math.PI) })
      // .datum({ startAngle: -0.65 * Math.PI, endAngle: 0.01 })
      .style('fill', '#4F5165')
      .attr('d', this.arc)

    const value = g.append('text')
      .datum({ endAngle: angle })
      .attr('text-anchor', 'middle')
      .attr('y', width / 5 )
      .style('font-family', 'Roboto')
      .style('font-size', width / 6.666666667)
      .text(d3.format('.0%')(angle))

    this.changeAngle = (newAngle) => {
      foreground.transition()
          .duration(750)
          .attrTween('d', this.arcTween(newAngle * 1.3 * Math.PI))
      value.transition()
          .duration(750)
          .tween('text', this.textTween(newAngle))
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
    .innerRadius(this.props.size / 4)
    .outerRadius(this.props.size / 2.857142857)

  arcTween(newAngle) {
    return d => {
      const interpolate = d3.interpolate(d.endAngle, newAngle - 0.65 * Math.PI)
      return (t) => {
        d.endAngle = interpolate(t)
        return this.arc(d)
      }
    }
  }

  textTween(newAngle) {
    return function(d) {
      const node = this
      const interpolate = d3.interpolate(d.endAngle, newAngle)
      return function(t) {
        d.endAngle = interpolate(t)
        d3.select(node).text(d3.format('.0%')(d.endAngle))
      }
    }
  }

  render() {
    return <div>
      {this.props.chart}
    </div>
  }
}

export default withFauxDOM(Speedometer)
