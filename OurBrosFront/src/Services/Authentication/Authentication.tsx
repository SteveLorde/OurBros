
let sessiontoken : string = " "
let username : string = ""

export function storesession(token : string, name: string) {
    
    sessiontoken = token
    username = name
    
}

export function getsessiontoken() {
    return sessiontoken
}

export function getsessionusername() {
    return username
}