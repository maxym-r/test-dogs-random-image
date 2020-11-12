'use strict';

const express = require('express')
const app = express()
const { pool } = require('./db')
const axios = require('axios')

app.get('/save-random-image/:bread', async (req, res) => {

  const bread = req.params.bread
  const randomImageUrl = await urlForRandomImageByBread(bread)
  const base64Image = await getBase64Image(randomImageUrl)

  const client = await pool.connect()
  const result = await client.query(`INSERT INTO public.dog_images(base64image, bread) VALUES ($1, $2) RETURNING id, base64image, bread;`, [base64Image, bread])
  client.release()

  res.status(201).json({ 
      success: 'true',
      dogImage: result.rows[0]
  })

})

/**
 * Helper functions
 */
const urlForRandomImageByBread = async (bread) => {
  const url = `https://dog.ceo/api/breed/${bread}/images/random`
  const response = await axios.get(url)
  return response.data.message
}

const getBase64Image = async (url) => {
  const image = await axios.get(url, {responseType: 'arraybuffer'})
  const base64Image = Buffer.from(image.data).toString('base64')
  return base64Image
}

module.exports = app
