package com.example.formsapplication.demo.service;

import com.example.formsapplication.demo.entity.Info;
import com.example.formsapplication.demo.repository.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class formservice
{
    @Autowired
    private InfoRepository infoRepository;
    public Info saveEntry(Info info)
    {
        return infoRepository.save(info);
    }
}
