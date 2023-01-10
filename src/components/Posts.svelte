<script lang="ts">
    import { db } from '../database/firebase';
    import { ref, onValue, update} from 'firebase/database'
    import PostView from './PostView.svelte';
    import { postsRef, filterTypeWritable } from '../stores';
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
            console.log('Running listener again');
            snapshot.forEach((childSnapshot) => {
                console.log(`Children in the current reference ${JSON.stringify(snapshot.val())}`);
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

</script>

<div>
    {#if postViewDataEntries.length === 0}
        <h4>
            Sorry, no {$filterTypeWritable} posts
        </h4>
    {:else}
        {#each postViewDataEntries as postViewData}
            <PostView on:votePostEvent={handleVotePost} {...postViewData} />
        {/each}
    {/if}
</div>