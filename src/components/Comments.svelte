<script lang="ts">
    import { onValue, push, ref, set } from "firebase/database";
    import { db } from '../database/firebase';
    import type { Comment } from '../types';
    import CommentForm from "./CommentForm.svelte";
    import CommentView from "./CommentView.svelte";
    import { userWritable } from "../stores";
    import { createEventDispatcher } from "svelte";

    export let postID: string;

    const dispatch = createEventDispatcher();
    
    let comments: Array<Comment> = [];
    onValue(ref(db, `comments/${postID}`), (snapshot) => {
        let commentsData = [];
        snapshot.forEach((childSnapshot) => {
            commentsData.push(childSnapshot.val());
            comments = commentsData;
        })
    });

    function commentFormHandler(event) {
        showNewCommentForm = false;
        if (event.detail === null) {
            return;
        }

        let newCommentData: Comment = {
            username: $userWritable.username,
            userImageURL: $userWritable.userImageURL,
            text: `${event.detail.text}`
        }

        const newCommentRef = push(ref(db, `comments/${postID}`));
        set(newCommentRef, newCommentData)
        .catch(() => console.log('Could not add comment'))
        .then(() => console.log('Successfully added comment'));

    }

    let showNewCommentForm: boolean = false;
</script>

{#if showNewCommentForm}
    <CommentForm on:commentFormFinished={commentFormHandler}/>
{/if}

{#if comments.length === 0}
    <h4>There are no comments for this post</h4>
{:else}
    {#each comments as comment}
        <CommentView {...comment}/>
    {/each}
{/if}

{#if !showNewCommentForm}
    <button class='app-buttons' style="width:70%; margin-bottom:0.5em" on:click={() => showNewCommentForm = true}>Add Comment</button>
{/if}
<button class='app-buttons' style="width:70%; margin-bottom:1em" on:click={() => dispatch('hideCommentsEvent')}>Hide Comments</button>

