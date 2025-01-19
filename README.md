Thanks for taking your time to check out and review the codebase.

## TechStack
FE: React\
BE: Express\
Test: Jest

## Scripts 
Please run it locally to interact with it
### `npm run start`
Starts the FE server. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run dev`
Starts the BE server. Open [http://localhost:4000](http://localhost:4000) to view mock data and various endpoints. 

### `npm run test`
Launches the test runner in the interactive watch mode.

## Overview
Public
- `/` - View your cart and browse the product list
- `/details/:id` - Customize each product and add the customized version to your cart
- `/cart` - Review the items in your cart and clear the cart if needed

Private\
Click `Go to Admin Page`
- `/manage` - Add or delete products
- `/update/:id` - Edit product details

## Demo
1. Public page
   - Show the list of products
   - Add a product to the Cart
      - Validate the prohibited combinations
       - Customasiable
       - Display if each item is out of stock
   - Claer the Cart
     
https://github.com/user-attachments/assets/85bd8e12-c436-42a0-b157-8aadca066c96

2. Prive page
  - Add a new product by adding each option/stock
  - Show the updated product list below the form
    
https://github.com/user-attachments/assets/7f616ea1-8c43-4ed2-9858-9745101aabac


  - Edit an existing product
    - Customasiable 
  - Reflect the updated product on the Public page


https://github.com/user-attachments/assets/31b8721d-4f83-477f-832f-875a76502277


  - Delete existing products


https://github.com/user-attachments/assets/71b21dd3-f476-4a1f-9167-1f1d0a17133d


    
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
- I initially modified the mock data directly for adding, updating, and deleting. While refactoring, I tried copying the mock data to avoid direct modification. However, this caused issues where the changes didn't persist after refreshing the page. As a result, I decided to continue modifying the mock data directly.

Monolithic Architecture
- I chose a monolithic architecture at this stage, which is fine for the current scale of the project. Microservices could be considered if the app grows significantly.

DB
- I didn't use an actual database connection but opted for mock data in JSON format for quicker implementation.

Page Rendering
- Considering scalability and SEO for a commercial website, I would consider implementing Server-Side Rendering or a hybrid solution, especially if the website needs to handle dynamic, customized parts.

Scalablility in the future
- I used the `type` field in the mock data to categorize products, which will serve as an indicator for future scalability of the application. This approach allows us to easily extend the product catalog by adding new types (e.g. roller skates). By assigning a specific type to each product, the application can dynamically filter and serve relevant products through different endpoints based on the provided type.
- In terms of the file structure, I aimed to standardize it by using a generic product structure instead of specifying individual type names. This approach ensures reusability and flexibility, allowing the product structure to easily accommodate new types in the future.

## Improvements I could make 
- Implement E2E tests with Cypress.js from a user's perspective, as well as integration tests to validate interactions between different parts
- Modularize components to make them more reusable (e.g. Input)
- Improve error handling to make it more user-friendly
- Focus on styling, responsive design, and accessibility improvements
- Enhance validation (e.g. Input) and make it more user-friendly
- Enable direct access via URL. Currently, typing a URL like '/details/1' doesn't display anything as it can only be accessed from the main page
