import React, { Component } from 'react'

import {
  ones,
  twos,
  threes,
  fours,
  fives,
  sixes,
  threeOfKind,
  fourOfKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from './Rules'
import RuleRow from './RuleRow'
import TotalRow from './TotalRow'

class ScoreTable extends Component {
  render() {
    const { scores, doScore, highScore, total } = this.props

    let newHighScore = false
    if (this.props.total > this.props.highScore) {
      this.props.updateHighScore(this.props.total)
      newHighScore = true
    }

    const scoresUpper = [
      scores.ones,
      scores.twos,
      scores.threes,
      scores.fours,
      scores.fives,
      scores.sixes,
    ]

    const scoresLower = [
      scores.threeOfKind,
      scores.fourOfKind,
      scores.fullHouse,
      scores.smallStraight,
      scores.largeStraight,
      scores.yahtzee,
      scores.chance,
    ]

    const bonus = scoresUpper.reduce((prev, curr) => prev + curr, 0) >= 63

    return (
      <div className="card-body w-full -mt-2">
        <section>
          <h2 className="font-semibold mb-4 underline underline-offset-[8px] decoration-green-400">
            upper
          </h2>
          <table cellSpacing="0" className="w-full text-sm lowercase">
            <tbody className="scoreTable">
              <RuleRow
                name="Ones"
                score={scores.ones}
                doScore={(evt) => doScore('ones', ones.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Twos"
                score={scores.twos}
                doScore={(evt) => doScore('twos', twos.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Threes"
                score={scores.threes}
                doScore={(evt) => doScore('threes', threes.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Fours"
                score={scores.fours}
                doScore={(evt) => doScore('fours', fours.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Fives"
                score={scores.fives}
                doScore={(evt) => doScore('fives', fives.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Sixes"
                score={scores.sixes}
                doScore={(evt) => doScore('sixes', sixes.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <TotalRow bonus={bonus} scores={scoresUpper} />
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="font-semibold mb-4 underline underline-offset-[8px] decoration-green-400">
            lower
          </h2>
          <table cellSpacing="0" className="w-full text-sm lowercase">
            <tbody className="scoreTable">
              <RuleRow
                name="Three of a Kind"
                score={scores.threeOfKind}
                doScore={(evt) => doScore('threeOfKind', threeOfKind.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Four of a Kind"
                score={scores.fourOfKind}
                doScore={(evt) => doScore('fourOfKind', fourOfKind.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Full House"
                score={scores.fullHouse}
                doScore={(evt) => doScore('fullHouse', fullHouse.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Small Straight"
                score={scores.smallStraight}
                doScore={(evt) =>
                  doScore('smallStraight', smallStraight.evalRoll)
                }
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Large Straight"
                score={scores.largeStraight}
                doScore={(evt) =>
                  doScore('largeStraight', largeStraight.evalRoll)
                }
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Yahtzee"
                score={scores.yahtzee}
                doScore={(evt) => doScore('yahtzee', yahtzee.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <RuleRow
                name="Chance"
                score={scores.chance}
                doScore={(evt) => doScore('chance', chance.evalRoll)}
                disableRow={this.props.disableRow}
              />
              <TotalRow scores={scoresLower} />
            </tbody>
          </table>
        </section>
        <section className="flex justify-between mt-2">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-yellow-500">
              {newHighScore ? total : highScore}
            </span>
            <h2 className="font-semibold">high score</h2>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">
              {newHighScore ? '🔥🏆🔥' : 'total'}
            </h2>
            <span
              className={`font-bold text-lg ${
                newHighScore ? 'text-orange-500' : 'text-green-500'
              }`}
            >
              {bonus ? 35 + total : total}
            </span>
          </div>
        </section>
      </div>
    )
  }
}

export default ScoreTable
