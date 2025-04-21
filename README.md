# RentHub

#RentHub page URL - https://vaibhavm01.github.io/rent_hub_demo_basic/

RentHub is an Angular-based application designed to manage rental services. It provides a user-friendly interface for users to explore, create, and manage rental posts. The project uses modern web technologies and libraries for styling and functionality.

## Features

- **Login and Registration**: Users can create accounts and log in to access personalized features.
- **Create Post**: Allows users to create rental posts with details like amenities, location, and apartment type.
- **Search Posts**: Users can search for rental posts based on amenities, location, and apartment type.
- **View Detailed Post**: Provides detailed information about a specific rental post.
- **Mark as Favorite**: Users can mark posts as favorites for easy access later.

## Pages

1. **Login Page**: Secure login for registered users.
2. **Registration Page**: Allows new users to sign up.
3. **Home Page**: Displays a list of rental posts with search and filter options.
4. **Post Details Page**: Shows detailed information about a selected rental post.
5. **Create Post Page**: Enables users to create and publish new rental posts.
6. **Favorites Page**: Displays posts marked as favorites by the user.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project for production, run:

```bash
ng build --configuration production
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Style Theme

This project uses the Bootswatch "Journal" theme for styling. For more themes, visit [Bootswatch](https://bootswatch.com/).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VaibhavM01/rent_hub_demo_basic.git
   cd rent_hub_demo_basic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is licensed under the MIT License.
