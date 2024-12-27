import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js' 
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'

connectToDatabase() 
const app = express() 
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)//comment1: authRouter is the router we expoeted in auth.js,we can name imported thing while we are importing 
                                 //comment 2:Middleware functions execute for every request to the routes they are attached to.
                                 //comment3:"/api/auth"is a prefix,this app.use('/api/auth', authRouter) means This is the base URL path. Any HTTP request that starts with /api/auth will be handled by the authRouter(my comment:it somehow make this prefix standart before every path in authRouter),this This structure helps in organizing routes and keeping the code modular and maintainable(as all related routes will have same prefix before them)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})
