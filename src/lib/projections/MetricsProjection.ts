// src/app/projections/MetricsProjection.ts

import { writable } from 'svelte/store';
import { type CounterEvent, COUNTER_INCREASED, COUNTER_DECREASED } from '$lib/events/eventTypes';
import EventBus from '$lib/events/EventBus';

interface Metric {
    counterName: string;
    action: 'increased' | 'decreased';
    timestamp: Date;
}

const { subscribe, update } = writable<Metric[]>([]);

const MetricsProjection = () => {
    // React to incoming events and update the projection state
    EventBus.subscribe((events: CounterEvent[]) => {
        const event = events[events.length - 1]; // Process the latest event
        if (event === undefined) {
            return;
        }
        update((metrics) => {
            if (event.type === COUNTER_INCREASED) {
                metrics.push({
                    counterName: event.payload.name,
                    action: 'increased',
                    timestamp: event.payload.timestamp,
                });
            }
            else if (event.type === COUNTER_DECREASED) {
                metrics.push({
                    counterName: event.payload.name,
                    action: 'decreased',
                    timestamp: event.payload.timestamp,
                });
            }
            return metrics;
        });
    });

    const getMetrics = () => {
        let metricsSnapshot: Metric[] = [];
        subscribe((metrics) => {
            metricsSnapshot = metrics;
        })();
        return metricsSnapshot;
    };

    return { subscribe, getMetrics };
};

export default MetricsProjection();
