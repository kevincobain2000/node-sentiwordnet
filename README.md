[SentiWordNet]: http://sentiwordnet.isti.cnr.it/

Description
-----------

[SentiWordNet] search module


Install
-------

<pre>

npm install node-sentiwordnet

</pre>

Usage
-----

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


TODO
----

Sent.setRedisRB(database_to_select)
