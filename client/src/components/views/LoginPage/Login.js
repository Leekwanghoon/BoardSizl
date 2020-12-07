import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Helmet from "react-helmet";
import InterativeButton from '../../../utils/InterativeButton';
import Input from '../../../utils/Input';
import useInput from '../../../Hooks/useInput';



const Login = (props) => {

    const dispatch = useDispatch();
    
    const Email = useInput("");
    const Password = useInput("");

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: Email.value,
            password: Password.value
        }

        dispatch(loginUser(body)).then(response => {
            if (response.payload.loginSuccess) {
                props.history.push("/"); //시간이 오래걸리네 이거 해결하고싶다.
            } else {
                alert("Failed to Login");
            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                height:'80vh',
            }}>
                <form
                    style={{
                        display:"flex",
                        flexDirection:"column"
                    }}
                    onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <Input 
                        type="email"
                        {...Email}
                        placeholder="Email을 입력하세요"    
                    />
                    <label>Password</label>
                    <Input 
                        type="password"
                        {...Password} 
                        placeholder="password를 입력하세요"
                    />
                    <br/>
                    <InterativeButton text="login" onClick={onSubmitHandler} />
                </form>
            </div>
        </div>
    );
}

export default React.memo(withRouter(Login));