<script lang="ts">
    import { filterWritable } from '../stores';

    export let displayName: string;
    export let photoURL: string;
    export let uid: string;

</script>

<div>
    <h4>Hello {displayName}</h4>
    <img src={photoURL} referrerpolicy='no-referrer' alt='user avatar' >
    <button class='app-buttons profile-app-buttons' id='movie' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Movie'})}>Movies</button>
    <button class='app-buttons profile-app-buttons' id='tv-show' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'TV'})}>TV Shows</button>
    <button class='app-buttons profile-app-buttons' id='book' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Book'})}>Books</button>
    <button class='app-buttons profile-app-buttons' id='lyric' on:click={() => filterWritable.set({filterKey: 'sourceType', filterValue:'Lyric'})}>Lyrics</button>
    <button class='app-buttons profile-app-buttons' id='my-posts' on:click={() => filterWritable.set({filterKey: 'ownerID', filterValue:`${uid}`})}>My Posts</button>
</div>

<style>
    #my-posts {
        height: 30px;
    }

    div {
        width: 20%;
        position: absolute;
        top: 5%;
        left: 5%;
        border: 2px solid #000000;
        border-radius: 5px;
    }

    img {
        border-radius: 10px;
        margin-bottom: 5%;
        width: 40%;
    }
</style>