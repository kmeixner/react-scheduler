## React Scheduler App ##

* This is a react scheduler application given to me as an assignment for a job interview. 
* It is implemented using React and Redux.

**The app layout requirements pic:**

![App layout picture](https://raw.githubusercontent.com/kmeixner/react-scheduler/master/client/AppLookInstructions.jpg)

**The currently implemented functionality is as follows:**

* Level 1: Self contained .zip file, or link to github code repository containing Javascript and package configuration files to start an ExpressJS server, which serves no content
* Level 2: Server serves a ReactJS page which is static, but similar in shape to the above. Components are preferred a single render function building everything.
* Level 3: ReactJS page where each X above is replaced with some HTML control allowing a staff member to be selected for a slot.
* Level 4: ReactJS page displays all staff in the Load section, with their number of slots correct for each day, and the correct total for the week
* Level 5: ReactJS page prevents – or displays warning – when a staff member is in consecutive lunch slots on the same day.
* Level 6: ReactJS page prevents – or displays warning – when a staff member has more than 2 shifts per day
* Level 7: ReactJS page prevents – or displays warning – when a staff member has more than 7 shifts per week
* Level 8: ReactJS page prevents – or displays warning – when a staff member is selected to be in two places at once. (eg: UpStairs and Parking Lot)

**The following functionality has not yet been implemented (due to lack of time):**

* Level 9: ReactJS page allows randomised population of currently empty shifts, respecting the above rules. At this level, clearing all shifts should be supported too.
* Level 10: ReactJS page reports how many staff members are needed to fill all shifts, respecting the above rules.
* Level 11: ReactJS page stores current progress at the server (globally)
* Level 12: ReactJS page can retrieve current state when re-opened (globally)
* Level 13: ReactJS page supports undo/redo

**Notes about my implementation:**

* When a shift for a day for an employee has one or more errors, the number of daily shifts for that employee will appear in bold and red
* When there are too many shifts scheduled in a week for an employee, the number of weekly shifts will appear in bold and red
* A number of shifts displayed in bold and red will display the error(s) as a caption if you hover the mouse over it for a few seconds
* Note: In regards to scheculing shifts for lunch, I assumed that these were working shifts (not time off for lunch) so that these will be counted in the shift for day total
* Automated tests have not been implemented yet
* Aesthetics are basic, the focus was on functionality, not aesthetics
* It is likely that the implementation could use improvements, but the goal of this was to get a working application up quickly that met the given requirements rather than perfect code.

**How to use:**

* Ensure that you have NodeJS installed on your environment
* Step 1: run "node server.js" from the root directory of the application
* Step 2: run "npm start" from the 'client/src' directory of the application

**Application Structure:**

* ../server.js - basic minimal backend server
* ./src/index.js - contains code to instantiate the main App and all the Redux code to manage the application state
* ./src/App.css - contains App styling including a CSS grid definition to structure the main App components
* ./src/App.js - contains the main App 
* ./src/SelectStaffMember.js - a React component to create an employee selection drop-down for a user to assign a shift
* ./src/ShiftLoadForDay.js - a React component to display the shift load for an employee for a weekday (and any daily scheduling errors)
* ./src/ShiftLoadForWeek.js - a React component to display the weekly shift load for an employee (and any weekly scheduling errors)
* Other stuff: unmodified boilerplate code generated by the React 'create-react-app' command
