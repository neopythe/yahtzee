import React, { Component } from 'react'
import './styles/RuleRow.css'

class RuleRow extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt) {
    if (!evt.target.classList.contains('RuleRow-disabled')) {
      this.props.doScore()
      this.props.disableRow(evt.target)
    }
  }

  render() {
    return (
      <tr
        className={`flex justify-between w-full border-b border-sky-200 pt-1 ${
          this.props.name === 'Yahtzee' && 'yahtzee'
        }`}
        onClick={this.handleClick}
      >
        <td className="pointer-events-none">{this.props.name}</td>
        <td className="pointer-events-none">{this.props.score}</td>
      </tr>
    )
  }
}

export default RuleRow
