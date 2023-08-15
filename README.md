# Project Name

Ghostly Tales Project

<br>

## Description

Website with a forum-like system to share and view stories about paranormal encounters, featuring user profiles, comments and likes in the stories' pages.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter stories, log in and sign up. 
- **sign up** - As a user I want to sign up on the web page so that I can add my stories, favorite other stories,comment and leave a like.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **edit user** - As a user I want to be able to edit my profile.
- **create a story** - As a user I want to be able to create a story, add it to the website and especify location.
- **stories list** - As a user I want to
- **stories details** - As a user I want to see more details each story be able to leave a comment, like it and save it as a favorite.
- **location** - As a user I want to share the location of the story.
- **favorite list** - As a user I want to see the list of my favorite and delete them.
-

Extra features ( not mvp):
- **filter-result** - As a user I want to see the list of stories and location filtered by my preferences.
- **encounter lists** - As a user I want to be able to see a list of diferent types of encounters present in the stories so that I can click on the specific one and just find stories relevant about that.


<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, username, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  email, password, username  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, username, [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, body, location,thumbnail,tags}                                 |
| `DELETE`   | `/private/favorites/:storyId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/stories`                     | Renders `story-list` view.                              |                                                          |
| `GET`      | `/stories/details/:id`         | Renders `story-details` view for the particular story. |                                                          |
| `GET`      | `/locations`                     | Renders `location-list` view.                              |                                                          |
| `GET`      | `/locations/details/:id`         | Renders `location-details` for the stories that occured on the location|
| `GET`      | `/stories/create`                | Renders `story-create-form` to create and upload a new story to the database.                              |                                                          |
| `Post`      | `/stories/create`         | Sends stories created info to the server and creates the story in the DB. story. |                                                          |
                                                          |

## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
  imageUrl: // CLOUDINARY
}

```
Favorites model

```javascript
{
  placeId: String,
} -- adicionar uma relação entre o user

```
Story model
{
  name: String,
  body: String,
  location: // googleAPI
  author: String
  tag:[ARRAY]
  thumbnail: // Cloudinary
}
Location model{
  name: String,
  description:
  imgURL: // cloudinary
  stories: [ARRAY]
}


<br>

## API's

Google Maps API.
Paranormal Database -> https://www.paranormaldatabase.com/
Reddit API:

<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/invite/b/LI2YccJF/ATTIb3bcbcd3d847c0e9c4cbf28546f32e5c612CEAC1/ironhack-2nd-project)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
FirstName LastName - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

FirstName LastName - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
