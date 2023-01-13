<script lang="ts">
    export let username: string;
    export let userImageURL: string;
    export let text: string;
</script>

<div>
    <img src={userImageURL} alt=''>
    {username}
    <p>
        {text}
    </p>
</div>