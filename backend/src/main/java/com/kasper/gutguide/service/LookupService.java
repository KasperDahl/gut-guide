package com.kasper.gutguide.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kasper.gutguide.enums.Unit;

@Service
public class LookupService {
    
    public List<String> getUnitStrings() {
        return Arrays.stream(Unit.values())
                .map(Unit::getUnitString)
                .toList();
    }
}
