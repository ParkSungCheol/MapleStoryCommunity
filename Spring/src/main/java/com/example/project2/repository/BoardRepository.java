package com.example.project2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project2.entity.BOARD;
import org.springframework.data.jpa.repository.Query;

public interface BoardRepository extends JpaRepository<BOARD, Long>{
	


	@Query("select distinct m from BOARD m left join fetch m.idmanage")
	List<BOARD> findAllBoard();
	List<BOARD> deleteByBNUMBER(Long bnum);
	BOARD findByBNUMBER(Long bnum);



}
