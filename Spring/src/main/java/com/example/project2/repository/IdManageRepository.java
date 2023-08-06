package com.example.project2.repository;

import java.util.List;

import com.example.project2.entity.Idmanage;
import org.springframework.data.jpa.repository.JpaRepository;

//import com.example.project2.vo.IDMANAGE;

public interface IdManageRepository extends JpaRepository<Idmanage, Long>{
	
	List<Idmanage> findByUSERCLASS(String USERCLASS);
	Idmanage findByUSERID(String USERID);
}