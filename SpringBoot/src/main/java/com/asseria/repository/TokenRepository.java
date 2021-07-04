package com.asseria.repository;

import com.asseria.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>{

	Token findByTokenAndStatus(String token, boolean status);

}
