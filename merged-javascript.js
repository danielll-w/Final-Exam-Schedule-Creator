	var d1t1 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=1");
	var d1t2 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=2");
	var d1t3 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=3");
	var d1t4 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=4");
	var d2t1 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=1");
	var d2t2 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=2");
	var d2t3 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=3");
	var d2t4 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=4");
	var d3t1 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=1");
	var d3t2 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=2");
	var d3t3 = readTextFile("http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=3");
	var dayArraydata = [d1t1,d1t2,d1t3,d1t4,d2t1,d2t2,d2t3,d2t4,d3t1,d3t2,d3t3];
	
	
	  
	var dayOneTestOne = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=1",
	    infoString: "December 17th (Day 1),8:10 (Test 1)",
	};
	
	var dayOneTestTwo = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=2",
	    infoString: "December 17th (Day 1),9:40 (Test 2)",
	};
	
	var dayOneTestThree = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=3",
	    infoString: "December 17th (Day 1),11:00 (Test 3)",
	};
	
	var dayOneTestFour = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=1&test=4",
	    infoString: "December 17th (Day 1),12:40 (Test 4)",
	};
	
	var dayTwoTestOne = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=1",
	    infoString: "December 18th (Day 2),8:10 (Test 1)",
	};
	
	var dayTwoTestTwo = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=2",
	    infoString: "December 18th (Day 2),9:40 (Test 2)",
	};
	
	var dayTwoTestThree = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=3",
	    infoString: "December 18th (Day 2),11:00 (Test 3)",
	};
	
	var dayTwoTestFour = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=2&test=4",
	    infoString: "December 18th (Day 2),12:40 (Test 4)",
	};
	
	var dayThreeTestOne = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=1",
	    infoString: "December 19th (Day 3),8:10 (Test 1)",
	};
	
	var dayThreeTestTwo = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=2",
	    infoString: "December 19th (Day 3),9:40 (Test 2)",
	};
	
	var dayThreeTestThree = {
	    source: "http://fahrenbacher.com/schedule/exam_schedule.php?day=3&test=3",
	    infoString: "December 19th (Day 3),11:00 (Test 3)",
	};
	
	var dayInfo = [dayOneTestOne, dayOneTestTwo, dayOneTestThree, dayOneTestFour, dayTwoTestOne, dayTwoTestTwo, dayTwoTestThree, dayTwoTestFour, dayThreeTestOne, dayThreeTestTwo, dayThreeTestThree];
	
	
	
	function readTextFile(file){
		var allText;
		var textArray;
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status === 0)
	            {
					
	                var allText = rawFile.responseText;
					textArray = intoArray(allText);
	            }
	            else {
	            	reportError();
	            }
	        }
	    }
	    rawFile.send(null);
		return textArray;
	}
	
	//this function is called if there is every an error reading in data info
	//should let the user know of the error and direct them to the raw exam schedule
	function reportError() {
		
	}
	
	function readSchedule(file){
		var allText;
		var textArray;
		var schedule;
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status === 0)
	            {
					allText = rawFile.responseText;
					textArray = intoArraySchedule(allText);
					schedule = scheduleInfo(textArray);
	            }
	            else {
	            	reportError();
	            }
	        }
	    }
	    rawFile.send(null);
		return schedule;
	}
	
	function intoArray(text){
		var textArray = [];
		textArray = text.split(/\r\n|\n/);
		textArray.splice(0,7);
		return textArray;
	}
	
	function intoArraySchedule(text){
		var textArray = [];
		textArray = text.split(/\r\n|\n/);
		
		return textArray;
	}
	
	//function that takes in the full student schedule that is split into lines and does the following transforms
	// - changes every line into an array separated by commas (makes the array a 2D array, functionally)
	// - convert sepecial cases in the schedule to match the final exam spreadsheets
	function scheduleInfo(array){
		for(var i = 0; i < array.length; i++){
			array[i] = array[i].split(","); // splits the array by columns
		}
		
		for(var x = 0; x < array.length; x++){
			if(array[x][0] === "0"){ 
				array[x][0] = "EB";
			}
			
			//Kucera teaches 1st and 2nd period classes at the same time that students are assigned
			//the lit center - don't want them to think they have a final!
			//I changed the name so it's no longer found as a match
			if(typeof array[x][3] !== "undefined" &&  array[x][3].indexOf("Lit Center") === 0) {
				array[x][1] = "Mr. K";
			}
			
			if(array[x][1] === "WALDRON" && (array[x][0] === "8" || array[x][0] === "9")) {
				array[x][1] = "Muztar";
			}
			
			if(array[x][1] === "MEYER J"){  
				array[x][1] = "Meyer";
			}
			if(array[x][1] === "Swanson S"){  
				array[x][1] = "Swanson";
			}
			if(array[x][1] === "FOSTER J"){  
				array[x][1] = "FOSTER";
			}
			if(array[x][1] === "Patel P"){  
				array[x][1] = "Patel";
			}
			if(array[x][1] === "Graham S"){  
				array[x][1] = "Graham";
			}

			//Carrie teaches at OLC - changing the first name so it doesn't match anymore
			if(array[x][1] === "FOSTER" && array[x][2] === "CARRIE") {
				array[x][1] = "FOSTER C";
			}

			if(array[x][1] === "Grossman" && array[x][2] === "Steven J"){
				array[x][1] = "Grossman S";
			}
			if(array[x][1] === "Grossman" && array[x][2] === "Michael"){
				array[x][1] = "Grossman M";
			}
			if(array[x][3] === "German 3 Hon"){
				array[x][3] = ("German 3 Honors");
			}
			if(array[x][3] === ("French 4 Hon") || array[x][3] === ("French AP")){
				array[x][3] = ("French 4 Honors; AP");
			}
			if(array[x][3] === ("An Phys III")){
				array[x][3] = ("Anatomy / Physiology III");
			}
			if(array[x][3] === ("An Phys IV")){
				array[x][3] = ("Anatomy / Physiology IV");
			}
			if(array[x][3] === "ELL Reading 2"){
				array[x][3] = "ELL- Reading 2";
			}
			if(array[x][3] === "ELL Mod W Hist"){
				array[x][3] = "ELL-Mod W History";
			}
			if(array[x][3] === "ELL Bio 13-23"){
				array[x][3] = "Biology 13-23";
			}
			if(array[x][3] === "ELL Am Lit/Cmp"){
				array[x][3] = "ELL American Lit & Comp";
			}
			if(array[x][3] === "ELL Phys Sci"){
				array[x][3] = "Physical Science";
			}
			if(array[x][3] === "ELL 2 Grammar") {
				array[x][3] = "ELL Grammar 2";
			}
		}
		return array;
	}
	
	
	
	
	//array: exam schedule array for one day
	//aboutTheDay: associative array with source and infoString keys
	//string: teacher's last name + period (from the student schedule)
	//scheduleClass: name of the class (from the student schedule)
	//studentSchedule: the result array of student schedules (see buildAnswer() for format
	function info(array, aboutTheDay, string, scheduleClass, studentSchedle){ 
		
		//fixes the weird case with Chris Hawker having a 9th period monitor and a class
		if(typeof scheduleClass !== "undefined" && scheduleClass.indexOf("Monitor ") == 0)
			return;
		
		var newArray = array.slice();
		

		for(var q = 0; q < newArray.length; q++){
			newArray[q] = newArray[q].split(","); // splits the array by columns
			
			//remove white space form the beginning and end of the entries
			for(var j = 0; j < newArray[q].length; j++)
				newArray[q][j] = newArray[q][j].trim();
			
			//THIS IS A HACK - SHOULD BE REVISITED AFTER SPREADSHEET IS FIXED
			//Currently on Day 1, Test 3, Wulfram is listed as having no period and teaching a course he doesn't
			if(newArray[q][4] === "Wulfram" || newArray[q][4] === "Wulfram 2") {
				newArray[q][4] = "Salem 2 & 3";
			}
			
			//fix Nemo 1, 2 issue
			if(newArray[q][4] === "Nemo 1") {
				if(newArray[q-1][1] === "ALCUSH")
					newArray[q][5] = "Caceras and Larrabee";
				else {
					newArray[q][5] = "";
					newArray[q][4] = "Bad Name";
				}
			}
			if(newArray[q][4] === "Nemo 2") {
				if(newArray[q][1] === "ALCUSH")
					newArray[q][5] = "Baehr and Madigan";
				else {
					newArray[q][5] = "";
					newArray[q][4] = "Bad Name";
				}
			}
			
			//spreadsheet is messed up - wrong spelling
			if(newArray[q][4] === "Koulours 2") {
				newArray[q][4] = "KOULOURIS 2";
			}
		}
		
		var ampArray = newArray.slice();
		var andArray = newArray.slice();
		var physAmpArray = newArray.slice();
		var perArray = newArray.slice();
		var dashArray = newArray.slice();
		var slashArray = newArray.slice();
		var lastClass = "";
		
		var splitDayTime = aboutTheDay.infoString.split(",");
		var theDay = splitDayTime[0];
		var theTime = splitDayTime[1];
		
		for(var x = 0; x < newArray.length; x++){
			
			if(newArray[x][1] !== "")
				lastClass = newArray[x][1];
				
			newArray[x][4] = newArray[x][4].replace('  ', ' '); //Fixes an issue with Wilson / Clish 5 having two spaces between Clish and the period

				
			var classTechPer = scheduleClass + " / " + string;
			var proctor = newArray[x][5];
			var roomNumber = newArray[x][3];
		
			//French special case - they are taught at the same time, have exams in the same room, but different proctors
			if(    string.toUpperCase() === "Hinsinger 4".toUpperCase() && string.toUpperCase() === newArray[x][4].toUpperCase() 
				|| string.toUpperCase() === "Bowen 1".toUpperCase() && string.toUpperCase() == newArray[x][4].toUpperCase()) {

				if(scheduleClass === "French 3 Hon")
					scheduleClass = "French 3 Honors";
					
				if(scheduleClass === lastClass) {
					studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
				}
				
			}
		
			else if(string.toUpperCase() === newArray[x][4].toUpperCase() && (lastClass !== "German 3" && lastClass !== "German 3 Honors")){
				studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
			}
			
			else if(newArray[x][4].indexOf("&") !== -1 && newArray[x][4].indexOf("/") === -1 && (newArray[x][4].indexOf("Slife") === -1 && newArray[x][4].indexOf("McGovern") === -1 && newArray[x][4].indexOf("Schmidt") === -1 && newArray[x][4].indexOf("Hinsinger") === -1 && newArray[x][4].indexOf("Ackman / Akwa") === -1 && newArray[x][4].indexOf("Akwa / Ackman") === -1 && newArray[x][4].indexOf("M. Grossman") === -1 && newArray[x][4].indexOf("Poonam Patel") === -1)){
			
				ampArray[x][4] = ampArray[x][4].toUpperCase();
				ampArray[x][4] = ampArray[x][4].split(" ");
	
				if(string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][1] || string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][3]){
					studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));			
				}
			}
			
			else if(newArray[x][4].indexOf(" and ") !== -1){ //need to ceheck for and with spaces to avoid Lander
				andArray[x][4] = andArray[x][4].toUpperCase();
				andArray[x][4] = andArray[x][4].split(" ");
	
				if(string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][1] || string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][3]){
					studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
				}
			}
			/*ADDED: To fix STEM not having a period*/
		      //this is also breaking the iOS app...
		    else if(newArray[x][4].indexOf("Gleicher / Villa") !== -1) {
				
				//only show one of th inquiry classes - the one with an odd period number (1 or 9)
		        if(scheduleClass === ("STEM Inq/Res") && Number(classTechPer.substring(classTechPer.length-1)) % 2 === 1) {
		          studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
		        }
		    }
			else if(newArray[x][4].indexOf(" / ") !== -1 && newArray[x][4].indexOf("Ackman / Akwa") === -1 && newArray[x][4].indexOf("Akwa / Ackman") === -1){
				
				slashArray[x][4] = slashArray[x][4].toUpperCase();
				slashArray[x][4] = slashArray[x][4].split(" ");
				
				if(slashArray[x][4].indexOf("&") !== -1 && lastClass === scheduleClass){
					if(string.toUpperCase() === slashArray[x][4][0] + " " + slashArray[x][4][3] || string.toUpperCase() === slashArray[x][4][0] + " " + slashArray[x][4][5]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
				else if(string.toUpperCase() === slashArray[x][4][0] + " " + slashArray[x][4][3] || string.toUpperCase() === slashArray[x][4][2] + " " + slashArray[x][4][3]){
					studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
				}
				
			}
			
			else if(newArray[x][4].indexOf(".") !== -1){
				perArray[x][4] = perArray[x][4].toUpperCase();
				perArray[x][4] = perArray[x][4].split(" ");
				if((string.substring(string.length - 3, string.length - 2).toUpperCase() === perArray[x][4][0].substring(perArray[x][4][0].length -2,perArray[x][4][0].length - 1)) ){
					if(string.toUpperCase() === perArray[x][4][1] + " " + string.substring(string.length - 3,string.length - 2) + " " + perArray[x][4][2] || string.toUpperCase() === perArray[x][4][1] + " " + string.substring(string.length - 3,string.length - 2) + " " + perArray[x][4][4]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));			
					}
				}
			}
			else if(newArray[x][4].indexOf("Adducci") !== -1){
				if(lastClass === scheduleClass){
					if(string.toUpperCase() === newArray[x][4].toUpperCase()){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
			
			else if(newArray[x][4].indexOf("Hinsinger") !== -1){
				ampArray[x][4] = ampArray[x][4].toUpperCase();
				ampArray[x][4] = ampArray[x][4].split(" ");
				if(lastClass === scheduleClass){
					if(string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][1] || string.toUpperCase() === ampArray[x][4][0] + " " + ampArray[x][4][3]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
			
			else if(newArray[x][4].indexOf("McGovern") !== -1 || newArray[x][4].indexOf("Slife") !== -1){
				physAmpArray[x][4] = physAmpArray[x][4].toUpperCase();
				physAmpArray[x][4] = physAmpArray[x][4].split(" ");
				if(lastClass === scheduleClass){
					if(string.toUpperCase() === physAmpArray[x][4][0] + " " + physAmpArray[x][4][1] || string.toUpperCase() === physAmpArray[x][4][0] + " " + physAmpArray[x][4][3]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
			
			else if(newArray[x][4].indexOf("Schmidt") !== -1){
				physAmpArray[x][4] = physAmpArray[x][4].toUpperCase();
				physAmpArray[x][4] = physAmpArray[x][4].split(" ");
				if(lastClass === scheduleClass){
					if(string.toUpperCase() === physAmpArray[x][4][0] + " " + physAmpArray[x][4][1] || string.toUpperCase() === physAmpArray[x][4][0] + " " + physAmpArray[x][4][3] || string.toUpperCase() === physAmpArray[x][4][0] + " " + physAmpArray[x][4][5]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
			
			else if(newArray[x][4].indexOf("Poonam Patel") !== -1){
				if(lastClass === scheduleClass){
					if(newArray[x][4].indexOf("&") !== -1){
						ampArray[x][4] = ampArray[x][4].toUpperCase();
						ampArray[x][4] = ampArray[x][4].split(" ");
						if( string.toUpperCase() === (ampArray[x][4][1] + " " + ampArray[x][4][2]) || 
							string.toUpperCase() === (ampArray[x][4][1] + " " + ampArray[x][4][4])){
								studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
						}
					}
					
					else if("POONAM" + " " + string.toUpperCase() === newArray[x][4].toUpperCase()){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
			
			else if(newArray[x][4].indexOf("Parin Patel") !== -1){
				if(lastClass === scheduleClass){
					if("PARIN" + " " + string.toUpperCase() === newArray[x][4].toUpperCase()){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));				
					}
				}
			}
			
			else if(newArray[x][4].indexOf("/") !== -1 || newArray[x][4].indexOf("&") !== -1){
				if(lastClass === scheduleClass){
					
					newArray[x][4] = newArray[x][4].toUpperCase();
					newArray[x][4] = newArray[x][4].split(" ");
					if(string.toUpperCase() === newArray[x][4][2] + " " + newArray[x][4][3] || 
					   string.toUpperCase() === newArray[x][4][0] + " " + newArray[x][4][5] || 
					   string.toUpperCase() === newArray[x][4][0] + " " + newArray[x][4][3] || 
					   string.toUpperCase() === newArray[x][4][2] + " " + newArray[x][4][5]){
						studentSchedle.push(buildAnswer(classTechPer, roomNumber, theDay, theTime, proctor));
					}
				}
			}
		}
	}
	
	function organize(array) {
		var testNum;
		var tempSchedule = [];
		for (var day = 1; day <= 3; day++) {
			if (day === 3) {
				testNum = 3;
			}
			else {
				testNum = 4;
			}
			for (var test = 1; test <= testNum; test++) {
				for (var sch = 0; sch < array.length; sch++) {
					if (array[sch].indexOf("(Day " + day) != -1 && array[sch].indexOf("(Test " + test) != -1) {
						tempSchedule.push(array[sch]);
					}

				}
			}
		}
		return tempSchedule;
	}
	
	//creates the columns to display in the table
	//a - Class / Teacher - period
	//b - Room Number
	//c - Day
	//d - Time
	//e - Proctor
	function buildAnswer(classTeacherPeriod, roomNumber, day, time, proctor) {
		return classTeacherPeriod + "," + roomNumber + "," + day + "," + time + "," + proctor; 
	}
	
	function search() {
		var id = document.getElementById("userInput");
		reading(id.value);
	}
		
	
	function reading(id){
		var scheduleArray = readSchedule("http://fahrenbacher.com/schedule/schedule.php?id=" + id);
		if(scheduleArray.length === 1){
			alert("Schedule Not Found. Please Refresh the Page and Try Again");
		}
		
		document.getElementById("test").innerHTML = "<br><b>Regular Schedule</b><br>";
		for (var t = 0; t < scheduleArray.length; t++) {
			document.getElementById("test").innerHTML += scheduleArray[t] + "<br>";

		}
		var table = document.getElementById("table");
		var oldRow = document.getElementById("dataRow");
		while (oldRow != null) {
			oldRow.parentNode.removeChild(oldRow);
			oldRow = document.getElementById("dataRow");
		}
		
		var studentSchedule = [];
		
		for(var n = 0; n < scheduleArray.length; n++){
			for(var i = 0; i < dayArraydata.length; i++){
				info(dayArraydata[i], dayInfo[i], scheduleArray[n][1] + " " + scheduleArray[n][0], scheduleArray[n][3], studentSchedule);
			}
		}
		
		//see if we found any duplicate matches (for classes taught at the same time and have exams at same time)
		for(var i = 0; i < studentSchedule.length-1; i++) {
			var allMatch = true;
			for(var j = 0; j < studentSchedule[i].length; j++) {
				if(studentSchedule[i][j] !== studentSchedule[i+1][j]) {
					allMatch = false;
					j = studentSchedule[i].length; //end the loop
				}
			}
			
			if(allMatch) {
				studentSchedule.splice(i, 1); //remove it
				i--;
			}
		}
		
		studentSchedule = organize(studentSchedule);
		
		//I use this counter so two consecutive rows will be red
		var setBackgroundRedCounter = 0;
		table = document.getElementById("table");
		
		for (var sch = 0; sch < studentSchedule.length; sch++) {
			var scheduleSeparated = studentSchedule[sch].split(",");
			var row = table.insertRow(-1);
			row.id = "dataRow";
			
			//check to see if we have two classes with the same exam schedule
			//if so, make them both red so the user knows they have a conflict
			if(sch !== studentSchedule.length-1) {
				var nextSchSep = studentSchedule[sch+1].split(",");
				if(scheduleSeparated[2] === nextSchSep[2]  && scheduleSeparated[3] === nextSchSep[3]) {
					setBackgroundRedCounter = 2;
				}
			}

			var cell0 = row.insertCell(0);
			cell0.innerHTML = scheduleSeparated[0];

			var cell1 = row.insertCell(1);
			cell1.innerHTML = scheduleSeparated[1];

			var cell2 = row.insertCell(2);
			cell2.innerHTML = scheduleSeparated[2];

			var cell3 = row.insertCell(3);
			cell3.innerHTML = scheduleSeparated[3];

			var cell4 = row.insertCell(4);
			cell4.innerHTML = scheduleSeparated[4];
			
			if(setBackgroundRedCounter > 0) {
				cell2.style.backgroundColor="#FF0000";
				cell3.style.backgroundColor="#FF0000";
			}
			setBackgroundRedCounter--;

		}
		table.style.display = "table";
	}
	
	function dealWithKeyboard(e) {
		// gets called when any of the keyboard events are overheard
		if (e.keyCode == "13") {
			search();
		}
	}
	
	window.addEventListener("keydown", dealWithKeyboard, false);