<script lang="ts">
    import { db } from '../database/firebase';
    import { 
        ref, 
        query,
        orderByKey,
        onValue,
        push
    } from 'firebase/database'
    import PostView from './PostView.svelte';
    import type { Post } from '../types';
    import { loop_guard } from 'svelte/internal';
    
    export let user_uid;

    const postsRef = ref(db, 'posts');
    const orderedPostsRef = query(postsRef, orderByKey()); 

    let dataEntries = [];
    onValue(orderedPostsRef, (snapshot) => {
       dataEntries = Object.entries(snapshot.val()); 
    });

</script>

<p>
    {#each dataEntries as [postUID, postData]}

        <PostView uid={postUID}
            description={postData.description}
            quote={postData.quote}
            source={postData.source}
            source_type={postData.source_type}
            timestamp={postData.timestamp}
            score={postData.score}
            userImageUrl={postData.userImageUrl}
            username={postData.username}
            {user_uid}
            users_voted={postData.users_voted}
            />

    {/each}
</p>