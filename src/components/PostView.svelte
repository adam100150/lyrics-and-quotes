<script lang="ts">
    import { onValue, ref } from 'firebase/database';
    import { createEventDispatcher } from 'svelte';

    export let description: string;
    export let quote: string;
    export let source: string;
    export let sourceType: string;
    export let timestamp: Date;
    export let postID: string;
    export let score: number;
    export let userImageUrl: string;
    export let username: string;

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

</script>

<div class='feed-component-outline'>
    <div id='username-outline'>{username}</div>
    <div id='pfp-outline'>
        <img src={userImageUrl} alt='user avatar' width=25% height=25%>
    </div>
    <h4 id='quote'>{quote}</h4>
    <p id='description'>{description}</p>


    <button id='save-button'>
        <img src='https://freepngimg.com/download/instagram/60239-like-icons-bookmark-button-computer-facebook-instagram.png' alt='save post button'>
    </button>
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
</div>

<style>
    #save-button {
        position: absolute;
        top: 0%;
        right: 5%;
        width: 10%;
        height: 20%;
        background-image: 'https://freepngimg.com/download/instagram/60239-like-icons-bookmark-button-computer-facebook-instagram.png';
        background-color: white;
        border: none;
    }

    #save-button img {
        width: 25px;
        height: 30px;
    }


    #username-outline {
        position: absolute;
        top: 6%;
        left: 5%;
        margin-left: 10%;
    }

    #pfp-outline {
        position: absolute;
        top: 5%;
        left: 0%;
    }

    #quote {
        margin-top: 10%;
        padding-left: 10%;
    }

    #description {
        padding-left: 17%;
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

    img {
        border-radius: 50%;
    }

    p {
        text-align: left;
    }

</style>