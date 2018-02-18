import { connect } from 'react-redux'

import Game from '../components/Game'
import { getField, getDestroyedShips, getShipsPositions, restartGame, fire, isAllShipsDestroyed } from '../store/game'

const mapStateToProps = state => ({
  field: getField(state),
  destroyedShips: getDestroyedShips(state),
  shipsPositions: getShipsPositions(state),
  isAllShipsDestroyed: isAllShipsDestroyed(state),
})

const mapDispatchToProps = {
  restartGame,
  fire,
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
