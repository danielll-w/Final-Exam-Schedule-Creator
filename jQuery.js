$(document).ready(function() {
	
	
    $("#add").click(function() {
    	
    	var toAdd = $("input[name=message]").val();
    	
    	var result = reading(toAdd);
    	
    	$("#Info").empty();
    	
    	
    	$("#Info").append("<p>"+result+"</p>");
    	
    	
    });
    
    
    $(document).keydown(function(key){
    	
    	switch(parseInt(key.which,10)) {
    		case 13:
    			
    			var toAdd = $("input[name=message]").val();
    			
    			var result = reading(toAdd);
    			
    			$("#Info").empty();
    			
    	        $("#Info").append("<p>"+result+"</p>");
    	        
    	}
    	
    });
    
    $("#clear").click(function(){
    	location.reload();
    });
    
    $("#add").mouseenter(function() {
        $("#add").fadeTo("fast", 3);    
    });
    $("#add").mouseleave(function() {
        $("#add").fadeTo("fast", 0.25); 
    });
    
    
    $("#clear").mouseenter(function() {
        $("#clear").fadeTo("fast", 3);    
    });
    $("#clear").mouseleave(function() {
        $("#clear").fadeTo("fast", 0.25); 
    });
    
    
    
    
    
    
    
    
    
    
    
     
    
});