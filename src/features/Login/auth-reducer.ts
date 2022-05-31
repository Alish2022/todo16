import {
    authAPI,
    LoginParamsType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
} from '../../api/todolists-api'
import { Dispatch } from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: typeof initialState = initialState, action: ActionsType): typeof initialState => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn:action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value:boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks

export const authLoginTC = (payload:LoginParamsType) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(payload)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }


export const authLogoutTC = () =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
