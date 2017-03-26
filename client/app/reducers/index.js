import { combineReducers } from 'redux';
import authed from './authed';
import departments from './departments';
import modals from './modal';
import formError from './formError';
import searchCriteria from './searchCriteria';
import sortingFilters from './sortingFilters';
import feedbackMessage from './feedbackMessage';
const appReducer = combineReducers({
  authed,
  departments,
  modals,
  formError,
  searchCriteria,
  sortingFilters,
  feedbackMessage
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer;