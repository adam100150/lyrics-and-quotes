<script lang="ts">
    import { db, postListRef } from '../database/firebase';
    import { 
        ref, 
        query,
        orderByKey,
        onValue,
        update
    } from 'firebase/database'
    import PostView from './PostView.svelte';
    export let userID;
    // import type { Post } from '../types';

    const orderedPostsRef = query(postListRef, orderByKey()); 


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
    
    let postViewDataEntries = [];

    onValue(orderedPostsRef, (snapshot) => {        
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

</script>

<p>
    {#each postViewDataEntries as postViewData}
        <PostView on:votePostEvent={handleVotePost} {...postViewData} />
    {/each}
</p>