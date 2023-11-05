import { useState } from "react";
import { getAiAssistantAnswer } from "../api/notes";
import { useAuth0 } from "@auth0/auth0-react";

const Assistant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [query, setQuery] = useState("")
    const [answer, setAnswer] = useState("")

    const clickHandler = async () => {
        const token = await getAccessTokenSilently()
        const res = await getAiAssistantAnswer(token, query)
        setAnswer(res)
    }

    return (
        <div>
            <input style={{ width: '500px' }} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={clickHandler}>send</button>
            <p>{answer}</p>
        </div>
    )
};

export default Assistant