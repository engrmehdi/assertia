package com.asseria.mapper;

import com.asseria.dto.UserDTO;
import com.asseria.entity.User;
import org.springframework.stereotype.Component;

import javax.annotation.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-08-02T13:46:55+0500",
    comments = "version: 1.4.1.Final, compiler: javac, environment: Java 1.8.0_191 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setUserName( user.getUserName() );
        userDTO.setEmail( user.getEmail() );
        userDTO.setPhone( user.getPhone() );
        userDTO.setPassword( user.getPassword() );
        userDTO.setStreat( user.getStreat() );
        userDTO.setCountry( user.getCountry() );
        userDTO.setState( user.getState() );

        userDTO.setCreatedBy( user.getCreatedBy() );
        userDTO.setCreationDate( user.getCreationDate() );
        userDTO.setLastModifiedBy( user.getLastModifiedBy() );
        userDTO.setLastModifiedDate( user.getLastModifiedDate() );

        return userDTO;
    }

    @Override
    public User toEntity(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );
        user.setUserName( userDTO.getUserName() );
        user.setEmail( userDTO.getEmail() );
        user.setPhone( userDTO.getPhone() );
        user.setPassword( userDTO.getPassword() );
        user.setStreat( userDTO.getStreat() );
        user.setState( userDTO.getState() );
        user.setCountry( userDTO.getCountry() );

        return user;
    }
}
