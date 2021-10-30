package com.system.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.system.entity.Events;
import com.system.dao.EventDAO;

//@CrossOrigin(origins ={"https://calendar-agenda.herokuapp.com","http://calendar-agenda.herokuapp.com"}, maxAge = 3600)
@CrossOrigin(origins ="http://localhost:3000", maxAge = 3600)
@RestController
public class EventController {

	@Autowired
	private EventDAO eventDAO;
	
	
	
	@GetMapping("/events")
    public List<Events> getEvents() throws Exception {
        List<Events> events = (List<Events>) eventDAO.findAll();
        

        return events;
    }
	
	 @PostMapping("/events")
	 @ResponseStatus(HttpStatus.CREATED)
	 @ResponseBody 
	 public void addEvents(@RequestBody  Events event) {
    		 eventDAO.save(event);
	  }
	 	
	 
	 @DeleteMapping("/events/{id}")
     public void deleteById(@PathVariable("id") int id) {
		 	eventDAO.delete(id);
 	 }
	 
	 
	 @PutMapping("/events/{id}")
	 @ResponseBody 
	 public void editEvents(@PathVariable("id") int id,@RequestBody  Events events) {
    
    		Events event = eventDAO.findOne(id);
    		if(event!=null){
    			event.setstartDate(events.getstartDate());
    			event.setendDate(events.getendDate());
    			event.setstarttime(events.getstarttime());
    			event.setendtime(events.getendtime());
    			event.setEventDesc(events.getEventDesc());
    		}
    		eventDAO.save(event);
	 
    }
	 
}
