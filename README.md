# Assignment

## Overall Folder Structure
#### 1. assignment-API (Backend)
- Backend Node.js API
  
Steps to run project:
#### 1. assignment-API (Backend)
```bash
npm install
npm start
```
Executing Jest:
#### 2. assignment-API (Backend)
```bash
npm install
npx jest
```
***

Deployment To Cloud:
Using fly.io
Deployment can be done through the vercel user interface
1. git clone https://github.com/Pchrome/assignment1.git
2. cd to project root directory
3. fly launch --now
***

Notes:
nodemailer was utilised with a dummy email to simulate the sending of emails, however due to security reasons, the dummy email's password is stored in a .env file locally
and not tracked by git.
