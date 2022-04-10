import { Module } from 'vuex';

import { State as RootState } from '@/store/state';

import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { DEFAULT_STATE, State } from './state';

export const userModule: Module<State, RootState> = {
  state: DEFAULT_STATE,
  getters: getters,
  actions: actions,
  mutations: mutations,
};
