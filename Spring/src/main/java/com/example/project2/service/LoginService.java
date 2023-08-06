package com.example.project2.service;

import com.example.project2.entity.Idmanage;
import com.example.project2.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;


@Service
public class LoginService {


    @Autowired(required = false)
    AccountRepository accountRepository;


    //회원가입시 아이디 중복체크
    public boolean idcheck(Idmanage idmanage){
        System.out.println("아이디 중복체크");
        System.out.println(idmanage);
        Idmanage iddoublecheck = accountRepository.findByUSERID(idmanage.getUSERID());

        return iddoublecheck.getUSERID() == null; //중복이면 false
    }


    //로그인시 아이디 비밀번호 확인
    public boolean login(Idmanage idmanage) {


        Idmanage findUser = accountRepository.findByUSERID(idmanage.getUSERID());



        if (findUser == null) {
            System.out.println("로그인서비스_유저입력_아이디or비밀번호가 null이거나 아이디가 틀림_로그인실패");
            return false;

        }

        if (!findUser.getUSERPASSWORD().equals(idmanage.getUSERPASSWORD())) {
            System.out.println("로그인서비스_비밀번호불일치_로그인실패");
            return false;
        }
        return true;


    }
}
