function index(req, res) {
  res.json({
    message: "Welcome to Our Thoughts App!",
    documentation_url: "https://github.com/dangerstephen/ourThoguhtsApp/readme.md",
    base_url: "http://ourthoughtsapp.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
