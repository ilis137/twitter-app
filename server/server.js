const express = require('express');
const Twitter = require('twit');
const app = express();
var config = require("./config").twitter
// require('dotenv').config()
const apiClient = new Twitter(config);
// console.log(process.env.CONSUMER_KEY,process.env.CONSUMER_SECRET,process.env.ACCESS_TOKEN,process.env.ACCESS_TOKEN_SECRET);
app.use(require('cors')());
app.use(require('body-parser').json());
 
app.get('/home_timeline', (req, res) => {
  let max_id;let params;
  // const max_id
  // console.log(max_id)
  if(req.query.max_id!=='undefined'){
     max_id=req.query.max_id
     console.log(req.query.max_id)
     params = { tweet_mode: 'extended', count: 51,max_id };
  }else{
    
    params = { tweet_mode: 'extended', count: 51};
  }

 
    
  apiClient
    .get(`statuses/home_timeline`, params)
    .then(timeline => {

      //  console.log(timeline.data);
      res.send(timeline);
    })
    .catch(error => {
      console.log(error)
    res.send(error);
  });
    
});

app.get('/followers/list',async (req, res) => {
  let params = {  count: 50,cursor:'-1' };
  let cursor='-1'
  let followers=[];
  do{
     params = {  count: 50,cursor:cursor };
     try{
    let responseData=await apiClient
    .get(`/followers/list`, params)
      console.log(responseData.data.users.length)
     followers=followers.concat(responseData.data.users)
      cursor=responseData.data.next_cursor_str;
      if(!Number.parseInt(cursor)) return res.send(followers)
    
     }catch(error){
        
      console.log(error)
    return res.send(error);
   };
  }while(cursor!=0)
});

app.get('/account/info',async (req, res) => {
 
  
     try{
    let responseData=await apiClient
    .get(`/account/verify_credentials`)
      // console.log(responseData)
      res.send(responseData.data)
    //  followers=followers.concat(responseData.data.users)
    //   cursor=responseData.data.next_cursor_str;
    //   if(!Number.parseInt(cursor)) return res.send(followers)
    
     }catch(error){
        
      console.log(error)
    return res.send(error);
   };
 
});




app.post('/post_tweet', (req, res) => {
 
  tweet = req.body;
    apiClient
      .post(`statuses/update`, tweet)
      .then(tweeting => {
        console.log(tweeting);
        res.send(tweeting);
      }).catch(error => {
      res.send(error);
    });
       
    
});
app.listen(5000, () => console.log('Server running'))