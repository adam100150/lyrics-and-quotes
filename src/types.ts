export type Comment = {
    username: string;
    userImageURL: string;
    text: string;
};

export type Post = {
    description: string;
    downvotes: number;
    quote: string;
    source: string;
    sourceType: string;
    timestamp: Date;
    ownerID: string;
    score: number;
    postID: string;
    ownerUsername: string;
    ownerUserImageURL: string;
    savedByCurrUser: boolean;
}

export type Filter = {
    filterKey: string;
    filterValue: string;
}

export type User = {
    username: string;
    userImageURL: string;
}