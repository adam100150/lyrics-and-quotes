<script lang="ts">
    import { db } from '../database/firebase';
    import { update, ref } from 'firebase/database';
    export let description: string;
    export let downvotes: number;
    export let quote: string;
    export let source: string;
    export let source_type: string;
    export let timestamp: Date;
    export let uid: string;
    export let upvotes: number;
    export let userImageUrl: string;
    export let username: string;

    var incrementUpvotes = function() {
        let updates = {};
        updates[`/posts/${uid}/upvotes`] = upvotes + 1;
        update(ref(db), updates);
    }

    var incrementDownvotes = function() {
        let updates = {};
        updates[`/posts/${uid}/downvotes`] = downvotes + 1;
        update(ref(db), updates);    
    }

</script>

<div id='post_outline'>
    <div id='username_outline'>{username}</div>
    <div id='pfp_outline'>
        <img src={userImageUrl} alt='user avatar' width=25% height=25%>
    </div>
    <h4 id='quote'>{quote}</h4>
    <p id='description'>{description}</p>
    <div id='upvotes_and_downvotes'>
        <button class='rating_buttons' on:click={incrementUpvotes}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989972.png' alt='up arrow'>
        </button>
        <div height='20%'>{upvotes - downvotes}</div>
        <button class='rating_buttons' height='30%' on:click={incrementDownvotes}>
            <img src='https://cdn-icons-png.flaticon.com/512/2989/2989995.png' height='30%' alt='down arrow'>
        </button>
    </div>
    <p id='source'>Source: {source}</p>
    
    {#if source_type=='Book'}
        <div class='tag' id='book'>Book</div>
    {:else if source_type=='Movie'}
        <div class='tag' id='movie'>Movie</div>
    {:else}
        <div class='tag' id='tv_show'>TV Show</div>
    {/if}

    {timestamp}
</div>

<style>
    #post_outline {
        position: relative;
        border: 2px solid #000000;
        border-radius: 5px;
        width: 200%;
        margin-bottom: 10%;
    }

    #username_outline {
        position: absolute;
        top: 6%;
        left: 5%;
        margin-left: 10%;
    }

    #pfp_outline {
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

    #upvotes_and_downvotes {
        position: absolute;
        top: 20%;
        left: 2%;
        width: 12%;
        height: 50%;
    }

    .rating_buttons img {
        display: inline-block;
        height: 30%;
        width: 80%;
    }

    .rating_buttons {
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