﻿import {User} from "./User.ts";

export interface Lobby {
    id: number
    users?: User[]
    lobbyname?: string
    lobbyowner?: string
    usercount?: number
    datetime?: Date
}