
var burger = require("../models/burger.js");
var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbsObj = {
            burger:data
        };
        res.render("index", hbsObj);
    })
});

router.post("/api/burger", function(req, res){
    burger.insertOne(["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(results){
        res.json({id: results.insertedId});
    })
});

router.put("/api/burger/:id", function(req,res){
    var condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          } 
    });
});

router.delete("/api/burger/:id", function(req, res){
    var condition = "id = " + req.params.id;
    burger.deleteOne(condition, function(result){
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
    });
});


// Export routes for server.js to use.
module.exports = router;