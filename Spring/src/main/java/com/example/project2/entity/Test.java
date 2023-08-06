package com.example.project2.entity;

import javax.persistence.Lob;

public class Test {

    private String user_id;
    @Lob
    private byte[] file;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }
}
