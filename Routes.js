import userRoute from "./UserController/index.js"

export default app => {

    app.use('/api/user', userRoute);
 
  

};