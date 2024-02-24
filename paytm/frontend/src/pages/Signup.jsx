import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeadings } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div>
        <div>
            <div>
                <Heading label={"Sign up"}/>
                <SubHeadings label ={"Enter your information to create a account"} />
                <InputBox onChange={e =>{
                    setFirstName(e.target.value);
                }} placeholder="Firts Name" label={"FirstName"} />
                <InputBox onChange={e=>{
                    setLastName(e.target.value);
                }} placeholder="lastName" label={"LastName"}/>
                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} placeholder="user@gmail.com" label={"Email"}/>
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="Password" label={"Password"}/>
                <div>
                    <Button onClick={ async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password 
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"}/>
                </div>
                    <BottomWarning label={"Already have a account?"}  buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}