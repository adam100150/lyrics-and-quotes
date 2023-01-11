<script lang="ts">
    import { db } from '../database/firebase';
    import { ref, onValue, update, remove } from 'firebase/database'
    import PostView from './PostView.svelte';
    import { postsRef, filterWritable } from '../stores';
    import type { Post } from '../types';
    
    export let userID: string;

    function handleVotePost(event) {
        const currentPostRef = ref(db, `/posts/${event.detail.postID}`);
        
        let updates = {
            'score': event.detail.newScore,
            usersVoted: {
                [userID]: true
            }
        };
        update(currentPostRef, updates);
    }

    function handleUpdateSavedPostStatusEvent(event) {
        console.log('Updating saved post status');
        console.log(`Event details: ${JSON.stringify(event.detail)}`);
        if (event.detail.action === 'remove') {
            const savedPostRef = ref(db, `users/${userID}/savedPosts/${event.detail.postID}`);
            remove(savedPostRef);
        }
        else if (event.detail.action === 'save') {
            console.log(`Saving post ${event.detail.postID} to user ${userID}`);
            const allSavedPostsRef = ref(db, `users/${userID}/savedPosts/`);
            let updates = {};
            updates[`${event.detail.postID}`] = true;
            update(allSavedPostsRef, updates);
        }
    }
    
    let postViewDataEntries: Array<Post>;

    // Run this code block again upon change in any references
    $: {
        postViewDataEntries = [];
        
        // Getting all posts data
        onValue($postsRef, (snapshot) => {  
            let postDataList = [];
            
            // For each post
            snapshot.forEach((childSnapshot) => {
                let postEntry = childSnapshot.val();
                postEntry['postID'] = childSnapshot.key;
                const ownerDataRef = ref(db, `users/${postEntry.ownerID}`);
                
                // After you retreived the post information, get the owner's information
                onValue(ownerDataRef, (snapshot) => {
                    postEntry['username'] = snapshot.val().username;
                    postEntry['userImageUrl'] = snapshot.val().userImageUrl;
                    
                    // After you retreived the owner's information, check if the current post was saved by the current user
                    const userSavedPostsRef = ref(db, `users/${userID}/savedPosts`);
                    onValue(userSavedPostsRef, (snapshot) => {
                        if (snapshot.val() !== null && snapshot.val().hasOwnProperty(postEntry.postID)) {
                            postEntry['savedByCurrUser'] = true;
                        } else {
                            postEntry['savedByCurrUser'] = false;
                        }

                        // Finally, add post data to the post entry list
                        postDataList.push(postEntry);
                        postViewDataEntries = postDataList;
                    });
                });
            });        
        });
    }

</script>

<div>
    {#if postViewDataEntries.length === 0}
        {#if $filterWritable.filterKey === 'sourceType'}
            <h4>
                Sorry no {$filterWritable.filterValue} posts
            </h4>
        {:else if $filterWritable.filterKey === 'ownerID'}
            <h4>
                You haven't posted anything yet
            </h4>
        {:else}
            <h4>
                You don't have any saved posts
            </h4>
        {/if}
    {:else}
        {#each postViewDataEntries as postViewData}
            <PostView on:updateSavedPostStatusEvent={handleUpdateSavedPostStatusEvent} on:votePostEvent={handleVotePost} {...postViewData} />
        {/each}
    {/if}
</div>

<style>
    div {
        width: 200%;
    }

    h4 {
        text-align: center;
    }
</style>