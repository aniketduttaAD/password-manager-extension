package com.manager.openpasswordapi.services;

import com.manager.openpasswordapi.domain.User;
import com.manager.openpasswordapi.exceptions.EtAuthException;

public interface UserService {

    User validateUser(String email, String password) throws EtAuthException;

    User registerUser(String userId, String firstName, String lastName, String email, String password) throws EtAuthException;
}
