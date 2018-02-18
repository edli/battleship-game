import React, { Component } from 'react'

import Ship from '../Ship'

import './index.css'

const cn = require('bem-cn')('Stats')

export default class Stats extends Component {
  render () {
    return (
      <div className={cn()}>
        {this.renderPlayers()}
        {this.renderShips()}
      </div>
    )
  }

  renderPlayers () {
    const { score } = this.props

    return (
      <div className={cn('players')()}>
        {this.renderPlayer('player 1', String(score).padStart(2, '0'))}
        {this.renderPlayer('player 2', '00')}
      </div>
    )
  }

  renderPlayer (name, score) {
    return (
      <div className={cn('player')()}>
        <span className={cn('player-score')()}>{score}</span>
        <hr className={cn('player-delimiter')()}/>
        <span className={cn('player-name')()}>{name}</span>
      </div>
    )
  }

  renderShips () {
    const { ships } = this.props

    return (
      <div className={cn('ships')()}>
        {ships.map(this.renderShip)}
      </div>
    )
  }

  renderShip = ship => {
    return (
      <Ship key={ship.id} {...ship} />
    )
  }
}
