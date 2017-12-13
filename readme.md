***WIZARDLY 5E***

A 5e DnD Wizard Spell Book Organizer App

By Robert Frazier and Wade Collier

***APP PURPOSE OVERVIEW***

Wizardly 5e is an app for managing spells as a Wizard in DnD 5e.
The user can view their spell book, dynamically update spell book, and set prepared status for spells in spell book.

***TECH STACK***

Node.js/ Express

MongoDB/ Mongoose

Mocha/ Chai/ Travis CI

Heroku/ mLab

Photoshop/ Flame Painter Pro 3

Deployed via Heroku at https://wizardly-5e.herokuapp.com/

Ideation notes:

*****************
** Splash Page **
*****************

Picture of a wizard, brief description of app.

As a user, I should be able to sign up/ log in (*** may not implement this from the get-go ***).

As a user, I should be able to do a general spell search. ***MVP***

As a user, I should be able to bring up a character that exists. ***MVP*** (We'll start with a global wizard, global spell book)

As a user, I should be able to start a new character/spell book from scratch, no authentication required.

******************************
** User View/Character View **
******************************

As a user, I should be able to create a Wizard character and spell book for character.

As a user, I should be able to update important info about a character (Level, Intelligence modifier). ***MVP***

As a user, I should be able to view spell casting-specific limitations (amount of spells a character can prepare) according to my character's level and Intelligence modifier. ***MVP***

As a user, I should be able to navigate to my spell book directly from this view. ***MVP***

***********************
** Spell Search View **
***********************

As a user, I should be able to see a high level list of all wizard spells, all categories. ***MVP***

As a user, I should be able to see a list of available spells for my level.

As a user, I should be able to filter spells by magic school.

As a user, I should be able to filter spells by spell level.

As a user, I should be able to filter spells by components, range, duration, area of effect, et cetera.

As a user, I should be able to add a spell to my character's spell book from this view.

*********************
** Spell Book View **
*********************

As a user, I should be able to see the spells I know (what's in  the character's spell book). ***MVP***

As a user, I should be able to attach a prepared status to a given spell in my spell book. ***MVP***

As a user, I should be able to remove/switch prepared status for a given spell in spell book. ***MVP***

As a user, I should be able to see spells sorted by school (all 6) and level (cantrip to max level).

As a user, I should be able to see what is needed (books, materials) to get a spell ready to use.

As a user, I should be able to view only my prepared spells if I choose. ***MVP***

*As a user, I should be able to use a spell (or spells) and have visual feedback of which have been used (active update).* (Stretch)

*As a user, I should be able to track my spell slots and usage dynamically.* (Stretch)

***************************
** SCREENS USER WILL SEE **
***************************

- Splash page screen (search all spells, look at character)

- Spell Search screen

- Character screen (Wizard info, link to spell book)

- Spell book screen

*******************
** USER JOURNEYS **
*******************

Wireframes: https://wireframe.cc/pro/pp/6db95858e129921

MAIN PAGE

- User selects Spell Compendium button => takes user to list of all Wizard Spells

- User selects See my Spell Book button => takes user to their spell book

- User selects See my Wizard => takes user to their Wizard page

SPELL SEARCH SCREEN

- User clicks on spell name => popup with spell details

- User clicks on Add to my Spell Book => Adds spell to character's Spell Book

- User clicks on Add to my Spell Book, Spell Book already includes spell by that name => message appears that Spell Book already contains spell.

CHARACTER SCREEN

- User selects edit => user given ability to change name, level, and INT modifier.

- User selects See My Spell Book => User taken to the spell book view

SPELL BOOK SCREEN

- User selects prepare spell button on a given spell => user sees that spell is prepared (check-box)

- User selects prepare spell button on a given spell, but is already at limit for prepared spells => message appears that user cannot prepare anymore spells/ has hit their limit

- User selects spell search nav button => takes user to spell search

- User selects my wizard nav button => takes user to character screen
