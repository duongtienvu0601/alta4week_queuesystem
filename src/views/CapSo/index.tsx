import React, { useCallback, useEffect, useState } from 'react';
import styles from './capso.module.css';
import { ButtonAdd, DateButton, Dropdown, Pagination, SearchText } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addValue } from '../../store/reducers/breadcrumbSlice';
import { NewNumberLevel } from './NewNumberLevel';
import { Detail } from './Detail';
import { addNumberLevel } from '../../store/reducers/numberLevelSlice';
import { NumberLevel } from '../../types';


const dataTest = [
  {
    stt: 2010001,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đã sử dụng',
    device: 'Kiosk'
  },
  {
    stt: 2010002,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    device: 'Kiosk'
  }, {
    stt: 2010003,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    device: 'Kiosk'
  }, {
    stt: 2010004,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Bỏ qua',
    device: 'Hệ thống'
  }, {
    stt: 2010005,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    device: 'Kiosk'
  }, {
    stt: 2010006,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    device: 'Hệ thống'
  }, {
    stt: 2010007,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đã sử dụng',
    device: 'Kiosk'
  }, {
    stt: 2010008,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Đang chờ',
    device: 'Hệ thống'
  }, {
    stt: 2010009,
    customer: 'Lê Huỳnh Ái Vân',
    service: 'Khám tim mạch',
    timeuse: '14:35 - 07/11/2021',
    timeexpire: '14:35 - 12/11/2021',
    status: 'Bỏ qua',
    device: 'Kiosk'
  },
]
export const CapSo = () => {

  const breadcrumbState = useSelector((state: RootState) => state.breadcrumb.value);
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(0);


  const [displayPage, setDisplayPage] = useState<string>('')

  const getElementAtEndOfBreadscrum = useCallback(
    () => {
      const elementEnd = breadcrumbState[breadcrumbState.length - 1] as { title: string, path: string };
      if (elementEnd !== undefined) {
        return setDisplayPage(elementEnd.title)
      }
    }, [breadcrumbState]
  )

  const PER_PAGE = 8;
  const offset = currentPage * PER_PAGE;
  const pageCount = () => {
    // if (dataFilter.length === 0) 
    return Math.ceil(dataTest.length / PER_PAGE);
    // return Math.ceil(dataFilter.length / PER_PAGE);
  }

  useEffect(() => {
    getElementAtEndOfBreadscrum()
  }, [getElementAtEndOfBreadscrum])


  const checkStatus = (text: string) => {
    if (text.match("Đang chờ")) return `${styles.blue}`;
    if (text.match("Đã sử dụng")) return `${styles.gray}`;
    return `${styles.red}`
  }

  const handleNavigatePage = (page: string, item: {} | null) => {
    if (page.match('detail')) {
      dispatch(addNumberLevel(item))
      return dispatch(addValue({ title: 'Chi tiết', path: '' }))
    }

    return dispatch(addValue({ title: 'Cấp số mới', path: '' }))
  }

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className={styles.newNumberLevel} >
      <h2>Quản lý cấp số</h2>

      {displayPage.match("Danh sách cấp số") &&
        <React.Fragment>
          <div className={styles.filterBtn}>
            <div>
              <p>Tên dịch vụ</p>
              <Dropdown
                data={["Tất cả", "Khám răng hàm mặt", "Khám tai mũi họng"]}
                setWidth='170'
                value={''}
                onClick={(value) => console.log(value)}
              />
            </div>

            <div>
              <p>Tình trạng</p>
              <Dropdown
                data={["Tất cả", "Đang chờ", "Đã sử dụng", "Bỏ qua"]}
                setWidth='150'
                value={''}
                onClick={(value) => console.log(value)}
              />
            </div>

            <div>
              <p>Nguồn cấp</p>
              <Dropdown
                data={["Tất cả", "Đang chờ", "Đã sử dụng", "Bỏ qua"]}
                setWidth='200'
                value={''}
                onClick={(value) => console.log(value)}
              />
            </div>

            <div>
              <p>Chọn thời gian</p>
              <DateButton />
            </div>

            <div>
              <p>Từ khóa</p>
              <SearchText
                setWidth={200}
                onFind={(text) => console.log(text)}
              />
            </div>
          </div>

          <div className={styles.body} >
            <div>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Tên dịch vụ</th>
                    <th>Thời gian cấp</th>
                    <th>Hạn sử dụng</th>
                    <th>Trạng thái</th>
                    <th>Nguồn cấp</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {dataTest.slice(offset, offset + PER_PAGE).map((item) => (
                    <tr key={item.stt} >
                      <td>{item.stt}</td>
                      <td>{item.customer}</td>
                      <td>{item.service}</td>
                      <td>{item.timeuse}</td>
                      <td>{item.timeexpire}</td>
                      <td
                        className={styles.status}
                      >
                        <div>
                          <div className={checkStatus(item.status)} />
                          <p>{item.status}</p>
                        </div>
                      </td>
                      <td>{item.device}</td>
                      <td
                        className={styles.detailBtn}
                        onClick={() => handleNavigatePage('detail', item)}
                      >
                        Chi tiết
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <Pagination
                  pageCount={pageCount()}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>

            <ButtonAdd
              text='Cấp số mới'
              onClick={() => handleNavigatePage('New',null)}
            />
          </div>
        </React.Fragment>
      }

      {displayPage.match("Cấp số mới") && <NewNumberLevel />}
      {displayPage.match("Chi tiết") && <Detail />}
    </div>
  )
}
