import React from 'react';
import './Calendar.css';
import moment from 'moment';
import axios from 'axios';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      selected: moment().startOf('day'),
      crevent:false,
      isHidden: true,
      isedit: false,
      dates:[]
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.toggleform=this.toggleform.bind(this);
  }


  events(){
    const self = this;
    let days=[];
    axios.get('http://localhost:8080/events'
      ).then(function (response) {
          for(var i=0;i<response.data.length;i++){
              days.push(response.data[i].startDate);
          }
          self.setState({
            dates: days
              });

      });

  }

  previous() {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.subtract(1, 'month'),
    });
  }

  next() {
    const {
      month,
    } = this.state;

    this.setState({
      month: month.add(1,'month'),
    });
  }

  toggleform(){
    console.log("toggleform triggered");
    this.setState({
      isHidden:!this.state.isHidden
    })
  }



  select(day) {
    console.log("select triggered");
    this.setState({
      selected: day.date,
      month: day.date.clone(),
      crevent:true
    });
    this.toggleform();
    //console.log(this.state.isHidden);
  }




  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const {
      selected,
      month,
    } = this.state;
    while (!done) {
      weeks.push(
        <Week key={date}
          dates={this.state.dates}
          date={date.clone()}
          month={month}
          select={(day)=>this.select(day)}
          selected={selected} />
      );

      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();

    }

    return weeks;
  };

  renderMonthLabel() {
    const {
      month, } = this.state;


    return <span className="month-label">{month.format("MMMM YYYY")}</span>;
  }

  render() {
    const date = this.state.selected.format("L");
  const {
    month, } = this.state;
    return (
      <section className="calendar">
      {this.events()}
        <header className="header">
          <div className="month-display row">
          <button className="arrow fa fa-arrow-left" onClick={this.previous}> &lt; </button>
            {this.renderMonthLabel()}
            <button className="arrow fa fa-angle-right"  onClick={this.next}> > </button>
          </div>
          <DayNames />
        </header>
        {this.renderWeeks()}
        {!this.state.isHidden && <Events date={date} hidden={this.toggleform} />}
      </section>
    );
  }

}

class Eventslist extends React.Component{
  constructor(props){
    super(props);
    this.state={
      eventid:'',
      isedit:false
    }
    this.editform=this.editform.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
     e.stopPropagation();
    this.setState({
      eventid:this.props.keys,
    });

    this.editform();
    console.log(this.props.keys);

  }

    editform(){
      console.log("editform triggered");
      this.setState({
      isedit : !this.state.isedit
      })
      console.log(this.state.isedit);
    }

  render(){
    const {
      keys,desc,stime,
    etime,sdate,
    edate,
  } = this.props;
  const eventedit = <Eventedit edit={this.editform} eid={this.state.eventid} ids={this.props.keys}  sd ={this.props.sdate} ed ={this.props.edate} st={this.props.stime} et={this.props.etime}  eventdesc={this.props.desc} />


    return(
      <div>
      <div style={{color: "black",cursor : "pointer",backgroundColor: "#ADD8E6", borderRadius:"8px", border:"2px solid" }}
       id={this.props.keys} onClick={this.handleClick}>
      <span> {this.props.desc} </span>
      </div>
      {this.state.isedit && eventedit}
      </div>
    );
  }
}

class Eventedit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      starttime: this.props.st,
      endtime: this.props.et,
      description:this.props.eventdesc,
      submit: ''
    };
    this.starttimeChange = this.starttimeChange.bind(this);
    this.endtimeChange = this.endtimeChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deletevent = this.deletevent.bind(this);
  }

  deletevent(){
    event.preventDefault();
    let data = JSON.stringify({
        startdate: this.props.sd,
        enddate: this.props.ed,
        starttime: this.state.starttime,
        endtime: this.state.endtime,
        description: this.state.description
   });

   //console.log(data);
   //console.log('http://127.0.0.1:8080/events/'+this.props.ids);
   axios.delete('http://localhost:8080/events/'+this.props.ids, data, {
         headers: {
             'Content-Type': 'application/json',
             'crossDomain': false
         }
     }).then(function (response) {
         //handle succes

         console.log(response);
     }).catch(function (response) {
         //handle error
         console.log(response);
     });

      this.props.edit();
  }
  starttimeChange(event) {
    this.setState({
      starttime: event.target.value
    });
  }

  endtimeChange(event) {
    this.setState({
      endtime: event.target.value
    });
  }

  descChange(event) {
    this.setState({
      description: event.target.value
    });
  }


  handleSubmit(event) {

  event.preventDefault();
  event.stopPropagation();
    let data = JSON.stringify({
        startdate: this.props.sd,
        enddate: this.props.ed,
        starttime: this.state.starttime,
        endtime: this.state.endtime,
        description: this.state.description
   });

   console.log(data);

   //console.log('http://127.0.0.1:8080/events/'+this.props.ids);
   var comp = this.state.starttime.localeCompare(this.state.endtime);
   console.log(comp);
   if(comp==-1){
   axios.put('http://localhost:8080/events/'+this.props.ids, data, {
         headers: {
             'Content-Type': 'application/json',
             'crossDomain': false
         }
     }).then(function (response) {
         //handle succes
         console.log(response);
     }).catch(function (response) {
         //handle error
         console.log(response);
     });
      this.props.edit();
      this.setState({
          starttime: '',
          endtime: '',
          description:''
        });

   }
   else{
      alert("start time should be earlier than end time");

        this.setState({
          starttime: this.state.starttime,
          endtime: this.state.endtime,
          description:this.state.description
        });
   }
}
  render() {

  const {
    ids,eventdesc,sd,ed,
    st, et
  } = this.props;

//  console.log(this.props.ids);

  if(this.props.ids==this.props.eid){
    // document.getElementById("formedit").style.display = "block";
    return (
      <div id="formedit" style={{position: "absolute", zIndex: 99, width:"100%", height:"100%",top:"0px",left:"0px",background: "#e5e5e5"}}>
        <form style={{marginTop: "50px"}} onSubmit={this.handleSubmit}>
            <h2 style={{color: "black"}}> Edit an Event for {this.props.sd} </h2>
          <label style={{color: "black"}}> Start time: </label>
          <br/>
          <input type="time" id="starttime" name="starttime" value={this.state.starttime} onChange={this.starttimeChange}  required />
          <br/>
          <label style={{color: "black"}}> End time: </label>
          <br/>
          <input type="time" id="endtime" name="endtime" value={this.state.endtime} onChange={this.endtimeChange}  required />
          <br/>
          <label style={{color: "black"}}> Description: </label>
          <br/>
          <input type="text" id="description" name="description"  value={this.state.description} onChange={this.descChange} required />
          <br/>
          <button type='submit'>Submit!</button>
        </form>
        <br/>
        <br/>
        <div style={{color: "black"}}> -----------------------------OR ------------------------------ </div>
        <br/>
        <br/>
        <div>
        <span style={{color: "black"}}> Do you want to delete this event? </span>
        <button type="button" onClick={this.deletevent} > Yes </button>
        </div>
      </div>
    );
}

}
};


class Events extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      starttime: '',
      endtime: '',
      description:''
    };
    this.starttimeChange = this.starttimeChange.bind(this);
    this.endtimeChange = this.endtimeChange.bind(this);
    this.descChange = this.descChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  starttimeChange(event) {
    this.setState({
      starttime: event.target.value
    });
  }

  endtimeChange(event) {
    this.setState({
      endtime: event.target.value
    });
  }

  descChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event) {
  event.preventDefault();
    let data = JSON.stringify({
        startdate: this.props.date,
        enddate: this.props.date,
        starttime: this.state.starttime,
        endtime: this.state.endtime,
        description: this.state.description
   });

   //console.log(data);

   var comp = this.state.starttime.localeCompare(this.state.endtime);
   console.log(comp);

   if(comp==-1){
   axios.post('http://localhost:8080/events', data, {
         headers: {
             'Content-Type': 'application/json',
             'crossDomain': false
         }
     }).then(function (response) {
         //handle succes

         console.log(response);
     }).catch(function (response) {
         //handle error
         console.log(response);
     });
      this.props.hidden();

      this.setState({
          starttime: '',
          endtime: '',
          description:''
        });

   }
   else{
     alert("start time should be earlier than end time");

       this.setState({
         starttime: this.state.starttime,
         endtime: this.state.endtime,
         description:this.state.description
       });
   }


      //document.getElementById("formcreate").style.display = "none";
}
  render() {
  const {
    ids,eventdesc,sd,ed,
    st, et
  } = this.props;

    return (
      <div id="formcreate" style={{position: "absolute", zIndex: 99, width:"100%", height:"100%",top:"0px",left:"0px",background: "#e5e5e5"}}>
        <form style={{marginTop: "50px"}}  onSubmit={this.handleSubmit}>
          <h2> Create an Event for {this.props.date} </h2>
          <label> Start time: </label>
          <br/>
          <input type="time" id="starttime" name="starttime" value={this.state.starttime} onChange={this.starttimeChange} required />
          <br/>
          <label> End time: </label>
          <br/>
          <input type="time" id="endtime" name="endtime" value={this.state.endtime} onChange={this.endtimeChange} required />
          <br/>
          <label> Description: </label>
          <br/>
          <input type="text" id="description" name="description"  value={this.state.description} onChange={this.descChange} required />
          <br/>
          <button type='submit'>Submit!</button>
        </form>
      </div>
    );
};
}

class DayNames extends React.Component {
    render() {
        return (
          <div className="row day-names">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
          </div>
        );
    }
}

class Week extends React.Component {
  render() {
    let days = [];
    let {
      date,
    } = this.props;

    const {
      month,
      selected,
      select,
    } = this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date
      };
      days.push(
        <Day dates={this.props.dates} day={day}
          selected={selected}
          select={select}/>
      );

      date = date.clone();
      date.add(1, "day");

    }

    return (
      <div className="row week" key={days[0]}>
        {days}
      </div>
    );
  }

}

class Day extends React.Component {

  constructor(props){
    super(props);
    this.state={
      eventlist:[]
    }
  }

  getEvents(startdate){
    const self = this;
    let events=[];
    axios.get('http://localhost:8080/events'
      ).then(function (response) {
          for(var i=0;i<response.data.length;i++){

                  if(response.data[i].startDate==startdate.toString()){
                    //console.log(response.data[i].startDate);
                    events.push(<Eventslist keys={response.data[i].eventId} desc={response.data[i].eventDesc} stime={response.data[i].starttime}
                      etime={response.data[i].endtime} sdate={response.data[i].startDate}
                      edate={response.data[i].endDate}/>);

                  }
          }
          self.setState({
            eventlist: events
          });

      });

      return self.state.eventlist;
  }

  render() {
    //console.log(this.state.eventlist);
    const {
      day,
      day: {
        date,
        isCurrentMonth,
        isToday,
        number
      },
      select,
      selected
    } = this.props;
    //alert(this.props.select);


    const dates = date.format("L");
    //alert(day);
    //console.log(this.props.dates);

    return (
      <div style={{ cursor: "default", height: "100"}} className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}>
      <div key={date.toString()}
        className={"day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : "")}
        onClick={()=>select(day)}>
      <span>{number}
      </span>
      </div>
      <div style={{marginTop: "-74px"}}>
      {this.props.dates.includes(dates) === true? this.getEvents(dates): ""}
      </div>
      </div>
    );

  }
}

export default Calendar;
