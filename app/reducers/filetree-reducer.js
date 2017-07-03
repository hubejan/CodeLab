// @flow
import { GOT_USERNAME, FILETREE_CHANGE} from '../actions/filetree-actions';

export type filetreeStateType = {
  username: string,
  filetree: Object[]
};

type actionType = {
  type: string,
  username?: string,
  filetree?: Object[]
};

const defaultFiletreeState = {
  username: '',
  filetree: []
};

export default function filetree(state: filetreeStateType = defaultFiletreeState,
  action: actionType) {
  switch (action.type) {
    case GOT_USERNAME:
      return { ...state, username: action.username };
    case FILETREE_CHANGE:
      return { ...state, filetree: action.filetree };
    default:
      return state;
  }
}
