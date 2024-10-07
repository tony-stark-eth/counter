<script lang="ts">
    import { page } from '$app/stores';
    import Counter from '$lib/components/Counter.svelte';
    import { menuTitleState } from '$lib/state/menuTitle.svelte';

    let counterName = $state($page.params.name);

    $effect(() => {
        counterName = $page.params.name;
        menuTitleState.set(counterName);
    });
</script>

<ion-grid>
    <ion-row class="ion-justify-content-center">
        <ion-col col-3></ion-col>
        <ion-col col-6 class="ion-text-center">
            {#key counterName}
                <Counter name={counterName}/>
            {/key}
        </ion-col>
        <ion-col col-3></ion-col>
    </ion-row>
</ion-grid>
