
const express = require('express')
const app = express()
const port = 8080
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const getUsers = (req, res) => {
    pool.query("SELECT * FROM Users", (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

app.get("/users", getUsers);

const Pool = require('pg').Pool
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database : 'walled_db',
    password: '1234',
    port: 5432,
});

const createUsers = (req, res) => {
    const {users_name, users_password, users_email,users_balance,users_number } = req.body;
    pool.query("INSERT INTO users(users_name, users_password, users_email,users_balance,users_number ) VALUES ($1, $2, $3, $4, $5) RETURNING*",[users_name, users_password, users_email,users_balance,users_number ], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).json(results.rows);
    });
};
app.post("/users",createUsers);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


////////////////////////////////////////////
//arrow function

// const transactions = [
//     {
//         type: "DEBIT",
//         fromTo : "16889",
//         description : "ini xxx",
//         amount: 1000,
//         date: "1989-09-22",
//         id: 1,
//     },
    
    
// ];





// const getMovies = (req, res) => {
//     pool.query("SELECT* FROM movies", (error, results) => {
//         if (error) {
//             throw error;
//         }
//         res.status(200).json(results.rows);
//     });
// };

// app.get("/movies", getMovies);



// const createMovie = (req, res) => {
//     const {movie_title, movie_genre, duration} = req.body;
//     pool.query("INSERT INTO movies(movie_title, movie_genre, duration) VALUES ($1, $2, $3) RETURNING*",[movie_title, movie_genre, duration], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         res.status(201).json(results.rows);
//     });
// };
// app.post("/movies",createMovie);

// const routeHandler = (req, res) => {
//     res.json({transactions});
//   };


// app.get ('/', routeHandler);

// // app.get('/', (req, res) => {
// //   res.json('Hello World!!')
// // });

// // app.get('/sal', (req, res) => {
// //     res.send('Hello sal!!')
// //   });

// // // nambahin
// // app.post('/sal', (req, res) => {
// //     res.send('Hello sal!!')
// //   });

// //   //ngubah sesuatu
// // app.put('/sal', (req, res) => {
// //     res.send('Hello sal!!')
// //   });

// // app.delete('/sal', (req, res) => {
// //     res.send('Hello sal!!')
// //   });
// // put harus ganti semua nya, klo patch bisa dispesifikin yg ganti yg mana

// // //resource
// // app.get("/movies", routeHandler);
// // // bukan movie tp movies karena ngambilny agak hanya satu
// // app.post("/movies", routeHandler);
// // //ngubah movie berdasarkan id
// // app.push("/movies/:id", routeHandler);

