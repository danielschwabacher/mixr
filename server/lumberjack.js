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
        console.log("---Log level: INFO---\nLog Timestamp: " + moment().unix() + "\n" + log_data + "---END INFO LOG---")
    }
    if (this.level == "WARN"){
        console.log("---Log level: WARN---\nLog Timestamp: " + moment().unix() + "\n" + log_data + "---END WARNING LOG---")
        
    }
    if (this.level == "ERR"){
        console.error("---Log level: ERROR---\nLog Timestamp: " + moment().unix() + "\n" + log_data + "---END ERROR LOG---")       
    }
}