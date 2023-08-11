import { useAuth0} from '@auth0/auth0-react'
export function Login() {
    
    //variables
    //---------
    
    
    //functions
    //---------
    const loginwithredirect = useAuth0()

    
    //view
    //----
    return (
        <>
            <button onClick={ () => loginwithredirect }>Auth0 Login</button>
        </>
    );
}