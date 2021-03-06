package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Category;
import com.example.Outfitted.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/getCategoryDetails")
    public Category getCategory(@RequestParam String name, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return categoryService.getCategoryDetails(name, email);
    }
    @GetMapping("/getAllCategories")
    public ArrayList<Category> getCategory(@RequestParam("email") String email) throws InterruptedException, ExecutionException{
        return categoryService.getAllCategories(email);
    }

    @PostMapping("/createCategory")
    public String createCategory(@RequestBody Category category, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return categoryService.saveCategoryDetails(category, email);
    }

    @PutMapping("/updateCategory")
    public String updateCategory(@RequestBody Category category, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return categoryService.updateCategoryDetails(category, email);
    }

    @DeleteMapping("/deleteCategory")
    public String deleteCategory(@RequestParam String name, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return categoryService.deleteCategory(name, email);
    }

}
