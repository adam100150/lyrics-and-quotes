<script lang="ts">
    import { auth, db } from '../database/firebase';
    import { ref, onValue, update, remove, get } from 'firebase/database'
    import PostView from './PostView.svelte';
    import { postsRef, filterWritable } from '../stores';
    import type { Post } from '../types';
    import { user } from 'rxfire/auth';
    
    export let userID: string;

    function handleVotePost(event) {
        const currentPostRef = ref(db, `/posts/${event.detail.postID}`);
        let updates = {
            'score': event.detail.newScore,
        };

        if (event.detail.upvote) {
            updates['usersUpvoted'] = {
                [userID]: true
            };
        } else {
            updates['usersDownvoted'] = {
                [userID]: true
            };
        }
        update(currentPostRef, updates);
    }

    function handleUpdateSavedPostStatusEvent(event) {
        if (event.detail.action === 'remove') {
            console.log(`Removing post ${event.detail.postID} from user ${userID}'s saved posts`);
            const savedPostRef = ref(db, `users/${userID}/${event.detail.postID}`);
            remove(savedPostRef);
        }
        else if (event.detail.action === 'save') {
            console.log(`Saving post ${event.detail.postID} to user ${userID}`);
            const allSavedPostsRef = ref(db, `users/${userID}/`);
            let updates = {};
            updates[`${event.detail.postID}`] = true;
            update(allSavedPostsRef, updates);
        }
    }
    
    let postViewDataEntries: Array<Post>;
    let containsSavedQuotes: boolean;
    
    // Run this code block again upon change in any references
    $: {
        containsSavedQuotes = false;
        postViewDataEntries = [];

        // Getting all posts data
        onValue($postsRef, (snapshot) => {  
            let postDataList: Array<Post> = [];
            
            // For each post
            snapshot.forEach((childSnapshot) => {
                // Add the postID to the post data
                let postEntry = childSnapshot.val();
                postEntry['postID'] = childSnapshot.key;
                
                // Check the voting status of the current user on this post and add it to post data
                if (postEntry.hasOwnProperty('usersUpvoted') && postEntry['usersUpvoted'].hasOwnProperty(userID)) {
                    postEntry['votedByCurrUser'] = 'upvote';
                    delete postEntry['usersUpvoted'];
                } else if (postEntry.hasOwnProperty('usersDownvoted') && postEntry['usersDownvoted'].hasOwnProperty(userID)) {
                    postEntry['votedByCurrUser'] = 'downvote';
                    delete postEntry['usersDownvoted'];
                } else {
                    postEntry['votedByCurrUser'] = 'noVote';
                }

                // Check if post is saved by current user
                const userSavedPostsRef = ref(db, `users/${userID}`);
                onValue(userSavedPostsRef, (snapshot) => {
                    let newPostEntry = postEntry;
                    if (snapshot.val() !== null && snapshot.val().hasOwnProperty(postEntry.postID)) {
                        newPostEntry['savedByCurrUser'] = true;
                        containsSavedQuotes = true;
                    } else {
                        newPostEntry['savedByCurrUser'] = false;
                    }                    
                    
                    if (postDataList.includes(postEntry)) {
                        postDataList[postDataList.indexOf(postEntry)] = newPostEntry;
                    } else {
                        postDataList.unshift(postEntry);
                    }
                    postViewDataEntries = postDataList;
                });
                
            });        
        });
    }

</script>
    {#if $filterWritable.filterKey === 'savedByCurrUser' && !containsSavedQuotes}
        <h4>
            You don't have any saved posts
        </h4>
    {:else if postViewDataEntries.length === 0}
        {#if $filterWritable.filterKey === 'sourceType'}
            <h4>
                Sorry no {$filterWritable.filterValue} posts
            </h4>
        {:else}
            <h4>
                You haven't posted anything yet
            </h4>
        {/if}
    {:else}
        {#each postViewDataEntries as postViewData}
            {#if !($filterWritable.filterKey === 'savedByCurrUser') || ($filterWritable.filterKey === 'savedByCurrUser' && postViewData.savedByCurrUser)}
                <PostView on:updateSavedPostStatusEvent={handleUpdateSavedPostStatusEvent} on:votePostEvent={handleVotePost} {...postViewData} />
            {/if}
        {/each}
    {/if}

<style>
    h4 {
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>