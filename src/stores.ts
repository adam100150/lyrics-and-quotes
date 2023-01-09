import { writable, derived } from 'svelte/store';
import { query, orderByChild, equalTo, orderByKey } from 'firebase/database';
import { postListRef } from './database/firebase';

export const filterTypeWritable = writable('');

export const postsRef = derived(filterTypeWritable, $filterTypeWritable => {
    console.log(`${$filterTypeWritable}`);
    if ($filterTypeWritable === '') {
        return query(postListRef, orderByKey());
    }
    return query(postListRef, orderByChild('sourceType'), equalTo($filterTypeWritable));
});