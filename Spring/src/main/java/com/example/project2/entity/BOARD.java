package com.example.project2.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;

@Entity

@SequenceGenerator(
		name="SEQ_BNUMBER",
		sequenceName="Board_1",
		initialValue=1,
		allocationSize=1
)
public class BOARD {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="SEQ_BNUMBER")
	private Long BNUMBER;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "USERID")
	private Idmanage idmanage;
	@Column
	private String BDATE;
	@Column
	private String BCLASS;
	@Column
	private String BHEADER;
	@Column
	private int BRECOMMAND;
	@Column
	private int BCLICK;
	@Column
	private String BCONTENT;
	@Column
	private int SPEC;
	@Column
	private String SERVER;
	@Column
	private String GUILD;
	@Column
	private String JOB;
	@Column
	private String PARTS;
	@Column
	private String ILEVEL;
	@Column
	private Blob BOARDIMAGE;

	public BOARD() {
	}

	public BOARD(Long BNUMBER, Idmanage idmanage, String BDATE, String BCLASS, String BHEADER, int BRECOMMAND, int BCLICK, String BCONTENT, int SPEC, String SERVER, String GUILD, String JOB, String PARTS, String ILEVEL, Blob BOARDIMAGE) {
		this.BNUMBER = BNUMBER;
		this.idmanage = idmanage;
		this.BDATE = BDATE;
		this.BCLASS = BCLASS;
		this.BHEADER = BHEADER;
		this.BRECOMMAND = BRECOMMAND;
		this.BCLICK = BCLICK;
		this.BCONTENT = BCONTENT;
		this.SPEC = SPEC;
		this.SERVER = SERVER;
		this.GUILD = GUILD;
		this.JOB = JOB;
		this.PARTS = PARTS;
		this.ILEVEL = ILEVEL;
		this.BOARDIMAGE = BOARDIMAGE;
	}

	public Long getBNUMBER() {
		return BNUMBER;
	}

	public void setBNUMBER(Long BNUMBER) {
		this.BNUMBER = BNUMBER;
	}

	public Idmanage getIdmanage() {
		return idmanage;
	}

	public void setIdmanage(Idmanage idmanage) {
		this.idmanage = idmanage;
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

	public Blob getBOARDIMAGE() {
		return BOARDIMAGE;
	}

	public void setBOARDIMAGE(Blob BOARDIMAGE) {
		this.BOARDIMAGE = BOARDIMAGE;
	}

	@Override
	public String toString() {
		return "BOARD{" +
				"BNUMBER=" + BNUMBER +
				", idmanage=" + idmanage +
				", BDATE='" + BDATE + '\'' +
				", BCLASS='" + BCLASS + '\'' +
				", BHEADER='" + BHEADER + '\'' +
				", BRECOMMAND=" + BRECOMMAND +
				", BCLICK=" + BCLICK +
				", BCONTENT='" + BCONTENT + '\'' +
				", SPEC=" + SPEC +
				", SERVER='" + SERVER + '\'' +
				", GUILD='" + GUILD + '\'' +
				", JOB='" + JOB + '\'' +
				", PARTS='" + PARTS + '\'' +
				", ILEVEL='" + ILEVEL + '\'' +
				", BOARDIMAGE=" + BOARDIMAGE +
				'}';
	}
}
