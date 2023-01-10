<script lang="ts">
    import { db } from '../database/firebase';
    import { ref, onValue, update} from 'firebase/database'
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
    
    let postViewDataEntries: Array<Post>;

    // Run this code block again upon change in any references
    $: {
        postViewDataEntries = [];
        onValue($postsRef, (snapshot) => {  
            let postDataList = [];
            snapshot.forEach((childSnapshot) => {
                let postEntry = childSnapshot.val();
                postEntry['postID'] = childSnapshot.key;
                const ownerDataRef = ref(db, `users/${postEntry.ownerID}`);
                
                onValue(ownerDataRef, (snapshot) => {
                    postEntry['username'] = snapshot.val().username;
                    postEntry['userImageUrl'] = snapshot.val().userImageUrl;
                    postDataList.push(postEntry);
                    postViewDataEntries = postDataList;
                });
            });        
        });
    }

    const userSavedPostsRef = ref(db, `users/${userID}/savedPosts`);
    // console.log(userID);
    onValue(userSavedPostsRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
            // let userPostID = snapshot.val();
        });
    });

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
            <PostView on:votePostEvent={handleVotePost} {...postViewData} />
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