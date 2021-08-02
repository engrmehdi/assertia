package com.asseria.serviceImpl;

import com.asseria.dto.TokenAndPasswordDTO;
import com.asseria.dto.UserDTO;
import com.asseria.entity.Token;
import com.asseria.entity.User;
import com.asseria.error.BadRequestAlertException;
import com.asseria.error.EmailAlreadyUsedException;
import com.asseria.error.InvalidPasswordException;
import com.asseria.error.UsernameAlreadyUsedException;
import com.asseria.mapper.UserMapper;
import com.asseria.repository.TokenRepository;
import com.asseria.repository.UserRepository;
import com.asseria.service.UserService;
import com.asseria.specifications.UserSpecification;
import com.asseria.util.DataUtils;
import com.asseria.util.ListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.asseria.util.Utility.isValidPassword;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private DataUtils dataUtils;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new BadRequestAlertException("User not found with username: " + username, null, null);
		}
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				new ArrayList<>());
	}

	@Override
	public UserDTO save(UserDTO userDTO) {
		if(!isValidPassword(userDTO.getPassword())) {
			throw new InvalidPasswordException();
		}
		
		userDTO.setEmail(userDTO.getEmail().toLowerCase());
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		
		if (userDTO.getId() == null) {
			userRepository.findOneByUsername(userDTO.getUserName()).ifPresent(existingUser -> {
				throw new UsernameAlreadyUsedException();
			});
			userRepository.findOneByEmail(userDTO.getEmail()).ifPresent(existingUser -> {
				throw new EmailAlreadyUsedException();
			});
		}
		User userToSave = userMapper.toEntity(userDTO);
		User user = userRepository.save(userToSave);
		return userMapper.toDTO(user);
	}

	@Override
	public List<UserDTO> findAll() {
		List<User> users = userRepository.findAll();
		List<UserDTO> userDTOs = new ArrayList<UserDTO>();
		users.forEach(user -> {
			userDTOs.add(userMapper.toDTO(user));
		});
		return userDTOs;
	}
   // this is find all method which will be called when pagination and record per page etc applied
	@Override
	public List<UserDTO> findAllWithListRequest(ListRequest request) {
		List<User> users = userRepository.findAll(dataUtils.getPageAble(request)).get()
				.collect(Collectors.toList());
		List<UserDTO> userDTOs = new ArrayList<UserDTO>();
		users.forEach(user -> {
			userDTOs.add(userMapper.toDTO(user));
		});
		return userDTOs;
	}
	@Override
	public List<UserDTO> findAllByCountry(UserSpecification specs) {
		List<User> users = userRepository.findAll(specs);
		List<UserDTO> userDTOs = new ArrayList<UserDTO>();
		users.forEach(user -> {
			userDTOs.add(userMapper.toDTO(user));
		});
		return userDTOs;
	}

	@Override
	public UserDTO findByUsername(String userName) {
		User user = userRepository.findByUsername(userName);
		UserDTO userDto = new UserDTO();

		if (user != null) {
			userDto = userMapper.toDTO(user);
			return userDto;
		} else {
			throw new UsernameNotFoundException("User not found with username: " + userName);
		}
	}

	@Override
	public void saveTokenForUser(String tokenString, User user) {
		Token token = new Token();
		token.setToken(tokenString);
		token.setUser(user);
		token.setStatus(true);
		
		Date date = new Date();
		long timeNow = date.getTime();
		long expiryTime = timeNow + Token.getResetPasswordExpiration();
		token.setExpiryDate(expiryTime);

		tokenRepository.save(token);

	}

	private boolean validateToken(TokenAndPasswordDTO tokenAndPasswordDTO, Token token) {
		if (!tokenAndPasswordDTO.getToken().equals(null)) {
			if (token != null) {
				Date date = new Date();
				long timeNow = date.getTime();
				if (timeNow<=token.getExpiryDate()) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	
}
