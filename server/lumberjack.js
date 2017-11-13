/*
    Lumberjack is mixr's logging system.  
*/
Lumberjack = function(){
    this.messages_logged = 0
}

Lumberjack.prototype.get_timestamp = function(){
    var timestamp = moment().format("MM-D-YYYY H:mm:ss");
    return "[" + timestamp + "] "
}

Lumberjack.prototype.info = function(log_data){
    /*
        Used to display information about stack traces.
    */
    var time = this.get_timestamp()
    console.log(time + "- INFO " + log_data)
    this.messages_logged += 1
}


Lumberjack.prototype.warn = function(trace_data){
    /*
        Used to display information about stack traces.
    */
    var time = this.get_timestamp()
    console.warn(time + "- WARN " + log_data)
    this.messages_logged += 1

}

Lumberjack.prototype.error = function(trace_data){
    /*
        Used to display information about stack traces.
    */
    var time = this.get_timestamp()
    console.error(time + "- ERROR " + log_data)
    this.messages_logged += 1
}

// [05-20-2014 11:00:00.000] - INFO This is the first message

