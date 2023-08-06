package com.example.project2;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionManager {
    public static final String SESSION_COOKIE_NAME = "UserSession";

    private Map<String, Object> sessionStore = new ConcurrentHashMap<>();
    /**
     * 세션 생성
     */
    public void createSession(String value, HttpServletResponse response, HttpServletRequest request) {
        //세션 id를 생성하고, 값을 세션에 저장
        HttpSession session = request.getSession();
        if(!session.isNew()) {
            session.invalidate();
            session = request.getSession();
        }
        String user_id = (String)request.getAttribute("user_id");
        if(session.isNew()) {
            session.setAttribute("user_id", user_id);
        }
        System.out.println(session.getId());
//        String sessionId = UUID.randomUUID().toString();
//
//        sessionStore.put(sessionId, value);
//        //쿠키 생성
//        Cookie mySessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
//        response.addCookie(mySessionCookie);
//        System.out.println(sessionId);
    }
    /**
     * 세션 조회
     */
    public Object getSession(HttpServletRequest request) {
        Cookie sessionCookie = findCookie(request, SESSION_COOKIE_NAME);
        if (sessionCookie == null) {
            return null;
        }
        return sessionStore.get(sessionCookie.getValue());
    }
    /**
     * 세션 만료
     */
    public void expire(HttpServletRequest request) {
        Cookie sessionCookie = findCookie(request, SESSION_COOKIE_NAME);
        if (sessionCookie != null) {
            sessionStore.remove(sessionCookie.getValue());
        }
    }


    private Cookie findCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findAny()
                .orElse(null);
    }
}