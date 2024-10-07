import { writable } from 'svelte/store';
import EventBus from '../events/EventBus';
import { COUNTER_CREATED, COUNTER_INCREASED, COUNTER_DECREASED, COUNTER_REMOVED } from '../events/eventTypes';
import type { IStorageAdapter, Counter } from '../adapters/IStorageAdapter';
import { CapacitorPreferencesAdapter } from '$lib/adapters/CapacitorPreferencesAdapter'; // Import your new PreferencesAdapter

// Initialize the Preferences adapter
const storage: IStorageAdapter = new CapacitorPreferencesAdapter();

// Create a writable store to hold counters
const countersStore = writable<Counter[]>([]);

// Load counters from Preferences and populate the store
const loadCountersFromDB = async () => {
    await storage.init();
    const storedCounters = await storage.getCounters();
    countersStore.set(storedCounters);
};

// Replay events to initialize metrics
const replayEventsForMetrics = async () => {
    const events = await storage.getAllEvents();
    events.forEach(event => EventBus.dispatch(event));
};

// Subscribe to the EventBus for reactive updates
EventBus.subscribe(async (events) => {
    const event = events[events.length - 1]; // Process the latest event
    if (event === undefined) {
        return;
    }
    countersStore.update((counters) => {
        switch (event.type) {
            case COUNTER_CREATED:
                if (!counters.find(counter => counter.name === event.payload.name)) {
                    const newCounter: Counter = { name: event.payload.name, value: 0, lastModified: null };
                    counters.push(newCounter);
                    storage.saveCounter(newCounter); // Save the new counter to Preferences
                    storage.saveEvent(event); // Save the event to Preferences
                }
                break;
            case COUNTER_INCREASED: {
                const increasedCounter = counters.find(counter => counter.name === event.payload.name);
                if (increasedCounter) {
                    increasedCounter.value += 1;
                    increasedCounter.lastModified = event.payload.timestamp;
                    storage.saveCounter(increasedCounter); // Update the counter in Preferences
                    storage.saveEvent(event);
                }
                break;
            }
            case COUNTER_DECREASED: {
                const decreasedCounter = counters.find(counter => counter.name === event.payload.name);
                if (decreasedCounter) {
                    decreasedCounter.value -= 1;
                    decreasedCounter.lastModified = event.payload.timestamp;
                    storage.saveCounter(decreasedCounter); // Update the counter in Preferences
                    storage.saveEvent(event);
                }
                break;
            }
            case COUNTER_REMOVED:
                counters = counters.filter(counter => counter.name !== event.payload.name);
                storage.removeCounter(event.payload.name); // Remove the counter from Preferences
                storage.saveEvent(event);
                break;
        }
        return counters;
    });
});

// Expose methods for use in the UI
const counterStore = {
    subscribe: countersStore.subscribe,
    createCounter: (name: string) => EventBus.dispatch({ type: COUNTER_CREATED, payload: { name } }),
    increaseCounter: (name: string) => EventBus.dispatch({ type: COUNTER_INCREASED, payload: { name, timestamp: new Date() } }),
    decreaseCounter: (name: string) => EventBus.dispatch({ type: COUNTER_DECREASED, payload: { name, timestamp: new Date() } }),
    removeCounter: (name: string) => EventBus.dispatch({ type: COUNTER_REMOVED, payload: { name } }),
    loadCountersFromDB,
    replayEventsForMetrics,
};

export default counterStore;
