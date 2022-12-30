<script lang="ts">
    import { db } from '../database/firebase';
    import { 
        ref, 
        query,
        orderByKey,
        onValue
    } from 'firebase/database'
    import PostView from './PostView.svelte';
    import type { Post } from '../types';
    import { loop_guard } from 'svelte/internal';
    
    const postsRef = ref(db, 'posts');
    const orderedPostsRef = query(postsRef, orderByKey()); 

    let dataEntries = [];
    onValue(orderedPostsRef, (snapshot) => {
       dataEntries = Object.entries(snapshot.val()); 
       console.log(dataEntries);
    });

</script>

<p>
    {#each dataEntries as [postUID, postData]}

        <PostView uid={postUID}
            description={postData.description}
            downvotes={postData.downvotes}
            quote={postData.quote}
            source={postData.source}
            source_type={postData.source_type}
            timestamp={postData.timestamp}
            upvotes={postData.upvotes}
            userImageUrl={postData.userImageUrl}
            username={postData.username}
            />

    {/each}
</p>