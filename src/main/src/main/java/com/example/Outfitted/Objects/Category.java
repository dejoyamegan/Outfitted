package com.example.Outfitted.Objects;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Category {
	// properties of a clothing category
	private String name;
	//TODO: Change this to reference items rather than array list of item objects
	private ArrayList<String> items;
	private String uri;

	public Category() {
		this.name = "";
		items = new ArrayList<String>();
		this.uri = "";
		//TODO URL image field
	}

	/**
	 * Default constructor
	 * @param name - name of clothing category
	 */
	public Category(String name, String uri) {
		this.name = name;
		items = new ArrayList<String>();
		this.uri = uri;
	}
	
	// getters and setters
	public void setName(String newName) {

		this.name = newName;
	}
	public String getName() {

		return this.name;
	}
	public ArrayList<String> getItems(){

		return items;
	}
	
	// clothing category functions
	public void addItem(String newItem) {

		items.add(newItem);
	}
	
	public boolean removeItem(Item itemToRemove) {

		return items.remove(itemToRemove);
	}
}
