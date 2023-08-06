package com.example.project2.controller;


import com.example.project2.SessionManager;
import com.example.project2.entity.Idmanage;
import com.example.project2.entity.Test;
import com.example.project2.repository.*;
import com.example.project2.service.LoginService;
//import com.example.project2.vo.IDMANAGE;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;

import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;


@Controller
@CrossOrigin("*")
public class LoginController {

    @Autowired
    BoardRepository Boardrepository;
    @Autowired
    IdManageRepository IdManagerepository;

    @Autowired
    ReplyRepository Replyrepository;

    @Autowired
    LoginService loginService;
    @Autowired
    SessionManager sessionManager;
    @Autowired
    AccountRepository accountRepository;

    Map<Integer,Idmanage> idmanages = new HashMap<Integer,Idmanage>();

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    // 로그인
    @PostMapping("/login")
    @ResponseBody
    public String loginId(@RequestBody HashMap<String, Object> map, HttpServletResponse response, HttpServletRequest request) {

        String username = (String)map.get("userId");
        String userPassword = (String)map.get("userPassword");

        Idmanage idmanage = new Idmanage();
        idmanage.setUSERID(username);
        idmanage.setUSERPASSWORD(userPassword);

        System.out.println("로그인컨트롤러 ->" + idmanage.toString());

        if(loginService.login(idmanage)){
            System.out.println("로그인컨트롤러_로그인성공");
            request.setAttribute("user_id", idmanage.getUSERID());
            sessionManager.createSession(idmanage.getUSERID(), response, request); //세션 생성
            sessionManager.getSession(request);
            //System.out.println(sessionManager.getSession(request));
            Idmanage findUser = accountRepository.findByUSERID(idmanage.getUSERID());
            String uid = findUser.getID().toString();
            idmanages.put(Integer.parseInt(uid), findUser);
            System.out.println(idmanages.get(Integer.parseInt(uid)).getUSERID());
            return uid;
        }else{
            throw new RuntimeException("로그인실패");
        }

    }

    //권한 확인
    @GetMapping("/Authcheck")
    public String authcheck(HttpServletRequest request){
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("session"));
        return "login";
    }


    //로그아웃
    @GetMapping("/logout")
    public String logout(HttpServletRequest request){

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }

//    //로그인 지속 ( 로그인한 정보 보내줌)
//    @PostMapping("/getLoginData")
//    @ResponseBody
//    public Idmanage gerLoginData(@RequestParam("id") String id) {
//
////        System.out.println(id);
//        Idmanage idmanage = new Idmanage();
//        if(idmanages.get(Integer.parseInt(id)) != null) {
//            Idmanage idmanage1 = IdManagerepository.findById(Long.parseLong(id)).get();
//            idmanage.setCELLPHONE(idmanage1.getCELLPHONE());
//            idmanage.setEMAIL(idmanage1.getEMAIL());
//            idmanage.setUSERID(idmanage1.getUSERID());
//            idmanage.setUSERPASSWORD(idmanage1.getUSERPASSWORD());
//            idmanage.setID(idmanage1.getID());
//            idmanage.setJOINDATE(idmanage1.getJOINDATE());
//            idmanage.setSPEC(idmanage1.getSPEC());
//            idmanage.setUSERCLASS(idmanage1.getUSERCLASS());
//            System.out.println(idmanage1.getUSERFILE());
//        }
//        return idmanage;
//    }
@PostMapping("/getLoginData")
@ResponseBody
@CrossOrigin("*")
public Idmanage gerLoginData(@RequestParam("id") String id) throws SQLException, IOException {

    System.out.println("로그인 아이디 체크 ->"+id);
    for(Integer a : idmanages.keySet()) {
        a = (int) a;
        if(a == Integer.parseInt(id)) {
            Idmanage idmanage = IdManagerepository.findById(Long.parseLong(id)).get();
            System.out.println(idmanage.getUSERID());
            Idmanage idmanage1 = new Idmanage();
            idmanage1.setID(idmanage.getID());
            idmanage1.setUSERID(idmanage.getUSERID());
            idmanage1.setCELLPHONE(idmanage.getCELLPHONE());
            idmanage1.setEMAIL(idmanage.getEMAIL());
            idmanage1.setUSERCLASS(idmanage.getUSERCLASS());
            idmanage1.setJOINDATE(idmanage.getJOINDATE());
            idmanage1.setSPEC(idmanage.getSPEC());
            System.out.println("로그인 확인->" +idmanage1.getUSERID());

            return idmanage1;
        }
    }
    return null;
}
    //운영자 / 회원요청시 이미지 스텟 업데이트
    @PostMapping("/updateUserSpec")
    @ResponseBody
    public String updateUserSpec(@RequestBody HashMap <String, Object> map) {
        System.out.println(map);
        String userid = (String) map.get("userid");
        int spec = (Integer) map.get("spec");

        Idmanage idmanage = IdManagerepository.findByUSERID(userid);
        idmanage.setSPEC(spec);
        idmanage.setUSERFILE(null);

        IdManagerepository.flush();

        return "Spring -----> 응답 완료";
    }

    // 유저 정보 업데이트
    @PostMapping(value = "/updateUser", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseBody
    @CrossOrigin("*")
    public String updateUser(@RequestPart HashMap<String,Object> userData,
                             @RequestPart(required = false) MultipartFile file)
            throws IOException, SQLException {


        System.out.println(userData);
        System.out.println(file);

        String userId = (String) userData.get("userId");
        String userPassword = (String) userData.get("userPassword");
        String userEmail = (String) userData.get("userEmail");
        String userCellPhone = (String) userData.get("userCellPhone");


        Idmanage idmanage = IdManagerepository.findByUSERID(userId);
        idmanage.setUSERPASSWORD(userPassword);
        idmanage.setEMAIL(userEmail);
        idmanage.setCELLPHONE(userCellPhone);

        if(file != null) {
            byte[] contents = file.getBytes();
            Blob blob = new SerialBlob(contents);
            System.out.println(blob);
            idmanage.setUSERFILE(blob);

        }

        IdManagerepository.flush();

        return "Spring -----> 변경완료";
    }

    // 유저 이미지 업로드
    @PostMapping("/userImage")
    @ResponseBody
    public byte[] userImage(@RequestBody HashMap<String, Object> map) throws IOException, SQLException {

        System.out.println(map);
        String userid = (String) map.get("userid");

        Idmanage idmanage = IdManagerepository.findByUSERID(userid);

        Blob blob = idmanage.getUSERFILE();
        System.out.println("getLoginData UserFile" + blob);
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


    @PostMapping("/requestedUser")
    @ResponseBody
    public List<Test> requestedUser() {
        List<Idmanage> idmanagesList = IdManagerepository.findAll();
        List<Idmanage> idmanagesLists = new ArrayList<Idmanage>();
        List<Test> tests = new ArrayList<Test>();
        for (Idmanage idmanage1 : idmanagesList) {
            if (idmanage1.getUSERFILE() != null) {
                Test test = new Test();
                test.setUser_id(idmanage1.getUSERID());
                tests.add(test);
            }
        }
        return tests;
    }


    @PostMapping("/deleteUser")
    @ResponseBody
    public String deleteUser(@RequestBody HashMap<String, Object> map) {
        System.out.println(map);

        return "";
    }


    @GetMapping("/start")
    public String start() {
        System.out.println("start");
        return "start";
    }
}
