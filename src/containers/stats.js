import { connect } from 'react-redux'

import Stats from '../components/Stats'
import { getShipsStats, getScore } from '../store/game'

const mapStateToProps = state => ({
  ships: getShipsStats(state),
  score: getScore(state),
})

export default connect(mapStateToProps)(Stats)
