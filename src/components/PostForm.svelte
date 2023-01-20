<script lang="ts">
    import { postListRef } from '../database/firebase';
    import { set, push } from 'firebase/database'; 
    import { createEventDispatcher } from 'svelte';
    import type { ValidatationStatus } from '../types';
    import { text } from 'svelte/internal';
    export let displayName: string;
    export let photoURL: string;
    export let uid: string;

    let quote: string = '';
    let description: string = '';
    let source: string = '';
    let sourceType: string = '';

    const dispatch = createEventDispatcher();

    function addPost() {
        const currentDate = new Date(Date.now());
        
        let newPostData = {
            'quote': quote,
            'description': description,
            'ownerID': uid,
            'ownerUserImageURL': photoURL,
            'ownerUsername': displayName,
            'source': source,
            'sourceType': sourceType,
            'score': 0,
            'timestamp': `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`
        }

        const newPostRef = push(postListRef);
        set(newPostRef, newPostData)
        .catch(() => {
            console.error(`Failed to add new post with data ${JSON.stringify(newPostData)}`)
        }).then(() => {
            dispatch('formFinished');
        });
        
    };



    //TODO: Finish implementing validation
    function textInputValidator(input: string, minLength: number, maxLength: number) {
        let status: ValidatationStatus = 'valid';    
        if (input.length < minLength) {
            status = 'tooShort';
        }
        if (input.length > maxLength) {
            status = 'tooLong';
        }
        return status;
    }

    
    $: quoteValidation = textInputValidator(quote, 10, 1000);
    $: descriptionValidation = textInputValidator(description, 0, 1200);
    $: sourceValidation = textInputValidator(source, 1, 100);

    $: {
        console.log('----------');
        console.log(quoteValidation);
        console.log(descriptionValidation);
        console.log(sourceValidation);
    }

</script>

<div class='feed-component-outline' id='form-feed-outline'>
    <div id='form-outline'>
        <ul>
            <li>
                <textarea bind:value={quote} minlength=10 maxlength=1000 placeholder='Quote (required)' rows=5 cols=40 class='input-fields'></textarea>
                {#if quote === ''}
                    <div class='error-message'>Quote is a required field</div>
                {:else if quoteValidation === 'tooShort'}
                    <div class='error-message'>Quote is too short (must be at least 10 characters)</div>
                {:else if quoteValidation === 'tooLong'}
                    <div class='error-message'>Quote is too long (must be a maximum of 1000 characters)</div>
                {/if}
            </li>
            <li>
                <textarea bind:value={description} minlength=10 maxlength=1200 placeholder='Description (optional)' rows=10 cols=40 class='input-fields'></textarea>
                {#if descriptionValidation === 'tooShort'}
                    <div class='error-message'>Quote is too short (must be at least 10 characters)</div>
                {:else if descriptionValidation === 'tooLong'}
                    <div class='error-message'>Quote is too long (must be a maximum of 1200 characters)</div>
                {/if}
            </li>
            <li>
                <input bind:value={source} minlength=1 maxlength=100 class='input-fields' type='text' placeholder='Source (required)'>
                {#if source === ''}
                    <div class='error-message'>Source is a required field</div>
                {:else if sourceValidation === 'tooShort'}
                    <div class='error-message'>Source is too short (must be at least 10 characters)</div>
                {:else if sourceValidation === 'tooLong'}
                    <div class='error-message'>Source is too long (must be a maximum of 1000 characters)</div>
                {/if}
            </li>
            <li>
                <select bind:value={sourceType}>
                    <option disabled selected value> -- Select Source Type -- </option>
                    <option value='Movie' selected>Movie</option>
                    <option value='Book'>Book</option>
                    <option value='TV'>TV Show</option>
                    <option value='Lyric'>Lyric</option>
                </select>
            </li>
        </ul>
        <button class='app-buttons submit-button' id='post-submit-button' style="margin-top:2em" 
            disabled={!(quoteValidation === 'valid' && sourceValidation === 'valid' && descriptionValidation === 'valid')} on:click={addPost}>Add Post</button>
        <button class='app-buttons cancel-button' style="margin-top:2em" on:click={() => dispatch('formFinished')}>Cancel</button>
    </div>
</div>

<style>
    textarea:invalid, input:invalid {
        border: 2px solid red;
    }

    .error-message {
        display: inline-block;
        color: #cc0033;
        font-size: large;
        margin-top: 0;
        width: 100%;
        margin-bottom: 0.5em;
        text-align: left;
        margin-left: 0.5em;
    }

    select {
        width: 70%;
        display: inline-block;
        height: 2em;
        font-size: x-large;
        text-align: center;
        margin-top: 0.5em;
    }

    #post-submit-button:disabled {
        background-color: gray;
    }

</style>