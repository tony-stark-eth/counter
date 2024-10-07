<script lang="ts">
    import EventBus from '$lib/events/EventBus';
    import {
        COUNTER_DECREASED,
        COUNTER_INCREASED,
    } from '$lib/events/eventTypes';
    import PersistingEventBus from '$lib/events/PersistingEventBus';

    let { name }: { name: string } = $props();

    let counterValue = $state(0);

    EventBus.subscribe((unfilteredEvents) => {
        counterValue = 0;
        unfilteredEvents.forEach((unfilteredEvent) => {
            if (unfilteredEvent.payload.name !== name) {
                return;
            }

            if (unfilteredEvent.type === COUNTER_INCREASED) {
                counterValue++;
            }

            if (unfilteredEvent.type === COUNTER_DECREASED) {
                counterValue--;
            }
        });
    });

    const increaseCounter = (name: string) => PersistingEventBus.dispatch({ type: COUNTER_INCREASED, timestamp: new Date(), payload: { name } });
    const decreaseCounter = (name: string) => PersistingEventBus.dispatch({ type: COUNTER_DECREASED, timestamp: new Date(), payload: { name } });
</script>

<ion-text color="primary">
    <h1>{counterValue}</h1>
</ion-text>
<ion-button on:click={() => increaseCounter(name)}>+</ion-button>
<br />
<ion-button on:click={() => decreaseCounter(name)}>-</ion-button>

<style>
    h1 {
        font-size: 20vw;
    }

    ion-button {
        width: 15vw;
        height: 7.5vw;
        font-size: 5vw;
    }

    ion-button:not(:last-child) {
        margin-bottom: 1vw;
    }
</style>
