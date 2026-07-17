package com.example.formsapplication.demo.service;
import java.util.Optional;
import com.example.formsapplication.demo.entity.Info;
import com.example.formsapplication.demo.repository.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Component
public class formservice
{
    @Autowired
    private InfoRepository infoRepository;
    public Info saveEntry(Info info)
    {
        return infoRepository.save(info);
    }
    public List<Info> getAll()
    {
        return infoRepository.findAll();
    }
    public void deleteEntry(Integer id)
    {
        infoRepository.deleteById(id);
    }
    public Optional<Info> getById(Integer id) {
        return infoRepository.findById(id);
    }
}
