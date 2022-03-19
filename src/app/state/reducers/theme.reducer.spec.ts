import { rootInitalState } from 'src/app/shared/constants/test-constants';
import { toggleTheme } from '../actions/theme.actions';
import * as fromReducer from './theme.reducer';

describe('themeReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.themeReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('toggle theme action', () => {
    it('should toggle the theme', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.ThemeState = {
        "isDarkTheme": true
      }
      const action = toggleTheme();
      const state = fromReducer.themeReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  it("should select the current theme", () => {
    const result = fromReducer.getCurrentTheme.projector(rootInitalState.theme);
    expect(result).toBe(true);
  });
});
