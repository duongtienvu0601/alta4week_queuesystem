import React from 'react'
import { Button, ButtonOutline, Dropdown } from '../../../components'
import styles from './newNumberLevel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { removeLastItemBreadScrumb } from '../../../utils';
import { changeValue } from '../../../store/reducers/breadcrumbSlice';

export const NewNumberLevel = () => {

    const breadcrumbState = useSelector((state: RootState) => state.breadcrumb.value);
    const servicesState = useSelector((state: RootState) => state.service.services);
    const dispatch = useDispatch<any>();


    const handleCancel = () => {
        const res = removeLastItemBreadScrumb(breadcrumbState);
        return dispatch(changeValue(res.newArray));
    }

    const displayServiceForDropdown = () => {
        const servicesIsActive: string[] = [];
        servicesState.forEach((item) => {
            if(item.activeStatus.match("Hoạt động")) servicesIsActive.push(item.serviceName)
        })
        return servicesIsActive;
    }

    return (
        <div className={styles.newContainer} >
            <h1>Cấp số mới</h1>
            <p>Dịch vụ khách hàng lựa chọn</p>
            <Dropdown
                value={''}
                setWidth='300'
                onClick={(value) => console.log(value)}
                data={displayServiceForDropdown()}
            />

            <div className={styles.buttons} >
                <ButtonOutline
                    text='Hủy bỏ'
                    handleClick={() => handleCancel()}
                />

                <Button
                    text='In số'
                    handleClick={() => console.log('In số')}
                />
            </div>
        </div>
    )
}
