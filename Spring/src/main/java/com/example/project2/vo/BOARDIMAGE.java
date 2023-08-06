package com.example.project2.vo;

import com.example.project2.entity.BOARD;

import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(
        name="SEQ_BINUMBER",
        sequenceName="Boardimage_1",
        initialValue=1,
        allocationSize=1
        )
public class BOARDIMAGE {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="SEQ_BINUMBER")
	Long BINUMBER;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ALLBINUMBER")
    BOARD board;

	private String BINAME;
	private String BIPATH;



	public Long getBINUMBER() {
		return BINUMBER;
	}

	public void setBINUMBER(Long BINUMBER) {
		this.BINUMBER = BINUMBER;
	}

	public BOARD getBoard() {
		return board;
	}

	public void setBoard(BOARD board) {
		this.board = board;
	}

	public String getBINAME() {
		return BINAME;
	}

	public void setBINAME(String BINAME) {
		this.BINAME = BINAME;
	}

	public String getBIPATH() {
		return BIPATH;
	}

	public void setBIPATH(String BIPATH) {
		this.BIPATH = BIPATH;
	}

	@Override
	public String toString() {
		return "BOARDIMAGE{" +
				"BINUMBER=" + BINUMBER +
				", board=" + board +
				", BINAME='" + BINAME + '\'' +
				", BIPATH='" + BIPATH + '\'' +
				'}';
	}
}
