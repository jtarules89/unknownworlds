# (MMO)RPG Maker MZ 
###  **Disclaimer :** *You have to own BOTH RPG Maker MV and MZ licenses in order to use this repack !*
---

## Summary
I started this project in late 2020. I discovered the MMO plugin project by Samuel Cardillo and was quite impressed by the quality of the result. Samuel and his community have made good work on it. 
It was running on RPG Maker MV –which runs in JavaScript– and as a web developer I decided to make my very own MMO with it because I'm quite good with the technos the project uses. 
After some weeks working on my game, I started to feel the need to have a better engine so I decided to migrate the MMO_Core plugins on RPG Maker MV. 
After some tricky fixes and "bandages" I finally produced something surprisingly stable. 

## History
Samuel Cardillo has used RPG Maker since its 2000 version. Discovered it when he was a kid and used it to make many (very bad he says) games. It clearly impacted a lot on his creativity and his development desires. Later on, as a French-speaking person, he discovered a (now dead) project named FROG Creator which was a dedicated at creating MMORPG in a RPG Maker-like environment. 

With the release of RPG MAKER MV which allows usage of JavaScript and its HTML5 export, he decided to give it a try and discovered quickly that yes, RPG Maker MV could easily be used to create an MMORPG creator interface.

I joined the project in September 2020 and made the MZ update a few months later, after discovering it was easy to migrate basic MMO features to RPG Maker MZ. 

--- 

## How to use ? 

1. Watch [the MV tutorial video](https://www.youtube.com/watch?v=TcAmU2bdKvE) to learn the basics
2. Then take a look at [the MZ tutorial](https://www.youtube.com/watch?v=TcAmU2bdKvE) :

[![Watch the tutorial](https://img.youtube.com/vi/4V4YhMcNRng/0.jpg)](https://www.youtube.com/watch?v=TcAmU2bdKvE) 

*Note : It's not needed to touch any package file anymore*

### Plugins requirement 

**Disclaimer :** *The following files are already contained in the project.*

- Orange Custom Events : http://download.hudell.com/OrangeCustomEvents.js
- Orange Custom Event Creator : http://download.hudell.com/OrangeCustomEventCreator.js

### Launch steps

1. `git clone` the repo

2. Check that you're on to the `MMOMZ/develop` branch

3. Install [NodeJS](https://nodejs.org/en/)

4. Install [RethinkDB](https://rethinkdb.com/docs/install/)

5. Run `rethinkdb` in a terminal

6. Run `node mmo.js` in the `server/` folder

7. Congratulations ! You can now play, develop, improve, overcome and do your stuff :) 

### Keep the game up to date for your players

1. Work on your game
2. Once you're done, edit the `version.json` file at the project's root folder
3. Upload/Update your game on a website

---

### Documentation 

-Are you a developer ? [Read the developer documentation](https://github.com/samuelcardillo/MMORPGMaker-MV/wiki#developers-documentation)

-Are you a maker ? [Read the maker documentation](https://github.com/samuelcardillo/MMORPGMaker-MV/wiki#makers-documentation)

### Current functionalities
- Synchronised player movements
- Synchronised skins
- Account creation (password hashed with SHA256 + customizable salt)
- RESTFUL API support (with JSON Web Token)
- Persistance of position & skin
- Persistance of player stats
- Persistance of inventory & equipments
- Persistance of local switches
- Persistance of party switches
- Persistance of global switches
- Persistance of local variables
- Persistance of global variables
- Global and local map system
- Party system
- Party combat system
- Respawn system
- In-game chat
- Registration page

---

**See the progress : https://trello.com/b/m4leXuBa/mmorpg-maker-mv-version-1-todo-list**

**Join us on Discord : https://discord.gg/GVqyAwp**

**Check the @Andaroth fork : https://github.com/Andaroth/MMORPGMaker-MZ**