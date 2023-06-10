import React, { useState } from 'react'
import styles from './forgotPassword.module.css';
import LogoAlta from '../../assets/images/Logo_alta.svg'
import ForgotPassBackground from '../../assets/images/ForgotPassBackground.svg';
import { Input, ButtonOutline, Button, PasswordInput } from '../../components';
import { useNavigate } from "react-router-dom"

export const ForgotPassword = () => {

    const navigate = useNavigate();
    const [inputPassword, setInputPassword] = useState<string | null>();
    const [changePassword, setChangePassword] = useState<boolean>(false);

    const handleClickButton = () => {
        // if(inputPassword !== null && inputPassword?.includes("@")) return navigate('/')
        // return navigate('/')
        setChangePassword(true);
    }

    return (
        <div className={styles.container} >

            <div className={styles.leftSide}>
                <img src={LogoAlta} alt="logo" />
                {changePassword !== true ? <>
                    <h1>Đặt lại mật khẩu</h1>
                    <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
                    <Input
                        status={true}
                        placeholder=''
                        value=''
                        handleChange={(e) => setInputPassword(e.target.value)}
                    />

                    <div className={styles.btn}>
                        <ButtonOutline text='Hủy' handleClick={() => {
                            return navigate('/');
                        }} />

                        <Button text='Tiếp tục' handleClick={handleClickButton} />
                    </div>

                </> : <>

                    <h1>Đặt lại mật khẩu mới</h1>
                    <div>
                        <label>Mật khẩu</label>
                        <PasswordInput 
                            status={true} 
                            value=''
                            handleChange={(e) => console.log(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Nhập lại mật khẩu</label>
                        <PasswordInput 
                            status={true} 
                            value=''
                            handleChange={(e) => console.log(e.target.value)}
                        />
                    </div>

                    <Button text='Xác nhận' handleClick={() => navigate('/')} />
                </>

                }

            </div>

            <div className={styles.rightSide}>
                <img src={ForgotPassBackground} alt="background" />
            </div>

        </div>
    )
}
