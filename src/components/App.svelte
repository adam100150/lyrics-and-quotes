<script lang="ts">
    import { auth, googleProvider } from '../database/firebase';
    import { authState } from 'rxfire/auth';
    import { signInWithPopup, User } from 'firebase/auth' 
    import Profile from './Profile.svelte';
    import Posts from './Posts.svelte';
    import PostForm from './PostForm.svelte';
    import { get, ref, set } from 'firebase/database';
    import { db } from '../database/firebase';
    import Header from './Header.svelte';

    function login() {
        signInWithPopup(auth, googleProvider).catch((error) => {
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.error(`Error logging in user with email ${email}: ${errorMessage}`);
        });
    }

    let user: User;
    authState(auth).subscribe((u: User) => {
        user = u;
        console.log(`Signing in user with ID: ${user.uid} and adding user ID to database`);
        const userRef = ref(db, `users/${user.uid}`);
       
        get(userRef).then((snapshot) => {
            if (!snapshot.exists()) {
                let userData = {
                  'postID': 'something else'
                };

                set(ref(db, `users/${user.uid}`), userData)
                .catch(() => {
                    console.error('User was not added to database. Invalidating user authentication'); 
                    user = null;
                }).then(() => {
                    console.log(`User with id: ${user.uid} was successfully added to user database`)
                });
            }
        });
    });

    let showNewPostForm: Boolean = false;
    function toggleShowNewPostForm() {
        showNewPostForm = !showNewPostForm;
    }

</script>

<main>
    {#if user}
        <Header />
        <Profile {...user} />
        {#if !showNewPostForm}
            <button class='app-buttons' id='add-post-button' on:click={toggleShowNewPostForm}>Add Post</button>
        {:else}
            <PostForm on:formFinished={toggleShowNewPostForm} {...user}/>
        {/if}
        <Posts userID={user.uid}/>
    {:else}
        <h3>You are not logged in! Please login.</h3>
        <button class='app-buttons' style="width: 60%;" on:click={login}>Signin with Google</button>
    {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 100em;
		margin: 0 auto;
	}

    #add-post-button {
        width: 50%;
        margin-bottom: 3em;
        margin-top: 7em;
        margin-left: 20%;
    }
</style>