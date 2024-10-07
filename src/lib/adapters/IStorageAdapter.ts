// src/app/adapters/IStorageAdapter.ts

import type { CounterEvent } from '../events/eventTypes';

export interface Counter {
    name: string;
    value: number;
    lastModified: Date | null;
}

export interface IStorageAdapter {
    init(): Promise<void>;
    saveEvent(event: CounterEvent): Promise<void>;
    getAllEvents(): Promise<CounterEvent[]>;
    getCounters(): Promise<Counter[]>; // This should remain as before
    saveCounter(counter: Counter): Promise<void>; // New method to save counters
    removeCounter(name: string): Promise<void>; // New method to remove counters
}
