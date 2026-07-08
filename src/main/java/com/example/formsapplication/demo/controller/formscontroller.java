package com.example.formsapplication.demo.controller;
import com.example.formsapplication.demo.entity.Info;
import com.example.formsapplication.demo.service.formservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forms")
public class formscontroller
{
    @Autowired
    private formservice formservice;

    @PostMapping
    public void createEntry(@RequestBody Info info)
    {
      formservice.saveEntry(info);
    }

}
