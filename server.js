const app = require("./app");

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
