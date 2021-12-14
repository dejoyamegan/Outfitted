package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Item;
import com.example.Outfitted.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
//@DemoController
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/getItemDetails")
    public Item getItem(@RequestParam String item, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return itemService.getItemDetails(item, email);
    }

    @PostMapping("/createItem")
    public String createItem(@RequestBody Item item, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return itemService.saveItemDetails(item, email);
    }

    @PutMapping("/updateItem")
    public String updateItem(@RequestBody Item item, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return itemService.updateItemDetails(item, email);
    }

    @DeleteMapping("/deleteItem")
    public String deleteItem(@RequestParam String item, @RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return itemService.deleteItem(item, email);
    }

    @GetMapping("/getAllItems")
    public ArrayList<Item> getAllItems(@RequestParam("email") String email) throws InterruptedException, ExecutionException {
        return itemService.getAllItems(email);
    }

}
