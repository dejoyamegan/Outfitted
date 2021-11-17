package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Item;
import com.example.Outfitted.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
//@DemoController
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/getItemDetails")
    public Item getItem(@RequestParam Item item) throws InterruptedException, ExecutionException {
        return itemService.getItemDetails(item);
    }

    @PostMapping("/createItem")
    public String createItem(@RequestBody Item item) throws InterruptedException, ExecutionException {
        return itemService.saveItemDetails(item);
    }

    @PutMapping("/updateItem")
    public String updateItem(@RequestBody Item item) throws InterruptedException, ExecutionException {
        return itemService.updateItemDetails(item);
    }

    @DeleteMapping("/deleteItem")
    public String deleteItem(@RequestParam Item item) throws InterruptedException, ExecutionException {
        return itemService.deleteItem(item);
    }

}
