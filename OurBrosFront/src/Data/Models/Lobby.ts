import {User} from "./User.ts";

export interface Lobby {
    id: number
    users?: User[]
    lobbyName?: string
    lobbyOwner?: string
    datetime?: Date
}