// src/app/adapters/PreferencesAdapter.ts

import { Preferences } from '@capacitor/preferences';
import type { IStorageAdapter, Counter } from './IStorageAdapter';
import type { CounterEvent } from '$lib/events/eventTypes';

const COUNTERS_KEY = 'counters'; // Key to store counters
const EVENTS_KEY = 'events'; // Key to store events

export class CapacitorPreferencesAdapter implements IStorageAdapter {
    async init(): Promise<void> {
        // Initialization logic can go here if necessary
    }

    async saveEvent(event: CounterEvent): Promise<void> {
        // Retrieve current events, add the new one, and save
        const { value } = await Preferences.get({ key: EVENTS_KEY });
        const events = value ? JSON.parse(value) : [];
        events.push(event);
        await Preferences.set({ key: EVENTS_KEY, value: JSON.stringify(events) });
    }

    async getAllEvents(): Promise<CounterEvent[]> {
        const { value } = await Preferences.get({ key: EVENTS_KEY });
        return value ? JSON.parse(value) : [];
    }

    async getCounters(): Promise<Counter[]> {
        const { value } = await Preferences.get({ key: COUNTERS_KEY });
        return value ? JSON.parse(value) : [];
    }

    async saveCounter(counter: Counter): Promise<void> {
        const counters = await this.getCounters();
        const existingCounterIndex = counters.findIndex(c => c.name === counter.name);

        if (existingCounterIndex !== -1) {
            // Update existing counter
            counters[existingCounterIndex] = counter;
        }
        else {
            // Add new counter
            counters.push(counter);
        }

        await Preferences.set({ key: COUNTERS_KEY, value: JSON.stringify(counters) });
    }

    async removeCounter(name: string): Promise<void> {
        const counters = await this.getCounters();
        const updatedCounters = counters.filter(counter => counter.name !== name);
        await Preferences.set({ key: COUNTERS_KEY, value: JSON.stringify(updatedCounters) });
    }
}
