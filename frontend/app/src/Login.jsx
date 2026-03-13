import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import{useNavigate} from "react-router-dom"
import { useOutletContext } from "react-router-dom";

function Login() {

  const[email,setEmail]= useState("ss9824473@gmail.com");
  const[password,setPassword]=useState("Shubham@123")
  const[firstName,setfirstName]= useState("");
    const[lastName,setlastName]= useState("");
  const { toggleMenu, settoggleMenu } = useOutletContext();
  const navigate=useNavigate();

  let handleToggle=()=>{

  }

let handlebutton=async()=>{

  try{

    if(toggleMenu){
      const res= await axios.post("http://localhost:3000/login",{emailId:email, passWord:password}, { withCredentials: true})
      console.log(res.data);
      settoggleMenu(!toggleMenu);
      navigate("/dashboard")
      
  }

    else{

      const res=await axios.post("http://localhost:3000/register",{firstName:firstName, lastName:lastName, emailId:email, passWord:password },{withCredentials: true})
      console.log(res.data);
  }

  }



  catch(err){
  console.error(err);

  }


}






  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h4">{toggleMenu?"Login":"Register"}</Typography>

{  !toggleMenu &&     <TextField
          label="First Name"
          type="text"
          fullWidth
          onChange={(e)=>setfirstName(e.target.value)}
          value={firstName}
        />}

      {  !toggleMenu &&   <TextField
          label="Last Name"
          type="text"
          fullWidth
          onChange={(e)=>setlastName(e.target.value)}
          value={lastName}
        />}

        <TextField
          label="Email"
          type="email"
          fullWidth
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
        />

        <Button 
          variant="contained"
          fullWidth
          onClick={handlebutton}
        >
        {!toggleMenu?"Register":"Login"}
        </Button>

        <p onClick={()=>settoggleMenu(!toggleMenu)}>{toggleMenu ? "New User? Sign Up":"Existing User? Login"}</p>

      </Box>
    </Container>
  );
}

export default Login;