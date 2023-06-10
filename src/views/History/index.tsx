import React, { useState } from 'react';
import styles from './history.module.css';
import { DateButton, Pagination, SearchText } from '../../components';
import { history } from '../../types';


const dataTest: history[] = [
  {
    id: '1',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '2',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '3',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '4',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '5',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '6',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '7',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
  {
    id: '8',
    username: "tuyetnguyen@12",
    time: "01/12/2021 15:12:17",
    ip: '192.168.3.1',
    content: "Cập nhật thông tin dịch vụ DV_01"
  },
]

export const History = () => {

  const [currentPage, setCurrentPage] = useState(0);


  const PER_PAGE = 8;
  const offset = currentPage * PER_PAGE;
  const pageCount = () => {
    // if (dataFilter.length === 0) 
    return Math.ceil(dataTest.length / PER_PAGE);
    // return Math.ceil(dataFilter.length / PER_PAGE);
  }

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>

      <div className={styles.filterBtn} >
        <div>
          <p>Chọn thời gian</p>
          <DateButton />
        </div>

        <div>
          <p>Từ khóa</p>
          <SearchText
            setWidth={300}
            onFind={(text) => console.log(text)}
          />
        </div>
      </div>

      <div className={styles.body} >
        <table>
          <thead>
            <tr>
              <th>Tên đăng nhập</th>
              <th>Thời gian tác động</th>
              <th>IP thực hiện</th>
              <th>Thao tác thực hiện</th>
            </tr>
          </thead>

          <tbody>

            {dataTest.slice(offset, offset + PER_PAGE).map((item: history) => (
              <tr key={item.id} >
                <td>{item.username}</td>
                <td>{item.time}</td>
                <td>{item.ip}</td>
                <td>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination} >
          <Pagination
            pageCount={pageCount()}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  )
}
