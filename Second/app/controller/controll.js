const Note = require('../model/model');

// Create and Save a new Note
    // Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrive Data From given url
exports.demo=(req,res)=>{
    
        console.log('hi');
        let request = require('request');
        
        let url= {
            method: 'GET',
            uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            qs: {
              start: 1,
              limit: 5000,
              convert: 'USD'
            },
            headers: {
              'X-CMC_PRO_API_KEY': 'bc21eb8d-0707-4fd7-8e1f-67cd6839b71f'
            },
            json: true,
            gzip: true
          };

        //   let url="https://api.nasa.gov/planetary/apod?api_key=6lfkMioPKesKd0LFWLjQTcRJccsOkaIuFF1yXvrR"
        // let url=https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/Africa/daily/2017042700/2018051700',
 
    request(url,function(err,response,body){
        if(err)
        {
            console.log("err is ",err)
        }
        else{
            console.log(body)
            res.send(body);
        }

        
    })

    
    };


// Retrieve and return all notes from the database.
    exports.findAll = (req, res) => {
        Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
    };



// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
 // Validate Request
 if(!req.body.content) {
    return res.status(400).send({
        message: "Note content can not be empty"
    });
}

// Find note and update it with the request body
Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
}, {new: true})
.then(note => {
    if(!note) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });
    }
    res.send(note);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Note not found with id " + req.params.noteId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
    });
});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};