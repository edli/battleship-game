import { createAction, combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux';

export const startNewGame = createAction('GAME_START')
export const restartGame = createAction('GAME_RESTART')
export const fire = createAction('GAME_FIRE')

const FIELD_SIZE = 10

const SHIPS_DATA = {
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
  [combineActions(startNewGame, restartGame)](state) {
    return {
      ...state,
      field: new Array(FIELD_SIZE * FIELD_SIZE).fill(false),
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
})

const gameState = handleActions({
  [startNewGame](state) {
    return {
      ...state,
      isRunning: true
    }
  },
}, {
  isRunning: false
})

export const isRunning = ({ state }) => state.isRunning
export const getField = ({ data }) => data.field
export const getShipsPositions = ({ data }) => data.shipsPositions
const isShipDestoyed = ({ field }, { positions }) => positions.every(position => field[getIdx(position)])
export const isAllShipsDestroyed = ({ data }) => data.ships.every(ship => isShipDestoyed(data, ship))
export const getDestroyedShips = ({ data }) => data.ships.filter(ship => isShipDestoyed(data, ship))

export default combineReducers({
  data: gameData,
  state: gameState,
})
