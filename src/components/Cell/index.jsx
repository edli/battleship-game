import React from 'react'

import './index.css'

const cn = require('bem-cn')('Cell')

const Cell = ({ type, onClick }) => <div className={cn({ type })()} onClick={onClick} />
export default Cell
