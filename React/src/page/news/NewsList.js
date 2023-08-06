import React,{ useEffect, useState }  from 'react';
import {  useTable, useSortBy  } from 'react-table';
import '../../component/table/CommonTable.css';
import './news.css';
import axios from "axios"; //Vue에서도 사용한다.


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

  

const NewsList1 = props => {




  //회원정보 가져오기 -----------------------------------------
  var url = decodeURIComponent(window.location.href);
  url = decodeURIComponent(url);
  var urlparams;
  // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
  urlparams = url.substring(url.indexOf('?') + 1, url.length);
  // 파라미터 구분자("&") 로 분리
  
  console.log("뉴스 ID 는 - > " +urlparams); // uid
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userClass, setUserClass] = useState(null);


  var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기
  console.log(`${urlparams}`);
  useEffect(() => {
    axios
      .post(url, null, {
        params: {
          id: `${urlparams}`
        }
      })
      .then((response) => {
    
  
        setUserId(response.data.id);
        setUserName(response.data.userid);
        setUserClass(response.data.userclass);
      });
  }, []);
  console.log("유저정보는 -> " + `${userId} ${userName} ${userClass}`);
  //------------------------------------------------------------------

  const [ dataList, setDataList ] = useState([]);
  const [ originalData, setOriginalData] = useState([]);
  const nameRef = React.createRef();

  var NewsList = [{no:0, title:"로딩중입니다.", url:"#", image:""}];
  var NewsList1 = [];
 
  useEffect(()=> {
    setDataList(NewsList);
  }, [])
  var url = "http://localhost:3002/api"; //backend의 데이터 불러오기
  //axios.defaults.withCredentials = true;
  useEffect(() => {axios
        .get(url)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.newsBoardContent);
          console.log(response.data.newsBoardHref);
          console.log(response.data.newsBoardImgae);
          for(let i = 0; i < response.data.newsPages; i++) {
            NewsList1.push({
              no : i,
              title : response.data.newsBoardContent[i],
              url : response.data.newsBoardHref[i],
              image : response.data.newsBoardImgae[i],
              set : true,
            })
          }
          setDataList(NewsList1);
          setOriginalData(NewsList1);
        });
    }, []);
 

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        id : 'image',
        columns: [
          {
            Header: '이미지',
            accessor: (item) => {
              return item.image
            },
            Cell: e => <img src={`${e.value}`} alt="이미지" />
          },
        ],
      },
      {
        Header: '',
        id : 'no',
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
        id : 'title',
        columns: [
          {
            Header: '제목',
            accessor: (item) => {
              return [item.title, item.url]
            },
            Cell: e => <a href={`${e.value[1]}`}> {e.value[0]} </a>,
          },
        ],
      },
    ],
    []
  )

  const data = [];
    dataList.map((item) => {
      data.push(item);
    })

  function handleCheckAll(input) {
    originalData.filter((e) => e.no == input.target.value).forEach((e) => {e.set = !e.set});
    setDataList(originalData.filter((e) => e.set == true));
  }

  function search() {
    let input = nameRef;
    originalData.filter((e) => !e.title.includes(input.current.value)).forEach((e) => {e.set = false});
    originalData.filter((e) => e.title.includes(input.current.value)).forEach((e) => {e.set = true});
    setDataList(originalData.filter((e) => e.set == true));
  }

  function reset() {
    originalData.forEach((e) => {e.set = true});
    setDataList(originalData.filter((e) => e.set == true));
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
              )}
          )}
        </tbody>
      </table>
      <br />
      <label className="center">
      <input id="create_btn" type="text" name='title' ref={nameRef}/> 
      <input id="search_btn"type="button" value="검색" onClick={(e) => search()}/> 
      <input id="reset_btn"type="button" value="리셋" onClick={(e) => reset()}/>
       <br/></label> 
 
    
    </>
  )
}


  return (
    <>
      <Table columns={columns} data={data} />
    </>
  )
}

export default NewsList1;