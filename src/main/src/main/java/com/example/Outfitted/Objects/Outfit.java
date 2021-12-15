package com.example.Outfitted.Objects;

import com.google.cloud.firestore.DocumentReference;
import org.springframework.stereotype.Component;

@Component
public class Outfit {
	// properties of an outfit in the closet
	private String name;
	private Item top; // maybe change these types to DocumentReference
	private Item bottom;
	private Item topLayer;
	private Item shoes;
	private Item accessory;

	
	/**
	 * Default constructor
	 */
	public Outfit() {
		this.name = "Outfit";
		this.top = new Item();
		this.bottom = new Item();
		this.topLayer = new Item();
		this.shoes = new Item();
		this.accessory = new Item();
	}
	
	/**
	 * Constructor with all outfit properties as strings
	 */
	public Outfit(String name, Item top, Item bottom, Item topLayer, Item shoes, Item accessory) throws IllegalStateException {
		this.name = name;
		this.top = top;
		this.bottom = bottom;
		this.topLayer = topLayer;
		this.shoes = shoes;
		this.accessory = accessory;
	}
	
	// getters and setters
	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return this.name;
	}

	public void setTop(Item top) {
		this.top = top;
	}
	public Item getTop() {
		if(this.top == null) {
			this.top = new Item();
		}return this.top;
	}
	
	public void setBottom(Item bottom) {
		this.bottom = bottom;
	}
	public Item getBottom() {
		if(this.bottom == null) {
			this.bottom = new Item();
		}return this.bottom;
	}
	
	public void setTopLayer(Item topLayer) {
		this.topLayer = topLayer;
	}
	public Item getTopLayer() {
		if(this.topLayer == null) {
			this.topLayer = new Item();
		}return this.topLayer;
	}
	
	public void setShoes(Item shoes) {
		this.shoes = shoes;
	}
	public Item getShoes() {
		if(this.shoes == null) {
			this.shoes = new Item();
		}
		return this.shoes;
	}
	
	public void setAccessory(Item accessory) {
		this.accessory = accessory;
	}
	public Item getAccessory() {
		if(this.accessory == null) {
			this.accessory = new Item();
		}
			return this.accessory;
	}
}
