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
    
    const postsRef = ref(db, 'posts');
    const orderedPostsRef = query(postsRef, orderByKey()); 

    let posts: Array<Post> = null;
    onValue(orderedPostsRef, (snapshot) => {
        posts = Object.values(snapshot.val());
    });

</script>

<p>
    {#each posts as post}
        <PostView {...post}/>
    {/each}
</p>