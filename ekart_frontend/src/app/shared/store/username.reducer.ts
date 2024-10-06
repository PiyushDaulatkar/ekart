import { createReducer, on } from "@ngrx/store";
import { initialState } from "./username.state";
import { setUserName } from "./username.action";

const _userNameReducer = createReducer( initialState,
    on(setUserName,(state,action) => {
        return {
            ...state,
            userName : action.value
        }
    })
)

export function userNameReducer(state:any, action:any) {
    return _userNameReducer(state,action);
}