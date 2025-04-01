export interface Comment {

    id? : number;
    postId? : number;
    user : string;
    message : string;
    createdAt?: Date;
}
