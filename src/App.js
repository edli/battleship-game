import React from 'react'
import { connect } from 'react-redux'

import { isAllShipsDestroyed } from './store/game'

import Field from './containers/field'
import Stats from './containers/stats'
import Success from './containers/success'

import './App.css'

const cn = require('bem-cn')('App')

const App = ({ isAllShipsDestroyed }) => {
  return (
    <div className={cn()}>
      <Field />
      <Stats />
      {isAllShipsDestroyed && <Success />}
    </div>
  )
}

const mapStateToProps = state => ({
  isAllShipsDestroyed: isAllShipsDestroyed(state),
})

export default connect(mapStateToProps)(App)
