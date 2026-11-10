![](https://github.com/jayguan1048/digits/raw/main/doc/digits-add-contact.png)

Digits is an application that allows users to:

- Register an account.
- Create and manage a set of contacts.
- Add a set of timestamped notes regarding their interactions with each contact.

## Installation

First, [install PostgreSQL](https://www.postgresql.org/download/).

Second, [download a copy of Digits](https://github.com/jayguan1048/digits/). Note that Digits is a private repo and so you will need to request permission from the author to gain access to the repo

Third, cd into the app directory install the required libraries with:

```

$ npm install

```

Once the libraries are installed, create a database for digits.

```

$ createdb digits
Password:
$

```

Fourth, create a `.env` file from the `sample.env`. Edit the line `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"` to match your setup. Replace `mydb` with the PostgreSQL database that you created. replace `johndoe:randompassword` with a username and password you created for this db. If you did not create a user for this database, you can use the `postgress` user with the password you set when you installed postgress. Note: this is not a recommdened practice since the `postgres` user is an admin with full access to postgres. 

See the Prisma docs [Connect your database](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql#3-connect-your-database). 

Then run the Prisma migration `npx prisma migrate dev` to set up the PostgreSQL tables.

```
$ npx prisma migrate dev
Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "mydb", schema "public" at "localhost:5432"

Applying migration `20260301195634_init`

The following migration(s) have been applied:

migrations/
  └─ 20260301195634_init/
    └─ migration.sql

Your database is now in sync with your schema.

$

```

Create the Prisma Client by running the command `npx prisma generate`. This will create the Prisma Client in the `generated/prisma` directory, which is used by the application to interact with the database.

```
$ npx prisma generate

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.

Generated Prisma Client (7.4.2) to ./generated/prisma in 80ms
 
```

Then seed the database with the `/config/settings.development.json` data using `npx prisma db seed`.

```

$ npx prisma db seed

Loaded Prisma config from prisma.config.ts.

Running seed command `npx tsx src/seed.ts` ...
Seeding the database
  Creating user: admin@foo.com with role: ADMIN
  Creating user: john@foo.com with role: USER
  Adding contact: {"firstName":"Philip","lastName":"Johnson","address":"POST 307, University of Hawaii","image":"https://github.com/philipmjohnson.png","description":"I am a Professor of Information and Computer Sciences at the University of Hawaii, Director of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.","owner":"john@foo.com"}
  Adding contact: {"firstName":"Henri","lastName":"Casanova","address":"POST 307, University of Hawaii","image":"https://avatars0.githubusercontent.com/u/7494478?s=460&v=4","description":"I am originally from France. I maintain a list of reports from my surf sessions. I have proof that I ran the Hana relay with an actual Team.","owner":"john@foo.com"}
  Adding contact: {"firstName":"Kim","lastName":"Binsted","address":"POST 307, University of Hawaii","image":"https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg","description":"Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as \"What do you call a Martian who drinks beer? An ale-ien!\".","owner":"admin@foo.com"}

The seed command has been executed.
$

```

## Running the system

Once the libraries are installed and the database seeded, you can run the application by invoking the "dev" script in the [package.json file](https://github.com/ics-software-engineering/nextjs-application-template/blob/master/app/package.json):

```

$ npm run dev

> nextjs-application-template-s26@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://XXX.XXX.XXX.XXX:3000
- Environments: .env

✓ Starting...
✓ Ready in 821ms

```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/config/settings.development.json), or else register a new account.


### ESLint
You can verify that the code obeys our coding standards by running ESLint over the code in the src/ directory with:

```
$ npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
$
```

### Building the App

To build the application for production deployment, use the following command:

```bash
$ npm run build
```

This will compile the Next.js application and output the production build to the `.next/` directory.

After building, you can start the production server with:

```bash
$ npm start
```

Make sure your environment variables and database are properly configured before building for production.

### Testing
This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Tests are located in the `tests/` directory and cover user flows, authentication, and admin features.

To run all tests:

```
$ npx playwright test
```

You can run tests for a specific file:

```
$ npx playwright test tests/john-pages.spec.ts
```

To view tests in headed mode (see the browser UI):

```
$ npx playwright test --headed
```

For more information, see the [Playwright documentation](https://playwright.dev/).


## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```

.github # holds the GitHub Continuous Integration action and Issue template.

config/ # holds configuration files, such as settings.development.json

doc/ # holds developer documentation, user guides, etc.

prisma/ # holds the Prisma ORM schema and seed.ts files.

public/ # holds the public images.

src/ # holds the application files.

tests/ # holds the Playwright acceptance tests.

.eslintrc.json # The ESLint configuration.

.gitignore # don't commit VSCode settings files, node_modules, and settings.production.json

```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Next.js application.

The src/ directory has this structure:

```

app/

  add/ # The add route
    page.tsx # The Add Contact Page

  admin/
    page.tsx # The Admin Page

  api/auth/[...nextauth]/
    route.ts # The NextAuth configuration

  auth/
    change-password/
      page.tsx # The Change Password Page

    signin/
      page.tsx # The Sign In Page

    signout/
      page.tsx # The Sign Out Page

    signup/
      page.tsx # The Sign Up / Register Page

  edit/
    page.tsx # The Edit Contact Page

  list/
    page.tsx # The List Contact Page

  not-authorized/
    page.tsx # The Not Authorized Page

  layout.tsx # The layout of the application

  page.tsx # The Landing Page

  providers.tsx # Session providers.

  components/
    AddContactForm.tsx # The React Hook Form for adding Contact.

    EditContactForm.tsx # The Edit Contact Form.

    Footer.tsx # The application footer.

    LoadingSpinner.tsx # Indicates working.

    Navbar.tsx # The application navbar.

    ContactCard.tsx # Card in the list contact page.

    ContactCardAdmin.tsx # Card in the admin list contact page.

  lib/

    dbActions.ts # Functions to manipulate the Postgres database.

    page-protections.ts # Functions to check for logged in users and their roles.

    prisma.ts # Singleton Prisma client.

    validationSchemas.ts # Yup schemas for validating forms.

  tests/ # playwright acceptance tests.

```

#### Landing page

When you retrieve the app at http://localhost:3000, this is what should be displayed:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-logged-out.png)

The next step is to use the Login menu to either Login to an existing account or register a new account.

#### Login page

Clicking on the Login link, then on the Sign In menu item displays this page:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-sign-in.png)

#### Register page

Alternatively, clicking on the Login link, then on the Sign Up menu item displays this page:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-register.png)

#### Landing (after Login) page, non-Admin user

Once you log in (either to an existing account or by creating a new one), the navbar changes as follows:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-landing-page.png)

You can now add new Contacts, and list the Contacts you have created. Note you cannot see any Contacts created by other users.

#### Add Contacts page

After logging in, here is the page that allows you to add new Contacts:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-add-contact.png)

#### List Contact page

After logging in, here is the page that allows you to list all the Contacts you have created:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-list-contacts.png)

You click the "Edit" link to go to the Edit Contacts page, shown next.

#### Edit Contact page

After clicking on the "Edit" link associated with an item, this page displays that allows you to change and save it:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-edit-contact.png)

#### Landing (after Login), Admin user

You can define an "admin" user in the settings.json file. This user, after logging in, gets a special entry in the navbar:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-admin-landing-page.png)

#### Admin page (list all users stuff)

To provide a simple example of a "super power" for Admin users, the Admin page lists all of the Contacts by all of the users:

![](https://github.com/jayguan1048/digits/raw/main/doc/digits-admin.png)

Note that non-admin users cannot get to this page, even if they type in the URL by hand.

### Authorization

Only logged in users can manipulate Contact items

#### ESLint

The application includes a [.eslintrc.json](https://github.com/ics-software-engineering/nextjs-application-template/blob/main/.eslintrc.json) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/nextjs-application-template]-> npm run lint

> nextjs-application-template-1@0.1.0 lint
> next lint

✔ No ESLint warnings or errors
[~/nextjs-application-template]->
```

ESLint should run without generating any errors.

It's significantly easier to do development with ESLint integrated directly into your IDE (such as VSCode).


#### Playwright End-to-End Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end and authentication testing. Playwright tests are located in the `tests/` directory and cover user flows, authentication, and admin features. These tests help ensure that the application works as expected from the user's perspective and that critical workflows are protected against regressions.

**How to run Playwright tests:**

- To run all tests:

  ```
  npx playwright test
  ```

- To run tests for a specific file:

  ```
  npx playwright test tests/john-pages.spec.ts
  ```

- To view tests in headed mode (see the browser UI):

  ```
  npx playwright test --headed
  ```

For more information, see the [Playwright documentation](https://playwright.dev/).
