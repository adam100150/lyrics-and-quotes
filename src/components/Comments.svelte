<script lang="ts">
    import { child, onValue, ref } from "firebase/database";
    import { db } from '../database/firebase';
    import type { Comment } from '../types';
    import CommentForm from "./CommentForm.svelte";
    import CommentView from "./CommentView.svelte";

    export let postID: string;

    let comments: Array<Comment> = [];
    onValue(ref(db, `comments/${postID}`), (snapshot) => {
        let commentsData = [];
        snapshot.forEach((childSnapshot) => {
            commentsData.push(childSnapshot.val());
            comments = commentsData;
        })
    });

    let showNewCommentForm: boolean = false;
</script>

{#if showNewCommentForm}
    <CommentForm on:commentFormFinished={() => {console.log('Comment form finished'); showNewCommentForm = false}}/>
{/if}

{#if comments.length === 0}
    <h4>There are no comments for this post</h4>
{:else}
    {#each comments as comment}
        <CommentView {...comment}/>
    {/each}
{/if}

{#if !showNewCommentForm}
    <button class='app-buttons' style="width:70%; margin-bottom:1em" on:click={() => showNewCommentForm = true}>Add Comment</button>
{/if}

