
// Representation of the entire app state

import { RouteState } from "./reducers/route.reducer";
import { ThemeState } from "./reducers/theme.reducer";

// Extended by lazy loaded modules
export interface State {
  theme: ThemeState;
  routes: RouteState
}
