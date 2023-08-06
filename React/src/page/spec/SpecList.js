import React, { useState, useEffect } from 'react';
import {  useTable, useSortBy  } from 'react-table';
import '../../component/table/CommonTable.css';
import {array} from '../../BoardData';
import './Spec.css';

import axios from 'axios';

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



const SpecList1 = props => {
//회원정보 가져오기 -----------------------------------------
var url = decodeURIComponent(window.location.href);
url = decodeURIComponent(url);
var urlparams;
// url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
urlparams = url.substring(url.indexOf('?') + 1, url.length);
// 파라미터 구분자("&") 로 분리
const [userId, setUserId] = useState(null);
const [userName, setUserName] = useState(null);
const [userClass, setUserClass] = useState(null);
const [Spec , setUserSpec] = useState([]);


var url = "http://localhost:8088/getLoginData"; //backend의 데이터 불러오기

useEffect(() => {
  axios
    .post(url, null, {
      params: {
        id: `${urlparams}`
      }
    })
    .then((response) => {

      setUserSpec(response.data.spec);
      setUserId(response.data.id);
      setUserName(response.data.userid);
      setUserClass(response.data.userclass);
    
  
   
  
     
    });
}, []);

const [dataList, setDataList] = useState([]);
const nameRef = React.createRef();



 useEffect(() => {
  
  if(Spec == 1000){
    setDataList(array.filter((e) =>  e.set == true && e.bclass == "스펙"  ))
  }else{
    setDataList(array.filter((e) =>  e.set == true && e.bclass == "스펙" && e.spec == Spec ))
  } 
   
  
},[Spec]);








 const columns = React.useMemo(
   () => [
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
             return [item.title, item.no]
           },
           Cell: e => <a href={`/SpecView/${e.value[1]}`+"?"+ urlparams}> {e.value[0]} </a>,
           
         },
       ],
     },
     {
       Header: '',
       id : 'createDate',
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
       id : 'createuser',
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
       id : 'readCount',
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
       id : 'like',
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
       id : 'server',
       columns: [
         {
           Header: '스텟',
           accessor: (item) => {
            if(item.spec == 10) return ("1~10,000") 
            else return (item.spec-10+",001~" +item.spec+",000");

           },
           Filter: SelectColumnFilter,
           filter: 'includes',
         },
       ],
     },
   ],
   []
 )
 // setTimeout(() => {
 // }, 500);

 const data = [];

   dataList.map((item) => {      
     // console.log("아이템"+item);
     // console.log("유저 스펙 맵 ->" + Spec)
     if(userClass == "관리자" ){ 
       data.push(item);
      }
     else if(item.spec == Spec){
       data.push(item);
       console.log(item)
     }
   })

    //------------------검색 부분----------------------
function search() {
   let input = nameRef;
 

   array.filter((e)=> e.title == null).forEach((e)=> e.set = false);
   array.filter((e) => e.title != null).filter((e)=> !e.title.includes(input.current.value)).forEach((e)=>e.set = false);
   array.filter((e) => e.title != null).filter((e)=> e.title.includes(input.current.value)).forEach((e)=>e.set = true);
       if(userName != null) return (
         setDataList(array.filter((e) => e.set == true  && e.bclass =="스펙" && e.spec == Spec))
       );
  
   }
   //------------------- 리셋 부분---------------------
   function reset() {
     array.forEach((e) => {e.set = true});

   

     if (userName != null) return (
       setDataList(array.filter((e) => e.set == true  && e.bclass =="스펙" && e.spec == Spec)));
   
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

  export default SpecList1;