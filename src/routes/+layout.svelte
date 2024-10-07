<script lang="ts">
    import type { IStorageAdapter } from '$lib/adapters/IStorageAdapter';

    const { children } = $props();

    // Load counters and replay events to initialize metrics
    import EventBus from '$lib/events/EventBus';

    const storageAdapter: IStorageAdapter = new CapacitorPreferencesAdapter();
    storageAdapter.init().then(() => {
        const events = storageAdapter.getAllEvents();
        events.then((events) => {
            events.forEach((event) => {
                EventBus.dispatch(event);
            });
        });
    });
    registerPersistEvents();

    import { IonPage, setupIonicBase } from 'ionic-svelte';

    /* Theme variables */
    import '$lib/theme/variables.css';

    /* load and register all components - you can also import separately to code split */
    import 'ionic-svelte/components/all';
    import { CapacitorPreferencesAdapter } from '$lib/adapters/CapacitorPreferencesAdapter';
    import { registerPersistEvents } from '$lib/handler/eventHandler';
    import Counters from '$lib/components/Counters.svelte';

    /* run base configuration code from ionic/core */
    setupIonicBase();

    import { menuTitleState } from '$lib/state/menuTitle.svelte';
    import { refreshOutline } from 'ionicons/icons';
    import { addIcons } from 'ionicons';

    addIcons({ refreshOutline });
</script>

<ion-app>
    <ion-menu content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>{menuTitleState.get()}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label><a href="/">Create Counter</a></ion-label>
                </ion-item>
            </ion-list>
            <Counters />
        </ion-content>
    </ion-menu>
    <div class="ion-page" id="main">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Counter with Metrics</ion-title>
                <ion-buttons slot="end" class="ion-padding-end">
                    <ion-icon name="refresh-outline"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <IonPage>
            <ion-content fullscreen class="ion-padding" scroll-y={false}>
                {@render children()}
            </ion-content>
        </IonPage>
    </div>
</ion-app>
