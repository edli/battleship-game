import { connect } from 'react-redux'

import Success from '../components/Success'
import { restartGame } from '../store/game'

const mapDispatchToProps = {
  restartGame,
}

export default connect(null, mapDispatchToProps)(Success)
