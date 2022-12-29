<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<h1>Hello {displayName}</h1>
<img src={photoURL} referrerpolicy='no-referrer' width=100 alt='user avatar'>
<p>Your user id: {uid}</p>