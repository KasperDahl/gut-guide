package com.kasper.gutguide.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kasper.gutguide.service.LookupService;

@RestController
@RequestMapping("/api/lookup")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular dev server
public class LookupController {
    private final LookupService lookupService;

    @Autowired
    public LookupController(LookupService lookupService) {
        this.lookupService = lookupService;
    }

    @GetMapping("/units")
    public ResponseEntity<List<String>> getUnits() {
        return ResponseEntity.ok(lookupService.getUnitStrings());
    }
}
