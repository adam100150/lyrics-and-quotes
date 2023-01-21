<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { empty } from 'svelte/internal';
    import Comments from './Comments.svelte';

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
        console.log(`User is ${upvotePost ? 'upvoting' : 'downvoting'} post with id ${postID}`);
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

    let showComments: boolean = false;

</script>

<div class='feed-component-outline'>
    <div id='username-outline'>{ownerUsername}</div>
    <div id='pfp-outline'>
        <img src={ownerUserImageURL} alt='user avatar' width=3em height=3em>
    </div>
    <div id='quote-block'>
        <div id='quote'>{quote}</div>
        <div id='source'>{source}</div>
    </div>
    <div id='description'>
        {description}
    </div>

    {#if savedByCurrUser}
        <button class='post-button' style="background: url(https://cdn-icons-png.flaticon.com/128/3082/3082351.png) no-repeat; background-size:100%; position:absolute; top:1vh; right:0.5vw;" 
        on:click={() => updateSavedPostStatus('remove')}></button>
    {:else}
        <button class='post-button' style="background: url(https://cdn-icons-png.flaticon.com/128/7131/7131186.png) no-repeat; background-size:100%; position:absolute; top:1vh; right:0.5vw;" 
        on:click={() => updateSavedPostStatus('save')}></button>
    {/if}

    <button class='post-button' style="background: url(https://cdn-icons-png.flaticon.com/512/1159/1159633.png) no-repeat; background-size:100%; position:absolute; top:1vh; right:3.5vw;"
    on:click={() => {}}></button>
    
    <button class='post-button' style="background: url(https://www.freeiconspng.com/thumbs/trash-can-icon/trash-can-icon-3.png) no-repeat; background-size:100%; position:absolute; position:absolute; top:1vh; right: 6.5vw;"
    on:click={() => {}}></button>

    <div id='upvotes-and-downvotes'>
        <button class='rating-buttons' on:click={() => votePost(true)}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='up arrow'>
        </button>
        <div id='score'>{score}</div>
        <button class='rating-buttons' on:click={() => votePost(false)}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989995.png' height='30%' alt='down arrow'>
        </button>
    </div>

    {#if sourceType === 'Book'}
        <div class='{description === '' ? 'empty-description-tag': 'tag'} book'>Book</div>
    {:else if sourceType === 'Movie'}
        <div class='{description === '' ? 'empty-description-tag': 'tag'} movie'>Movie</div>
    {:else if sourceType === 'TV'}
        <div class='{description === '' ? 'empty-description-tag': 'tag'} tv-show'>TV Show</div>
    {:else if sourceType === 'Lyric'}
        <div class='{description === '' ? 'empty-description-tag': 'tag'} lyric'>Lyric</div>
    {:else}
        <div class='{description === '' ? 'empty-description-tag': 'tag'} real-life'>Real Life</div>
    {/if}

    <div>{timestamp}</div>
    {#if !showComments}
        <button class='app-buttons' style="width:70%; margin-bottom:1em" on:click={() => showComments = true}>Show Comments</button>
    {:else}
        <Comments on:hideCommentsEvent={() => showComments = false} {postID}/>
    {/if}

    
</div>
<style>
    #username-outline {
        position: absolute;
        top: 1em;
        left: 4em;
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

    #quote-block {
        margin-top: 4em;
        padding-left: 8%;
        margin-right: 2%;
        font-style: italic;
    }

    #quote {
        font-weight: bold;
    }

    #source {
        text-align: right;
        margin-right: 1em;
        margin-top: 0.5em;
    }

    #description {
        padding-left: 10%;
        text-align: left;
        margin-top: 1em;
        margin-right: 2%;
    }

    #upvotes-and-downvotes {
        position: absolute;  
        top: 4.5em;
        left: 2%;
        width: 2.5em;
        height: 5em;
    }

    #score {
        vertical-align: top;
        font-size: x-large;
    }

    .empty-description-tag {
        margin-top: 4em;
    }

    .rating-buttons img {
        height: 80%;
        width: 70%;
    }

    .rating-buttons {
        height: 50%;
        background: none;
        border: none;
    }
</style>