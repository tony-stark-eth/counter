<script lang="ts">
    import { page } from '$app/stores';
    import Scatterplot from '$lib/components/Scatterplot.svelte';
    import EventBus from '$lib/events/EventBus';
    import type { CounterEvent } from '$lib/events/eventTypes';

    let metrics: Record<string, number[]> = $state({});
    let counterName: string = $state($page.params.name);
    let days: number = $state(Number($page.params.days));

    $effect(() => {
        counterName = $page.params.name;
        days = Number($page.params.days);

        EventBus.subscribe((events: CounterEvent[]) => {
            const today = new Date();
            const result: Record<string, number[]> = {};

            for (let i = 0; i < days; i++) {
                const day = new Date(today);
                day.setUTCDate(today.getUTCDate() - i);
                const dayKey = day.toISOString().split('T')[0];
                result[dayKey] = Array(24).fill(0);
            }

            events.forEach((event) => {
                if (event.payload.name === counterName && (event.type === 'COUNTER_INCREASED' || event.type === 'COUNTER_DECREASED')) {
                    const eventDate = new Date(event.timestamp);
                    const dayKey = eventDate.toISOString().split('T')[0];
                    const hour = eventDate.getUTCHours();

                    if (result[dayKey]) {
                        if (event.type === 'COUNTER_INCREASED') {
                            result[dayKey][hour]++;
                        }
                        else if (event.type === 'COUNTER_DECREASED') {
                            result[dayKey][hour]--;
                        }
                    }
                }
            });

            metrics = result;
        });
    });
</script>

{#key metrics}
    <Scatterplot {metrics} {days}/>
{/key}
