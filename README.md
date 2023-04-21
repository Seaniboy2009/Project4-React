# As advertised project

## 1.Purpose of the project / Goals:
- The purpose of this project is to create a react application with a endpoint API.
- The applications main purpose is for creating blogs/posts for voting on a product, you can upload the products advert image and then its actual image, users can then vote if its alike the advert or not alike.

- Goals for the project
 - my goals are for people who are sick and tired of getting food/products that are not as they are advertised, this app
 will give users a place to create posts that show what the company are advertising and comparing it to what people got
 - I want users to interact and add there posts and also comment and follow others who have the same issues with their product
 - maybe with enough user's something can be done about false advertising 

## 2.User stories:
- as a user i can navigate all aspects of the web app - Creation of the navbar
- as a user i can create an account - User sign up page
- as a user i can create a post - Signed in user can create posts
- as a user i can update a post - Owner of the post can edit
- as a user i can delete a post - Owner of the post can delete it
- as a user i can view other posts - The main page will load all posts for users to see
- as a user i can view my posts - User can see their own posts under account and on the main page
- as a user i can like a post - All posts can be liked/followed except for a post the user owns
- as a user i can unlike a post - Posts that are liked can be unliked
- as a user i can search posts - Main page has a search function for , user who posted, title and content
- as a user i can follow others - Users are shown on the main page as well as the user page
- as a user i can comment on a post - All posts have a comment section, where comments can be created
- as a user i can read others comments - All posts have comments below the main post details
- as a user i can vote/unvote on a post - Posts will allow you to vote alike or not alike

## 3.Features:
- User features
    - Full navigation for all site functions

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/nav_signed_in_dqzmsh.png)

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/nav_signed_out_gw1nsj.png)

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/nav_dropdown_xujghv.png)

    - Ability to create an account
    - Ability to sign in and out
    - Ability to create/update/delete a post
    - Can view all posts on the app

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682065944/full_post_orjw6p.png)

    - Can search posts for keywords

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/search_bar_aag6ub.png)

    - Can follow and unfollow a post

    - Can vote on a post if its alike or not alike, can also unvote

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/post_like_comments_jhpcvl.png)

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/post_not_alike_dnuqv6.png)
    
    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283733/post_alike_e6vtce.png)

    - Can comment on a post

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681283732/comment_done_s7rfgk.png)

    - Can view other users profiles
    - Can follow other users

- React features
    - Use of context for the current user this allows the current user to be passed down to each child in the dom, this is used in the navbar as well as the posts to get the owner and name
    - React having individual components loaded and updating separate from each other adds to a much better user experience, for example, having a user sign in will not refresh the entire page(except if there is a re-direct), or clicking on a like button will not refresh everything, but will instead refresh the one part the user clicked this stops constant black screens as a site refreshes the entire page for a small button click

    - User context return

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681207801/user_context_gfehrg.png)

    - User context being used

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681207800/user_context_used_tpsojp.png)

    - Current user being used to ether display logged in or logged out links.

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681207943/user_context_nav_vcipiw.png)

    - use of the useState for getting and setting the state, such as postDetail.js for storing the post and setting the posts from the axios get request

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681207801/usestate_post_detail_shreum.png)

## 4.Future features:
- Have a top liked or top voted
- Have a most voted post show for all users
- Ability to sign in with google account

## 5.Typography and color scheme:
- Main colors are blue/purple with green highlights

![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682065944/full_post_orjw6p.png)

## 6.Wireframes / UX Design:
- Wireframe for the initial layout of the most important part the post 
- There had to be a clear divide for the advert image(red) and the actual image(blue)

![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681901105/wireframe1_sxxenm.png)

- The navbar had to be not cluttered so a small drop down was created that would store thew user actions, create, account, logout
so the user could see the main parts such as explore and users without the rest getting in the way.

![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1681901377/nav_dropdown_urhnkx.png)


## 7.Technology:
- Frameworks
    - React is the main framework [React](https://react.dev/)
    - React was chosen for its versatility and components, for an application like this the use of components having their own
     loading and updating has improved user experience and development.
    - Bootstrap for the HTML and CSS and some components [React Bootstrap](https://react-bootstrap.github.io/)
    - Bootstrap in my opinion has everything you need to make any front end app, it can be used out of the box for layout, styles and
    is very customizable, thats why this has been chosen and will be chosen in the future.
- API
    - The API is hosted https://project-5-api.herokuapp.com and was built using Django rest
## 8.Testing:
- Agile
 - Agile development of implementing small code blocks and then refactoring the code for better readability
 - Agile lifecycle for removing not needed functions and adding extra, updating the React app and the back end with any changes

- Code validation
    - CSS validation [CSS](https://jigsaw.w3.org/css-validator/validator)
    - HTML validation [HTML](https://validator.w3.org/)
    - Javascript validation using [Javascript](https://validatejavascript.com/)
    - Spellchecker [Online Spellchecker](https://www.online-spellcheck.com/)

- Development
    - Testing application on local enviroment npm start Runs the app in the development mode [http://localhost:3000](http://localhost:3000)
    - Deployment to heroku and testing on the live enviroment [project5-react](https://project5-react.herokuapp.com/)

- User story testing
    - navigation
    - sign up with errors

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682065781/sign_up_error_c7kvpb.png)

    - sign in with errors

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682065781/sign_in_error_nxr1wq.png)

    - create a post with errors

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682065781/create_post_error_wuamhs.png)

    - edit a post 
    - delete a post 
    - search for a post
    - open a post
    - view comments 
    - add a comment

- Auto testing with jest
    - 3 tests created one for app, navbar and asset

    ![Header](https://res.cloudinary.com/dgj9rjuka/image/upload/v1682068118/testing_f8cjje.png)

## 9.Deployment:
- Heroku
 - Deployment from Heroku involved signing up to the site, click create app.
    - once done i then clicked on the deploy tab linked to my github, selected the main branch then deployed, i set this to automatic deploys so when ever i made a change it would do it. New app > settings > config var > build packs > deploy.
   
- Gitpod
 - Deployment from git pod to github was adding the files for commit by typing git add then. (git add.) this would then add all the updated/changed files for push to github this can be checked by using git status. a commit message is then needed for this to be pushed to github (git commit -m "Message in here") once that has been done you can then do a git push to send all the files to github

## 10.Credits:

- Moments app by code institute 
- Bootstrap react