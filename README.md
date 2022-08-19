# Blog (Crud Application)

## How to run this website

- Create config.env file in server directory and add MongoDB/Atlas URI
  - `ATLAS_URI=(your MongoDB uri)`
- npm install
- npm start
- Browse to localhost:3000

**NOTE: Make sure to install packages in root, client and server directories. Npm start will run client/server concurrently.**

## Bugs

When database is not connected, app will crash trying to find one.

## Overview

A simple blogging engine that can create, edit and delete posts.

## Features

- CREATE: create a new post by navigating to the new post form from the home page. Add a title and description. Once 'create post' is clicked, a message will display whether the creation was successful. Upon success, the post will display on the home page.
- OPEN: open a post to view it's full contents by clicking it.
- EDIT: edit an existing post by navigating to the edit post form from an opened post. Add a new title and description. Once 'edit post' is clicked, a message will display whether the edit was successful. Upon success, the post will be updated on the home page.
- DELETE: delete an existing post by clicking 'delete' from an opened post. The page will refresh and the post will be deleted.

Additional features:
- Hovering over a card will change its opacity and scale
- Clicking 'new post' while on the new post page will trigger a refresh allowing you to add additional posts easily
- If you forget to add a title the site will alert you

Future Improvements:
- Add field to add an image that will display as the background for unopened cards
- Add button to close opened cards 
- Edit form input fields should have the posts current values

![image](https://user-images.githubusercontent.com/70166916/164874508-d6319610-b84a-45e0-a85f-bccbcba4e196.png)


