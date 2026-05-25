package com.example.demo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.enitity.EmpEntity;
import com.example.demo.repo.EmpRepo;

@Service
public class EmpService {
	@Autowired
	private EmpRepo repo;
	
	public EmpEntity addEmp(EmpEntity empEntity) {
		return repo.save(empEntity);
		
	}
	
	public List<EmpEntity> getALlUsers() {
		return repo.findAll();
		
	}
	
	
	public EmpEntity getByID(Long id) {
		return repo.findById(id).orElse(null);
		
	}
	public void deletById(Long id) {
		repo.deleteById(id);
		
	}
	
	
	public EmpEntity UpdateEmp(Long id, EmpEntity newUserDetails) {
		EmpEntity oldUser=repo.findById(id)
				   .orElseThrow(()-> new RuntimeException("User Not Found"));
		
		oldUser.setName(newUserDetails.getName());
		
		oldUser.setAddress(newUserDetails.getAddress());
		oldUser.setSalary(newUserDetails.getSalary());
		
		return repo.save(oldUser);
		
	}
	
	
	

}
