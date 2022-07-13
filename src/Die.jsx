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
    if (this.props.val === 1) return <BsDice1Fill />
    if (this.props.val === 2) return <BsDice2Fill />
    if (this.props.val === 3) return <BsDice3Fill />
    if (this.props.val === 4) return <BsDice4Fill />
    if (this.props.val === 5) return <BsDice5Fill />
    if (this.props.val === 6) return <BsDice6Fill />
  }

  render() {
    return (
      <label
        className="Die text-5xl flex"
        style={{ opacity: this.props.locked ? '0.2' : '1' }}
      >
        <button onClick={this.handleClick} className="w-fit h-fit"></button>
        {this.icon(this.props.val)}
      </label>
    )
  }
}

export default Die
