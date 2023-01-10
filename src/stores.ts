import { Writable, writable, derived } from 'svelte/store';
import { query, orderByChild, equalTo, orderByKey } from 'firebase/database';
import { postListRef } from './database/firebase';
import type { filter } from './types';

export const filterWritable: Writable<filter> = writable({filterKey:'',filterValue:''});

export const postsRef = derived(filterWritable, $filterWritable => {
    if (JSON.stringify($filterWritable) === '{"filterKey":"","filterValue":""}') {
        return query(postListRef, orderByKey());
    }

    return query(postListRef, orderByChild($filterWritable.filterKey), equalTo($filterWritable.filterValue));
});