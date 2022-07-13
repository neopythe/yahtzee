import React, { Component } from 'react'

export default class TotalRow extends Component {
  render() {
    const bonus = this.props.bonus ? 35 : 0
    const score = Object.values(this.props.scores).reduce(
      (prev, curr) => prev + curr,
      0
    )
    const total = bonus + score

    return (
      <tr className="flex justify-end gap-1">
        {bonus > 0 && <td>{score} + bonus (35) =</td>}
        <td className="font-semibold">{total}</td>
      </tr>
    )
  }
}
