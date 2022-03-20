/* NgRx */
import {
  createReducer, on, createFeatureSelector, createSelector
} from '@ngrx/store';
import { saveRoute } from '../actions/route.action';

export interface RouteState {
  routes: string[];
}

export const initialState: RouteState = {
  routes: [],
};

// Selector functions
const getRouteFeatureState = createFeatureSelector<RouteState>('routes');

export const getRoutes = createSelector(
  getRouteFeatureState,
  state => state.routes
);


export const routeReducer = createReducer<RouteState>(
  initialState,
  on(saveRoute, (state, action): RouteState => {
    return {
      ...state,
      routes: appendRoute(state.routes, action.route)
    };
  })
);

/**
* Appends route to already existing routes
*  @param {string[]} routes Routes of all visited pages stored in store.
*  @param {string} route Routes of newly visited page to be stored in store.
*
* @return new routes in an array
**/
const appendRoute = (routes: string[], route: string) => {
  let existing_route = routes.filter((_route) => _route === route)
  let newRoutes = [...routes]
  existing_route.length === 0 ? newRoutes.push(route) : null
  return newRoutes
}
