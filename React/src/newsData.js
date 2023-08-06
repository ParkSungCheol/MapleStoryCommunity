
const NewsList = [
  {
    "no": 1,
    "title": "10월 25일 공지입니다",
    "content": "첫번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 6,
    "like": 30
  },
  {
    "no": 2,
    "title": "밸런스패치 내용 v 1.3.2",
    "content": "두번째 게시글 내용입니다.",
    "createDate": "2020-10-26",
    "readCount": 5,
    "like": 20
  },
  {
    "no": 3,
    "title": "밸런스패치 내용 v 1.3.4",
    "content": "세번째 게시글 내용입니다.",
    "createDate": "2020-10-30",
    "readCount": 1,
    "like": 5
  },
  {
    "no": 4,
    "title": "강화이벤트 안내",
    "content": "네번째 게시글 내용입니다.",
    "createDate": "2020-11-1",
    "readCount": 2,
    "like": 20
  },
  {
    "no": 5,
    "title": "이벤트 당첨자 발표.",
    "content": "다섯번째 게시글 내용입니다.",
    "createDate": "2020-11-03",
    "readCount": 4,
    "like": 3
  },
];

const getNewsByNo = no => {
  const array = NewsList.filter(x => x.no == no);
  if (array.length == 1) {
    return array[0];
  }
  return null;
}

export {
  NewsList,
  getNewsByNo 
};