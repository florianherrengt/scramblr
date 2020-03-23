# Braindump

The purpose of this app isn't to protect your sensitive information but to increase the cost of spying on you.

See it as a digital curtain. Good enough most of the time but won't stop a highly motivated individual. Perfect for the people who have _nothing to hide_ but yet value their privacy.

## Security

- Passwords are hashed with bcrypt
- Keep the database in a private subnet
- Enable DB encryption when creating the database. It usually can't be changed after.

### What is encrypted

- The content of notes
- The label of tags

### What is not encrypted

- Creation and last updated dates
- Usernames

## Design decisions

- The AES passphrase will be stored in localStorage. Typing the password everytime is tiresome and break the flow. If someone has gained access to your computer, you're hosed.
- Don't use folders or notebooks. They are plenty of apps providing similar features. Tags are faster and more powerful.

## Technical decisions

- Don't use JWT for user authentication. Use HttpOnly cookie instead and store the passphrase in localStorage to spread the risk between CSRF (cookie) and XSS (localStorage) attacks.
- PGP is too slow. It takes ~3secs to encrypt "Hello World" with my 3.5 GHz Intel Core i7.
- Postgres will be easier to create a "Deploy to Heroku" button. Most cloud providers offer managed Postgres.

## FAQ

- I lost my password, can I reset it?
  No. There's no reset password feature.

- Is this really secure?
  This app is meant to protect your privacy. Without end-to-end encryption, anyone who has access to the database can read your notes. The encryption level should be enough to discourage most people. You should keep your world domination plans somewhere else.

- Does it work offline?
  No. This app is meant to be used to keep track of your thoughts, not to store important information.

- Why bother with end-to-end encryption
  If the text isn't encrypted in the browser, anyone who can access the database can read it. Developers will be able to read your thoughts. With AES encryption, only you can.

## Features

- [x] Create a note
- [x] Edit / Delete notes (not sure yet if I want this)
- [x] Create tag
- [x] Edit / Delete tags
- [x] Encrypt note text
- [x] Encrypt tag label
- [] Search notes
- [] Settings page to change AES passphrase and logout
- [] Use WebWorker to decrypt notes
- [] Charts of tags frequency stats
- [] Link preview
