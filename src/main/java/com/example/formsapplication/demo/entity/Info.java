package com.example.formsapplication.demo.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;
import lombok.NonNull;

@Entity
@Data
@Table(name = "info")
public class Info
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private int age;

}
