import { writable } from 'svelte/store';
import type { CounterEvent } from './eventTypes';
import EventBus from '$lib/events/EventBus';

const { subscribe, update } = writable<CounterEvent[]>([]);

const PersistingEventBus = {
    dispatch: (event: CounterEvent) => {
        update(events => [...events, event]);
        EventBus.dispatch(event);
    },
    subscribe,
};

export default PersistingEventBus;
