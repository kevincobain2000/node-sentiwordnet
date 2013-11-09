[SentiWordNet]: http://sentiwordnet.isti.cnr.it/

Description
-----------

[SentiWordNet] search module

Demo
----

http://www8355ue.sakura.ne.jp/?action_classifiers_sentiwn=true

Install
-------

<pre>

npm install node-sentiwordnet

</pre>

Usage
-----
If running for the first time then please wait for around 1 minute while the parser reads the dict file and enters the entries to 

<pre>
var SentiWN = require("node-sentiwordnet");
Senti = new SentiWN;


Senti.setDB(2);
Senti.redisSetEntries(function(callback){
    
});

</pre>

After the redis entries are done, All is good to go
<pre>
var SentiWN = require("node-sentiwordnet");
Senti = new SentiWN;

Senti.get("basipetal#1", function(callback){
	console.log(callback.POS);
	console.log(callback.ID);
	console.log(callback.NegScore);
	console.log(callback.Gloss);
    });
</pre>
