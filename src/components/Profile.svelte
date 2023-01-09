<script lang="ts">
    import { filterTypeWritable } from '../stores';

    export let displayName: string;
    export let photoURL: string;

</script>

<div>
    <h4>Hello {displayName}</h4>
    <img src={photoURL} referrerpolicy='no-referrer' width=100 alt='user avatar' >
    <button class='app-buttons profile-app-buttons' id='movie' on:click={() => filterTypeWritable.set('Movie')}>Movies</button>
    <button class='app-buttons profile-app-buttons' id='tv-show' on:click={() => filterTypeWritable.set('TVShow')}>TV Shows</button>
    <button class='app-buttons profile-app-buttons' id='book' on:click={() => filterTypeWritable.set('Book')}>Books</button>
    <button class='app-buttons profile-app-buttons' id='lyric' on:click={() => filterTypeWritable.set('Lyric')}>Lyrics</button>
</div>

<style>
    div {
        width: 20%;
        position: absolute;
        height: 80%;
        top: 5%;
        left: 5%;
        border: 2px solid #000000;
        border-radius: 5px;
    }

    img {
        border-radius: 5px;
        margin-bottom: 5%;
    }
</style>