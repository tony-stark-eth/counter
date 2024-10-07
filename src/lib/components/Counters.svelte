<script lang="ts">
    import EventBus from '$lib/events/EventBus';
    import {
        COUNTER_CREATED,
        COUNTER_REMOVED,
        type CounterEvent,
    } from '$lib/events/eventTypes';
    import { onMount } from 'svelte';
    import { SvelteMap } from 'svelte/reactivity';

    import { addIcons } from 'ionicons';
    import { analyticsOutline } from 'ionicons/icons';

    addIcons({ analyticsOutline });

    let counters: SvelteMap<string, CounterEvent> = $state(new SvelteMap<string, CounterEvent>([]));

    onMount(() => {
        EventBus.subscribe((events) => {
            events.forEach((event) => {
                if (event.type === COUNTER_CREATED) {
                    counters.set(event.payload.name, event);
                }
                if (event.type === COUNTER_REMOVED) {
                    counters.delete(event.payload.name);
                }
            });
        });
    });
</script>

<ion-list>
    {#each counters as [name]}
        <ion-item>
            <ion-label><a href="/{name}">{name}</a></ion-label>
            <a href="/metrics/{name}/7"><ion-icon name="analytics-outline"></ion-icon></a>
        </ion-item>
    {/each}
</ion-list>
