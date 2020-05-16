'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10'});
const { v4:uuid } = require('uuid');

const postTable = process.env.POSTS_TABLE;

function response(statusCode, message){
  return{
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.createPost = (event, context, callback) => {
  let data = JSON.stringify(event.body);
  let info = JSON.parse(data);

  const post ={
    id: uuid(),
    createdAt: new Date().toISOString(),
    UserId: 1,
    nombre: info.nombre,
    razonsocial: info.razonsocial,
    monto: info.monto
  };

  return db.put({
    TableName: postTable,
    Item: post
  }).promise().then(() =>{
    callback(null, response(201). post)
  })
  .catch(err => response(null, response(err.statusCode, err)));
}

