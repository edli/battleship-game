import React, { Component } from 'react'
import { Icon, Button, Card } from 'antd'

import './index.css'

const cn = require('bem-cn')('Game')

export default class Game extends Component {
  render () {
    const { isAllShipsDestroyed } = this.props

    return (
      <div className={cn()}>
        <h3 className={cn('title')()}>Battlefield</h3>
        {this.renderField()}
        <h3 className={cn('title')()}>Legend</h3>
        {this.renderLegend()}
        {isAllShipsDestroyed && this.renderNewGame()}
      </div>
    )
  }

  renderLegend () {
    return (
      <ul className={cn('legend')()}>
        <li className={cn('legend-item')()}>
          <div className={cn('cell', { state: 'fog' })()} />
          <span className={cn('legend-text')()}>- Fog of war</span>
        </li>
        <li className={cn('legend-item')()}>
          <div className={cn('cell', { state: 'miss' })()} />
          <span className={cn('legend-text')()}>- Miss</span>
        </li>
        <li className={cn('legend-item')()}>
          <div className={cn('cell', { state: 'hit' })()}>
            <Icon type="exclamation-circle-o" />
          </div>
          <span className={cn('legend-text')()}>- Hit</span>
        </li>
        <li className={cn('legend-item')()}>
          <div className={cn('cell', { state: 'sunk' })()}>
            <Icon type="cross-circle-o" />
          </div>
          <span className={cn('legend-text')()}>- Sunk</span>
        </li>
      </ul>
    )
  }

  renderField () {
    const { field } = this.props
    return (
      <div className={cn('field')()}>
        {field.map(this.renderCell)}
      </div>
    )
  }

  renderCell = (value, i) => {
    const { shipsPositions, destroyedShips, isAllShipsDestroyed } = this.props
    const ship = shipsPositions[i]

    let state = ''
    if (!value) state = isAllShipsDestroyed ? 'miss' : 'fog'
    else if (ship) state = destroyedShips.includes(ship) ? 'sunk' : 'hit'
    else state = 'miss'

    return (
      <div key={i} data-idx={i} className={cn('cell', { state })()} onClick={this.handleCellClick}>
        {state === 'hit' && <Icon type="exclamation-circle-o" />}
        {state === 'sunk' && <Icon type="cross-circle-o" />}
      </div>
    )
  }

  renderNewGame () {
    const { restartGame } = this.props

    return (
      <div className={cn('success')()}>
        <Card title="Mission accomplished!">

          <Button type="primary" onClick={restartGame}>RESTART GAME</Button>
        </Card>
      </div>
    )
  }

  handleCellClick = e => {
    const { field, fire } = this.props

    const idx = e.target.getAttribute('data-idx')
    if (idx !== null & !field[idx]) fire(Number(idx))
  }
}
