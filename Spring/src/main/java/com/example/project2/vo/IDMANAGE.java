//package com.example.project2.vo;
//
//import java.sql.Blob;
//import java.time.LocalDateTime;
//import java.util.List;
//
//import javax.persistence.*;
//
//@Entity
//public class IDMANAGE {
//
//	@Id
//	String USERID;
//	String USERPASSWORD;
//	String EMAIL;
//	String CELLPHONE;
//	LocalDateTime JOINDATE;
//	String USERCLASS;
//	Integer SPEC;
//	Blob USERFILE;
//
//
//	@PrePersist
//    public void createdAt() {
//        this.JOINDATE = LocalDateTime.now();
//    }
//	public String getUSERID() {
//		return USERID;
//	}
//	public void setUSERID(String uSERID) {
//		USERID = uSERID;
//	}
//	public String getUSERPASSWORD() {
//		return USERPASSWORD;
//	}
//	public void setUSERPASSWORD(String uSERPASSWORD) {
//		USERPASSWORD = uSERPASSWORD;
//	}
//	public String getEMAIL() {
//		return EMAIL;
//	}
//	public void setEMAIL(String eMAIL) {
//		EMAIL = eMAIL;
//	}
//	public String getCELLPHONE() {
//		return CELLPHONE;
//	}
//	public void setCELLPHONE(String cELLPHONE) {
//		CELLPHONE = cELLPHONE;
//	}
//	public LocalDateTime getJOINDATE() {
//		return JOINDATE;
//	}
//	public void setJOINDATE(LocalDateTime jOINDATE) {
//		JOINDATE = jOINDATE;
//	}
//	public String getUSERCLASS() {
//		return USERCLASS;
//	}
//	public void setUSERCLASS(String uSERCLASS) {
//		USERCLASS = uSERCLASS;
//	}
//	public int getSPEC() {
//		return SPEC;
//	}
//	public void setSPEC(int sPEC) {
//		SPEC = sPEC;
//	}
//	public Blob getUSERFILE() {
//		return USERFILE;
//	}
//	public void setUSERFILE(Blob uSERFILE) {
//		USERFILE = uSERFILE;
//	}
//}
