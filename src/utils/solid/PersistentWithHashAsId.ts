import { Persistent } from './Persistent';
import { WithHashAsId } from './WithHashAsId';

export type PersistentWithHashAsId<T> = Persistent<T> & WithHashAsId;
