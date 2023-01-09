<script>

</script>

<div class='feed-component-outline'>
    <form action='/my-handling-form-page' method='post'>
        <ul>
          <li>
            <label for='quote'>Quote:</label>
            <textarea placeholder='The way to get started is to quit talking and begin doing.' cols=40 class='input-fields'></textarea>
          </li>
          <li>
            <label for='description'>Description:</label>
            <textarea placeholder='I like this quote because...' cols=40 class='input-fields'></textarea>
          </li>
          <li>
            <label for='source'>Source:</label>
            <input class='input-fields' size=40 type='text' placeholder='Walt Disney'>
          </li>
          <li>
            <label id='select-label' for='source-type'>Source Type:</label>
            <select id='select-item' class='input-fields'>
                <option value='movie'>Movie</option>
                <option value='book'>Book</option>
                <option value='lyric'>Lyric</option>
            </select>
          </li>
        </ul>
        <button class='app-buttons' id='submit-button' type='submit'>Submit</button>
        <button class='app-buttons' id='cancel-button'>Cancel</button>
      </form>
      
</div>

<style>
    #select-item {
        float: left;
        margin-left: 3%;
    }

    #submit-button {
        width: 30%;
        height: 30px;
        background-color: rgb(42, 192, 8);
        display: inline-block;
        margin-right: 30%;
    }

    #cancel-button {
        width: 30%;
        height: 30px;
        background-color: red;
        display: inline-block;
    }

    form {
        /* Center the form on the page */
        margin: 0 auto;
        width: 400px;
        /* Form outline */
        padding: 1em;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    form li + li {
        margin-top: 1em;
    }

    label {
        /* Uniform size & alignment */
        display: inline-block;
        width: 80px;
        text-align: right;
        font-size: small;
        float: left;
    }

    .input-fields {
        font-family: inherit;
        -webkit-padding: 0.4em 0;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 2px;
    }
    
    textarea {
        vertical-align: top;
    }

    input, select {
        vertical-align: middle;
    }
</style>