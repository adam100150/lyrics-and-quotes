<script lang="ts">
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

    let showNewPostForm: Boolean = false;
    var showNewPostFormFunc = function() {
        showNewPostForm = true;
    }

</script>

<main>
    {#if user}
        <Profile {...user}/>
	    <button class='button-9' id='logout_button' on:click={ () => auth.signOut() }>Logout</button>
        {#if !showNewPostForm}
            <button class='button-9' id='add_post_button' on:click={showNewPostFormFunc}>Add Post</button>
        {:else}
            <form id='post_form' style="width:200%" action="" method="post">
                <ul>
                <li>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="user_name" />
                </li>
                <li>
                    <label for="mail">Email:</label>
                    <input type="email" id="mail" name="user_email" />
                </li>
                <li>
                    <label for="msg">Message:</label>
                    <textarea id="msg" name="user_message"></textarea>
                </li>
                </ul>
            </form>
        {/if}
        <Posts />
    {:else}
        <h3>You are not logged in! Please login.</h3>
        <button on:click={login}>Signin with Google</button>
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
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1em;
	}

    #post_form {
        width: 100%;
    }

    #logout_button {
        position: absolute;
        top: 90%;
        left: 5%;
        width: 20%;
    }

    #add_post_button {
        width: 200%;
    }
</style>