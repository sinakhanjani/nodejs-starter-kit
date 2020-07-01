// Hint01: Filter
var UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [ { type: Number, ref: 'Role' } ]
});

var RoleSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true }
});

var roles = ["owner", "admin"];
User.find()
    .populate('roles', null, { name: { $in: roles } } ) // Check math for two things
    .sort({'_id': 1})
    .exec(function (err, users) {
        users = users.filter(function(user){
            return user.roles.length;
        });
        res.send(users);
});

//Hint02: Filter
var sampleSchema = new Schema({
    name: String,
    dates: [{
      date: Date,
      duration: Number
    }]
});

await M.find( { dates : { $elemMatch: {  date : { $gte: 'DATE_VALUE' } } } } )
await M.find( { 'dates.date': { $gte: 'DATE_VALUE' } } )

//Hint03: Filter
var userSchema = new mongoose.Schema({username: {type: String, unique: true} ,
    exercises: [{description: String,
                  duration: Number,
                  date: Date}]
});
userSchema.find( { 'exercises.duration': { $lte: 30} } );
userSchema.find( { 'exercises.description': 'jumping jacks' } );

//Hint04: Sort
Post.find({}).sort('test').exec(function(err, docs) {  });
Post.find({}).sort([['date', -1]]).exec(function(err, docs) {  });
Post.find({}).sort({test: 1}).exec(function(err, docs) {  });
Post.find({}, null, {sort: {date: 1}}, function(err, docs) {  });

//Hint05: Sort
//sort by ascending order
Post.find({}).sort('field').exec(function(err, docs) {  });
Post.find({}).sort({ field: 'asc' }).exec(function(err, docs) {  });
Post.find({}).sort({ field: 'ascending' }).exec(function(err, docs) {  });
Post.find({}).sort({ field: 1 }).exec(function(err, docs) {  });
await Post.find({}, null, {sort: { field : 'asc' }})
await Post.find({}, null, {sort: { field : 'ascending' }})
await Post.find({}, null, {sort: { field : 1 }})
//sort by descending order
Post.find({}).sort('-field').exec(function(err, docs) {  });
Post.find({}).sort({ field: 'desc' }).exec(function(err, docs) {  });
Post.find({}).sort({ field: 'descending' }).exec(function(err, docs) {  });
Post.find({}).sort({ field: -1 }).exec(function(err, docs) {  });
await Post.find({}, null, {sort: { field : 'desc' }})
await Post.find({}, null, {sort: { field : 'descending' }})
await Post.find({}, null, {sort: { field : -1 }})
