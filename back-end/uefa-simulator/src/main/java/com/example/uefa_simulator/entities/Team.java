package com.example.uefa_simulator.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
public class Team {
    @Id
    private long idTeams;
    private String logo;
    private String name;
    private String shortName;
    private String codeName;
    private String country;
    private String league;
    private String stadiumName;
    private int chlTitles;
    private int points;
}
