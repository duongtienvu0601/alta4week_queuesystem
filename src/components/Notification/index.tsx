import React from 'react';
import styles from './notification.module.css';

export const Notification = () => {
  return (
    <div className={styles.container} >
        <div className={styles.header} >
            <p>Thông báo</p>
        </div>

        <div className={styles.content} >
            <div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div>

            <div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div>

            <div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div>

            <div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div><div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div><div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div><div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div><div className={styles.item} >
                <p className={styles.from} >Người dùng: Nguyễn Thị Thùy Dung</p>
                <p className={styles.date} >Thời gian nhận số: 12h20 ngày 30/11/2021</p>
            </div>
        </div>
    </div>
  )
}
