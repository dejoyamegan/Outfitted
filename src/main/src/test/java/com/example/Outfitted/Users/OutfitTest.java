package com.example.Outfitted.Users;

import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Objects.Closet;
import com.example.Outfitted.Objects.Item;
import com.example.Outfitted.Objects.Outfit;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OutfitTest {

    @BeforeEach
    void setUp() {
        // open any test files here
    }
    // create test user objects
    User defaultUser = new User();
    User testUser = new User("Taylor Swift", "32", "New York");
    // create closet instance
    Closet testCloset = new Closet("Test Owner");
    // create test category
    Category shirts = new Category("Shirts", "/path");
    // create test items to go in outfit
    Item graphicTee = new Item("graphic tee", "green", "M", "Gap", 20.0, shirts, "uri");
    Item pants = new Item();
    Item coat = new Item();
    Item vans = new Item();
    Item hairClip = new Item();
    // create outfit instance to add to closet
    Outfit outfit = new Outfit();
    Outfit outfitWithParams = new Outfit("casual outfit", graphicTee, pants, coat, vans, hairClip);

    // user tests
    @Test
    void testToString(){
        assertEquals(testUser.toString(),"name: Taylor Swift uid: 32 email: New York");
    }

    // category tests
    @Test
    void testCreateCategory(){
        Category testCategory = new Category();
        assertEquals(testCategory.getName().equals(""), true);
    }
    @Test
    void testChangeCategoryName(){
        shirts.setName("Sweatshirts");
        assertEquals(shirts.getName(), "Sweatshirts");
    }
    @Test
    void testAddItemToCategory(){
        shirts.addItem(graphicTee);
        assertEquals(shirts.getItems().size(), 1);
    }
    @Test
    void testRemoveItemFromCategory(){
        shirts.removeItem(graphicTee);
        assertEquals(shirts.getItems().size(), 0);
    }
    @Test
    void testSetCategoryUri(){
        shirts.setUri("new uri");
        assertEquals(shirts.getUri(), "new uri");
    }

    // outfit tests
    @Test
    void testAddItemToOutfit(){
        outfit.setTop(graphicTee);
        assertEquals(outfit.getTop().equals(graphicTee), true);
    }
    @Test
    void testRemoveItemFromOutfit(){
        outfit.setTop(new Item());
        assertEquals(outfit.getTop().equals(graphicTee), false);
    }
    @Test
    void testOutfitBottom(){
        outfit.setBottom(new Item());
        assertEquals(outfit.getBottom().equals(pants), false);
    }
    @Test
    void testOutfitTopLayer(){
        outfit.setTopLayer(new Item());
        assertEquals(outfit.getTopLayer().equals(coat), false);
    }
    @Test
    void testOutfitShoes(){
        outfit.setShoes(new Item());
        assertEquals(outfit.getShoes().equals(vans), false);
    }
    @Test
    void testOutfitAccessory(){
        outfit.setAccessory(new Item());
        assertEquals(outfit.getAccessory().equals(hairClip), false);
    }

    @Test void testGetName(){
        outfit.setName("New Fit");
        assertEquals(outfit.getName(), "New Fit");
    }


    // closet tests
    @Test
    void testAddOutfitToCloset(){
        testCloset.addOutfit(outfit);
        assertEquals(testCloset.getOutfits().size(), 1);
    }
    @Test
    void testRemoveOutfitFromCloset(){
        testCloset.addOutfit(outfit);
        testCloset.removeOutfit(outfit);
        assertEquals(testCloset.getOutfits().size(), 0);
    }
    @Test
    void testCreateCloset(){
        Closet testClosetDefault = new Closet();
        assertEquals(testCloset.equals(testClosetDefault), false);
    }
    @Test
    void testSetClosetOwner(){
        testCloset.setOwner("Test Owner Name");
        assertEquals(testCloset.getOwner(), "Test Owner Name");
    }
    @Test
    void testAClosetNumItems(){
        testCloset.setNumItems(5);
        assertEquals(testCloset.getNumItems(), 5);
    }
    @Test
    void testAddClosetCategories(){
        int prevNumCategories = testCloset.getOutfits().size();
        testCloset.addCategory("Jeans");
        assertEquals(testCloset.getCategories().size(), prevNumCategories + 1);
    }
    @Test
    void testAddItemToCloset(){
        int prevNumItems = shirts.getItems().size();
        Item workShirt = new Item();
        testCloset.addItem(shirts, workShirt);
        assertEquals(shirts.getItems().size(), prevNumItems + 1);
    }
    @Test
    void testAddItemOnlyNameToCloset(){
        int prevNumItems = shirts.getItems().size();
        Item blueShirt = new Item("Blue Button Down");
        testCloset.addItem(shirts, blueShirt);
        assertEquals(shirts.getItems().size(), prevNumItems + 1);
    }
    @Test
    void testRemoveItemFromCloset(){
        Item workShirt = new Item();
        testCloset.addItem(shirts, workShirt);
        testCloset.removeItem(shirts, workShirt);
        assertEquals(shirts.getItems().size(), 0);
    }

    // item tests
    @Test
    void testItemName(){
        graphicTee.setName("t shirt"); // should not change
        assertEquals(graphicTee.getName(), "t shirt");
    }
    @Test
    void testItemColor(){
        graphicTee.setColor("blue");
        assertEquals(graphicTee.getColor(), "blue");
    }
    @Test
    void testItemSize(){
        graphicTee.setSize("8");
        assertEquals(graphicTee.getSize(), "8");
    }
    @Test
    void testItemBrand(){
        graphicTee.setBrand("Nike");
        assertEquals(graphicTee.getBrand(), "Nike");
    }
    @Test
    void testItemPrice(){
        graphicTee.setPrice(24.99);
        assertEquals(graphicTee.getPrice(), 24.99);
    }
    @Test
    void testItemTimesWorn(){
        graphicTee.addTimesWorn();
        graphicTee.addTimesWorn();
        assertEquals(graphicTee.getTimesWorn(), 2);
    }
    @Test
    void testItemCategory(){
        assertEquals(graphicTee.getCategory(), shirts);
    }
    @Test
    void testItemUri(){
        graphicTee.setUri("new uri");
        assertEquals(graphicTee.getUri(), "new uri");
    }

    // user tests
    @Test
    void testUserName(){
        testUser.setName("T Swift");
        assertEquals(testUser.getName(), "T Swift");
    }
    @Test
    void testUserUid(){
        testUser.setUid("22");
        assertEquals(testUser.getUid(), "22");
    }
    @Test
    void testUserEmail(){
        testUser.setEmail("123@gmail.com");
        assertEquals(testUser.getEmail(), "123@gmail.com");
    }

    @AfterEach
    void tearDown() {
        // close any test files here
    }

    public void Main(String args[]){
        testAddItemToOutfit();
    }
}