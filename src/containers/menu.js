import { connect } from 'react-redux'

import Menu from '../components/Menu'
import { startNewGame } from '../store/game'

export default connect(null, { startNewGame })(Menu)
