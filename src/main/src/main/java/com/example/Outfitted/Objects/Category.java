package com.example.Outfitted.Objects;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Category {
	// properties of a clothing category
	private String name;
	private ArrayList<Item> items;
	private String uri;

	public Category() {
		this.name = "";
		items = new ArrayList<Item>();
		this.uri = "";
	}

	/**
	 * Default constructor
	 * @param name - name of clothing category
	 */
	public Category(String name, String uri) {
		this.name = name;
		items = new ArrayList<Item>();
		this.uri = uri;
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

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}
}
