import React, { Component } from 'react'

import {
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from 'react-icons/bs'

import './styles/Die.css'

class Die extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.handleClick(this.props.idx)
  }

  icon() {
    const { val } = this.props
    if (val === 1) return <BsDice1Fill />
    if (val === 2) return <BsDice2Fill />
    if (val === 3) return <BsDice3Fill />
    if (val === 4) return <BsDice4Fill />
    if (val === 5) return <BsDice5Fill />
    if (val === 6) return <BsDice6Fill />
  }

  render() {
    const { locked, val, disabled } = this.props

    return (
      <label
        className={`Die text-5xl flex ${locked && 'Die-locked'}`}
        // optional cursor style for disabled buttons
        // disabled={disabled}
      >
        <button onClick={this.handleClick} className="w-fit h-fit"></button>
        {this.icon(val)}
      </label>
    )
  }
}

export default Die
