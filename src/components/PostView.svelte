<script lang="ts">
    import { db } from '../database/firebase';
    import { update, ref } from 'firebase/database';
    export let description: string;
    export let quote: string;
    export let source: string;
    export let sourceType: string;
    export let timestamp: Date;
    export let postID: string;
    export let score: number;
    export let userImageUrl: string;
    export let username: string;

    let votePost = function (upvotePost: Boolean) {
        let updates = {};
        if (upvotePost) {
            updates[`/posts/${postID}/score`] = score + 1;
        } else {
            updates[`/posts/${postID}/score`] = score - 1;
        }

        update(ref(db), updates);
    }

    let upvote = function() {
        votePost(true);        
    }

    let downvote = function() {
        votePost(false); 
    }

</script>

<div class='feed-component-outline' id='post-outline'>
    <div id='username-outline'>{username}</div>
    <div id='pfp-outline'>
        <img src={userImageUrl} alt='user avatar' width=25% height=25%>
    </div>
    <h4 id='quote'>{quote}</h4>
    <p id='description'>{description}</p>
    <div id='upvotes-and-downvotes'>
        <button class='rating-buttons' on:click={upvote}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='up arrow'>
        </button>
        <div style='height:20%'>{score}</div>
        <button class='rating-buttons' on:click={downvote}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989995.png' height='30%' alt='down arrow'>
        </button>
    </div>
    <p id='source'>Source: {source}</p>
    
    {#if sourceType=='Book'}
        <div class='tag' id='book'>Book</div>
    {:else if sourceType=='Movie'}
        <div class='tag' id='movie'>Movie</div>
    {:else}
        <div class='tag' id='tv_show'>TV Show</div>
    {/if}

    {timestamp}
</div>

<style>
    #post-outline {
        position: relative;
        margin-bottom: 10%;
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
        width: 12%;
        height: 50%;
    }

    .rating-buttons img {
        display: inline-block;
        height: 30%;
        width: 80%;
    }

    .rating-buttons {
        background: white;
        border: none;

    }

    #source {
        margin-left: 5%;
    }

    #book {
        background-color: rgba(243, 72, 72, 0.9);
    }

    #movie {
        background-color: rgba(135, 240, 93, 0.9);
    }

    #tv_show {
        background-color: rgba(83, 135, 230, 0.9);
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