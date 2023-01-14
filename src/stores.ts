import { Writable, writable, derived } from 'svelte/store';
import { query, orderByChild, equalTo, orderByKey } from 'firebase/database';
import { postListRef } from './database/firebase';
import type { Filter, User } from './types';

export const filterWritable: Writable<Filter> = writable({filterKey:'',filterValue:''});

export const postsRef = derived(filterWritable, $filterWritable => {
    if ($filterWritable.filterKey === 'savedByCurrUser' || $filterWritable.filterKey === '') {
        return query(postListRef, orderByKey());
    }
    return query(postListRef, orderByChild($filterWritable.filterKey), equalTo($filterWritable.filterValue));
});

export const userWritable: Writable<User> = writable({username:'',userImageURL:''});