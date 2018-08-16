import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import ReactFauxDOM, { withFauxDOM } from 'react-faux-dom'

class MultipleSpeedometer extends Component {
  static defaultProps = {
    size: 400,
  }

  componentDidMount() {
    const { data, size } = this.props

    const width = size
    const height= size
    const total = _.sumBy(data.slice(0, -1), x => x.amount)

    const faux = this.props.connectFauxDOM('div', 'chart')

    const colors = ['#7E8D85', '#B3BFB8', '#eee']

    const svg = d3.select(faux)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

    const pie = d3.pie()
      .value(d => d.amount)
      .sort(null)

    let path = svg.datum(data).selectAll('path')
        .data((a, b, c) => pie(a, b, c).map(this.transfromFromPie))

    path.exit().remove()

    path = path.enter().append('path')
        .attr('fill', (d, i) => colors[i])
        .attr('d', (a, b, c) => {
          return this.arc(a, b, c)
        })
        .each(d => { this._current = d })
      .merge(path)

    const value = svg.append('text')
      .datum({ endAngle: total })
      .attr('text-anchor', 'middle')
      .attr('y', width / 17 )
      .style('font-family', 'Roboto')
      .style('font-size', width / 6.666666667)
      .text(d3.format('.0%')(total))

    this.changeAngle = (newData) => {
      path = path.datum(newData).data((a, b, c) => pie(a, b, c).map(this.transfromFromPie))
      // TODO
      // path.transition()
      //   .duration(750)
      //   .attrTween('d', this.arcTween(this.toAngle()))
      // totalPath.transition()
      //     .duration(750)
      //     .attrTween('d', this.arcTween(this.toAngle(newTotal)))
      // portionPath.transition()
      //     .duration(750)
      //     .attrTween('d', this.arcTween(this.toAngle(newPortion)))
      value.transition()
          .duration(750)
          .tween('text', this.textTween(_.sumBy(newData.slice(0, -1), d => d.amount)))
      this.props.animateFauxDOM(2000)
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if (!_.isEqual(prevProps.data, data)) {
      this.changeAngle(data)
    }
  }

  arc = d3.arc()
    .innerRadius(this.props.size / 4)
    .outerRadius(this.props.size / 2.857142857)

  toAngle(percent) {
    return (percent * 1.35 * Math.PI) + (-0.85 * Math.PI)
  }

  transfromFromPie = (data) => {
    return {
      ...data,
      startAngle: this.toAngle(data.startAngle / (2 * Math.PI)),
      endAngle: this.toAngle(data.endAngle / (2 * Math.PI)),
    }
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

export default withFauxDOM(MultipleSpeedometer)
