package com.example.uefa_simulator;

import com.example.uefa_simulator.entities.Team;
import com.example.uefa_simulator.repositories.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public Team updateTeam(Long id, Team updatedTeam) {
        return teamRepository.findById(id)
                .map(existingTeam -> {
                    existingTeam.setName(updatedTeam.getName()); // Example field
                    existingTeam.setCountry(updatedTeam.getCountry()); // Example field
                    return teamRepository.save(existingTeam);
                }).orElseThrow(() -> new EntityNotFoundException("Team not found"));
    }

    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
