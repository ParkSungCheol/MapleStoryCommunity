package com.example.project2.vo;

import com.example.project2.entity.BOARD;
import com.example.project2.entity.Idmanage;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(
        name="SEQ_CNUMBER",
        sequenceName="reply_1",
        initialValue=1,
        allocationSize=1
        )
public class REPLY {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="SEQ_CNUMBER")
	private Long CNUMBER;
	private String CCONTENT;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "USERID")
	private Idmanage idmanage;


	private int CRECOMMAND;
	private String CDATE;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "BNUMBER")
	private BOARD board;

	public REPLY() {
	}

	public REPLY(Long CNUMBER, String CCONTENT, Idmanage idmanage, int CRECOMMAND, String CDATE, BOARD board) {
		this.CNUMBER = CNUMBER;
		this.CCONTENT = CCONTENT;
		this.idmanage = idmanage;
		this.CRECOMMAND = CRECOMMAND;
		this.CDATE = CDATE;
		this.board = board;
	}

	public BOARD getBoard() {
		return board;
	}

	public void setBoard(BOARD board) {
		this.board = board;
	}

	public Long getCNUMBER() {
		return CNUMBER;
	}
	public void setCNUMBER(Long cNUMBER) {
		CNUMBER = cNUMBER;
	}
	public String getCCONTENT() {
		return CCONTENT;
	}
	public void setCCONTENT(String cCONTENT) {
		CCONTENT = cCONTENT;
	}
	public Idmanage getidmanage() {
		return idmanage;
	}
	public void setidmanage(Idmanage idmanage) {
		this.idmanage = idmanage;
	}
	public int getCRECOMMAND() {
		return CRECOMMAND;
	}
	public void setCRECOMMAND(int cRECOMMAND) {
		CRECOMMAND = cRECOMMAND;
	}
	public String getCDATE() {
		return CDATE;
	}
	public void setCDATE(String cDATE) {
		CDATE = cDATE;
	}
}
