import { useHistory } from "react-router-dom"

export function OtherPage() {
    const history = useHistory();
    return (
        <div>
            <h1>Página para testar se continuo online</h1>
            <button onClick={() => history.push('/online')}>Voltar</button>
        </div>
    )
}