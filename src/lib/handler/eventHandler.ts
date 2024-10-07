import EventBus from '$lib/events/PersistingEventBus';
import type { IStorageAdapter } from '$lib/adapters/IStorageAdapter';
import { CapacitorPreferencesAdapter } from '$lib/adapters/CapacitorPreferencesAdapter';
import type { CounterEvent } from '$lib/events/eventTypes';

const storageAdapter: IStorageAdapter = new CapacitorPreferencesAdapter();

export const registerPersistEvents = () => {
    EventBus.subscribe((events: CounterEvent[]) => {
        events.forEach((event) => {
            storageAdapter.saveEvent(event);
        });
    });
};
