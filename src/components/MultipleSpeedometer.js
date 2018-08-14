import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactFauxDOM, { withFauxDOM } from 'react-faux-dom'

class Speedometer extends Component {
  static defaultProps = {
    size: 400,
  }

  componentDidMount() {
    const { total, portion, size } = this.props

    const width = size
    const height= size

    const faux = this.props.connectFauxDOM('div', 'chart')

    const svg = d3.select(faux)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const background = g.append('path')
      .datum({ startAngle: this.toAngle(0), endAngle: this.toAngle(1) })
      .style('fill', '#eee')
      .attr('d', this.arc)

    const totalPath = g.append('path')
      .datum({ startAngle: this.toAngle(0), endAngle: this.toAngle(total) })
      .style('fill', '#B3BFB8')
      .attr('d', this.arc)

    const portionPath = g.append('path')
      .datum({ startAngle: this.toAngle(0), endAngle: this.toAngle(portion) })
      .style('fill', '#7E8D85')
      .attr('d', this.arc)

    const value = g.append('text')
      .datum({ endAngle: total })
      .attr('text-anchor', 'middle')
      .attr('y', width / 17 )
      .style('font-family', 'Roboto')
      .style('font-size', width / 6.666666667)
      .text(d3.format('.0%')(total))

    this.changeAngle = (newTotal, newPortion) => {
      totalPath.transition()
          .duration(750)
          .attrTween('d', this.arcTween(this.toAngle(newTotal)))
      portionPath.transition()
          .duration(750)
          .attrTween('d', this.arcTween(this.toAngle(newPortion)))
      value.transition()
          .duration(750)
          .tween('text', this.textTween(newTotal))
      this.props.animateFauxDOM(2000)
    }
  }

  componentDidUpdate(prevProps) {
    const { total, portion } = this.props
    if (prevProps.total != total || prevProps.portion != portion) {
      this.changeAngle(total, portion)
    }
  }

  arc = d3.arc()
    .innerRadius(this.props.size / 4)
    .outerRadius(this.props.size / 2.857142857)

  toAngle(percent) {
    return (percent * 1.35 * Math.PI) + (-0.85 * Math.PI)
  }

  arcTween(newAngle) {
    return d => {
      const interpolate = d3.interpolate(d.endAngle, newAngle)
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
