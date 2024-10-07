<script lang="ts">
    import { onMount } from 'svelte';
    import { scaleLinear, scaleSequential, axisBottom, axisLeft, select, max, interpolateBlues } from 'd3';

    let { metrics, days }: { metrics: Record<string, number[]>; days: number } = $props();

    let svg;
    let margin = { top: 20, right: 30, bottom: 40, left: 50 };
    let width = days * 80; // Define your SVG width for scaling
    let height = 600; // Define your SVG height for scaling

    let xScale, yScale, colorScale;

    // Flatten metrics data into an array of points for the scatter plot
    const getPoints = () => {
        const days = Object.keys(metrics).reverse();
        return days.flatMap((day, dayIndex) =>
            metrics[day].map((count, hour) => ({
                day,
                hour,
                count,
                dayIndex,
            })),
        );
    };

    onMount(() => {
        const points = getPoints();

        // Set up scales
        xScale = scaleLinear()
            .domain([0, 6]) // Last seven days
            .range([margin.left, width - margin.right]);

        yScale = scaleLinear()
            .domain([0, 23]) // Hours of the day
            .range([height - margin.bottom, margin.top]);

        colorScale = scaleSequential(interpolateBlues)
            .domain([0, max(points, d => d.count)]);

        // Add Axes
        const svgElement = select(svg);

        svgElement.select('.x-axis')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .call(axisBottom(xScale).ticks(days).tickFormat((d, i) => {
                const day = new Date();
                day.setDate(day.getDate() - (6 - i));
                return day.toISOString().split('T')[0];
            }));

        svgElement.select('.y-axis')
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(axisLeft(yScale).ticks(24));

        // Initial scatter plot points
        svgElement.selectAll('circle')
            .data(points)
            .join('circle')
            .attr('cx', d => xScale(d.dayIndex))
            .attr('cy', d => yScale(d.hour))
            .attr('r', d => d.count > 0 ? Math.sqrt(d.count) * 2 : 0)
            .attr('fill', d => colorScale(d.count));

        const circles = select(svg).selectAll('circle')
            .data(points, d => `${d.day}-${d.hour}`);

        circles.transition()
            .duration(500)
            .attr('cx', d => xScale(d.dayIndex))
            .attr('cy', d => yScale(d.hour))
            .attr('r', d => d.count > 0 ? Math.sqrt(d.count) * 2 : 0)
            .attr('fill', d => colorScale(d.count));
    });
</script>

<div class="svg-container">
    <svg bind:this={svg} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <g class="x-axis"></g>
        <g class="y-axis"></g>
    </svg>
</div>

<style>
    .svg-container {
        height: 100vh; /* Keeps a 4:3 aspect ratio relative to viewport */
        max-height: 100%; /* Ensure it doesn't overflow */
        overflow: hidden; /* Prevents overflow */
    }

    svg {
        width: 100%;
        height: 100%;
    }

    .x-axis path, .x-axis line,
    .y-axis path, .y-axis line {
        stroke: #000;
    }
</style>
