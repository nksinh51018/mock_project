package com.sapo.qlsc.ulti;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordPoJo {
    String oldPassword;
    String password;
    Long id;
}
