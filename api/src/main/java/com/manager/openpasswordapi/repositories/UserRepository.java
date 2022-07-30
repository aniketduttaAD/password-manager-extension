package com.manager.openpasswordapi.repositories;

import com.manager.openpasswordapi.domain.User;
import com.manager.openpasswordapi.exceptions.EtAuthException;

public interface UserRepository {

    String create( String userId, String firstName, String lastName, String email, String password) throws EtAuthException;

    User findByEmailAndPassword(String email, String password) throws EtAuthException;

    Integer getCountByEmail(String email);

    User findById(String userId);
}
