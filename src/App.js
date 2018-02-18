import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import { isRunning } from './store/game'

import Game from './containers/game'
import Menu from './containers/menu'

import './App.css'

const cn = require('bem-cn')('App')

const App = ({ isRunning }) => {
  return (
    <Layout className={cn()}>
      <Layout.Header className={cn('header')()}>Battleship game</Layout.Header>
      <Layout.Content className={cn('content')()}>
        {isRunning ? <Game /> : <Menu />}
      </Layout.Content>
    </Layout>
  )
}


const mapStateToProps = state => ({
  isRunning: isRunning(state),
})

export default connect(mapStateToProps)(App)
