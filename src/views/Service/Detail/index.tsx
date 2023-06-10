import React from 'react';
import styles from './detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ButtonBackAndUpdateIcon, DateButton, Dropdown, SearchText } from '../../../components';
import { removeLastItemBreadScrumb } from '../../../utils';
import { addValue, changeValue } from '../../../store/reducers/breadcrumbSlice';

const ruleTest = ["Tăng tự động", "Prefix", "Reset mỗi ngày"];

export const Detail = () => {

    const serviceState = useSelector((state: RootState) => state.service.service);
    const breadScrumState = useSelector((state: RootState) => state.breadcrumb.value);
    const dispatch = useDispatch<any>();

    const handleBack = () => {
        const res = removeLastItemBreadScrumb(breadScrumState)
        dispatch(changeValue(res.newArray));
    }

    const handleClickUpdate = () => {
        dispatch(addValue({title: "Cập nhật", path: ''}))
    }

    return (
        <div className={styles.detailContainer} >
            <div>
                <div className={styles.serviceInfo} >
                    <p>Thông tin dịch vụ</p>

                    <div>
                        <div>
                            <p>Mã dịch vụ:</p>
                            <p>{serviceState.serviceCode}</p>
                        </div>

                        <div>
                            <p>Tên dịch vụ:</p>
                            <p>{serviceState.serviceName}</p>
                        </div>

                        <div>
                            <p>Mô tả:</p>
                            <p>{serviceState.description}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.serviceRule} >
                    <p>Quy tắc cấp số</p>

                    <div>
                        {ruleTest.map((item) => {
                            if (item.match("Tăng tự động")) {
                                return (
                                    <div>
                                        <p>Tăng tự động:</p>
                                        <div className={styles.frameNumber} >
                                            0001
                                        </div>

                                        <p>đến</p>

                                        <div className={styles.frameNumber} >
                                            9999
                                        </div>
                                    </div>
                                )
                            }
                            if (item.match("Prefix")) {
                                return (
                                    <div>
                                        <p>Prefix</p>
                                        <div className={styles.frameNumber} >
                                            0001
                                        </div>
                                    </div>
                                )
                            }
                            if (item.match("Reset mỗi ngày")) {
                                return (
                                    <div>
                                        <p>Reset mỗi ngày</p>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div>
                        <p>Ví dụ: 201-0001</p>
                    </div>
                </div>
            </div>

            <div className={styles.table} >
                <div className={styles.filterBtn} >
                    <div>
                        <p>Trạng thái</p>
                        <Dropdown
                            data={["Tất cả", "Đã hoàn thành", "Đã thực hiện", "Vắng"]}
                            setWidth='130'
                            value={''}
                            onClick={(value) => console.log(value)}
                        />
                    </div>

                    <div>
                        <p>Chọn thời gian</p>
                        <DateButton

                        />
                    </div>

                    <div>
                        <p>Từ khóa</p>
                        <SearchText
                            setWidth={150}
                            onFind={(text) => console.log(text)}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div>
                <ButtonBackAndUpdateIcon
                    text='Cập nhật danh sách'
                    onClick={() => handleClickUpdate()}
                    onClickBack={() => handleBack()}
                />
            </div>
        </div>
    )
}
