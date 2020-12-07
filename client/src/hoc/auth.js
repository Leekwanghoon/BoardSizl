import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';
export default function (SpecificComponent, option, adminRoute = null) {
    
    //null => 아무나 출입가능한 페이지
    //true => 로그인한 유저만 출입가능 isAuth
    //false => 로그인한 유저는 출입불가능 isAuth

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                // console.log(response);
                //로그인 하지않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/');
                    }
                //로그인 한 상태
                } else {
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/');
                    } else {
                        if(option === false) {
                            props.history.push('/');
                        }
                    }
                }
            })
        },[])

        return (
            <SpecificComponent {...props} user={user} />
        )

    }
    return AuthenticationCheck
}