
# NOTHS React test

An app that is built using ReactJS and TypeScript. It uses mock data 
to display products which can be removed from or added to a basket.
## Tasks

The task was to implement the following to an exsiting code.

1. Implement the removeFromBasket function
2. Write tests for the App.js file
3. Refactor App.js
## Process

My approach to this test was to practise test-driven development by writing tests first 
and writing code to fulfill them. This idea allowed me to think of the needed functionality 
and performance before writing the code as well as break the task down to more manageable commits.

#### 1. Writing tests for addToBasket

Since the addToBasket function was already written, I decided to start with writing tests for it to ensure consistency and aim for high test coverage
where the focus was to test if the function updates the basket correctly as well as returning correct total price.

#### 2. Writing tests for removeFromBasket and implementing the function

To approach testing for removeFromBasket function, I wrote down a small list of features. In this case the function had two main tasks, 
remove all that type of product from basket and update the total price accordingly. \
Next, I wrote tests that would start from the easiest test case and move to add more difficulty as they go on:
- *Basket has one product and a button with removeFromBasket function attached removes the product. Total price is £0.*
- *Basket has multiple products containing both same and other products. A button with removeFromBasket function attached removes all types of chosen product from the basket. Total price updates to show price of the remaining items.*

With the tests and features in mind, I implemented the removeFromBasket function by using .filter() method to remove products from the array that is used to store information about the contents of the basket. 
Using this method allowed me to save the filtered array to a variable and use it further to update the state for the basket as well as use it to calculate new total price.

#### 3. Refactoring the App.js

First thing I wanted to refactor on App.js was to add TypeScript to increase the readability of the code. This allowed me to implement type safety as well as help with further debugging.

Next, I decided to transfer the code to a React Functional Component so that it follows modern principles of React and brings it inline with ES6+ standards. 

As the last part of my refactoring, I revisited my tests where I was able to abstract repeated blocks of code to reusable functions that allowed me to increase further readibility, follow DRY principle and increase manageability of the code.
## Additional Notes

Due to Enzyme not supporting testing or simulating useEffect yet, my choice to refactor App.js to functional React is located in Refactor.tsx file. 
This way the tests for the class-based React code are available to test without friction.

**To run the refactored version**, replace the code from App.tsx with the Refactor.tsx code and rename the component from Refactor to App.\
===> this code won't pass the tests due to mentioned obstacles.
