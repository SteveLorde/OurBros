import {User} from "./User.ts";

export interface Lobby {
    users: User[]
    datetime: number
    lobbyadmin: User
    
}