
Name: GIDONGO CHARLES
Reg:25/MSI/BU/G/1001
Cours unit: web development
1.	Reports
2.	Description of the project:
3.	The project starts with the overview of the project, the structure of the and screen shots.
4.	 Project structure 
student-dashboard/
├─ backend/
│  ├─ db.json
│  ├─ package.json
│  └─ README.md
├─ frontend/
│  ├─ index.html
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  ├─ src/
│  │  ├─ main.jsx
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  ├─ pages/
│  │  │  ├─ Login.jsx
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ Students.jsx
│  │  │  ├─ StudentDetail.jsx
│  │  │  └─ Reports.jsx
│  │  ├─ components/
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ StudentTable.jsx
│  │  │  ├─ StudentFormModal.jsx
│  │  │  └─ ThemeToggle.jsx
│  │  ├─ context/
│  │  │  └─ AuthContext.jsx
│  │  └─ services/
│  │     └─ api.js
└─ README.md


 Overview
During development, the backend was powered by JSON-Server, which automatically displays a default homepage at http://localhost:8000. This page shows endpoint lists such as:
•	/users
•	/students
Although this behavior is normal, it was not desired for our project interface.
2. Problem Identified
JSON-Server automatically serves a homepage interface whenever it does not find a public/index.html file.
This caused the browser to display the default JSON-Server landing page instead of a blank or customized screen.
Example of unwanted output:
“JSON Server  /users – 1 item /students – 2 items”
3. Implemented Solution
To override JSON-Server’s automatic homepage, we created an empty public/index.html file inside the frontend project.
Steps Taken
1.	Created a new folder named public inside the frontend directory.
2.	Inside the public folder, added an empty file named:
3.	index.html
4.	JSON-Server now detects the custom folder and stops serving its default UI page.

4. Outcome
•	The unwanted JSON-Server homepage no longer appears.
•	Backend API routes continue functioning normally (/users, /students, etc.).
•	The frontend application now controls what is displayed at the root level.
•	This improvement ensures a cleaner environment and avoids confusion during development.

5. Conclusion
The issue was caused by JSON-Server’s default behavior.
Adding an empty public/index.html resolved the problem fully without affecting backend routes or frontend functionality.
If needed, this setup can also support custom UI pages in the future.
.



 



 



 

 


 
 
 
 
 
 





. Overview
During development, the backend was powered by JSON-Server, which automatically displays a default homepage at http://localhost:8000. This page shows endpoint lists such as:
•	/users
•	/students
Although this behavior is normal, it was not desired for our project interface.
________________________________________
2. Problem Identified
JSON-Server automatically serves a homepage interface whenever it does not find a public/index.html file.
This caused the browser to display the default JSON-Server landing page instead of a blank or customized screen.
Example of unwanted output:
“JSON Server/users – 1 item /students – 2 items”
________________________________________
3. Implemented Solution
To override JSON-Server’s automatic homepage, we created an empty public/index.html file inside the frontend project.
Steps Taken
1.	Created a new folder named public inside the frontend directory.
2.	Inside the public folder, added an empty file named:
3.	index.html
4.	JSON-Server now detects the custom folder and stops serving its default UI page.
________________________________________
4. Outcome
•	The unwanted JSON-Server homepage no longer appears.
•	Backend API routes continue functioning normally (/users, /students, etc.).
•	The frontend application now controls what is displayed at the root level.
•	This improvement ensures a cleaner environment and avoids confusion during development.
________________________________________
5. Conclusion
The issue was caused by JSON-Server’s default behavior.
Adding an empty public/index.html resolved the problem fully without affecting backend routes or frontend functionality.
If needed, this setup can also support custom UI pages in the future.
________________________________________
If you want, I can also prepare this report formatted as a PDF, PowerPoint, or DOCX for submission.

