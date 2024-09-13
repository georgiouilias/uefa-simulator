package com.example.uefa_simulator.repositories;

import com.example.uefa_simulator.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
