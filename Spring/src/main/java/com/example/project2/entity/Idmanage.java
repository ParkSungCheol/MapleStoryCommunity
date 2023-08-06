package com.example.project2.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Date;
import java.util.Objects;





@Table(name = "IDMANAGE")
@Entity


public class Idmanage{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SequenceGeneratorName")
    @SequenceGenerator(sequenceName = "IDMANAGE_1", name = "SequenceGeneratorName", allocationSize = 1)
    @Column(name = "ID")
    private Long ID;


    @Column(name = "USERID")
    private String USERID;

    @Column(name = "USERPASSWORD")
    private String USERPASSWORD;
    @Column(name = "EMAIL")
    private String EMAIL;
    @Column(name = "CELLPHONE")
    private String CELLPHONE;
    @Column(name = "USERCLASS")
    private String USERCLASS;


    @Column(name = "JOINDATE")
    private String JOINDATE;


    @Column(name = "SPEC")
    private Integer SPEC;
    @Column(name = "USERFILE")
    private Blob USERFILE;


    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getUSERID() {
        return USERID;
    }

    public void setUSERID(String USERID) {
        this.USERID = USERID;
    }

    public String getUSERPASSWORD() {
        return USERPASSWORD;
    }

    public void setUSERPASSWORD(String USERPASSWORD) {
        this.USERPASSWORD = USERPASSWORD;
    }

    public String getEMAIL() {
        return EMAIL;
    }

    public void setEMAIL(String EMAIL) {
        this.EMAIL = EMAIL;
    }

    public String getCELLPHONE() {
        return CELLPHONE;
    }

    public void setCELLPHONE(String CELLPHONE) {
        this.CELLPHONE = CELLPHONE;
    }

    public String getUSERCLASS() {
        return USERCLASS;
    }

    public void setUSERCLASS(String USERCLASS) {
        this.USERCLASS = USERCLASS;
    }

    public String getJOINDATE() {
        return JOINDATE;
    }

    public void setJOINDATE(String JOINDATE) {
        this.JOINDATE = JOINDATE;
    }

    public Integer getSPEC() {
        return SPEC;
    }

    public void setSPEC(Integer SPEC) {
        this.SPEC = SPEC;
    }

    public Blob getUSERFILE() {
        return USERFILE;
    }

    public void setUSERFILE(Blob USERFILE) {
        this.USERFILE = USERFILE;
    }

    @Override
    public String toString() {
        return "Idmanage{" +
                "ID=" + ID +
                ", USERID='" + USERID + '\'' +
                ", USERPASSWORD='" + USERPASSWORD + '\'' +
                ", EMAIL='" + EMAIL + '\'' +
                ", CELLPHONE='" + CELLPHONE + '\'' +
                ", USERCLASS='" + USERCLASS + '\'' +
                ", JOINDATE='" + JOINDATE + '\'' +
                ", SPEC=" + SPEC +
                ", USERFILE=" + USERFILE +
                '}';
    }
}
