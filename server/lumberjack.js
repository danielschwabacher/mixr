/*
    Lumberjack is mixr's log abstraction system.  
    Lumberjack support 3 log levels:
    -- INFO: Misc info. 
    -- WARN: Possible issues.
    -- ERR: Functions failures.
*/
Lumberjack = function(level){
    if (level === "WARN" || level === "INFO" || level === "ERR"){
        this.level = level
    }
    else{
        console.log("Invalid logger level")
        return -1
    }
}

Lumberjack.prototype.log = function(log_data){
    if (this.level == "INFO"){
        console.log("---Log level: INFO---")
        console.log("Log Timestamp: " + moment().unix())
        console.log(log_data)
        console.log("---END LOG---\n")
    }
    if (this.level == "WARN"){
        console.log("---Log level: WARN---")
        console.log("Log Timestamp: " + moment().unix())
        console.log(log_data)
        console.log("---END LOG---\n")
    }
    if (this.level == "ERR"){
        console.log("---Log level: ERROR---")
        console.log("Log Timestamp: " + moment().unix())
        console.error(log_data)
        console.log("---END LOG---\n")
    }
}