package com.example.project2.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

//import com.example.project2.entity.Board;
import com.example.project2.dto.BoardDto;
import com.example.project2.entity.Idmanage;
import com.example.project2.service.BoardService;
import com.example.project2.vo.REPLY;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.example.project2.repository.BoardRepository;
import com.example.project2.repository.IdManageRepository;
import com.example.project2.repository.ReplyRepository;
import com.example.project2.entity.BOARD;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Transactional
@CrossOrigin("*")
public class BoardController {
	@Autowired
	BoardRepository boardrepository;
	@Autowired
	IdManageRepository IdManagerepository;
	@Autowired
	ReplyRepository Replyrepository;
	@Autowired
	BoardService boardService;

	//게시글 작성 부분 CREATE--------------------------------------------
	@PostMapping("/create")
	public String create(BoardDto dto,@RequestParam("USERID")String userid) {
		System.out.println(dto.toString());
		System.out.println(userid);
		Idmanage idmanage =IdManagerepository.findById(Long.parseLong(userid)).get();

		System.out.println("아이디매니지 확인->"+idmanage.toString());

		//1. Dto를 Entity로 변환
		BOARD board = dto.toEntity();

		board.setIdmanage(idmanage);

		//2. Repository 에게 Entity 를 db안에 저장하게 함
		BOARD saved = boardrepository.save(board);

		boardrepository.flush();

		return "";

	}

	//게시판이미지 조회
	@PostMapping("/boardImage")
	@ResponseBody
	public byte[] boardImage(@RequestBody HashMap<String, Object> map) throws IOException, SQLException {

		System.out.println("받아오는 데이터 -> " +map);

		String bnum = (String) map.get("BNUMBER");

		BOARD board = boardrepository.findByBNUMBER(Long.valueOf(bnum));
		System.out.println("보드 상세 조회값 ->"+ board.toString());

		Blob blob = board.getBOARDIMAGE();
		System.out.println("getBOARDIMAGE -> " + blob);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buf = new byte[1024];
		InputStream in = blob.getBinaryStream();
		System.out.println("id content" + in);
		int n = 0;
		while ((n = in.read(buf)) >= 0) {
			baos.write(buf, 0, n);
		}

		in.close();
		byte[] bytes = baos.toByteArray();
		System.out.println("bytes" + bytes.length);
		byte[] encodeBase64 = Base64.getEncoder().encode(bytes);


		return encodeBase64;
	}



	@GetMapping("/boardshow")
	public List<board1> free(){
//		System.out.println("내경로는 ->" + System.getProperty("user.dir"));

		List<BOARD> board =	boardrepository.findAllBoard();
		List<board1> boards = new ArrayList<board1>();
		System.out.println(board.toString());

		for(BOARD board1 : board){
			board1 board11 = new board1();
			board11.setBCLASS(board1.getBCLASS());
			board11.setBCLICK(board1.getBCLICK());
			board11.setBCONTENT(board1.getBCONTENT());
			board11.setBDATE(board1.getBDATE());
			board11.setBHEADER(board1.getBHEADER());
			board11.setBNUMBER(board1.getBNUMBER());
			board11.setBRECOMMAND(board1.getBRECOMMAND());
			board11.setGUILD(board1.getGUILD());
			board11.setILEVEL(board1.getILEVEL());
			board11.setJOB(board1.getJOB());
			board11.setPARTS(board1.getPARTS());
			board11.setSERVER(board1.getSERVER());
			board11.setSPEC(board1.getSPEC());



			Idmanage idmanage = board1.getIdmanage();

			board11.setID(String.valueOf(idmanage.getID()));



			if(idmanage.getUSERID() == null){
				board11.setUserid("a");
			}else{
				board11.setUserid(idmanage.getUSERID());
			}

			if(idmanage.getSPEC() == null){
				board11.setUserspec(0);
			}else{
				board11.setUserspec(idmanage.getSPEC());
			}



			boards.add(board11);
		}

		System.out.println("조회값은->"+board.toString());


		return	boards;
	}

	//게시글 업데이트 부분 ----------------------------------------------------------
	@PostMapping("/freeupdate/{bnum}")
	public String freeupdate(@PathVariable Long bnum, BoardDto dto,@RequestParam("USERID")String userid) {
		System.out.println("파라메터 dto 값->"+dto.toString());
		Idmanage idmanage =IdManagerepository.findById(Long.parseLong(userid)).get();

		//1 dto를 엔티티로 변환
		BOARD boardEntity = dto.toEntity();

		System.out.println("바꾸려는 값 ->" + boardEntity.toString());
		boardEntity.setIdmanage(idmanage);

		boardrepository.save(boardEntity);
		boardrepository.flush();

		return "";



	}

	//조회수 업데이트 부분 ----------------------------------------------------------
	@PostMapping("/clickupdate/{bnum}")
	public String freeupdate(@PathVariable Long bnum, BoardDto dto) {
		System.out.println("파라메터 dto 값->"+dto.toString());
		//1 dto를 엔티티로 변환
		BOARD boardEntity = dto.toEntity();

		System.out.println("바꾸려는 값 ->" + boardEntity.toString());


		boardrepository.save(boardEntity);


		return "";

	}

	//게시글 삭제 부분 ------------------------------------------------------
	@GetMapping("/{bnum}/delete")
	public void boarddelete(@PathVariable  Long bnum) {

		//1 BOARD 테이블에서 BNUMBER가 bnum 인 데이터를 가져온다
		System.out.println("bnum은 = "+ bnum);
		boardrepository.deleteByBNUMBER(bnum);

	}



	//아이템게시판 수정
	@PostMapping(value = "/updateItemBoard", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	@CrossOrigin("*")
	public String updateboardImage(@RequestPart HashMap<String,Object> boardData,
								   @RequestPart(required = false) MultipartFile file)
			throws IOException, SQLException {
		System.out.println("아이템게시판수정 실행 보드데이터" + boardData);
		System.out.println("아이템게시판수정 실행 파일" + file);

		String bnum = (String) boardData.get("BNUMBER");
		String BHEADER = (String) boardData.get("BHEADER");
		String BCONTENT = (String) boardData.get("BCONTENT");
		String BCLASS = (String) boardData.get("BCLASS");
		String BDATE = (String) boardData.get("BDATE");
		String SERVER = (String) boardData.get("SERVER");
		String JOB = (String) boardData.get("JOB");
		String PARTS = (String) boardData.get("PARTS");
		String ILEVEL = (String) boardData.get("ILEVEL");
		String USERID = (String) boardData.get("USERID");
		int BRECOMMAND = (int) boardData.get("BRECOMMAND");
		int BCLICK = (int) boardData.get("BCLICK");

		BOARD board = boardrepository.findByBNUMBER(Long.valueOf(bnum));

		board.setBHEADER(BHEADER);
		board.setBCONTENT(BCONTENT);
		board.setBCLASS(BCLASS);
		board.setBDATE(BDATE);
		board.setSERVER(SERVER);
		board.setJOB(JOB);
		board.setPARTS(PARTS);
		board.setILEVEL(ILEVEL);
		board.setBRECOMMAND(BRECOMMAND);
		board.setBCLICK(BCLICK);



		System.out.println(board.toString());



		if(file != null) {
			byte[] contents = file.getBytes();
			Blob blob = new SerialBlob(contents);
			System.out.println(blob);
			board.setBOARDIMAGE(blob);

		}

		boardrepository.flush();

		return "Spring -----> 변경완료";
	}

	//아이템게시판 조회수 수정
	@PostMapping(value = "/updateItemBoard/view")
	@ResponseBody
	@CrossOrigin("*")
	public String updateboardview(@RequestParam("click")int click,@RequestParam("bnum")String bnum)
			throws IOException, SQLException {
		System.out.println("아이템게시판 조회수" + click);

		System.out.println(bnum);
		BOARD board = boardrepository.findById(Long.valueOf(bnum)).orElse(null);
		board.setBCLICK(click);
		boardrepository.flush();

		return "Spring -----> 변경완료";
	}
	//아이템게시판 조회수 수정
	@PostMapping(value = "/updateItemBoard/like")
	@ResponseBody
	@CrossOrigin("*")
	public String updateboardlike(@RequestParam("BRECOMMAND")int like ,@RequestParam("bnum")String bnum)
			throws IOException, SQLException {
		System.out.println("아이템게시판 조회수" + like);

		System.out.println(bnum);
		BOARD board = boardrepository.findById(Long.valueOf(bnum)).orElse(null);
		board.setBRECOMMAND(like);
		boardrepository.flush();

		return "Spring -----> 변경완료";
	}


	//아이템게시판 글생성
	@PostMapping(value = "/createItemBoard", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	@CrossOrigin("*")
	public String updateUser(@RequestPart HashMap<String,Object> userData,
							 @RequestPart(required = false) MultipartFile file)
			throws IOException, SQLException {


		String BHEADER = (String) userData.get("BHEADER");
		String BCONTENT = (String) userData.get("BCONTENT");
		String BCLASS = (String) userData.get("BCLASS");
		String BDATE = (String) userData.get("BDATE");
		String SERVER = (String) userData.get("SERVER");
		String JOB = (String) userData.get("JOB");
		String PARTS = (String) userData.get("PARTS");
		String ILEVEL = (String) userData.get("ILEVEL");
		String USERID = (String) userData.get("USERID");



		Idmanage idmanage =IdManagerepository.findById(Long.parseLong(USERID)).get();


		System.out.println("아이템 글생성 아이디는 =>"+USERID);
		System.out.println("아이템 글생성 아이디매니지 =>"+idmanage.toString());

		System.out.println("리액트 유저데이터 ->"+userData);
		System.out.println("리액트 파일->" +file);


		BOARD board = new BOARD();
		board.setBHEADER(BHEADER);
		board.setBCONTENT(BCONTENT);
		board.setBCLASS(BCLASS);
		board.setBDATE(BDATE);
		board.setSERVER(SERVER);
		board.setJOB(JOB);
		board.setPARTS(PARTS);
		board.setILEVEL(ILEVEL);
		board.setIdmanage(idmanage);
		System.out.println(board.toString());

		if(file != null) {
			byte[] contents = file.getBytes();
			Blob blob = new SerialBlob(contents);
			System.out.println(blob);
			board.setBOARDIMAGE(blob);
			boardrepository.save(board);
		}

		boardrepository.save(board);

		return "Spring -----> 변경완료";
	}



	// ---------------------------------------------팬아트---------------------------------------------

	// 팬아트 게시판 작성
	@PostMapping(value = "/writeFanart", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	@CrossOrigin("*")
//    public String updateUser(@RequestBody HashMap<String, Object> map) {
	public String writeFanart(@RequestPart(required = true) HashMap<String,Object> userData,
							  @RequestPart(required = true) MultipartFile file)
			throws IOException, SQLException {

		System.out.println(userData);
		System.out.println(file);

		Integer userid = (Integer) userData.get("userid");
		String dateCreated = (String) userData.get("createdDate");
		System.out.println(userid);

		Idmanage idmanage = IdManagerepository.findById(Long.valueOf(userid)).get();
		System.out.println(idmanage);

		BOARD board = new BOARD();
		board.setIdmanage(idmanage); // 외래키 저장
		board.setBCLASS("팬아트");
		board.setBDATE(dateCreated);

		byte[] contents = file.getBytes();
		Blob blob = new SerialBlob(contents);
		System.out.println(blob);
		board.setBOARDIMAGE(blob);

		boardrepository.save(board);
		return "Spring -----> 팬아트 게시판 등록 완료!";
	}

	// 팬아트 갤러리 전체 개수
	@PostMapping(value = "getBoardtList")
	@ResponseBody
	public List<BOARD> getBoardtList() {
		System.out.println(boardrepository.findAll().size());

		List<BOARD> boards = boardrepository.findAll();
		List<BOARD> boardList = new ArrayList<BOARD>();

		for(BOARD board : boards) {
			BOARD board1 = new BOARD();

			board1.setBDATE(board.getBDATE());
			board1.setBNUMBER(board.getBNUMBER());
			board1.setBCLASS(board.getBCLASS());
			Idmanage idmanage = new Idmanage();
			idmanage.setUSERID(board.getIdmanage().getUSERID());
			board1.setIdmanage(idmanage);
			boardList.add(board1);
		}

		return boardList;
	}

	@PostMapping("/getFanartImage")
	@ResponseBody
	public byte[] getFanartImage(@RequestBody HashMap<String, Object> map) throws SQLException, IOException {

		System.out.println(map);
		String bnumber = (String) map.get("bnumber");
		System.out.println(bnumber);

		BOARD board = boardrepository.findByBNUMBER(Long.valueOf(bnumber));
		Blob blob = board.getBOARDIMAGE();
		System.out.println("getFanart UserFile" + blob);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buf = new byte[1024];
		InputStream in = blob.getBinaryStream();
		System.out.println("id content" + in);
		int n = 0;
		while ((n = in.read(buf)) >= 0) {
			baos.write(buf, 0, n);
		}

		in.close();
		byte[] bytes = baos.toByteArray();
		System.out.println("bytes" + bytes.length);
		byte[] encodeBase64 = Base64.getEncoder().encode(bytes);

		return encodeBase64;

	}


	@PostMapping("/deleteFanart")
	@ResponseBody
	public String deleteFanart(@RequestBody HashMap<String, Object> map) {

		System.out.println(map);

		String bnumber = (String) map.get("bnumber");
		System.out.println(bnumber);

		BOARD board = boardrepository.findByBNUMBER(Long.valueOf(bnumber));
		boardrepository.delete(board);
		boardrepository.flush();

		return "스프링 --------> 팬아트 삭제 성공";
	}


	@PostMapping(value = "/updateFanart", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ResponseBody
	@CrossOrigin("*")
//    public String updateUser(@RequestBody HashMap<String, Object> map) {
	public String updateFanart(@RequestPart(required = false) HashMap<String, Object> bnumber,
							   @RequestPart(required = true) MultipartFile file)
			throws IOException, SQLException {

		System.out.println(bnumber);
		System.out.println(file);

		String bnumber1 = (String) bnumber.get("bnumber");
		BOARD board = boardrepository.findById(Long.valueOf(bnumber1)).get();

		byte[] contents = file.getBytes();
		Blob blob = new SerialBlob(contents);
		System.out.println(blob);

		board.setBOARDIMAGE(blob);
		boardrepository.flush();

		return "";
	}

	// ---------------------------------------------팬아트---------------------------------------------


	@PostMapping("/addreply")
	public void addreply(@RequestParam("USERID") String userid, @RequestParam("BOARDNO") String boardno, @RequestParam("DATE") String date, @RequestParam("context") String context) {
		REPLY reply = new REPLY();
		reply.setBoard(boardrepository.findById(Long.parseLong(boardno)).get());
		reply.setidmanage(IdManagerepository.findById(Long.parseLong(userid)).get());
		reply.setCCONTENT(context);
		reply.setCDATE(date);
		Replyrepository.save(reply);
		Replyrepository.flush();
	}

	@PostMapping("/allreply")
	public List<REPLY> allreply(@RequestParam("BOARDNO") String boardno) {
		System.out.println("댓글 보드 넘버 ->" + boardno);
		List<REPLY> replies = new ArrayList<REPLY>();

		List<REPLY> replies1 = Replyrepository.findAll();
		//System.out.println("리플라이스 1 ->"+replies1.get(0).getCCONTENT());
		for(REPLY reply : replies1) {

			if(reply.getBoard().getBNUMBER() == Long.parseLong(boardno)) {
				System.out.println("댓글 트루");
				REPLY reply1 = new REPLY();


				BOARD board = new BOARD();
				BOARD board1 = reply.getBoard();
				board.setBNUMBER(board1.getBNUMBER());


				reply1.setBoard(board);
				reply1.setCDATE(reply.getCDATE());
				reply1.setCCONTENT(reply.getCCONTENT());
				reply1.setCRECOMMAND(reply.getCRECOMMAND());
				reply1.setCNUMBER(reply.getCNUMBER());
				Idmanage idmanage = reply.getidmanage();
				System.out.println("댓글 아이디매니지 ->"+idmanage.getUSERID());
				idmanage.setUSERFILE(null);
				reply1.setidmanage(idmanage);
				replies.add(reply1);

			}

		}
		//System.out.println("마지막 댓글 확인 - > " +replies.get(0).getidmanage().getUSERID());
		return replies;
	}

	@PostMapping("/deletereply")
	public void deletereply(@RequestParam("CNUMBER") String cnumber) {
		REPLY reply = Replyrepository.findById(Long.parseLong(cnumber)).get();
		Replyrepository.delete(reply);
		Replyrepository.flush();
	}

	@PostMapping("/updatereply")
	public void updatereply(@RequestParam("CNUMBER") String cnumber, @RequestParam("content") String content, @RequestParam("DATE") String date) {
		REPLY reply = Replyrepository.findById(Long.parseLong(cnumber)).get();
		reply.setCCONTENT(content);
		reply.setCDATE(date);
		Replyrepository.flush();
	}

}

//---- board1 class ----
class board1 {
	public Blob getBOARDIMAGE() {
		return BOARDIMAGE;
	}

	public void setBOARDIMAGE(Blob BOARDIMAGE) {
		this.BOARDIMAGE = BOARDIMAGE;
	}

	public Long getBNUMBER() {
		return BNUMBER;
	}

	public void setBNUMBER(Long BNUMBER) {
		this.BNUMBER = BNUMBER;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public int getUserspec() {
		return userspec;
	}

	public void setUserspec(int userspec) {
		this.userspec = userspec;
	}

	public String getBDATE() {
		return BDATE;
	}

	public void setBDATE(String BDATE) {
		this.BDATE = BDATE;
	}

	public String getBCLASS() {
		return BCLASS;
	}

	public void setBCLASS(String BCLASS) {
		this.BCLASS = BCLASS;
	}

	public String getBHEADER() {
		return BHEADER;
	}

	public void setBHEADER(String BHEADER) {
		this.BHEADER = BHEADER;
	}

	public int getBRECOMMAND() {
		return BRECOMMAND;
	}

	public void setBRECOMMAND(int BRECOMMAND) {
		this.BRECOMMAND = BRECOMMAND;
	}

	public int getBCLICK() {
		return BCLICK;
	}

	public void setBCLICK(int BCLICK) {
		this.BCLICK = BCLICK;
	}

	public String getBCONTENT() {
		return BCONTENT;
	}

	public void setBCONTENT(String BCONTENT) {
		this.BCONTENT = BCONTENT;
	}

	public int getSPEC() {
		return SPEC;
	}

	public void setSPEC(int SPEC) {
		this.SPEC = SPEC;
	}

	public String getSERVER() {
		return SERVER;
	}

	public void setSERVER(String SERVER) {
		this.SERVER = SERVER;
	}

	public String getGUILD() {
		return GUILD;
	}

	public void setGUILD(String GUILD) {
		this.GUILD = GUILD;
	}

	public String getJOB() {
		return JOB;
	}

	public void setJOB(String JOB) {
		this.JOB = JOB;
	}

	public String getPARTS() {
		return PARTS;
	}

	public void setPARTS(String PARTS) {
		this.PARTS = PARTS;
	}

	public String getILEVEL() {
		return ILEVEL;
	}

	public void setILEVEL(String ILEVEL) {
		this.ILEVEL = ILEVEL;
	}

	public String getID() {
		return ID;
	}

	public void setID(String ID) {
		this.ID = ID;
	}

	private Long BNUMBER;
	@Nullable
	private String userid;
	@Nullable
	private int userspec;
	private String BDATE;
	private String BCLASS;
	private String BHEADER;
	private int BRECOMMAND;
	private int BCLICK;
	private String BCONTENT;
	private int SPEC;
	private String SERVER;
	private String GUILD;
	private String JOB;
	private String PARTS;
	private String ILEVEL;
	private String ID;
	private Blob BOARDIMAGE;



}