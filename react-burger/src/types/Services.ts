import { INITIAL_STATE } from '../services/actions/authActions'
import { rootReducer } from '../services/reducers/reducers'

export type TState = ReturnType<typeof rootReducer>

export interface IInitialState {
    readonly type: typeof INITIAL_STATE
}
