package com.example.Outfitted.Controller;
import com.example.Outfitted.Objects.Closet;
import com.example.Outfitted.Service.ClosetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
//@DemoController
public class ClosetController {

    @Autowired
    ClosetService closetService;

    @GetMapping("/getClosetDetails")
    public Closet getCloset(@RequestParam Closet closet) throws InterruptedException, ExecutionException {
        return closetService.getClosetDetails(closet);
    }

    @PostMapping("/createCloset")
    public String createCloset(@RequestBody Closet closet) throws InterruptedException, ExecutionException {
        return closetService.saveClosetDetails(closet);
    }

    @PutMapping("/updateCloset")
    public String updateCloset(@RequestBody Closet closet) throws InterruptedException, ExecutionException {
        return closetService.updateClosetDetails(closet);
    }

    @DeleteMapping("/deleteCloset")
    public String deleteCloset(@RequestParam String owner) throws InterruptedException, ExecutionException {
        return closetService.deleteCloset(owner);
    }

}

