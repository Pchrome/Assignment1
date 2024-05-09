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
Using Vercel
Deployment can be done through the vercel user interface
1. Log in to your Vercel account.
2. Click on the "Import Project" button.
3. Follow the prompts to import your project from Git or by uploading your project files.
4. Configure deployment settings (like environment variables etc.).
5. Click on the "Deploy" button to deploy your project.

Using fly.io
Deployment can be done through the vercel user interface
1. git clone 
2. cd to project root directory
3. fly launch --now
***

Notes:
nodemailer was utilised with a dummy email to simulate the sending of emails, however due to security reasons, the dummy email's password is stored in a .env file locally
and not tracked by git.
