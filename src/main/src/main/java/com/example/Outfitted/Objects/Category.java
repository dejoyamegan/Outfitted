package com.example.Outfitted.Objects;

import java.util.ArrayList;

public class Category {
	// properties of a clothing category
	private String name;
	private ArrayList<Item> items;

	public Category() {
		this.name = "";
		items = new ArrayList<Item>();
	}

	/**
	 * Default constructor
	 * @param name - name of clothing category
	 */
	public Category(String name) {
		this.name = name;
		items = new ArrayList<Item>();
	}
	
	// getters and setters
	public void setName(String newName) {
		this.name = newName;
	}
	public String getName() {
		return this.name;
	}
	public ArrayList<Item> getItems(){
		return items;
	}
	
	// clothing category functions
	public void addItem(Item newItem) {
		items.add(newItem);
	}
	
	public boolean removeItem(Item itemToRemove) {
		return items.remove(itemToRemove);
	}
}
