    let totalData1 = [];    // 총 데이터 수
    let dataPerPage1 = 8;    // 한 페이지에 나타낼 데이터 수
    let pageCount1 = 5;        // 한 화면에 나타낼 페이지 수
    
    function paging1(totalData1, dataPerPage1, pageCount1, currentPage){
        
        console.log("totalData1.length : " + totalData1.length);
        console.log("currentPage : " + currentPage);
        
        let totalPage = Math.ceil(totalData1.length/dataPerPage1);    // 총 페이지 수
        let pageGroup = Math.ceil(currentPage/pageCount1);    // 페이지 그룹
        
        console.log("pageGroup : " + pageGroup);
        
        let last = pageGroup * pageCount1;    // 화면에 보여질 마지막 페이지 번호
        if(last > totalPage.length)
            last = totalPage.length;
        let first = last - pageCount1 + 1;  // 화면에 보여질 첫번째 페이지 번호
        let next = last+1;
        let prev = first-1;
        
        console.log("last : " + last);
        console.log("first : " + first);
        console.log("next : " + next);
        console.log("prev : " + prev);
 
        let $pingingView = $("#paging1");
        
        let html = "";
        
        if(prev > 0)
            html += "<a href='#' id='prev'></a> ";
        
        for(let i=first; i <= last; i++){
            html += "<a href='#' id=" + i + ">" + i + "</a> ";
        }
        
        if(last < totalPage)
            html += "<a href='#' id='next'></a>";
        
        $("#paging1").html(html);    // 페이지 목록 생성
        $("#paging1 a").css("color", "black");
        $("#paging1 a#" + currentPage).css({"text-decoration":"none", 
                                           "color":"red", 
                                           "font-weight":"bold"});    // 현재 페이지 표시
                                           
        $("#paging1 a").click(function(){
            
            let $item = $(this);
            let $id = $item.attr("id");
            let selectedPage = $item.text();

            $(".item1").each((index, item)=> {
                $(item).hide();
            });

            for(i = 0; i < totalData1.length; i++) {
                if($(totalData1[i]).hasClass($id)) {
                    $(totalData1[i]).show();
                }
                else {
                    $(totalData1[i]).hide();
                }
            }
            if($id == "next")    selectedPage = next;
            if($id == "prev")    selectedPage = prev;
            
            paging1(totalData1, dataPerPage1, pageCount1, selectedPage);
        });
                                           
    }

   
    
    
    $("document").ready(function(){
        let count = 0;
        let page = 1;
        $("#value1").val("");
        $(".item1").each((index, item)=> {
            count++;
            if(count > dataPerPage1) {
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
        totalData1 = $(".item1");
        console.log(totalData1[0]);
        paging1(totalData1, dataPerPage1, pageCount1, 1);
    });

    function filter1(){
        let value, name, item, i;
        console.log("filter1``````````````````````````````");

        let count = 0;
        let page = 1;

        for(i = 0; i < totalData1.length; i++) {
            count++;
            if(count > dataPerPage1) {
                count = 1;
                page++;
            }
            $(totalData1[i]).removeClass("" + page);
        }
      
        value = document.getElementById("value1").value.toUpperCase();
        totalData1 = [];
        temp = [];
        temp = $(".item1");
        console.log(temp);
        for(i = 0; i < temp.length; i++) {
            if($(temp[i]).find(".name1").html().toUpperCase().indexOf(value) > -1) {
                totalData1.push(temp[i]);
            }
        }

        count = 0;
        page = 1;
        for(i = 0; i < totalData1.length; i++) {
            count++;
            if(count > dataPerPage1) {
                count = 1;
                page++;
            }
            $(totalData1[i]).addClass("" + page);
        };
        console.log(totalData1);

        $(".item1").each((index, item)=> {
            $(item).hide();
        });

        for(i = 0; i < totalData1.length; i++) {
            if($(totalData1[i]).hasClass(1)) {
                $(totalData1[i]).show();
            }
            else {
                $(totalData1[i]).hide();
            }
        }
        paging1(totalData1, dataPerPage1, pageCount1, 1);
      }