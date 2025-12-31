package com.kasper.gutguide.enums;

public enum Unit {
    
    // Weight
    KILOGRAM("kg"),
    GRAM("g"),
    MILLIGRAM("mg"),

    // Volume
    LITER("l"),
    DECILITER("dl"),
    CENTILITER("cl"),
    MILLILITER("ml"),

    // Count / pieces
    PIECE("pcs"),
    SLICE("slice"),
    PINCH("pinch"),

    // Common cooking measures
    TEASPOON("tsp"),
    TABLESPOON("tbsp"),
    CUP("cup");

    private final String unitString;

    Unit(String string) {
        this.unitString = string;
    }

    public String getUnitString() {
        return unitString;
    }

}
