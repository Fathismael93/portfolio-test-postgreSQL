import { Pool } from "pg";

export const pool = new Pool({
    user:process.env.USER_NAME,
    host:process.env.HOST_NAME,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    port:process.env.PORT_NUMBER
})

export default async function dbConnect() {
    await pool.connect((err) => {
        if (err) return console.error("Error in connection", err.stack)
    })
}