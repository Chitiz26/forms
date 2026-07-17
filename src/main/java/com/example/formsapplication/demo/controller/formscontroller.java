package com.example.formsapplication.demo.controller;
import com.example.formsapplication.demo.entity.Info;
import com.example.formsapplication.demo.service.formservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/all")
    public List<Info> showEntry()
    {
        return formservice.getAll();
    }
    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Integer id)
    {
       formservice.deleteEntry(id);
    }
    @PutMapping("/{id}")
    public Info updateEntry(
            @RequestBody Info info,
            @PathVariable Integer id) {

        Info existingInfo = formservice.getById(id)
                .orElseThrow(()-> new RuntimeException("Entry not found"));

        existingInfo.setName(info.getName());
        existingInfo.setEmail(info.getEmail());
        existingInfo.setAge(info.getAge());

        return formservice.saveEntry(existingInfo);
    }

}
