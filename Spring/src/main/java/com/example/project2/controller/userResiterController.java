package com.example.project2.controller;

import com.example.project2.entity.Idmanage;
import com.example.project2.repository.AccountRepository;
import com.example.project2.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@Controller
public class userResiterController {

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    LoginService loginService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/signup/create")
    @ResponseBody
    public String registerUser(@RequestBody HashMap<String, Object> map
    ) {
        String username = (String)map.get("userId");
        String userPassword = (String)map.get("userPassword");
        String email = (String)map.get("email");
        String cellPhone = (String)map.get("cellPhone");
        String CLASS = (String)map.get("class");
        String date = (String)map.get("date");


        System.out.println(map.get("userId"));
        System.out.println(map.get("userPassword"));
        System.out.println(map.get("email"));
        System.out.println(map.get("cellPhone"));



        Idmanage idmanage = new Idmanage();
        idmanage.setUSERID(username);
        idmanage.setUSERPASSWORD(userPassword);
        idmanage.setEMAIL(email);
        idmanage.setCELLPHONE(cellPhone);
        idmanage.setJOINDATE(date);
        idmanage.setUSERCLASS(CLASS);



//
//        System.out.println("삽입 결과 -> " +toString());
//
////        if(accountRepository.findByuserId(userId) != null)
////            return "redirect:/signup";
//
//
        accountRepository.save(idmanage);

        return "redirect: /login" ;

    }

    @PostMapping("/signup/create/idcheck")
    public String idcheck(@RequestBody HashMap<String, Object> map) {
        System.out.println("중복체크");

        String username = (String)map.get("userId");
        Idmanage idmanage = new Idmanage();
        idmanage.setUSERID(username);

        System.out.println(idmanage);

        if (loginService.idcheck(idmanage)) {
            System.out.println("사용가능한 아이디입니다.");
            return "signup";
        }

        System.out.println("중복된 아이디 입니다. ");
        return "signup";
    }

    @GetMapping("/signup")
    public String signup() {
        System.out.println("signup");
        return "signup";
    }

}
