import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

interface UserOnlineInfo {
    state: string;
    name: string;
}

export function OnlinePage() {
    const { user } = useAuth();
    const history = useHistory();
    const [onlineUsers, setOnlineUsers] = useState<UserOnlineInfo[]>([]);

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }
        const uid = user.id;
        const userStatusDatabaseRef = database.ref('/status/' + uid);
        const isOfflineForDatabase = {
            state: 'offline',
            name: user.name,
            last_changed: (new Date()).toString(),
        };

        const isOnlineForDatabase = {
            state: 'online',
            name: user.name,
            last_changed: (new Date()).toString(),
        };
        database.ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() === false) {
                return;
            };
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });
        return () => database.ref('.info/connected').off('value');
    }, [history, user]);

    useEffect(() => {
        const onlineRef = database.ref('/status/');
        onlineRef.on('value', status => {
            const parsedUsers = Object.entries(status.val() as Record<string, UserOnlineInfo>).map(([key, value]) => {
                return {
                    state: value.state,
                    name: value.name,
                };
            });
            setOnlineUsers(parsedUsers);
        });
        return () => onlineRef.off('value');
    }, []);

    return (
        <div className="App">
            <h1>Pessoas online</h1>
            {onlineUsers.filter(user => user.state === 'online').map(user => (
                <p key={user.name}>{user.name}</p>
            ))}
        </div>
    );
}