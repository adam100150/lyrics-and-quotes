<script lang="ts">
    export let description: string;
    export let downvotes: number;
    export let quote: string;
    export let source: string;
    export let source_type: string;
    export let timestamp: Date;
    export let upvotes: number;
</script>

<p>
    {quote}
    {description}
    {downvotes}
    {upvotes}
    {source}
    {source_type}
    {timestamp}
</p>