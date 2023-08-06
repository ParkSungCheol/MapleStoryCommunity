package com.example.project2.dto;
import com.example.project2.entity.BOARD;
import com.example.project2.entity.Idmanage;
import org.springframework.lang.Nullable;

import java.sql.Blob;


public class BoardDto  {


    private Long BNUMBER;

    private String BDATE;


    @Nullable
    private String BCLASS;
    @Nullable
    private String BHEADER;
    @Nullable
    private int BRECOMMAND;
    @Nullable
    private int BCLICK;
    @Nullable
    private String BCONTENT;
    @Nullable
    private int SPEC;
    @Nullable
    private String SERVER;
    @Nullable
    private String GUILD;

    @Nullable
    private String JOB;

    @Nullable
    private String PARTS;

    @Nullable
    private String ILEVEL;

    @Nullable
    private Blob BOARDIMAGE;

    public BoardDto(Long BNUMBER, String BDATE, @Nullable String BCLASS, @Nullable String BHEADER, int BRECOMMAND, int BCLICK, @Nullable String BCONTENT, int SPEC, @Nullable String SERVER, @Nullable String GUILD, @Nullable String JOB, @Nullable String PARTS, @Nullable String ILEVEL, @Nullable Blob BOARDIMAGE) {
        this.BNUMBER = BNUMBER;
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

    public BOARD toEntity() {
        return new BOARD(BNUMBER,null, BDATE,BCLASS,BHEADER,BRECOMMAND,BCLICK,BCONTENT,SPEC,SERVER,GUILD,JOB,PARTS,ILEVEL,BOARDIMAGE);
    }



}
