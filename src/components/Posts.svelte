<script lang="ts">
    import { db } from '../database/firebase';
    import { ref, onValue, update, remove, get } from 'firebase/database'
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

    // Run this code block again upon change in any references
    $: {
        postViewDataEntries = [];
        // Getting all posts data
        onValue($postsRef, (snapshot) => {  
            let postDataList: Array<Post> = [];

            // For each post
            snapshot.forEach((childSnapshot) => {
                let postEntry = childSnapshot.val();
                postEntry['postID'] = childSnapshot.key;
                const userSavedPostsRef = ref(db, `users/${userID}`);
                onValue(userSavedPostsRef, (snapshot) => {
                    let newPostEntry = postEntry;
                    if (snapshot.val() !== null && snapshot.val().hasOwnProperty(postEntry.postID)) {
                        newPostEntry['savedByCurrUser'] = true;
                    } else {
                        newPostEntry['savedByCurrUser'] = false;
                    }                    
                    
                    if (postDataList.includes(postEntry)) {
                        postDataList[postDataList.indexOf(postEntry)] = newPostEntry;
                    } else {
                        postDataList.push(postEntry);
                    }
                    postViewDataEntries = postDataList;
                });
                
            });        
        });
    }

</script>

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
            {#if !($filterWritable.filterKey === 'savedByCurrUser') || ($filterWritable.filterKey === 'savedByCurrUser' && postViewData.savedByCurrUser)}
                <PostView on:updateSavedPostStatusEvent={handleUpdateSavedPostStatusEvent} on:votePostEvent={handleVotePost} {...postViewData} />
            {/if}
        {/each}
    {/if}

<style>
    h4 {
        text-align: center;
    }
</style>