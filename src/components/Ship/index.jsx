import React, { Component } from 'react'

import './index.css'
import destroyerImage from './images/destroyer.png'
import battleshipImage from './images/battleship.png'
import carrierImage from './images/carrier.png'
import cruiserImage from './images/cruiser.png'
import submarineImage from './images/submarine.png'
import missImage from './images/miss.png'
import hitImage from './images/hit.png'

const cn = require('bem-cn')('Ship')

const SHIP_IMAGES = {
  destroyer: destroyerImage,
  battleship: battleshipImage,
  carrier: carrierImage,
  cruiser: cruiserImage,
  submarine: submarineImage,
}

export default class Ship extends Component {
  render () {
    const { ship } = this.props

    return (
      <div className={cn()}>
        <img className={cn('image')()} src={SHIP_IMAGES[ship]} alt={`${ship} ship`} />
        {this.renderLives()}
      </div>
    )
  }

  renderLives () {
    const { lives } = this.props

    return (
      <ul className={cn('lives')()}>
        {Array.from({ length: lives }).map(this.renderLife)}
      </ul>
    )
  }

  renderLife = (_, i) => {
    const { hits } = this.props

    return (
      <li key={i} className={cn('life')()}>
        <img className={cn('life-image')()} src={i < hits ? hitImage : missImage} alt="ship life"/>
      </li>
    )
  }
}
