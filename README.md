# Twitter Browser

## Problem statement

Build Bootstrap-Angular Mobile Friendly App to consume the Twitter APIs and include below feature list.
Create 3-Tab,

1. Tweet Feed
   Make Asynchronous tweet feed
   show 50 tweets first and when user scrolls down then load next 50 feeds and so on.

2. Following user list
   List all the followers along with their name and profile-pic

3) Post Tweet
   Create a page to post tweets along with tweet limit validation.

When user switch between the tabs make sure Tweet feed and Following user list data don’t get refreshed.

## App Description

1. A Full Stack web app to browse through twitter timeline tweets,see all followers and post a tweet.
2. The App was made with Angular 7,Bootstrap as frontend and node.js and express framework as backend.
3. The App uses twitter API with the help of twit library to fetch tweets,fetch followers and post tweets

## Project Setup

clone the project and then:

```
cd server
npm i
nodemon server.js
```

to start server and then :

```
cd..

npm i
ng serve --open
```

to start the anular app

## The API endpoints used for the backend of our App:

```
/home_timeline
```

for fetching tweets

```
/followers/list
```

for fetching followers

```
/post_tweet
```

for posting tweets

```
/account_info
```

for fetching user details

## Twitter API endpoints used are:

```
statuses/home_timeline
```

for fetching tweets

```
/followers/list
```

for fetching followers

```
/statuses/update
```

for posting tweets

```
/account/verify_credentials
```

for getting user details
