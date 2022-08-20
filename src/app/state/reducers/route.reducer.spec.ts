import * as fromReducer from './route.reducer';
import { saveRoute } from '../actions/route.action';
import { rootInitalState } from 'src/app/shared/constants/test-constants';

describe('RouteReducer', () => {
  const { initialState } = fromReducer;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.routeReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('saveRoute action', () => {
    it('should save the route passed', () => {
      const newState: fromReducer.RouteState = {
        "routes": [
          "gambia"
        ]
      }
      const action = saveRoute({ route: 'gambia' });
      const state = fromReducer.routeReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  it("should select the route", () => {
    const result = fromReducer.getRoutes.projector(rootInitalState.routes);
    expect(result.length).toEqual(0);
  });
});
