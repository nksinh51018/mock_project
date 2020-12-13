package com.sapo.qlsc.repository;

import com.sapo.qlsc.entity.MaintenanceCard;
import com.sapo.qlsc.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = "SELECT count(*) FROM messages \n" +
            "where user_id = :userId \n" +
            "and status = 1 " +
            ";", nativeQuery = true)
    public int countMessagesByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT * FROM messages as m, users as u \n" +
            "where m.user_id = u.id \n" +
            "and u.email = :email " +
            "", nativeQuery = true)
    public Page<Message> getMessagesByEmail(@Param("email") String email, Pageable pageable);

    @Query(value = "SELECT * FROM messages as m, users as u \n" +
            "where m.user_id = u.id \n" +
            "and u.email = :email " +
            "and m.id = :id "
            , nativeQuery = true)
    public Message getMessageByEmailAndId(@Param("email") String email, @Param("id") int id);
}
