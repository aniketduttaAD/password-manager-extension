package com.manager.openpasswordapi.services;

import com.manager.openpasswordapi.domain.User;
import com.manager.openpasswordapi.exceptions.EtAuthException;
import com.manager.openpasswordapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

import static java.lang.String.valueOf;


@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User validateUser(String email, String password) throws EtAuthException {
        if(email!=null) email = email.toLowerCase();
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public User registerUser(String userId, String firstName, String lastName, String email, String password) throws EtAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if (email!=null) email=email.toLowerCase();
        if (!pattern.matcher(email).matches())
            throw new EtAuthException("Invalid Email Format");
        Integer count = userRepository.getCountByEmail(email);
        if(count > 0)
            throw new EtAuthException("Email already registered");
        userId = userRepository.create(userId, firstName, lastName, email, password);
        return userRepository.findById(userId);
    }
}
