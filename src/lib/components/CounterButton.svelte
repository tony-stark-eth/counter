<script lang="ts">
    import counterStore from '$lib/stores/counterStore';
    import { onMount } from 'svelte';
    import type { Counter } from '$lib/adapters/IStorageAdapter';

    let counterName: string = '';
    let counters: Counter[] = [];

    onMount(() => {
        counterStore.subscribe(value => counters = value);
    });

    const createCounter = () => {
        if (counterName && !counters.find(c => c.name === counterName)) {
            counterStore.createCounter(counterName);
            counterName = '';
        }
    };

    const increaseCounter = (name: string) => counterStore.increaseCounter(name);
    const decreaseCounter = (name: string) => counterStore.decreaseCounter(name);
    const removeCounter = (name: string) => counterStore.removeCounter(name);
</script>

<div>
    <input type="text" bind:value={counterName} placeholder="Counter name" />
    <button on:click={createCounter}>Create Counter</button>

    <ul>
        {#each counters as counter}
            <li>
                {counter.name}: {counter.value}
                (Last modified: {counter.lastModified ? counter.lastModified.toLocaleString() : 'Never'})
                <button on:click={() => increaseCounter(counter.name)}>+</button>
                <button on:click={() => decreaseCounter(counter.name)}>-</button>
                <button on:click={() => removeCounter(counter.name)}>Remove</button>
            </li>
        {/each}
    </ul>
</div>
