<script lang="ts">
    import MetricsProjection from '$lib/projections/MetricsProjection';
    let metrics = [];

    MetricsProjection.subscribe(value => metrics = value);
</script>

<div>
    <h2>Counter Metrics</h2>
    <ul>
        {#each metrics as metric}
            <li>{metric.counterName} was {metric.action} at {metric.timestamp.toLocaleString()}</li>
        {/each}
    </ul>
</div>
