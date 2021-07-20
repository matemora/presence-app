import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Home() {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if(auth.user) {
            history.push('/online');
        }
    }, [auth.user, history]);

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <button onClick={auth.signInWithGoogle}>
                Login with google
            </button>
        </div>
    );
}