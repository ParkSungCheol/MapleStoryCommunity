package com.example.project2.repository;

import java.util.List;

import com.example.project2.entity.Idmanage;
import org.springframework.data.jpa.repository.JpaRepository;

//import com.example.project2.vo.IDMANAGE;
import com.example.project2.vo.REPLY;
import org.springframework.data.jpa.repository.Query;

public interface ReplyRepository extends JpaRepository<REPLY, Long>{
	
	List<REPLY> findByidmanage(Idmanage idmanage);

	@Query("select distinct m from REPLY m join fetch m.idmanage")
	List<REPLY> findAllREPLY();
}
