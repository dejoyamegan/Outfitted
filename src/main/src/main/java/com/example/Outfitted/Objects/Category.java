package com.example.Outfitted.Objects;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Category {
	// properties of a clothing category
	private String name;
	//TODO: Change this to reference items rather than array list of item objects
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
