import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './game'

const initialState = {}
const enhancers = []
const middlewares = [
    createLogger({}),
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
)

const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./game', () => {
        const nextRootReducer = require('./game')
        store.replaceReducer(nextRootReducer)
      })
    }
  }
  return store
}


export default configureStore
