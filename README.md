<p align="center"><img src="src/.github/app-logo.png" width=250 height=150 alt="App Logo"/></p>

# Notes

> A web application for creating, editting and deleting personal notes.

![home](src/.github/home.png)

Read this document in your language: 
- [English](README.md) 
- [Português](README.pt.md)

Notes is a web app which imitates a personal annotation manager, giving the user the ability to create, edit and delete notes.
Every note is saved on a firebase firestore instance, and each user must be authenticated to use this application. Users can signup
if they do not have an account yet, or login if they do so.

## Technologies used

- Vue
  - Vue CLI 3
  - Vuetify
  - Vue Router
  - Vuex
- npm
  - uuid
  - moment
- Firebase
  - Firestore
  - Hosting
  - Authentication

## Index

- [Installation](#installation)
- [How to use](#how-to-use)
- [License](#license)
- [About](#about)

## Installation

0. Make sure to have installed NodeJS on your computer
1. Clone this repository using git
1. Open terminal on cloned repository
1. Run ``npm install`` to install all dependencies
1. Go to src/firebase/init.js and add your Firebase Firestore configuration (generated by Firebase)
1. Run ``npm run serve`` to run the project on localhost

[Back to top](#notes) <br>
[Back to index](#index)

## How to use

<p>First, go to this <a href="https://notes-5cf6a.firebaseapp.com">link</a> to access the application hosted on firebase.
Then, follow the steps below:</p>

1. Register
  <p>All users must register before using Notes. To do so, just enter with your account email and password on the login screen.
  If you don´t have one, click on the 'I don´t have an account' link and signup.</p>
  
  ![signup](src/.github/signup.png)
  
  <hr>
  
2. Homepage
  <p>After registered, the user will be redirected to the homepage. Here, the user can do most of the functionalities of the app, such     as creating a new note by clicking on the giant 'Add note' card button or by selecting this option on the sidebar menu on the left, as   well as edit an already created note by simply clicking in it.</p>
  
  ![notes-saved](src/.github/notes-saved.png "Notes created by the user")
  
  ![creating-note](src/.github/creating-note.png "Editting note")
  
  <hr>
  
3. Notes deleted
  <p>When a user deletes a note, it goes to the trash. There, the user can restore notes deleted or remove them permanently. There is     also the possibility to read deleted notes, but not to edit them (must restore them first).</p>
  
  ![view-deleted](src/.github/view-deleted.png)
  
  <hr>
  
4. Additional functionalities
  <p>Apart from the primary functionalities of the app, there are secondary ones which can improve the user experience. From filters to   multiselection, notes management becomes easier and faster.</p>
  
  - Order by
    > <p>Order all notes by title, date of creation or modification</p>
    ![order-by](src/.github/order-by.png)
  
  - Filter
    > <p>Filter notes by their color, which can be changed in edit screen</p>
    ![filter](src/.github/filter.png)
  
  - Multiselection
    > <p>Multiselection enables the user to select multiple notes at once and delete them in just one click</p>
    ![multiselection](src/.github/multiselection.png)
  
[Back to top](#notes) <br>
[Back to index](#index)

## License
MIT License

Copyright (c) 2020 GabrielMCavalcante

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back to top](#notes) <br>
[Back to index](#index)

## About

- Github - [GabrielMCavalcante](https://github.com/GabrielMCavalcante)

- LinkedIn - [Gabriel Cavalcante](https://linkedin.com/in/gabrielmcavalcante)

[Back to top](#notes) <br>
[Back to index](#index)
