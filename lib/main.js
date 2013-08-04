var redis = require("redis")
        , path = require("path")
        , dataFile = path.join(__dirname, "../", "data/SentiWordNet-head200.txt")
        , fs = require('fs')
        , redis = require('redis')
        , client = redis.createClient()
        , sleep = require("sleep")
        , readline = require('readline');


var Senti = function() {
    this.synset = null;
    this.redisDB = 2;
};

Senti.prototype.redisOn = function(callback) {
    var self = this;
    client.select(self.redisDB, function(err, res) {
        if (err)
            callback(false);
        else
            callback(true);
    });//end client.select
};//end redisOn

Senti.prototype.redisEnterEntries = function(tabSplitArray, callback) {
    POS = tabSplitArray[0];            // string
    ID = tabSplitArray[1];            // string
    PosScore = tabSplitArray[2];            // string
    NegScore = tabSplitArray[3];            // string
    SynsetTerms = tabSplitArray[4].split(" "); // array
    Gloss = tabSplitArray[5];            // string
    
    for (var item in SynsetTerms) {
        synset = SynsetTerms[item];
        client.hmset("synset:" + synset,
                "POS", POS,
                "ID", ID,
                "PosScore", PosScore,
                "NegScore", NegScore,
                "Gloss", Gloss,
                function(err, reply) {
//                    console.log(reply);
                });//end callback client.hmset

    } //endfor SynsetTerms
    callback(true);
};

Senti.prototype.redisSetEntries = function(callback) {
    var self = this;
    var rd = readline.createInterface({
        input: fs.createReadStream(dataFile),
        output: process.stdout,
        terminal: false
    });
    // readline file line by line
    rd.on('line', function(line) {
        tabSplitArray = line.split("\t");
        if (line.indexOf('#') != 0) {
            self.redisEnterEntries(tabSplitArray, function(res){
            });
        }// endif 
    }).on('close', function() {
        callback(true);
    });// end rd.on
};//end redisSetEntries()

Senti.prototype.redisEntryCheck = function(callback) {
    var self = this;
    var redisOn = self.redisOn(function(res) {
        if (res) { //i.e. redis was able to connect
            client.hgetall("synset:" + self.synset, function(err, reply) {
                if (!reply) { //change it to !reply
                    self.redisSetEntries(function(res) {
                    });
                } //endif no reply
                else callback(reply);
            }); //end hgetall()
        }//endif (res)
    });//end redisOn()
};//end redisEntryCheck()


Senti.prototype.get = function(synset,callback) {
    var self = this;
    self.synset= synset;
    self.redisEntryCheck(function(reply) {
        callback(reply);
    });
}; // end get()


module.exports = Senti;


//var SentiObj = new Senti;
//SentiObj.get("basipetal#1",function(reply) {
//    console.log(reply);
//});
