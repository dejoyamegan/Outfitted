package com.example.Outfitted.Users;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OutfitTest {

    @BeforeEach
    void setUp() {
        // open any test files here
    }

    // create closet instance
    Closet testCloset = new Closet("Test Owner");
    // create test category
    Category shirts = new Category("Shirts");
    // create test items to go in outfit
    Item graphicTee = new Item("green", "M", "Gap", 20, shirts);
    Item pants = new Item();
    Item coat = new Item();
    Item vans = new Item();
    Item hairClip = new Item();
    // create outfit instance to add to closet
    Outfit outfit = new Outfit();

    @Test
    void testAddItemToOutfit(){
        outfit.setTop(graphicTee);
        assertEquals(outfit.getTop().equals(graphicTee), true);
    }
    @Test
    void testAddItemToCategory(){
        shirts.addItem(graphicTee);
        assertEquals(shirts.getItems().size(), 1);
    }
    @Test
    void testRemoveItemFromOutfit(){
        outfit.setTop(new Item());
        assertEquals(outfit.getTop().equals(graphicTee), false);
    }
    @Test
    void testRemoveItemFromCategory(){
        shirts.removeItem(graphicTee);
        assertEquals(shirts.getItems().size(), 0);
    }
    @Test
    void testAddOutfitToCloset(){
        testCloset.addOutfit(outfit);
        assertEquals(testCloset.getOutfits().size(), 1);
    }

    @AfterEach
    void tearDown() {
        // close any test files here
    }

    public void Main(String args[]){
        testAddItemToOutfit();
    }
}