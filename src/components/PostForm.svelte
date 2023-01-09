<script>
    import { postListRef } from '../database/firebase';
    import { set, push } from 'firebase/database'; 
    import { createEventDispatcher } from 'svelte';

    let quote;
    let description;
    let source;
    let sourceType;
    export let userID;

    const dispatch = createEventDispatcher();

    function addPost() {
        const currentDate = new Date(Date.now());
        
        let newPostData = {
            'quote': quote,
            'description': description,
            'ownerID': userID,
            'source': source,
            'sourceType': sourceType,
            'score': 0,
            'timestamp': `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`
        }    

        const newPostRef = push(postListRef);
        set(newPostRef, newPostData);

        dispatch('formFinished');
    };

</script>

<div class='feed-component-outline'>
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
                <input bind:value={source} class='input-fields' size=40 type='text' placeholder='Walt Disney'>
            </li>
            <li>
                <label id='select-label' for='source-type'>Source Type:</label>
                <select bind:value={sourceType} id='select-item' class='input-fields'>
                    <option value='Movie'>Movie</option>
                    <option value='Book'>Book</option>
                    <option value='TVShow'>TV Show</option>
                    <option value='Lyric'>Lyric</option>
                </select>
            </li>
        </ul>
        <button class='app-buttons' id='submit-button' on:click={addPost}>Add Post</button>
        <button class='app-buttons' id='cancel-button' on:click={() => dispatch('formFinished')}>Cancel</button>
    </div>
</div>

<style>
    #select-item {
        margin-right: 53%;
    }

    #submit-button {
        width: 30%;
        height: 30px;
        background-color: rgb(42, 192, 8);
        margin-right: 30%;
    }

    #cancel-button {
        width: 30%;
        height: 30px;
        background-color: red;
        display: inline-block;
    }

    #form-outline {
        padding: 5%;
    } 
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    label {
        /* Uniform size & alignment */
        width: 80px;
        text-align: right;
        font-size: small;
        float: left;
    }

    .input-fields {
        font-family: inherit;
        -webkit-padding: 0.4em 0;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
    }
    
    textarea {
        vertical-align: top;
    }

    input, select {
        vertical-align: middle;
    }
</style>