import { createAction, props } from "@ngrx/store";

export const saveRoute = createAction(
  'Save route',
  props<{ route: string }>()

);
