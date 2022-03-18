const express =require('express') ;
const router = require('./routes')
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use("/api", router);

db.sequelize.sync().then(() => { // когда база данных подключена, то запускаем сервер
   app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
   });
});

