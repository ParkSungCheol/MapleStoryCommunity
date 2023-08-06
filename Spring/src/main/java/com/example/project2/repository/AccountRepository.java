package com.example.project2.repository;

import com.example.project2.entity.Idmanage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends JpaRepository<Idmanage,Long> {


    Idmanage findByUSERID(String USERID);

}
