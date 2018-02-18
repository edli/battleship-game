import React from 'react'
import { Card, Button } from 'antd'

import './index.css'

const cn = require('bem-cn')('Success')

const Success = ({ restartGame }) => (
  <div className={cn()}>
    <Card title="Mission accomplished!">
      <Button type="primary" onClick={restartGame}>RESTART GAME</Button>
    </Card>
  </div>
)

export default Success
