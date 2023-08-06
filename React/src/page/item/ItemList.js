import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import '../../component/table/CommonTable.css';
import { array } from '../../BoardData';
import './item.css';


function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)

      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



const ItemList1 = props => {
  useEffect(() => {
    reset();
  }, []);

  //회원정보 가져오기 -----------------------------------------
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var urlparams;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  urlparams = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리

  console.log("아이템게시판 ID 는 - > " + urlparams); // uid
  //------------------------------------------------------------------

  const [dataList, setDataList] = useState([]);
  const nameRef = React.createRef();



  useEffect(() => {
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }, []);



  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id: 'no',
        columns: [
          {
            Header: '글번호',
            accessor: (item) => {
              return item.no
            },
          },
        ],
      },
      {
        Header: '',
        id: 'title',
        columns: [
          {
            Header: '제목',
            accessor: (item) => {
              return [item.title, item.no]
            },
            Cell: e => <a href={`/ItemView/${e.value[1]}` + "?" + urlparams}> {e.value[0]} </a>,

          },
        ],
      },
      {
        Header: '',
        id: 'createDate',
        columns: [
          {
            Header: '등록일',
            accessor: (item) => {
              return item.createDate
            },
          },
        ],
      },
      {
        Header: '',
        id: 'createuser',
        columns: [
          {
            Header: '작성자',
            accessor: (item) => {
              return item.userid
            },
          },
        ],
      },
      {
        Header: '',
        id: 'readCount',
        columns: [
          {
            Header: '조회수',
            accessor: (item) => {
              return item.readCount
            },
          },
        ],
      },
      {
        Header: '',
        id: 'like',
        columns: [
          {
            Header: '추천수',
            accessor: (item) => {
              return item.like
            },
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
      {
        Header: '',
        id: 'server',
        columns: [
          {
            Header: '서버',
            accessor: (item) => {
              return item.SERVER
            },
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
      {
        Header: '',
        id: 'job',
        columns: [
          {
            Header: '직업',
            accessor: (item) => {
              return item.Job
            },
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
      {
        Header: '',
        id: 'parts',
        columns: [
          {
            Header: '부위',
            accessor: (item) => {
              return item.Parts
            },
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },
      {
        Header: '',
        id: 'level',
        columns: [
          {
            Header: '레벨',
            accessor: (item) => {
              return item.ILevel
            },
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
        ],
      },

    ],
    []
  )


  const data = [];

  dataList.map((item) => {
    dataList.filter((e) => e.bclass == "아이템");
    data.push(item);
  })

  window.onload = () => {
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }



  function handleCheckServer(input) {
    console.log(input.target.checked)
    if (input.target.checked) {
      array.filter((e) => e.SERVER == input.target.value).forEach((e) => { e.set = true });
    }
    else {
      array.filter((e) => e.SERVER == input.target.value).forEach((e) => { e.set = false });
    }
    //array.filter((e) => e.SERVER == input.target.value).forEach((e) => {e.set = !e.set});
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }

  function handleCheckJob(input1) {
    console.log(input1.target.value)
    if (input1.target.checked) {
      array.filter((e) => e.Job == input1.target.value).forEach((e) => { e.set = true });
    }
    else {
      array.filter((e) => e.Job == input1.target.value).forEach((e) => { e.set = false });
    }
    //array.filter((e) => e.Job == input1.target.value).forEach((e) => {e.set = !e.set});
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }
  function handleCheckParts(input2) {
    console.log(input2.target.value)
    if (input2.target.checked) {
      array.filter((e) => e.Parts == input2.target.value).forEach((e) => { e.set = true });
    }
    else {
      array.filter((e) => e.Parts == input2.target.value).forEach((e) => { e.set = false });
    }
    //array.filter((e) => e.Parts == input2.target.value).forEach((e) => {e.set = !e.set});
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }
  function handleCheckLevel(input3) {
    console.log(input3.target.value)
    if (input3.target.checked) {
      array.filter((e) => e.ILevel == input3.target.value).forEach((e) => { e.set = true });
    }
    else {
      array.filter((e) => e.ILevel == input3.target.value).forEach((e) => { e.set = false });
    }
    //array.filter((e) => e.ILevel == input3.target.value).forEach((e) => {e.set = !e.set});
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }


  //------------------검색 부분----------------------
  function search() {
    let input = nameRef;
  

    array.filter((e)=> e.title == null).forEach((e)=> e.set = false);
    array.filter((e) => e.title != null).filter((e)=> !e.title.includes(input.current.value)).forEach((e)=>e.set = false);
    array.filter((e) => e.title != null).filter((e)=> e.title.includes(input.current.value)).forEach((e)=>e.set = true);


    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }
  //------------------- 리셋 부분---------------------
  function reset() {
    array.forEach((e) => { e.set = true });
    setDataList(array.filter((e) => e.set == true && e.bclass == "아이템"));
  }

  function Table({ columns, data }) {

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy
    )
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice(0, 20)

    return (
      <>

        <table className="common-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th className="common-table-header-column" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td className="common-table-column" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
        <br />

        <label className="center">
          <input id="create_btn" type="text" name='title' ref={nameRef} />
          <input id="search_btn" type="button" value="검색" onClick={(e) => search()} />
          <input id="reset_btn" type="button" value="리셋" onClick={(e) => reset()} />
          <br /></label>

        <table className='itemTable'>

          <tr>
          <p>
              <td>서버 :</td>
              <td><input type='checkbox' name='server' value='오로라' onChange={(e) => handleCheckServer(e)} defaultChecked={dataList.filter((e) => e.SERVER === "오로라").map((e) => e.set)[0]} />오로라</td>
              <td><input type='checkbox' name='server' value='레드' onChange={(e) => handleCheckServer(e)} defaultChecked={dataList.filter((e) => e.SERVER === "레드").map((e) => e.set)[0]} />레드</td>
              <td><input type='checkbox' name='server' value='이노시스' onChange={(e) => handleCheckServer(e)} defaultChecked={dataList.filter((e) => e.SERVER === "이노시스").map((e) => e.set)[0]} />이노시스</td>
              <td><input type='checkbox' name='server' value='유니온' onChange={(e) => handleCheckServer(e)} defaultChecked={dataList.filter((e) => e.SERVER === "유니온").map((e) => e.set)[0]} />유니온</td>
              <td><input type='checkbox' name='server' value='스카니아' onChange={(e) => handleCheckServer(e)} defaultChecked={dataList.filter((e) => e.SERVER === "스카니아").map((e) => e.set)[0]} />스카니아</td>
            </p>
          </tr>

          <tr>
            <p>
              <td>직업 : </td>
              <td><input type='checkbox' name='job' value='마법사' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "마법사").map((e) => e.set)[0]} />마법사</td>
              <td><input type='checkbox' name='job' value='도적' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "도적").map((e) => e.set)[0]} />도적</td>
              <td><input type='checkbox' name='job' value='전사' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "전사").map((e) => e.set)[0]} />전사</td>
              <td><input type='checkbox' name='job' value='해적' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "해적").map((e) => e.set)[0]} />해적</td>
              <td><input type='checkbox' name='job' value='궁수' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "궁수").map((e) => e.set)[0]} />궁수</td>
              <td><input type='checkbox' name='job' value='펫' onChange={(e) => handleCheckJob(e)} defaultChecked={dataList.filter((e) => e.Job === "펫").map((e) => e.set)[0]} />펫</td>
              </p>
          </tr>


          <tr>
            <p>
              <td>부위 : </td>
              <td><input type='checkbox' name='parts' value='상의' onChange={(e) => handleCheckParts(e)} defaultChecked={dataList.filter((e) => e.Parts === "상의").map((e) => e.set)[0]} />상의</td>
              <td><input type='checkbox' name='parts' value='하의' onChange={(e) => handleCheckParts(e)} defaultChecked={dataList.filter((e) => e.Parts === "하의").map((e) => e.set)[0]} />하의</td>
              <td><input type='checkbox' name='parts' value='무기' onChange={(e) => handleCheckParts(e)} defaultChecked={dataList.filter((e) => e.Parts === "무기").map((e) => e.set)[0]} />무기</td>
              <td><input type='checkbox' name='parts' value='신발' onChange={(e) => handleCheckParts(e)} defaultChecked={dataList.filter((e) => e.Parts === "신발").map((e) => e.set)[0]} />신발</td>
              <td><input type='checkbox' name='parts' value='펫' onChange={(e) => handleCheckParts(e)} defaultChecked={dataList.filter((e) => e.Parts === "펫").map((e) => e.set)[0]} />펫</td>
            </p>
          </tr>


          <tr>
            <p>
              <td>레벨 : </td>
              <td><input type='checkbox' name='level' value='110' onChange={(e) => handleCheckLevel(e)} defaultChecked={dataList.filter((e) => e.ILevel === "110").map((e) => e.set)[0]} />110</td>
              <td><input type='checkbox' name='level' value='120' onChange={(e) => handleCheckLevel(e)} defaultChecked={dataList.filter((e) => e.ILevel === "120").map((e) => e.set)[0]} />120</td>
              <td><input type='checkbox' name='level' value='150' onChange={(e) => handleCheckLevel(e)} defaultChecked={dataList.filter((e) => e.ILevel === "150").map((e) => e.set)[0]} />150</td>
              </p>
          </tr>




        </table>


      </>
    )
  }

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  )
}

export default ItemList1;