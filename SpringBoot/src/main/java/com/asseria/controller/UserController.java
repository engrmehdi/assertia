package com.asseria.controller;

import com.asseria.dto.UserDTO;
import com.asseria.entity.Country;
import com.asseria.entity.User;
import com.asseria.repository.UserRepository;
import com.asseria.service.UserService;
import com.asseria.specifications.SearchCriteria;
import com.asseria.specifications.SearchOperation;
import com.asseria.specifications.UserSpecification;
import com.asseria.util.Apis;
import com.asseria.util.ListRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

/**
 * REST controller for managing {@link User}
 */
@RestController
@CrossOrigin
@Api(value="Users", description="Operations pertaining to users")
@ApiImplicitParams({})
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping(Apis.FIND_ALL)
	@ApiOperation(value = "Returns list of all users")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		List<UserDTO> userDTOs = userService.findAll();
		return ResponseEntity.ok().body(userDTOs);
	}

	@PostMapping(Apis.FIND_ALL_WITH_LIST_REQUEST)
	@ApiOperation(value = "Returns list of all users by list request params like per page, page number etc")
	public ResponseEntity<List<UserDTO>> findAllByListRequest(@RequestBody ListRequest request) {
		List<UserDTO> userDTOs = userService.findAllWithListRequest(request);
		return ResponseEntity.ok().body(userDTOs);
	}

    // this method is an example of implementation spring data specification for search

	@PostMapping(Apis.FIND_ALL_BY_COUNTRY_NAME)
	@ApiOperation(value = "Returns list of all users by country ( this is spring data specifications example)")
	public ResponseEntity<List<UserDTO>> findAllByCountryName(@RequestBody Country countryName) {
		UserSpecification specs = new UserSpecification();
		specs.add(new SearchCriteria("country", countryName,SearchOperation.EQUAL));
		List<UserDTO> userDTOs = userService.findAllByCountry(specs);
		return ResponseEntity.ok().body(userDTOs);
	}



	@ApiOperation(value = "Authenticate by returning user by token")
	@GetMapping("/auth/me")
	public UserDTO getLoggedInUser(Principal principal) {
		String userName = principal.getName();
		UserDTO userDTO = userService.findByUsername(userName);
		return userDTO;
	}

	@RequestMapping(value = Apis.SAVE, method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) throws Exception {
		userDTO.setPassword("12345678abc");
		return ResponseEntity.ok(userService.save(userDTO));
	}

	@RequestMapping(value = Apis.UPDATE, method = RequestMethod.POST)
	public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) throws Exception {
		UserDTO userOldDTO = userService.findByUsername(userDTO.getUserName());
		userDTO.setPassword(userOldDTO.getPassword());
		return ResponseEntity.ok(userService.save(userDTO));
	}

	@ApiOperation(value = "Deletes a User by Id")
	@DeleteMapping(Apis.DELETE_BY_ID)
	public ResponseEntity<?> deleteItem(@PathVariable Long id) {
		userRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body(true);
	}

}
