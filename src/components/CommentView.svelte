<script lang="ts">
    export let username: string;
    export let userImageURL: string;
    export let text: string;
</script>

<div id='comment-outline'>
    <img src={userImageURL} alt=''>
    <div id='comment-content-outline'>
        <h4 style="margin-bottom: 0; margin-top: 0.5em; margin-left: 0.5em">{username}</h4>
        <p style="margin-top: 0em; margin-left:0.5em">{text}</p>
    </div>
</div>

<style>
    img {
        border-radius: 50%;
        width: 3em;
        height: 3em;
        float: left;
        margin-left: 2em;
    }

    #comment-content-outline {
        width: 80%;
        background-color: #c8e4f5;
        margin-left: 17%;
        padding: 0.001em 0.001em 0.001em 0.001em;
        border-radius: 10px;
        text-align: left;
    }

    #comment-outline {
        margin-top: 1em;
        margin-bottom: 1em;
    }

</style>