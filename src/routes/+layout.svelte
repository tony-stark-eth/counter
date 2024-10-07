<script lang="ts">
    import CounterButton from '$lib/components/CounterButton.svelte';
    import MetricsDisplay from '$lib/components/MetricsDisplay.svelte';
    import counterStore from '$lib/stores/counterStore';
    const { children } = $props();

    // Load counters and replay events to initialize metrics
    counterStore.loadCountersFromDB();
    counterStore.replayEventsForMetrics();
</script>

<main>
    <h1>Tally Counter</h1>
    <CounterButton />
    <MetricsDisplay />
    {@render children()}
</main>
