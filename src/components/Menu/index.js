import React from 'react'
import { Button } from 'antd'

const cn = require('bem-cn')('menu')

const Menu = ({ startNewGame }) => {
  return (
    <ul className={cn()}>
      <li>
        <Button type='primary' onClick={startNewGame}>START NEW GAME</Button>
      </li>
    </ul>
  )
}

export default Menu
