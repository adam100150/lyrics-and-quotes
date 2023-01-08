<script>
    export let displayName;
    export let photoURL;
</script>

<div>
    <h4>Hello {displayName}</h4>
    <img src={photoURL} referrerpolicy='no-referrer' width=100 alt='user avatar' >
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
    }
</style>