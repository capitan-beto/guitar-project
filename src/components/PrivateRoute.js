import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"
import app from './base';
import LoginError from './LoginError';
import Logout from './Logout';
import AddFile from './AddFile';
import {
    getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

const PrivateRoute = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [logState, setLogState] = useState(false);

    const auth = getAuth(app);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginEmailPassword();
    }

    useEffect(() => {
      const monitorAuthState = () => onAuthStateChanged(auth, 
        async (user) => {
          if (user) return setLogState(true);
          return setLogState(false);
        });

      return () => monitorAuthState();
    }, [auth])

    const loginEmailPassword = async () => {
        const loginEmail = email;
        const loginPassword = password;
        try {
          setError(false);
          const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        }
        catch(error) {
          setError(true);
          createErrorMessage(error.code);
          console.log(error);
        }
    }

    const createErrorMessage = (error) => {
      if (error == "auth/user-not-found") setMsg("Email incorrecto");
      else if (error == "auth/wrong-password") setMsg("Contraseña incorrecta");
      else setMsg("Ocurrió un error, por favor intente más tarde");
    }

  return logState ?(
    <div>
      <Logout auth={auth} className="p-5"/>
      <AddFile/>
    </div>
  ) : (
    <div className='container-sm'>
      <h3>Es necesario que te identifiques para administrar los archivos</h3>
    <Form className='w-50 mx-auto p-5' onSubmit={handleSubmit}  aria-controls="example-collapse-text" aria-expanded={error}>
      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type='email'
         placeholder='my@adress.com'
         value={email}
         onChange={e => setEmail(e.target.value)}
         isInvalid={error}
         required
        />
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password'
         value={password}
         onChange={e => setPassword(e.target.value)}
         isInvalid={error}
         required
        />
      </Form.Group>
      <Collapse in={error}>
        <div>
          <LoginError error={error} msg={msg}/>
        </div>
      </Collapse>
      <Button variant='outline-dark' type='submit'>Submit</Button>
    </Form>
    </div>
  )
}

export default PrivateRoute