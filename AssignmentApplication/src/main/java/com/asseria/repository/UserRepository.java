package com.asseria.repository;

import com.asseria.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>,JpaSpecificationExecutor<User> {

	User findByUsername(String username);

	Optional<User> findOneByUsername(String username);

	Optional<User> findOneByEmail(String email);

	@Override
	void deleteById(Long aLong);


}
