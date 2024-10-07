<script lang="ts">
    import EventBus from '$lib/events/PersistingEventBus';
    import {
        COUNTER_CREATED, type CounterCreatedEvent,
    } from '$lib/events/eventTypes';

    let counterName: string = $state('');

    const createCounter = () => {
        if (counterName) {
            const timestamp = new Date();
            EventBus.dispatch({ type: COUNTER_CREATED, timestamp: timestamp, payload: { name: counterName } });
            onCreate({ type: COUNTER_CREATED, timestamp: timestamp, payload: { name: counterName } });
            counterName = '';
        }
    };

    let { onCreate }: { onCreate: (event: CounterCreatedEvent) => void } = $props();
</script>

<div>
    <div>
    <input type="text" bind:value={counterName} placeholder="Counter name" />
    </div>
    <ion-button on:click={createCounter}>Create Counter</ion-button>
</div>
