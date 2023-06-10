import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ButtonAdd, DateButton, Dropdown, Pagination, SearchText } from '../../components'
import styles from './service.module.css';
// import { addDatas } from '../../config/firebase/firestore';
// import { service } from '../../types';
import { getAllServices, setFilterServices, setService, updateIsFilterService } from '../../store/reducers/serviceSlice';
import { checkTableHeader } from '../../utils';
import { addValue } from '../../store/reducers/breadcrumbSlice';
import { Info } from './Info';
import { Detail } from './Detail';
import { service } from '../../types';


const tableHeader = ["Mã dịch vụ", "Tên dịch vụ", "Mô tả", "Trạng thái hoạt động", "nút 1", "nút 2"]

export const Service = () => {

  const breadScrumbState = useSelector((state: RootState) => state.breadcrumb.value);
  const servicesState = useSelector((state: RootState) => state.service.services);
  const isFilterState = useSelector((state: RootState) => state.service.isFilter);
  const servicesFilterState = useSelector((state: RootState) => state.service.filterServices);
  const [displayPage, setDisplayPage] = useState<string>("");
  const [filter, setFilter] = useState({
    status: '',
    date: '',
    searchText: '',
  });
  const dispatch = useDispatch<any>();

  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 8;
  const offset = currentPage * PER_PAGE;
  const pageCount = () => {
    if (servicesFilterState.length === 0) return Math.ceil(servicesState.length / PER_PAGE);
    return Math.ceil(servicesFilterState.length / PER_PAGE);
  }

  useEffect(() => {
    dispatch(getAllServices())
    const getLocation = breadScrumbState[breadScrumbState.length - 1] as { title: string, path: string };
    if (getLocation !== undefined) return setDisplayPage(getLocation.title);
  }, [breadScrumbState, dispatch])



  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const changeFilterState = (value: string, type: string) => {
    return setFilter({ ...filter, [type]: value })
  }

  const checkStatus = (text: string) => {
    if (text === "Hoạt động" || text === "Kết nối") return `${styles.green}`;
    return `${styles.red}`
  }

  const handleClick = (type: string, data: service) => {
    let item = { title: '', path: '' } as { title: string, path: string };
    if (type.includes("Chi tiết")) {
      item.title = "Chi tiết"
    }
    if (type.includes("Cập nhật")) {
      item.title = "Cập nhật"
    }
    dispatch(setService(data))
    dispatch(addValue(item))
  }

  const handleFilter = useCallback(
    () => {
      let res: service[] = [];
      if (!filter.status.match("Tất cả")) {
        res = servicesState.filter((item) => { return item.activeStatus.match(filter.status) })
        dispatch(updateIsFilterService(true));
        return dispatch(setFilterServices(res));
      }
      if (filter.status.match("Tất cả")) {
        return dispatch(updateIsFilterService(false));
      }
    }, [dispatch, filter.status, servicesState]
  )

  useEffect(() => {
    handleFilter()
  }, [handleFilter])


  const handleSearchText = (value: string) => {
    let res: service[] = [];
    if (value !== '') {
      res = servicesState.filter((item) => { return item.serviceName.includes(value) })
      dispatch(updateIsFilterService(true));
      return dispatch(setFilterServices(res));
    }else {
      dispatch(updateIsFilterService(false));
    }
  }

  const handleAdd = () => {
    dispatch(addValue({ title: "Thêm dịch vụ", path: '' }))
  }
  return (
    <div>
      <h2>Quản lý dịch vụ</h2>
      {displayPage === "Danh sách dịch vụ" &&
        <React.Fragment>
          <div>

            <div className={styles.filterbtn} >
              <div>
                <div>
                  <p>Trạng thái hoạt động</p>
                  <Dropdown
                    data={["Tất cả", "Hoạt động", "Ngưng hoạt động"]}
                    value=''
                    setWidth='200'
                    onClick={(value) => changeFilterState(value, 'status')}
                  />
                </div>

                <div>
                  <p>Chọn thời gian</p>
                  <DateButton />
                </div>

              </div>

              <div>
                <p>Từ khóa</p>
                <SearchText
                  setWidth={300}
                  onFind={(text) => handleSearchText(text)}
                />
              </div>
            </div>

            <div className={styles.body} >
              <div>
                <table>
                  <thead>
                    <tr>
                      {tableHeader.map((item) => (
                        <th key={item} >{checkTableHeader(item) ? item : ''}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {!isFilterState && servicesState.slice(offset, offset + PER_PAGE).map((item) => (
                      <tr key={item.id}>
                        <td>{item.serviceCode}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.description}</td>
                        <td className={styles.status} >
                          <div>
                            <div className={checkStatus(item.activeStatus)} />
                            <p>{item.activeStatus}</p>
                          </div>
                        </td>
                        <td
                          className={styles.btn}
                          onClick={() => handleClick("Chi tiết", item)}
                        >Chi tiết</td>
                        <td
                          className={styles.btn}
                          onClick={() => handleClick("Cập nhật", item)}
                        >Cập nhật</td>
                      </tr>
                    ))}

                    {isFilterState && servicesFilterState.slice(offset, offset + PER_PAGE).map((item) => (
                      <tr key={item.id}>
                        <td>{item.serviceCode}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.description}</td>
                        <td className={styles.status} >
                          <div>
                            <div className={checkStatus(item.activeStatus)} />
                            <p>{item.activeStatus}</p>
                          </div>
                        </td>
                        <td
                          className={styles.btn}
                          onClick={() => handleClick("Chi tiết", item)}
                        >Chi tiết</td>
                        <td
                          className={styles.btn}
                          onClick={() => handleClick("Cập nhật", item)}
                        >Cập nhật</td>
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

              <ButtonAdd text="Thêm dịch vụ" onClick={() => handleAdd()} />
            </div>
          </div>
        </React.Fragment>
      }

      {displayPage === "Thêm dịch vụ" && <Info />}
      {displayPage === "Chi tiết" && <Detail />}
      {displayPage === "Cập nhật" && <Info />}

    </div>
  )
}
