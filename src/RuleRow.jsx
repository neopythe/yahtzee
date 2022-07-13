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
    const { score, name, doScore } = this.props
    const disabled = score !== null

    return (
      <tr
        className={`flex justify-between w-full border-b border-sky-200 pt-1 ${
          name === 'Yahtzee' && 'yahtzee'
        }`}
        // setting styles dynamically within component
        // className={`RuleRow RuleRow-${disabled ? 'disabled' : 'active'}`}
        onClick={this.handleClick}
        // alternative (simple) solution:
        // onClick={disabled ? null : doScore}
      >
        <td className="pointer-events-none">{name}</td>
        <td className="pointer-events-none">{score}</td>
      </tr>
    )
  }
}

export default RuleRow
