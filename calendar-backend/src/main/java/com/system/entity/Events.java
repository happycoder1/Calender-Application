package com.system.entity;

import java.io.Serializable;

import java.util.Date;
import java.util.List;
import java.util.Set;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
//@Table(name="sql9244575")
@Table(name="Events")
@NoArgsConstructor
public class Events implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6997499182545244592L;

	/**
	 * 
	 */
	

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private int Id;
	
    private String description;
    
    private String starttime;
    private String endtime;
    private String startdate;
    private String enddate;
 
  

    
	public int getEventId(){
		return Id;
	}	
	public void setEventId(int Id) {
		this.Id = Id;
	}


	public String getstarttime(){
		return starttime;

	}
	
	public void setstarttime(String starttime){
		this.starttime=starttime;
	}
	
	
	public String getendtime(){
		return endtime;

	}
	
	public void setendtime(String endtime){
		this.endtime=endtime;
	}
	
	public String getstartDate(){
		return startdate;

	}
	
	public void setstartDate(String startdate){
		this.startdate=startdate;
	}
	
	public String getendDate(){
		return enddate;

	}
	
	public void setendDate(String enddate){
		this.enddate=enddate;
	}
	
	public String getEventDesc() {
		return description;
	}

	public void setEventDesc(String description) {
		this.description=description;
	}
	
	public Events(int Id, String startdate, String enddate, String starttime, String endtime, String description){
		this.Id=Id;
		this.startdate=startdate;
		this.enddate=enddate;
		this.starttime=starttime;
		this.endtime=endtime;
		this.description=description;
	}
	
	
	
    @JsonCreator
    public Events(@JsonProperty("startdate") String startdate,@JsonProperty("enddate") String enddate,@JsonProperty("starttime") String starttime,@JsonProperty("endtime") String endtime,@JsonProperty("description") String description) {
    	this.startdate=startdate;
    	this.enddate=enddate;
        this.starttime=starttime;
        this.endtime=endtime;
        this.description=description;
    } 
    
    @Override
    public String toString() {
        return "Event{" +
                "id=" + Id +
                ", startdate='" + startdate + '\'' + ", enddate='"+ enddate + '\''+ ", starttime='" + starttime +  '\''+ ", endtime='" + endtime  + '}';
    }

}


