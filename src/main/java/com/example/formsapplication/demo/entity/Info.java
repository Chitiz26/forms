package com.example.formsapplication.demo.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
        name = "info",
        uniqueConstraints = @UniqueConstraint(
                name = "uq_email",
                columnNames = {"email"}
        )
)
public class Info
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private int age;
    @Enumerated(EnumType.STRING)
    private Continent continent;

}
