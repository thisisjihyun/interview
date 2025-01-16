Thanks for taking your time to check out and review the codebase.

Here are more details

## TechStack
FE: React\
BE: Express\
Test: Jest

## Available Scripts
In the project directory, you can run:

### `npm run start`
Starts the FE server. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run dev`
Starts the BE server. Open [http://localhost:4000](http://localhost:4000) to view mock data and various endpoints. 

### `npm run test`
Launches the test runner in the interactive watch mode.

## Overview
Public
- `/` - View your cart and browse the product list
- `/details` - Customize each product and add the customized version to your cart
- `/cart` - Review the items in your cart and clear the cart if needed

Private\
Click `Go to Admin Page`
- `/products` - Add or delete products
- `/updateProducts` - Edit product details

## Notes
- As mentioned in the interview instructions, I focused on functionality and kept styling to a bare minimum using inline styles. Please focus on functionality and ignore the appearance 😊
- Unit tests are included to cover basic functionality, aiming to validate the minimum scenarios.

## Trade-off
FE
- I used inline styles for minimal styling. However, for a more refined appearance, I would switch to a proper styling solution if needed.

State Management
- Initially, I used `useState` and `props` for state management. However, as the app grew, I found props drilling for shared states (Cart and Products) across components. To address this, I transitioned to using `Context`. While Redux could be considered, I don't think it's necessary for this one. If the app expands to handle different product types (e.g. bicycles, scooters, roller skates), `Redux` would be a better choice.

Local storage for Cart Items
- To persist the cart state after closing the browser, I used local storage. `sessionStorage` wasn't sufficient, as I needed a more permanent solution with key-value pairs. As the application scales, this approach can still be used to minimize server calls and improve performance.

BE
- While I'm more familiar with GraphQL, I used REST APIs here since they were quicker to implement.

Monolithic Architecture
- I chose a monolithic architecture at this stage, which is fine for the current scale of the project. Microservices could be considered if the app grows significantly.

DB
- I didn't use an actual database connection but opted for mock data in JSON format for quicker implementation.

Page Rendering
- Considering scalability and SEO for a commercial website, I would consider implementing Server-Side Rendering or a hybrid solution, especially if the website needs to handle dynamic, customized parts.


## Improvements I could make 
- Implement E2E tests with Cypress.js from a user's perspective, as well as integration tests to validate interactions between different parts.
- Modularize components to make them more reusable (e.g. Input).
- Improve error handling to make it more user-friendly.
- Focus on styling, responsive design, and accessibility improvements.
- Enhance validation (e.g. Input) and make it more user-friendly.
