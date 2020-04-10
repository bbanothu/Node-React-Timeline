Base Version
- Allows creating posts, liking posts, and deleting posts

2.0 Version - Functional - Needs improvements - Has security issues. 
- Allows login and registration and allows people to create posts anonomusly.
- Registered users can delete their posts and anonomous posts.
- registered users can also like and dislike posts.


- Things to still fix
  - Did not make the password storing secure (saved in plain text)
  - redux (storing email and password in localvariables (unsafe) - to fix
  - Code needs to be refactored better.
  
 
 To run either project:
 - Backend
    Download postgress:
    Create postgress database 
      - modify config.json in backend to your choosing.,
      run -> npx sequelize-cli db:migrate -> to get the db into postgress.
      the run the server.
- Front End
  - run -> npm run build.
  - run -> npm run start. It will ask you to choose a different port if the server has already started. If so, type Y.  
    
    
   
   
