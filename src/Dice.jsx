import React, { Component } from 'react'
import Die from './Die'

class Dice extends Component {
  render() {
    return (
      <div className="flex justify-between w-full mb-6 mt-6">
        {this.props.dice.map((d, idx) => (
          <Die
            handleClick={this.props.handleClick}
            val={d}
            locked={this.props.locked[idx]}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    )
  }
}

export default Dice