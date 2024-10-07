<script lang="ts">
    import CreateCounter from '$lib/components/CreateCounter.svelte';
    import { goto } from '$app/navigation';
    import { menuTitleState } from '$lib/state/menuTitle.svelte';

    menuTitleState.set('Counters');
</script>

<ion-grid>
    <ion-row>
        <ion-col col-3></ion-col>
        <ion-col col-6 class="ion-justify-content-start">
            <CreateCounter
                onCreate={(event) => {
                    goto('/' + event.payload.name);
                }}
            />
        </ion-col>
        <ion-col col-3></ion-col>
    </ion-row>
</ion-grid>
