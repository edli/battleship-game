import React, { Component } from 'react'

import Cell from '../Cell'

import './index.css'

const cn = require('bem-cn')('Field')

export default class Field extends Component {
  render () {
    const { field } = this.props

    return (
      <div className={cn()}>
        {field.map(this.renderCell)}
      </div>
    )
  }

  renderCell = (value, i) => {
    const { shipsPositions } = this.props

    let type = ''
    if (!value) type = 'fog'
    else if (shipsPositions[i]) type = 'hit'
    else type = 'miss'

    return (
      <Cell key={i} type={type} onClick={() => this.handleCellClick(i)} />
    )
  }

  handleCellClick = idx => {
    const { field, fire, isAllShipsDestroyed } = this.props

    if (!isAllShipsDestroyed && idx !== null & !field[idx]) fire(Number(idx))
  }
}
