export type Comment = {
    userName: string;
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
    ownerImageURL: string;
    savedByCurrUser: boolean;
}

export type filter = {
    filterKey: string;
    filterValue: string;
}