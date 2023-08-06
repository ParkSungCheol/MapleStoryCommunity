let totalData2 = [];    // 총 데이터 수
let dataPerPage2 = 8;    // 한 페이지에 나타낼 데이터 수
let pageCount2 = 5;        // 한 화면에 나타낼 페이지 수

function paging2(totalData2, dataPerPage2, pageCount2, currentPage){
    
    console.log("totalData2.length : " + totalData2.length);
    console.log("currentPage : " + currentPage);
    
    let totalPage = Math.ceil(totalData2.length/dataPerPage2);    // 총 페이지 수
    let pageGroup = Math.ceil(currentPage/pageCount2);    // 페이지 그룹
    
    console.log("pageGroup : " + pageGroup);
    
    let last = pageGroup * pageCount2;    // 화면에 보여질 마지막 페이지 번호
    if(last > totalPage.length)
        last = totalPage.length;
    let first = last - pageCount2 + 1;  // 화면에 보여질 첫번째 페이지 번호
    let next = last+1;
    let prev = first-1;
    
    console.log("last : " + last);
    console.log("first : " + first);
    console.log("next : " + next);
    console.log("prev : " + prev);

    let $pingingView = $("#paging2");
    
    let html = "";
    
    if(prev > 0)
        html += "<a href='#' id='prev'></a> ";
    
    for(let i=first; i <= last; i++){
        html += "<a href='#' id=" + i + ">" + i + "</a> ";
    }
    
    if(last < totalPage)
        html += "<a href='#' id='next'></a>";
    
    $("#paging2").html(html);    // 페이지 목록 생성
    $("#paging2 a").css("color", "black");
    $("#paging2 a#" + currentPage).css({"text-decoration":"none", 
                                       "color":"red", 
                                       "font-weight":"bold"});    // 현재 페이지 표시
                                       
    $("#paging2 a").click(function(){
        
        let $item = $(this);
        let $id = $item.attr("id");
        let selectedPage = $item.text();

        $(".item2").each((index, item)=> {
            $(item).hide();
        });

        for(i = 0; i < totalData2.length; i++) {
            if($(totalData2[i]).hasClass($id)) {
                $(totalData2[i]).show();
            }
            else {
                $(totalData2[i]).hide();
            }
        }
        if($id == "next")    selectedPage = next;
        if($id == "prev")    selectedPage = prev;
        
        paging2(totalData2, dataPerPage2, pageCount2, selectedPage);
    });
                                       
}




$("document").ready(function(){
    let count = 0;
    let page = 1;
    $("#value2").val("");
    $(".item2").each((index, item)=> {
        count++;
        if(count > dataPerPage2) {
            count = 1;
            page++;
        }
        $(item).addClass("" + page);
        if($(item).hasClass(1)) {
            $(item).show();
        }
        else {
            $(item).hide();
        }
    });
    totalData2 = $(".item2");
    console.log(totalData2[0]);
    paging2(totalData2, dataPerPage2, pageCount2, 1);
});

function filter2(){

    let value, name, item, i;
    console.log("filter2``````````````````````````````");

    let count = 0;
    let page = 1;
    for(i = 0; i < totalData2.length; i++) {
        count++;
        if(count > dataPerPage2) {
            count = 1;
            page++;
        }
        $(totalData2[i]).removeClass("" + page);
    }
  
    value = document.getElementById("value2").value.toUpperCase();
    totalData2 = [];
    temp = [];
    temp = $(".item2");
    for(i = 0; i < temp.length; i++) {
        if($(temp[i]).find(".name2").html().toUpperCase().indexOf(value) > -1) {
            totalData2.push(temp[i]);
        }
    }

    count = 0;
    page = 1;
    for(i = 0; i < totalData2.length; i++) {
        count++;
        if(count > dataPerPage2) {
            count = 1;
            page++;
        }
        $(totalData2[i]).addClass("" + page);
    };
    console.log(totalData2);

    $(".item2").each((index, item)=> {
        $(item).hide();
    });

    for(i = 0; i < totalData2.length; i++) {
        if($(totalData2[i]).hasClass(1)) {
            $(totalData2[i]).show();
        }
        else {
            $(totalData2[i]).hide();
        }
    }
    paging2(totalData2, dataPerPage2, pageCount2, 1);
}