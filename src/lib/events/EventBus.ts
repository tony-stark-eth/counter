import { writable } from 'svelte/store';
import type { CounterEvent } from './eventTypes';

const { subscribe, update } = writable<CounterEvent[]>([]);

const EventBus = {
    dispatch: (event: CounterEvent) => update(events => [...events, event]),
    subscribe,
};

export default EventBus;
