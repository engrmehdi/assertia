package com.asseria.Auditing;

import com.asseria.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<String> getCurrentAuditor(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        Object principal = auth.getPrincipal();
        String username="";
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        try {
//            User user = userRepository.findByUsername(username);
//            return Optional.of(user.getId().toString());
            return Optional.of("1");
        } catch (Exception e) {
            return null;
        }

    }
}