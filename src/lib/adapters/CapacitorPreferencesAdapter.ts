// src/app/adapters/PreferencesAdapter.ts

import { Preferences } from '@capacitor/preferences';
import type { IStorageAdapter } from './IStorageAdapter';
import type { CounterEvent } from '$lib/events/eventTypes';

const EVENTS_KEY = 'events'; // Key to store events

export class CapacitorPreferencesAdapter implements IStorageAdapter {
    async init(): Promise<void> {}

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
}
