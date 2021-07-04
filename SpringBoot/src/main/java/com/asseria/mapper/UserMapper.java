package com.asseria.mapper;

import com.asseria.dto.UserDTO;
import com.asseria.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface UserMapper {
	
	UserDTO toDTO(User user);

	User toEntity(UserDTO userDTO);
	
}
