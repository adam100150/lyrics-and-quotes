<script lang="ts">
    import { postListRef } from '../database/firebase';
    import { set, push } from 'firebase/database'; 
    import { createEventDispatcher } from 'svelte';

    export let displayName: string;
    export let photoURL: string;
    export let uid: string;

    let quote;
    let description;
    let source;
    let sourceType;

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

</script>

<div class='feed-component-outline' id='form-feed-outline'>
    <div id='form-outline'>
        <ul>
            <li>
                <label for='quote'>Quote:</label>
                <textarea bind:value={quote} placeholder='The way to get started is to quit talking and begin doing.' cols=40 class='input-fields'></textarea>
            </li>
            <li>
            <label for='description'>Description:</label>
                <textarea bind:value={description} placeholder='I like this quote because...' cols=40 class='input-fields'></textarea>
            </li>
            <li>
                <label for='source'>Source:</label>
                <input bind:value={source} class='input-fields' type='text' placeholder='Walt Disney'>
            </li>
            <li>
                <label id='select-label' for='source-type'>Source Type:</label>
                <select style="text-align:center" bind:value={sourceType} class='input-fields'>
                    <option value='Movie'>Movie</option>
                    <option value='Book'>Book</option>
                    <option value='TV'>TV Show</option>
                    <option value='Lyric'>Lyric</option>
                </select>
            </li>
        </ul>
        <button class='app-buttons' id='submit-button' on:click={addPost}>Add Post</button>
        <button class='app-buttons' id='cancel-button' on:click={() => dispatch('formFinished')}>Cancel</button>
    </div>
</div>