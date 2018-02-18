import { createAction, handleActions } from 'redux-actions'
import { combineReducers } from 'redux';

export const restartGame = createAction('GAME_RESTART')
export const fire = createAction('GAME_FIRE')

const FIELD_SIZE = 10

const SHIPS_DATA = {
  // shipTypes not really needed for this game
  // layout is enough
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },
  layout: [
    { ship: 'carrier', positions: [[2,9], [3,9], [4,9], [5,9], [6,9]] },
    { ship: 'battleship', positions: [[5,2], [5,3], [5,4], [5,5]] },
    { ship: 'cruiser', positions: [[8,1], [8,2], [8,3]] },
    { ship: 'submarine', positions: [[3,0], [3,1], [3,2]] },
    { ship: 'destroyer', positions: [[0,0], [1,0]] }
  ].map((ship, i) => ({ id: i, ...ship })),
}

const getIdx = ([ x, y ]) => y * FIELD_SIZE + x

const gameData = handleActions({
  [restartGame](state) {
    return {
      ...state,
      field: new Array(FIELD_SIZE * FIELD_SIZE).fill(false),
      score: state.score + 1,
    }
  },
  [fire](state, { payload: idx }) {
    return {
      ...state,
      field: [
        ...state.field.slice(0, idx),
        true,
        ...state.field.slice(idx + 1),
      ]
    }
  },
}, {
  ships: SHIPS_DATA.layout,
  shipsPositions: SHIPS_DATA.layout.reduce((result, ship) => ({
    ...result,
    ...ship.positions.reduce((result, position) => ({
      ...result,
      [getIdx(position)]: ship,
    }), {})
  }), {}),
  field: new Array(FIELD_SIZE * FIELD_SIZE).fill(false),
  score: 0,
})

export const getField = ({ data }) => data.field
export const getScore = ({ data }) => data.score
export const getShipsPositions = ({ data }) => data.shipsPositions
export const getShipsStats = ({ data }) => data.ships.map(({ id, ship, positions }) => {
  return {
    id,
    ship,
    lives: positions.length,
    hits: positions.reduce((result, position) => data.field[getIdx(position)] ? result + 1 : result, 0)
  }
})
const isShipDestoyed = ({ field }, { positions }) => positions.every(position => field[getIdx(position)])
export const isAllShipsDestroyed = ({ data }) => data.ships.every(ship => isShipDestoyed(data, ship))
export const getDestroyedShips = ({ data }) => data.ships.filter(ship => isShipDestoyed(data, ship))

export default combineReducers({
  data: gameData,
})
