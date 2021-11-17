package com.example.Outfitted.Objects;

import com.example.Outfitted.Objects.Category;
import org.springframework.stereotype.Component;

@Component
public class Item {
	// properties of a clothing item
	private String name;
	private String color;
	private String size;
	private String brand;
	private double price;
	private int timesWorn;
	private Category category;

	/**
	 * Default constructor
	 */
	public Item() {
		this.name = "No name";
		this.color = "No color";
		this.size = "No size";
		this.brand = "No brand";
		this.price = 0;
		this.timesWorn = 0;
		this.category = null;
	}
	/**
	 * Constructor taking in all4 properties of a clothing item 
	 */
	public Item(String name, String color, String size, String brand, double price, Category category) {
		this.name = name;
		this.color = color;
		this.size = size;
		this.brand = brand;
		this.price = price;
		this.timesWorn = 0;
		this.category = category;

	}
	
	// getters and setters
	public void setName(String newName) {
		this.color  = newName;
	}
	public String getName() {
		return this.name;
	}

	public void setColor(String newColor) {
		this.color  = newColor;
	}
	public String getColor() {
		return this.color;
	}
	
	public void setSize(String newSize) {
		this.size  = newSize;
	}
	public String getSize() {
		return this.size;
	}
	
	public void setBrand(String newBrand) {
		this.brand  = newBrand;
	}
	public String getBrand() {
		return this.brand;
	}
	
	public void setPrice(double newPrice) {
		this.price  = newPrice;
	}
	public double getPrice() {
		return this.price;
	}
	
	public int getTimesWorn() {
		return this.timesWorn;
	}
	
	public Category getCategory() {
		return this.category;
	}
	
}
