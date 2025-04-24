import "./landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <>
            <h1 id="welcome">Practoni</h1>
            <h4 id="slogan">Practice made personal.</h4>
            <button id="toLogin"
                onClick = {() => {
                    navigate("/login");
                }}
            >Get Started</button>

        </>
    )
}