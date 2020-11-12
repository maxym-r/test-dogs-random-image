const { pool } = require('./db')

module.exports.init = async () => {
  const client = await pool.connect()
  await client.query(`
  CREATE TABLE IF NOT EXISTS public.dog_images
  (
      id serial primary key,
      base64image text NOT NULL,
      breed character varying(100) NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) 
  `)
  client.release()
}

