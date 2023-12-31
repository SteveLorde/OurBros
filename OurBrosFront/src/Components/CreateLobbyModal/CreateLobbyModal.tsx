﻿import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as lobbiesservice from "../../Services/Lobbies/LobbiesService.tsx";
import {NewLobby} from "../../Data/Models/NewLobby.ts";
import './createlobbymodal.css'


export function CreateLobbyModal({IsOpen,closewindow} : any) {
    
    if (!IsOpen) return null;
    
    const { register, handleSubmit} = useForm<NewLobby>();
    const reactnavigate = useNavigate()

    async function CreateLobby(formdata : NewLobby) {
        let check = await lobbiesservice.CheckPassword(formdata.lobbypassword)
        if (check == true) {
            let checkcreate = await lobbiesservice.CreateLobby(formdata)
            if (checkcreate) {
                closewindow()
            }
        } else {
            console.log('create lobby failed')
        }
    }
    
    // @ts-ignore
    return (
        <>
            <form onSubmit={handleSubmit( (data : NewLobby) => CreateLobby(data))}>
                <h2>Lobby Name</h2>
                <input type="text" {...register("lobbyname")}/>
                <h2>Lobby Password</h2>
                <input type="text" {...register("lobbypassword")}/>
                <button type="submit">Create Lobby</button>
            </form>
        </>
    );
}