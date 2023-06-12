import React, { useState } from 'react'
import LoginImage from '../../assets/images/loginImage.svg';
import LogoAlta from '../../assets/images/Logo_alta.svg';
import warning from '../../assets/images/warning.svg';
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Input } from '../../components';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import { account } from '../../types';
import { updateData } from '../../config/firebase/firestore';
import { useDispatch } from 'react-redux';
import { changeAccountLogin } from '../../store/reducers/accountSlice';

type Account = {
    userName: string | undefined,
    password: string | undefined
}


const setCookie = (name: string, value: any, day: number) => {
    let expires = "";
    if (day) {
        const date = new Date();
        date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const Login = () => {

    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account | null>(null);
    const [isCorrect, setIsCorrect] = useState(true)

    const handleClick = async () => {
        if (account === null || account.userName === undefined || account.password === undefined) {
            return setIsCorrect(false);
        }

        let isLogin = {} as account;
        const q = query(collection(db, "accounts"), where("username", "==", account.userName), where("password", "==", account.password));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            isLogin = { ...doc.data(), id: doc.id } as account;
        });

        if (isLogin.id !== '') {
            isLogin.status = "Hoạt động"
            const updateStatus = await updateData(isLogin, 'accounts')
            if (updateStatus === null) return;
            dispatch(changeAccountLogin(isLogin))
            setCookie("isLogin", isLogin.id, 1);
            return navigate('/trangchu');
        }
        return;
    }

    return (
        <div className={styles.container} >
            <div className={styles.loginForm}>

                <div>
                    <div className={styles.logo}>
                        <img src={LogoAlta} alt="logo alta" />
                    </div>
                    <div className={styles.username}>
                        <label className={styles.label} htmlFor="name">Tên đăng nhập *</label>
                        <Input
                            status={isCorrect}
                            placeholder=''
                            value=''
                            handleChange={(e) => {
                                setAccount({
                                    userName: e.target.value,
                                    password: account?.password,
                                })
                            }}
                        />
                    </div>

                    <div className={styles.password}>
                        <label className={styles.label} htmlFor="password">Mật khẩu *</label>

                        <PasswordInput
                            status={isCorrect}
                            value=''
                            handleChange={(e) =>
                                setAccount({
                                    userName: account?.userName,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    {isCorrect !== true &&
                        <div className={styles.warning} >
                            <img src={warning} alt="warning icon" />
                            <p>Sai mật khẩu hoặc tên đăng nhập</p>
                        </div>
                    }

                    {isCorrect && <a href='/quenmatkhau' className={styles.forgotPass}>Quên mật khẩu ?</a>}
                    <div className={styles.loginBtn}>
                        <div onClick={handleClick} >
                            <p>Đăng nhập</p>
                        </div>
                        {isCorrect !== true && <a href='/quenmatkhau' className={styles.forgotPass}>Quên mật khẩu ?</a>}
                    </div>

                </div>
            </div>

            <div className={styles.leftBackground}>
                <img src={LoginImage} alt='loginImage' />
                <p>Hệ thống <br /> <span>Quản lý xếp hàng</span></p>
            </div>
        </div>
    )
}
