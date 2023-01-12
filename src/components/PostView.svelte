<script lang="ts">
    import { remove } from 'firebase/database';
    import { createEventDispatcher } from 'svelte';

    export let description: string;
    export let quote: string;
    export let source: string;
    export let sourceType: string;
    export let timestamp: Date;
    export let postID: string;
    export let score: number;
    export let ownerUserImageURL: string;
    export let ownerUsername: string;
    export let savedByCurrUser: boolean;

    const dispatch = createEventDispatcher();


    function votePost (upvotePost: Boolean) {
        console.log(`Voting post ${upvotePost}`);
        let newScore: number;
        if (upvotePost) {
            newScore = score + 1;
        } else {
            newScore = score - 1;
        }

        dispatch('votePostEvent', {
            'postID': postID,
            'newScore': newScore
        });
    }


    function updateSavedPostStatus(action: string) { 
        dispatch('updateSavedPostStatusEvent', {
            action: `${action}`,
            postID: `${postID}`
        })
    }

</script>

<div class='feed-component-outline'>
    <div id='username-outline'>{ownerUsername}</div>
    <div id='pfp-outline'>
        <img src={ownerUserImageURL} alt='user avatar' width=25% height=25%>
    </div>
    <h4 id='quote'>{quote}</h4>
    <p id='description'>{description}</p>


    {#if savedByCurrUser}
        <button id='save-button' on:click={() => updateSavedPostStatus('remove')}>
            <img src='https://cdn-icons-png.flaticon.com/128/3082/3082351.png' alt='save post button pressed'>
        </button>
    {:else}
        <button id='save-button' on:click={() => updateSavedPostStatus('save')}>
            <img src='https://cdn-icons-png.flaticon.com/128/7131/7131186.png' alt='save post button unpressed'>
        </button>
    {/if}

    <div id='upvotes-and-downvotes'>
        <button class='rating-buttons' on:click={() => votePost(true)}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='up arrow'>
        </button>
        <div id='score'>{score}</div>
        <button class='rating-buttons' on:click={() => votePost(false)}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989995.png' height='30%' alt='down arrow'>
        </button>
    </div>
    <p id='source'>Source: {source}</p>
    
    {#if sourceType==='Book'}
        <div class='tag' id='book'>Book</div>
    {:else if sourceType==='Movie'}
        <div class='tag' id='movie'>Movie</div>
    {:else if sourceType==='TV'}
        <div class='tag' id='tv-show'>TV Show</div>
    {:else}
        <div class='tag' id='lyric'>Lyric</div>
    {/if}

    {timestamp}
    <button class='app-buttons' style="width:70%; margin-bottom:5px">Show Comments</button>
</div>
<style>
    #save-button {
        position: absolute;
        top: 5px;
        right: 25px;
        width: 10px;
        height: 20px;
        background-color: white;
        border: none;
    }

    #save-button img {
        width: 25px;
        height: 30px;
    }


    #username-outline {
        position: absolute;
        top: 1em;
        margin-left: 8%;
    }

    #pfp-outline {
        position: absolute;
        top: 0.3em;
        left: 0.3em;
    }

    #pfp-outline img {
        width: 3em;
        height: 3em;
        border-radius: 50%;
    }

    #quote {
        margin-top: 4em;
        padding-left: 8%;
    }

    #description {
        padding-left: 15%;
    }

    #upvotes-and-downvotes {
        position: absolute;  
        top: 20%;
        left: 2%;
        width: 50px;
        height: 75px;
    }

    #score {
        vertical-align: top;
        font-size: small;
    }

    .rating-buttons img {
        height: 20%;
        width: 70%;
    }

    .rating-buttons {
        background: none;
        border: none;
    }

    #source {
        margin-left: 5%;
    }
    
    h4 {
        font-style: italic;
        margin-left: 5%;
        margin-right: 0%;
    }

    p {
        text-align: left;
    }

</style>