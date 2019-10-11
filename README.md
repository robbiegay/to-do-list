# Robbie's To-do List

Good for remembering your grocery list!

## Getting Started

Type entries that you want to add to your to-do list. Add your item to the list by pressing enter/return. Your list item will now be added to the to-do list (in the space below the input box). You can now continue adding other items to the list. New items are added to the bottom of the to-do list.

You can mark items as completed or uncompleted via the checkboxes to the left of each to-do list item.

Below the to-do list are three view option buttons:
- view done (checkmark emoji)
- view all
- view to-do (x emoji). 

While in each view state, checking or unchecking list items will cause them to toggle between visibilities. For example, in the 'done' view-state: only items checked 'done' will appear. In this state, adding new items to the list will appear to do nothing. This is because new items are, by default, unchecked. You can view these newly added items by selecting either of the other two view-states.

You can hover over the toggle-state buttons to see how many list-items there are in each state. This feature is not available on mobile.

Below the view-state buttons are the toggle-all (toggle button emoji) and delete (bomb emoji) buttons. The toggle-all button will check or uncheck all of the to-do list items. If there are any unchecked items, then all items become checked. If all items are checked, then all items become unchecked.

The delete button will remove any currently checked items from the to-do list.


### Installing

Runs online - Click here to play: https://robbiegay.github.io/to-do-list/

## Running the tests

Some issues that I ran into and tried to solve for:
- Long inputs: Long input values cause the input box to start scrolling. Once the item is entered, the item is broken into a new line to prevent the new list-item from running off of the screen. If a long input is entered WITHOUT any spaces, then the checkbox will appear on its own line. This is a somewhat undesirable result, but it seems rather unlikely that there would be such a long input without spaces.
- Spaces: You cannot enter blank list-items. Additionally, adding excessive spaces before, after, or in the middle of a list item will be trimmed down to single spaces.
- View State Issues

Because local storage does not reset on a page reload, I found it useful throughout the development process to have a keystroke that reset local storage and a keystroke to display certain console.log()'s. I mapped the '=' key to clear both the local storage and the array containing my list-item objects. This was useful when I had made changes to the code and wanted to quickly test these changes with a completely reset webpage. I mapped the '-' key to display various useful console.log()'s. Both of these functions have been commented out in the live version of the program.

## Built With

* [Bootstrap](https://getbootstrap.com) - The CSS framework used

## Contributing

If you've found a bug in my code, please feel free to send me an Issue!

## Authors

* **Robbie Gay** - [Robbie's Blog](https://robbiegay.github.io)