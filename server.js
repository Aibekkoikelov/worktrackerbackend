const express =require('express') ;
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3001;

const cors = require("cors");

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());

app.use("/api", usersRouter);
app.use("/api", authRouter);

db.sequelize.sync().then(() => { // когда база данных подключена, то запускаем сервер
   app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
   });
});

