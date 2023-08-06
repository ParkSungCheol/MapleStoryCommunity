package com.example.project2.service;

import com.example.project2.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    @Autowired
    BoardRepository Boardrepository;

//    public void Write(BOARD board) {
//        Boardrepository.save(board);
//    }

//    public void Delete(BOARD board) {
//        Boardrepository.deleteByBNUMBER(board.getBNUMBER());}



}
