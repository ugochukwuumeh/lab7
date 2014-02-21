var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback

  models.Project.find({"_id": projectID}).sort('-date').exec(afterQuery);
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  console.log(form_data.project_title);
  var newPost = new models.Project({  "title": form_data.project_title,
                                      "date": form_data.date,
                                      "summary": form_data.summary,
                                      "image": form_data.image_url});
  newPost.save(afterSaving);
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  function afterSaving (err) {
    if (err) 
      {
        console.log(err);
        res.send(500);
      }
    else{
        console.log("Successfully saved");
        res.send(200);
    }
  }
  
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  console.log(req.params);
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project.find({"_id": projectID}).remove().exec(afterRemove);
  function afterRemove(err){
    if (err) 
      {
        console.log(err);
        res.send(500);
      }
    else{
        res.send(200);
    }
  }
}