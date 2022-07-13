import React, { Component } from 'react'

import { IoMdRefreshCircle } from 'react-icons/io'

import logo from './images/yahtzee-logo.png'

import Dice from './Dice'
import ScoreTable from './ScoreTable'

const NUM_DICE = 5
const NUM_ROLLS = 3

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dice: Array.from(
        { length: NUM_DICE },
        () => Math.floor(Math.random() * 6) + 1
      ),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfKind: null,
        fourOfKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null,
      },
      highScore: JSON.parse(localStorage.getItem('highScore')) ?? 0,
    }
    this.baseState = this.state

    this.roll = this.roll.bind(this)
    this.disableRow = this.disableRow.bind(this)
    this.doScore = this.doScore.bind(this)
    this.enableRows = this.enableRows.bind(this)
    this.refresh = this.refresh.bind(this)
    this.toggleLocked = this.toggleLocked.bind(this)
    this.total = this.total.bind(this)
    this.updateHighScore = this.updateHighScore.bind(this)
  }

  componentDidMount() {
    this.roll()
    this.setState({ rollsLeft: 2 })
  }

  updateHighScore(newHighScore) {
    const storedHighScore = JSON.parse(localStorage.getItem('highScore'))
    if (newHighScore > storedHighScore) {
      localStorage.setItem('highScore', JSON.stringify(newHighScore))
      return newHighScore
    }
    return storedHighScore
  }

  refresh() {
    this.setState({
      ...this.baseState,
      highScore: this.updateHighScore(this.total()),
    })
    this.componentDidMount()
    this.enableRows()
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.floor(Math.random() * 6) + 1
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }))
  }

  enableRows() {
    const tables = Object.values(document.getElementsByClassName('scoreTable'))
    tables.forEach((table) => {
      Object.values(table.children).forEach((child) => {
        child.classList.remove('RuleRow-disabled')
      })
    })
  }

  disableRow(row) {
    this.setState({
      highScore: this.updateHighScore(this.total()),
    })
    row.classList.add('RuleRow-disabled')
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }))
    this.roll()
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft < 1) return
    this.setState((st) => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1),
      ],
    }))
  }

  total() {
    return Object.values(this.state.scores).reduce(
      (prev, curr) => prev + curr,
      0
    )
  }

  render() {
    const gameOver = !Object.values(this.state.scores).includes(null)

    return (
      <div className="flex flex-col justify-center items-center rounded-lg overflow-hidden bg-white shadow-2xl w-96 select-none">
        <header className="card-body bg-sky-500 w-full">
          {/* <h1 className="font-bold text-5xl text-white">Yahtzee!</h1> */}
          <div className="w-2/3 mx-auto">
            <img src={logo} alt="Yahtzee logo" />
          </div>
          <Dice
            dice={this.state.dice}
            locked={gameOver ? Array(NUM_DICE).fill(true) : this.state.locked}
            handleClick={this.toggleLocked}
            disabled={this.state.rollsLeft < 1}
          />
          <div className="flex justify-center w-full relative">
            <button
              className="btn btn-sm lowercase bg-green-500 hover:bg-green-400 text-white border-none px-12 font-bold"
              disabled={this.state.rollsLeft < 1 || gameOver}
              onClick={this.roll}
            >
              {this.state.rollsLeft} roll{this.state.rollsLeft !== 1 && 's'}{' '}
              left
            </button>
            <IoMdRefreshCircle
              onClick={this.refresh}
              className="absolute bottom-0 left-0 text-white hover:text-green-100 text-2xl cursor-pointer"
            />
          </div>
        </header>
        <ScoreTable
          dice={this.state.dice}
          doScore={this.doScore}
          scores={this.state.scores}
          total={this.total()}
          disableRow={this.disableRow}
          highScore={this.state.highScore}
          updateHighScore={this.updateHighScore}
          gameOver={gameOver}
        />
      </div>
    )
  }
}

export default Game
