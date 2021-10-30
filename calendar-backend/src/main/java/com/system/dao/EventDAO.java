package com.system.dao;


import com.system.entity.*;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EventDAO extends JpaRepository<Events,Integer>{

}
