import todoSequelize  from "./database/setup/database";
import  app from "./server"
const { PORT } = process.env

todoSequelize.sync()
    .then(()=>{
        console.log("DB has been initialized")
    })
    .catch((e)=>{
        console.log(e);
    })

app.listen(PORT,()=>{
    console.log(`App listening from port ${PORT}`);
})