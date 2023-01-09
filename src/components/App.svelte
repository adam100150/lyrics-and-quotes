<script lang="ts">
    import { auth, googleProvider } from '../database/firebase';
    import { authState } from 'rxfire/auth';
    import { signInWithPopup } from 'firebase/auth' 
    import Profile from './Profile.svelte';
    import Posts from './Posts.svelte';
    import PostForm from './PostForm.svelte';

    function login() {
        signInWithPopup(auth, googleProvider).catch((error) => {
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            console.error(`Error logging in user with email ${email}: ${errorMessage}`);
        });
    }

    let user;
    authState(auth).subscribe((u) => {
        user = u
        console.log(user);
    });

    let showNewPostForm: Boolean = false;
    let showNewPostFormFunc = function() {
        showNewPostForm = true;
    }


</script>

<main>
    {#if user}
        <Profile {...user}/>
	    <button class='app-buttons' id='logout-button' on:click={ () => auth.signOut() }>Logout</button>
        {#if !showNewPostForm}
            <button class='app-buttons' id='add-post-button' on:click={showNewPostFormFunc}>Add Post</button>
        {:else}
            <PostForm userID={user.uid}/>
        {/if}
        <Posts userID={user.uid}/>
    {:else}
        <h3>You are not logged in! Please login.</h3>
        <button class='app-buttons' on:click={login}>Signin with Google</button>
    {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h3 {
		text-transform: uppercase;
		font-size: 1em;
	}

    #logout-button {
        position: absolute;
        top: 90%;
        left: 5%;
        width: 20%;
    }

    #add-post-button {
        width: 200%;
        margin-bottom: 10%;
    }
</style>