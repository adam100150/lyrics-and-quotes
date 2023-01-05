<script lang="ts">
    import { db } from '../database/firebase';
    import { 
        ref, 
        query,
        orderByKey,
        onValue,
        onChildAdded,
        child
    } from 'firebase/database'
    import PostView from './PostView.svelte';
    // import type { Post } from '../types';

    const postsRef = ref(db, 'posts');
    const orderedPostsRef = query(postsRef, orderByKey()); 

    
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

    // let postViewDataEntries = [
    //     {
    //         "postID": "-NJqLhEErKIxi5vcCARz",
    //         "description": "Really cool quote!",
    //         "ownerID": " Le3PaSaVQmULb7PlkOhbn7ZwaPB2",
    //         "quote": "One day... you may face such a moment of crisis. And in that moment, I hope you have a friend like I did, to plunge their hands into the filth so that you can keep yours clean!",
    //         "score": 13,
    //         "source": "The Dark Knight Rises",
    //         "sourceType": "Movie",
    //         "userImageUrl": "https://lh3.googleusercontent.com/a/AEdFTp5VitqB7pO84FBfw2AJQ6CdNLcWloHwLwoqjj3-ERs=s96-c",
    //         "username": "Adam Ashkenazi",
    //         "timestamp": "12:20 PM Mon Dec 19 2022",
    //         "usersVoted": {
    //             "this": "\"\""
    //         }
    //     },
    //     {
    //         "postID": "-NJqcpsBiZt4bj7pkxiQ",
    //         "description": "Love Catch 22!",
    //         "ownerID": " Le3PaSaVQmULb7PlkOhbn7ZwaPB2",
    //         "quote": "Anything worth dying for, is certainly worth living for.",
    //         "score": 12,
    //         "source": "Catch 22",
    //         "sourceType": "Book",
    //         "timestamp": "1:41 PM Wed Dec 21 2022",
    //         "userImageUrl": "https://lh3.googleusercontent.com/a/AEdFTp5VitqB7pO84FBfw2AJQ6CdNLcWloHwLwoqjj3-ERs=s96-c",
    //         "username": "Adam Ashkenazi",
    //         "usersVoted": {
    //             "this": ""
    //         }
    //     }
    // ]

    

</script>

<p>
    {#each postViewDataEntries as postViewData}
        <PostView {...postViewData} />
    {/each}
</p>