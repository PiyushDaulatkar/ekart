import { createAction, props } from "@ngrx/store";


export const setUserName = createAction("setUserName", props<{ value: string }>())