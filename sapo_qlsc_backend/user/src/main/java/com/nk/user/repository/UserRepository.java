package com.nk.user.repository;

import com.nk.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT u FROM User u WHERE u.status =1 and (u.fullName like  %:param% or " +
            "u.email like %:param% or u.phoneNumber like %:param% or " +
            "u.code like  %:param% or u.address like %:param%) ")
    public Page<User> getAllUser(Pageable pageable, String param);

    @Query(value = "SELECT u FROM User u WHERE u.status =1 and u.role = 2 and (u.fullName like  %:param% or " +
            "u.email like %:param% or u.phoneNumber like %:param% or " +
            "u.code like  %:param% or u.address like %:param%) ")
    public Page<User> getAllRepairman(Pageable pageable, String param);

    public Page<User> findAll(Pageable pageable);

    @Modifying
    @Query(value = "update Users set Users.status = 0 where Users.id =:UserId", nativeQuery = true)
    public Integer updateStatusUser(@Param("UserId") Long UserId);

    @Query(value = "SELECT CONVERT(SUBSTRING(code, 4), UNSIGNED INTEGER ) AS newcode FROM users WHERE code LIKE '%ND%' ORDER BY newcode DESC LIMIT 1 offset :index", nativeQuery = true)
    public String getMaxCodeUser(@Param("index") int index);

    @Query(value = "SELECT count(code) FROM users\n" +
            "            where code = :code \n" +
            "            and id != :id ", nativeQuery = true)
    public int checkCode(String code, Long id);

    @Query(value = "select u from User u where u.email =:username and u.password =:password")
    public User checkLogin(@Param("username") String username, @Param("password") String password);

    @Query(value = "select u from User u where u.email =:username")
    public User checkExistEmail(@Param("username") String username);

    @Modifying
    @Query(value = "update User set password =:passwords where id =:userId")
    public int changePassword(String passwords, Long userId);

    @Query(value = "select u from User u where u.role =3")
    List<User> getAllManager();

}
