package com.example.Outfitted.Objects;

import com.google.cloud.firestore.DocumentReference;
import org.springframework.stereotype.Component;

@Component
public class Outfit {
	// properties of an outfit in the closet
	private String name;
	private String top; // maybe change these types to DocumentReference
	private String bottom;
	private String topLayer;
	private String shoes;
	private String accessory;
	//TODO REFERENCE objects
	
	/**
	 * Default constructor
	 */
	public Outfit() {
		this.name = "Outfit";
//		this.top = new Item();
//		this.bottom = new Item();
//		this.topLayer = new Item();
//		this.shoes = new Item();
//		this.accessory = new Item();
		this.top = "top";
		this.bottom = "bottom";
		this.topLayer = "top layer";
		this.shoes = "shoes";
		this.accessory = "accessory";

	}
	
	/**
	 * Constructor with all outfit properties
	 */
	public Outfit(String name, String top, String bottom, String topLayer, String shoes, String accessory) {
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

	public void setTop(String top) {
		this.top = top;
	}
	public String getTop() {
		return this.top;
	}
	
	public void setBottom(String bottom) {
		this.bottom = bottom;
	}
	public String getBottom() {
		return this.bottom;
	}
	
	public void setTopLayer(String topLayer) {
		this.topLayer = topLayer;
	}
	public String getTopLayer() {
		return this.topLayer;
	}
	
	public void setShoes(String shoes) {
		this.shoes = shoes;
	}
	public String getShoes() {
		return this.shoes;
	}
	
	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}
	public String getAccessory() {
		return this.accessory;
	}
}
