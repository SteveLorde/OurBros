import {User} from "./User.ts";

export interface Lobby {
    users: User[]
    name: string
    datetime: Date
}