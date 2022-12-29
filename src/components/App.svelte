<script>
    import { auth, googleProvider } from '../database/firebase';
    import { authState } from 'rxfire/auth';
    import { signInWithPopup } from 'firebase/auth' 
    import Profile from './Profile.svelte';
    import Posts from './Posts.svelte';

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
    });
</script>

<main>
    {#if user}
        <Profile {...user}/>
	    <button on:click={ () => auth.signOut() }>Logout</button>
    {:else}
        <h3>You are not logged in! Please login.</h3>
        <button on:click={login}>Signin with Google</button>
    {/if}

    <Posts/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1em;
	}
</style>