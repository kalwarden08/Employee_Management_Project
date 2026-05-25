package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enitity.EmpEntity;
import com.example.demo.repo.EmpRepo;
import com.example.demo.service.EmpService;

@RestController
@RequestMapping("/emp")
@CrossOrigin("*")
public class EmpController {
	
    @Autowired
	private EmpService service;
    @PostMapping("/add")
    public EmpEntity addEmplo(@RequestBody EmpEntity entity) {
    	return service.addEmp(entity);
    }
    
    @GetMapping("/allusers")
    public List<EmpEntity> getallUsers(){
    	return service.getALlUsers();
    }
    
    @GetMapping("/get/{id}")
    public EmpEntity getById(@PathVariable Long id) {
    	return service.getByID(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteBYid(@PathVariable Long id ) {
    	service.deletById(id);
    }
    
    @PutMapping("/update/{id}")
    public EmpEntity updateUser(@PathVariable Long id,@RequestBody EmpEntity empEntity) {
    	return service.UpdateEmp(id, empEntity);
    }
	
}
