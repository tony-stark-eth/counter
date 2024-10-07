export const COUNTER_CREATED = 'COUNTER_CREATED';
export const COUNTER_INCREASED = 'COUNTER_INCREASED';
export const COUNTER_DECREASED = 'COUNTER_DECREASED';
export const COUNTER_REMOVED = 'COUNTER_REMOVED';

export interface CounterCreatedEvent {
    type: typeof COUNTER_CREATED;
    timestamp: Date;
    payload: { name: string };
}

export interface CounterIncreasedEvent {
    type: typeof COUNTER_INCREASED;
    timestamp: Date;
    payload: { name: string };
}

export interface CounterDecreasedEvent {
    type: typeof COUNTER_DECREASED;
    timestamp: Date;
    payload: { name: string };
}

export interface CounterRemovedEvent {
    type: typeof COUNTER_REMOVED;
    timestamp: Date;
    payload: { name: string };
}

export type CounterEvent =
    | CounterCreatedEvent
    | CounterIncreasedEvent
    | CounterDecreasedEvent
    | CounterRemovedEvent;
