# trove
## cs 317: mobile app development final project
### by esther choe & sara clark

# ALPHA WRITE UP
## Overview of Implementation State
All displays have been added, in process of implementing functionality
- Treasures
  - Complete: Display and front end (except for reformatting of images), functionality for add, delete, update, and share treasure features
  - In Progress: Functionality for add to vault
  - Extra Features: sorting and filtering, clicking on a tag leads to a view of all treasures with that tag

- Vault
  - In Progress: Functionality for add, delete, and update vault features, Display of individual vaults and scrolling list of vaults
  - Extra Features: Display that takes up the whole screen, similar to Stories (ex. Instagram, Snapchat, Facebook)

- Mail
  - Complete: Front end display, accept and reject feature
  - In Progress: add to treasures list on accept mail
  - Extra Features: update badge on tab bar to reflect unprocessed treasures, integrate expo notifications

- Authentication
  - In Progress: implementing using Lyn's notes

## What Works
- Treasures
  - Display: individual treasure icons with description, date, hashtags, location, and external link
  - Add/Edit/Delete Treasure: functional modal implemented
- Vault
  - Display: individually view/scroll through all vaults
- Mail
  - Display: view all incoming and accepted mail, see which user sent it, the treasure title, and date received
  - Accept and reject buttons functionality

## What Doesn't
- Treasures
  - add treasure to a vault button on individual treasure does not work
  - Minor: alert message of needing camera roll permissions
- Vault
  - similar state to Treasures
- Mail
  - accept mail does not current add incoming treasure to treasures
- All Pages
  - data is not sorted in a particular order and on editing an item the order is changed, unclear to user why

## Revisions to Revised Design
- Focus on Treasure data types of photos and links first, and if time permits allow video and audio to be added
- Sorting, filtering, notifications have been moved to the wishlist (on Updated Work Plan)
  - Certain aspects, such as sorting, filtering, notifications, are not considered core to our application and therefore will not be prioritized in the final implementation. If we have the capacity to complete these aspects, we will make an effort to, but it is now considered as an extra detail not a priority. Additionally, we are unsure if we will be able to integrate more complex media, such as videos and audio recording into our app because of the complexity on both the react native end and firebase integration.

## Update Work Plan
Link to Updated Work Plan: https://docs.google.com/document/d/1MsLRi2SmT09uqS6uQERvAZ2ElK6ny982l7sG324zA1Y/edit?usp=sharing Checkmarks indicate what work has been completed.

Overview:
- 12/15
  - authentication, login/sign-up, settings
- 12/16
  - complete editing treasures and vaults
- 12/17
  - firebase (connecting data)
- 12/18
  - send treasures
  - accept/reject treasures
- 12/20
  - final check, tie up loose ends, potentially implement extras in wishlist (highlighted in orange on work plan)
