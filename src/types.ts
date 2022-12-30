export type Comment = {
    userName: string;
    text: string;
};

export type Post = {
    description: string;
    downvotes: number;
    quote: string;
    source: string;
    source_type: string;
    timestamp: Date;
    uid: string;
    upvotes: number;
}