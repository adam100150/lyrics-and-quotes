<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    
    let text: string;

    const dispatch = createEventDispatcher();

</script>

<div id='form-outline' style="padding: 2%;">
    <ul style="width: 100%;">
        <li>
            <label for='text' style="width: 15%;">Comment:</label>
            <textarea id='comment-input' bind:value={text} placeholder='Wow this post is so great...' cols=50 class='input-fields'></textarea>
        </li>
    </ul>
    <button class='app-buttons' id='submit-button' on:click={() => dispatch('commentFormFinished', {'text': `${text}`})}>Add Comment</button>
    <button class='app-buttons' id='cancel-button' on:click={() => {console.log('Dispatching event'); dispatch('commentFormFinished')}}>Cancel</button>
</div>

<style>
    #comment-input {
        float: left;
    }
</style>