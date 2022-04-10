import {
  PersistentState as PersistentRecommendState,
  State as RecommendState,
  reduceRecommendStateToPersistentState as reduceRecommendStateToPersistentState,
} from './recommend/state';
import {
  PersistentState as PersistentUserState,
  State as UserState,
  reduceStateToPersistentState as reduceUserStateToPersistentState,
} from './user/state';

export interface PersistentState {
  user: PersistentUserState;
  recommend: PersistentRecommendState;
}

export interface State {
  user: UserState;
  recommend: RecommendState;
}

export function reduceStateToPersistentState(state: State): PersistentState {
  // The state and all its sub-objects are Proxy objects here, therefore we
  // need this to get a plain storable JS object (POJO).
  // Lodash's 'cloneDeep' may be a more performant alternative here.
  const realState: State = JSON.parse(JSON.stringify(state));
  return {
    user: reduceUserStateToPersistentState(realState.user),
    recommend: reduceRecommendStateToPersistentState(realState.recommend),
  };
}
