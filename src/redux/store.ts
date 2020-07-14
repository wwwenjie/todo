// https://redux.js.org/basics/example
// https://redux.js.org/recipes/usage-with-typescript
// useReducer hook may also be a good choice
// https://reactjs.org/docs/hooks-reference.html#usereducer

import { createStore } from 'redux'
import rootReducer from './reducers'

export default createStore(rootReducer)
