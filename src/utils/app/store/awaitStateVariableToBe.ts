import { Store } from 'vuex';

export function awaitStateVariableToBe<S, T>(store: Store<S>, get: (state: S) => T, value: T): Promise<void> {
  return new Promise((resolve) => {
    if (get(store.state) === value) {
      resolve();
    } else {
      const unsubscribe = store.watch(
        (state) => get(state),
        (newValue) => {
          if (newValue === value) {
            unsubscribe();
            resolve();
          }
        },
      );
    }
  });
}
