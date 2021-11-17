package com.example.Outfitted.Objects;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Closet {
	// properties of Closet
	private String owner;
	private int numItems;
	private ArrayList<Category> categories;
	private ArrayList<Outfit> outfits;
	
	/**
	 * Default constructor for Closet class
	 */
	public Closet() {
		this.owner = "No owner";
		this.numItems = 0;
		this.categories = new ArrayList<Category>();
		this.outfits = new ArrayList<Outfit>();
	}
	
	/**
	 * Constructor for closet with owner name
	 * @param name - name of this closet's owner/name of current user 
	 */
	public Closet(String name) {
		this.owner = name;
		this.numItems = 0;
		this.categories = new ArrayList<Category>();
		this.outfits = new ArrayList<Outfit>();
	}
	
	// getters and setters
	public void setOwner(String newOwner) {

		this.owner = newOwner;
	}
	
	public String getOwner() {

		return this.owner;
	}
	
	public void setNumItems(int newNumItems) {

		this.numItems = newNumItems;
	}
	
	public int getNumItems() {

		return this.numItems;
	}
	
	public ArrayList<Category> getCategories(){

		return this.categories;
	}

	public ArrayList<Outfit> getOutfits(){

		return this.outfits;
	}
	
	// closet functions 
	/**
	 * Adds a new category with specified name to closet categories list
	 * @param categoryName - name of new category to add
	 */
	public void addCategory(String categoryName) {

		this.categories.add(new Category(categoryName));
	}
	/**
	 * Adds a new clothing item to this user's closet in the specified category 
	 */
	public void addItem(Category category, Item newItem) {

		category.addItem(newItem);
	}
	
	/**
	 * Removes and returns specified clothing item from closet 
	 */
	public boolean removeItem(Category category, Item itemToRemove) {

		return category.removeItem(itemToRemove);
	}

	public void addOutfit(Outfit outfit) {

		outfits.add(outfit);
	}
	public boolean removeOutfit(Outfit outfit){

		return outfits.remove(outfit);
	}

}
