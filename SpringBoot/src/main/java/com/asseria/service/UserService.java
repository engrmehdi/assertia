package com.asseria.service;

import com.asseria.dto.TokenAndPasswordDTO;
import com.asseria.dto.UserDTO;
import com.asseria.entity.User;
import com.asseria.specifications.UserSpecification;
import com.asseria.util.ListRequest;

import java.util.List;

public interface UserService {

	UserDTO save(UserDTO userDTO);

	List<UserDTO> findAll();

	UserDTO findByUsername(String userName);

	List<UserDTO> findAllWithListRequest(ListRequest request);

	List<UserDTO> findAllByCountry(UserSpecification specs);

	void saveTokenForUser(String token, User user);


}
