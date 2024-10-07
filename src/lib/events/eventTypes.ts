export const COUNTER_CREATED = 'COUNTER_CREATED';
export const COUNTER_INCREASED = 'COUNTER_INCREASED';
export const COUNTER_DECREASED = 'COUNTER_DECREASED';
export const COUNTER_REMOVED = 'COUNTER_REMOVED';

export type COUNTER_TYPES = typeof COUNTER_CREATED | typeof COUNTER_INCREASED | typeof COUNTER_DECREASED | typeof COUNTER_REMOVED;

export interface CounterCreatedEvent {
    type: typeof COUNTER_CREATED;
    payload: { name: string };
}

export interface CounterIncreasedEvent {
    type: typeof COUNTER_INCREASED;
    payload: { name: string; timestamp: Date };
}

export interface CounterDecreasedEvent {
    type: typeof COUNTER_DECREASED;
    payload: { name: string; timestamp: Date };
}

export interface CounterRemovedEvent {
    type: typeof COUNTER_REMOVED;
    payload: { name: string };
}

export type CounterEvent =
    | CounterCreatedEvent
    | CounterIncreasedEvent
    | CounterDecreasedEvent
    | CounterRemovedEvent;
