import React,{ useCallback } from 'react';
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Input from '../../../utils/Input';
import InterativeButton from '../../../utils/InterativeButton';
import useInput from '../../../Hooks/useInput';

const Register = (props) => {

    const dispatch = useDispatch();

    const Email = useInput("");
    const Name = useInput("");
    const Password = useInput("");
    const ConfirmPassword = useInput("");
    
    const onSubmitHandler = useCallback((e) => {
        e.preventDefault();

        if(!Email.value || !Name.value || !Password.value || !ConfirmPassword.value) {
            alert("모든 칸을 채워주세요");
        }
        if( Password.value !== ConfirmPassword.value) {
            alert("비밀번호와 비밀번호확인 일치시켜야합니다.")
        }

        let body = {
            email: Email.value,
            password: Password.value,
            name: Name.value
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login');
                } else {
                    alert("Failed to sign up");
                }
            })
    },[Email,Password,Name,ConfirmPassword,dispatch,props.history]);
    return(
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div style={{
                display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'80vh'
            }}>
                <form style={{display:'flex', flexDirection:'column'}}
                    onSubmit={onSubmitHandler}
                >
                    <label>Email</label>
                    <Input 
                        type="email"
                        {...Email} 
                        placeholder="이메일을 입력해주세요"
                    />
                    <label>Name</label>
                    <Input 
                        type="text"
                        {...Name} 
                        placeholder="이름을 입력해주세요"    
                    />
                    <label>Password</label>
                    <Input 
                        type="password"
                        {...Password}
                        placeholder="비밀번호를 입력해주세요"    
                    />
                    <label>ConfirmPassword</label>
                    <Input 
                        type="password"
                        {...ConfirmPassword} 
                        placeholder="비밀번호를 확인해주세요"
                    />
                    <br />
                    <InterativeButton text="회원가입" onClick={onSubmitHandler} />
                </form>
            </div>
        </div>
    );
}

export default React.memo(withRouter(Register));