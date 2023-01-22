<script lang="ts">
    import { filterWritable } from '../stores';
    import { auth } from '../database/firebase';
    export let displayName: string;
    export let photoURL: string;
    export let uid: string;

</script>

<div>
    <h4>Hello {displayName}</h4>
    <img src={photoURL} referrerpolicy='no-referrer' alt='user avatar' >
    <button class='app-buttons profile-app-buttons movie' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Movie'})}>Movies</button>
    <button class='app-buttons profile-app-buttons tv-show' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'TV'})}>TV Shows</button>
    <button class='app-buttons profile-app-buttons book' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Book'})}>Books</button>
    <button class='app-buttons profile-app-buttons lyric' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Lyric'})}>Lyrics</button>
    <button class='app-buttons profile-app-buttons real-life' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'RealLife'})}>Real Life</button>
    <button class='app-buttons profile-app-buttons' on:click={() => filterWritable.set({filterKey: 'ownerID', filterValue:`${uid}`})}>My Posts</button>
    <button class='app-buttons profile-app-buttons' on:click={() => filterWritable.set({filterKey: 'savedByCurrUser', filterValue: 'true'})}>Saved Posts</button>
    <button class='app-buttons profile-app-buttons' on:click={() => filterWritable.set({filterKey: '', filterValue: ''})}>Reset Filter</button>
    <button class='app-buttons profile-app-buttons' id='logout-button' on:click={ () => auth.signOut() }>Logout</button>
</div>

<style>
    div {
        position: fixed;
        top: 4.7em;
        left: 0%;
        height: 87%;
        border-right: 2px solid #000;
        border-bottom: 2px solid #000;
        background: #fff;
        overflow-y: auto;
	    width: 15em;
    }

    img {
        border-radius: 10px;
        margin-bottom: 2em;
        width: 7em;
    }
</style>