// src/app/adapters/IStorageAdapter.ts

import type { CounterEvent } from '../events/eventTypes';

export interface IStorageAdapter {
    init(): Promise<void>;
    saveEvent(event: CounterEvent): Promise<void>;
    getAllEvents(): Promise<CounterEvent[]>;
}
