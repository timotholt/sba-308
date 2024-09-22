//============================================================================
// SBA-308
//
// The following objects are from the assignment and must not be changed.
//============================================================================

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner (student) submission data, which is an array of objects.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
  
// The desired output this program should generate. I have renamed the function appropriately.
function getDesiredLearnerData(course, ag, submissions) {

  // here, we would process this data to achieve the desired result.
  const desiredResult = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },

    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return desiredResult;
}

//============================================================================
//
// SOLUTION FOR SBA-308 STARTS HERE
//
//============================================================================

//============================================================================
// Save and display the application start time (used to determine if an
// assignment is due or not) 
//============================================================================

const applicationStartTimestamp = Date.now();                             // Unix time
const applicationStartDatestamp = new Date(applicationStartTimestamp);    // ASCII string

console.log(`Application started at ${applicationStartDatestamp} (${applicationStartTimestamp} Unix time).`);
console.log(`This time is used to determine if an assignment is due.`);
console.log('Note: Assuming all assignent times in the sample data are in GST and converting them to local time.\n');

//============================================================================
// Application specific helper functions
//
// 10% of grade: Use functions to handle repeated tasks.
//============================================================================

const validDate = (dateString) => !isNaN(Date.parse(dateString));
const validNumber = (n) => (typeof n === 'number');
const getTimestamp = (dateString) => Date.parse(dateString);

// // Validate Course ID
// Long winded (was one line but need to use a try/catch for 5% grade)
function validCourseId(courseId) {
  
  // Course ID has to be a number
  const validResult = Number(CourseInfo.id) === Number(courseId);

  // Use a try/catch for 5% of the grade
  try {
    if (!validResult)
      throw `Course ID ${courseId} isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  };
}

// Validate Course ID in the assignment group
// Long winded (was one line but need to use a try/catch for 5% grade)
function validAssignmentGroupCourseId(assignmentGroup) {
  
  const validResult = validCourseId(assignmentGroup.course_id);

  // Use a try/catch for 5% of the grade
  try {
    // Using two if statements is 10% of the grade.  This is if #1
    if (!validResult)
      throw `Course ID ${assignmentGroup.course_id} in assignmentGroup isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  }
};

// Validate individual assignmements to an ID
function validAssignmentId (assignmentGroup, assignmentId) {

  let validResult = false;

  // Use two different types of loops for 5% of the grade (while loop is #1)
  let i = 0;
  while (i < assignmentGroup.assignments.length) {

    // Debug message
    console.log(`comparing ${Number(assignmentGroup.assignments[i].id)} to ${Number(assignmentId)}`);

    // Using two if statements is 10% of the grade.  This is if #2
    if (Number(assignmentGroup.assignments[i].id) === Number(assignmentId)) {
      validResult = true;

      // 3% of the grade: Utilize at least one loop control keyword such as break or continue.
      break;
    }

    // Bump index
    i++;
  }
  
  return (validResult);
};

//==================================================================
// Validate the courseInfo. Requirements are:
// 1. courseInfo is an object
// 2. courseInfo.id is an number
// 3. courseInfo.id is greater than zero
// 3. courseInfo.name is a string
// 4. courseInfo has exactly 2 keys
//
// Returns true if it passes validation()
//==================================================================

function validateCourseInfo(courseInfo)
{
  try {
    if (typeof courseInfo !== 'object')
      throw `CourseInfo isn't an object`;
    else if (typeof courseInfo.id !== 'number')
      throw `CourseInfo.id isn't present or isn't a number`;
    else if (!courseInfo.id > 0)
      throw `CourseInfo.id is a number less than zero`;
    else if (typeof courseInfo.name !== 'string')
      throw `CourseInfo.name isn't present or isn't a string`;
    else if (Object.keys(courseInfo).length != 2)
      throw `CourseInfo must have exactly 2 keys (entries)`;
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Validate assignemntGroup. Requirements are:
//
//  1. assignmentnGroup is an object
//  2. assignmentGroup.id is a number
//  3. assignmentGroup.id > 0
//  4. assignmentGroup.name is a string
//  5. assignmentGroup.courseId is a number
//  6. assignmentGroup.courseId > 0
//  7. assignmentGroup.courseId is in courseInfo
//  8. assignmentGroup.group_weight is a number
//  9. assignmentGroup.group_weight > 0
// 10. assignmentGroup.assignments is an array
// 11. assignmentGroup has exactly 5 keys/properties
// 
// 12. assignmentGroup.assignments[].id is a number
// 13. assignmentGroup.assignments[].id > 0
// 14. assignmentGroup.assignments[].name is a string
// 15. assignmentGroup.assignments[].due_at is a string
// 16. assignmentGroup.assignments[].due_at is a valid date
// 17. assignmentGroup.assignments[].points_possible is a number
// 18. assignmentGroup.assignments[].points_possible > 1
// 19. assignmentGroup.assignments[] each has exactly 4 keys
//==================================================================

function validateAssignmentGroup(courseInfo, assignmentGroup)
{
  try {

    // Validate main assignment group
    if (typeof assignmentGroup !== 'object')
      throw `AssignmentGroup isn't an object`;
    else if (typeof assignmentGroup.id !== 'number')
      throw `AssignmentGroup.id isn't present or isn't a number`;
    else if (!assignmentGroup.id > 0)
      throw `AssignmentGroup.id is a number less than zero`;
    else if (typeof assignmentGroup.name !== 'string')
      throw `AssignmentGroup.name isn't present or isn't a string`;
    else if (typeof assignmentGroup.course_id !== 'number')
      throw `AssignmentGroup.course_id isn't a number`;
    else if (assignmentGroup.course <= 0)
      throw `AssignmentGroup.course_id is a number <= 0`;
    else if (assignmentGroup.course_id!= courseInfo.id)
      throw `AssignmentGroup.course_id doesn't match course ID in courseInfo`;
    else if (typeof assignmentGroup.group_weight !== 'number')
      throw `AssignmentGroup.group_weight isn't a number`;
    else if (assignmentGroup.group_weight <= 0)
      throw `AssignmentGroup.group_weight is a number <= 0`;
    else if (!Array.isArray(assignmentGroup.assignments))
      throw `AssignmentGroup.assignments is not an array`;
    else if (Object.keys(AssignmentGroup).length != 5)
      throw `AssignmentGroup must have exactly 5 keys (entries)`;

    // Validate individual assignment entries
    for (let i = 0; i < assignmentGroup.assignments.length; i++)
    {
      if (typeof assignmentGroup.assignments[i].id !== `number`)
        throw `AssignmentGroup.assignment[#${i}.id] isn't a number`;
      else if (assignmentGroup.assignments[i].id <= 0)
        throw `AssignmentGroup.assignment[#${i}.id] <= 0`;
      else if (typeof assignmentGroup.assignments[i].name !== `string`)
        throw `AssignmentGroup.assignment[#${i}.name] isn't a string`;
      else if (typeof assignmentGroup.assignments[i].due_at !== `string`)
        throw `AssignmentGroup.assignment[#${i}.due_at] isn't a string`;
      else if (!validDate(AssignmentGroup.assignments[i].due_at))
        throw `AssignmentGroup.assignment[#${i}.due_at] isn't a valid date`;
      else if (typeof assignmentGroup.assignments[i].points_possible !== `number`)
        throw `AssignmentGroup.assignment[#${i}.points_possible] isn't a number`;
      else if (assignmentGroup.assignments[i].points_possible <= 0)
        throw `AssignmentGroup.assignment[#${i}.points_possible] <= 0`;
      else if (Object.keys(AssignmentGroup.assignments[i]).length != 4)
        throw `AssignmentGroup.assignment[#${i}] must have exactly 4 keys (entries)`;
    }
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Validate SubmissionData. Requirements are:
// 
//  1. LaernerSubmissions is an array
//  2. LearnerSubmissions[].learner_id is a number
//  3. LearnerSubmissions[].learner_id > 0
//  4. LearnerSubmissions[].submission is an object
//  5. LearnerSubmissions[] has exactly 3 keys
//
//  6. LearnerSubmissions[].submission.submitted_at is a string
//  7. LearnerSubmissions[].submission.submitted_at is a valid date
//  8. LearnerSubmissions[].score is a number
//  9. LearnerSubmissions[].submission has exactly 2 keys
//==================================================================

function validateSubmissionData(learnerSubmisisons)
{
  try {

    // Validate learnerSubmissions
    if (!Array.isArray(learnerSubmisisons))
      throw `LearnerSubmisisons isn't an array`;

    for (let i = 0; i < learnerSubmisisons.length; i++) {
      if (typeof learnerSubmisisons[i].learner_id !== 'number')
        throw `learnerSubmisisons[${i}].learner_id isn't a number`;
      else if (learnerSubmisisons[i].learner_id <= 0)
        throw `learnerSubmisisons[${i}].learner_id <= 0`;
      else if (typeof learnerSubmisisons[i].submission !== 'object')
        throw `learnerSubmisisons[${i}].submission isn't an object`;
      else if (Object.keys(learnerSubmisisons[i]).length != 3)
        throw `learnerSubmisisons[#${i}] must have exactly 3 keys (entries)`;
      else if (typeof learnerSubmisisons[i].submission.submitted_at !== 'string')
        throw `learnerSubmisisons[${i}].submitted_at isn't a string`;
      else if (!validDate(learnerSubmisisons[i].submission.submitted_at))
        throw `learnerSubmisisons[${i}].submitted_at isn't a valid date`;
      else if (typeof learnerSubmisisons[i].submission.score !== 'number')
        throw `learnerSubmisisons[${i}].submission.score isn't a number`;
      else if (Object.keys(learnerSubmisisons[i].submission).length != 2)
        throw `learnerSubmisisons[#${i}].submission must have exactly 2 keys (entries)`;
    }
  }
  catch (error) {
    console.log(error);
    return (false);
  }
  return (true);
}

//==================================================================
// Test block
//
// This test block verifies that the helper functions work.  This
// block can be commented out.
//==================================================================

function verifyHelperFunctions() {
  // Verify course ID
  let courseId = '451';
  console.log(`courseID ${courseId} in list = ${validCourseId(courseId)}`);

  // Verify date
  let dateString1 = "2024-09-12";
  let dateString2 = "2024-09-12 00:00:00";
  let dateString3 = "HELL WORLD";

  // Verify past due function
  console.log(`dateString ${dateString1} is valid = ${validDate(dateString1)}, timestamp = ${getTimestamp(dateString1)}, past due = ${nowPastDue(dateString1)}`);
  console.log(`dateString ${dateString2} is valid = ${validDate(dateString2)}, timestamp = ${getTimestamp(dateString2)}, past due = ${nowPastDue(dateString2)}`);
  console.log(`dateString ${dateString3} is valid = ${validDate(dateString3)}, timestamp = ${getTimestamp(dateString3)}, past due = ${nowPastDue(dateString3)}`);

  // Verify course_id in Assignments
  const assignment1 = {
    course_id: "51"
  };
  let assignment2 = {
    course_id: `451`
  };
  console.log(`courseID ${assignment1.course_id} is valid = ${validAssignmentGroupCourseId(assignment1)}`);
  console.log(`courseID ${assignment2.course_id} is valid = ${validAssignmentGroupCourseId(assignment2)}`);

  // Verify an assignment # is in the assignment group
  for (let i = -2; i < 6; i++)
  console.log(`assignment id ${i} is valid = ${validAssignmentId(AssignmentGroup, i)}`);
}

// Build a list of unique individual learners from the learner submissions
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfLearners(LearnerSubmissions, quiet = false) {
  
  let listOfLearners = [];

  // go through the submisison list, add it if not on the list
  // Use two different types of loops for 5% of the grade (this for loop is #2)

  for (const LearnerSubmission of LearnerSubmissions) {
    if (listOfLearners.indexOf(LearnerSubmission.learner_id) < 0)

      // Create and/or manipulate arrays and objects = 10% of grade.
      listOfLearners.push(LearnerSubmission.learner_id);
  }

  // For testing the if statement below
  // listOfLearners = [ 120, 240, 11, 9, 2 ];
  // listOfLearners = [];

  // Sort the list
  listOfLearners.sort((a, b) => a - b);

    // List can't be empty.  We don't use throw/catch here cause it's messy looking
  if (!quiet) {
    console.log(listOfLearners.length === 0 ?
      `No learners found in learner submissionslist!` :
      `${listOfLearners.length} learners submitted assignments. Their IDs are ${listOfLearners}\n`);
  }

  // Return list
  return (listOfLearners);
}

// Build a list of unique assignments
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfAssignmentsDue(ag, quiet = false) {

  if (!quiet)
    console.log(`Below is a list of assignments and their due dates:`);
  
  let listOfAssignmentsDue = [];

  // go through the assignment group, add it if not on the list
  // for of loop = the 2nd type of loop required that is 
  for (const a of ag.assignments) {

    let dueDate = new Date(a.due_at);

    // For testing the line below
    // dueDate = 'laksjdf;lakjsdfl;akjsdflkjadfs'
    
    // Check if due date is bogus
    if (!validDate(dueDate)) {
      if (!quiet)
        console.log(`Due date ${dueDate} is not valid.`);
    }
    // If due date is legit, and it's due, add it to the assignment due list
    else {
      if (!quiet)
        console.log(`Assignment ${a.id} is due at ${dueDate}`);

      if (applicationStartTimestamp >= getTimestamp(dueDate))
        if (listOfAssignmentsDue.indexOf(a.id) < 0)

          // Create and/or manipulate arrays and objects = 10% of grade.
          listOfAssignmentsDue.push(a.id);
    }
  }

  // For testing the sorting and console log statements below
  // listOfAssignments = [ 120, 240, 11, 9, 2 ];
  // listOfAssignments = [];

  // Sort the list
  listOfAssignmentsDue.sort((a, b) => a - b);

  // List can't be empty.  We don't use throw/catch here cause it's messy looking
  if (!quiet) {
    console.log(``);
    console.log(listOfAssignmentsDue.length === 0 ?
      `No assignments found in assignment group!` :
      `Based upon the application start time of ${applicationStartDatestamp},\n`+
      `the following assigments are currently due: ${listOfAssignmentsDue}\n`);
  }
  
  // Return list
  return (listOfAssignmentsDue);
}

//============================================================================
// getLearnerData()
//
// The bulk of the work is done here!
//============================================================================

function getLearnerData(CourseInfo, assignmentGroup, learnerSubmissions)
{ 
  // First of all, validate course ID
  if (!validAssignmentGroupCourseId(assignmentGroup)) {
    console.log(`ERROR: Invalid course ID in the assignment group`);
  }

  // The output of this function is stored in this array of objects
  resultList = [];

  // Get list of students (learners)
  let learnerList = getListOfLearners(LearnerSubmissions);

  // Get list of assignments that are due now
  let dueAssignments = getListOfAssignmentsDue(AssignmentGroup);

  // For each student (learner)
  for (l of learnerList) {

    // Log the learner #
    console.log(`Processing submissions for learner ID ${l}`);

    // Reset the score board
    let totalPossiblePoints = 0;
    let totalEarnedPoints = 0;

    // Start to build learnerData
    let learnerData = {};

    // Add the assignment ID and plug in an average score of 0 to begin with
    learnerData['id'] = l;
    learnerData['avg'] = 0;
    // console.log(learnerData);

    // For each due assignment
    for (d of dueAssignments) {

      // console.log(`+-Processing Learner ${l} assigment ${d}`);

      // Find assignment
      const a = assignmentGroup.assignments.find(obj => obj.id === d);
      // console.log(`Assignment = ${a}`);

      // If we found it
      if (a != undefined) {

        // Assignment exists, bump up the total possible score
        totalPossiblePoints += a.points_possible;

        // Now check if the student did the assignment
        const s = learnerSubmissions.find(obj => obj.learner_id === l && obj.assignment_id === d)
        // console.log(`Submission = ${s}`);

        // By default the assignment is worth 100% (no penalty)
        let assignmentPenalty = 0;

        // If the student submitted the assignment
        if (s != undefined) {
          // console.log(s);

          // If the assignment is late, assign a penalty . . .
          if (getTimestamp(s.submission.submitted_at) > getTimestamp(a.due_at)) {
            console.log(`&nbsp;&nbsp;Learner ${l}'s assignment ${d} is late!`);

            // Penalty = 10% of maximum points
            assignmentPenalty = a.points_possible * 0.10;
          }

          // Calculate score (with any penalties), rounded down to 3 decimal places
          let netAssignmentScore = Number((s.submission.score - assignmentPenalty).toFixed(3));

          // Bump up the # of points earned
          totalEarnedPoints += netAssignmentScore;

          // Make sure points possible > 0
          if (a.points_possible > 0) {
            let submissionAve = Number((netAssignmentScore / a.points_possible).toFixed(3));

            // Add it to learner data, round down to 3 decimal places
            learnerData[d] = submissionAve;

            // Write it to the console
            console.log(`&nbsp;&nbsp;Learner ${l} earned ${netAssignmentScore} points out of a maximum of ${a.points_possible} on assignment ${d}`);
            console.log(`&nbsp;&nbsp;Learner ${l}'s average for assignment ${d} is ${submissionAve} (${netAssignmentScore} / ${a.points_possible} = ${submissionAve})`);
          }
          else
            console.log(`Points possible on an assignment must be > 0`);
        }
      }
    }

    // Output summary for this learner
    console.log(`&nbsp;&nbsp;Learner ${l} earned a total of ${totalEarnedPoints} points out of a maximum of ${totalPossiblePoints} for assignenments ${dueAssignments}`);

    // Calculate average and save it
    let average = Number((totalEarnedPoints / totalPossiblePoints).toFixed(3));
    learnerData['avg'] = average;
    console.log(`&nbsp;&nbsp;Learner ${l} average is ${average} (${totalEarnedPoints} / ${totalPossiblePoints} = ${average})\n`);

    // Display data
    // console.log(`--Learner ${l}'s data:`);
    // console.log(learnerData);

    // Add learner data to result list
    resultList.push(learnerData);
    
    // Current result list
    // console.log(`--Current result list after this pass: (NOTE: only valid if you single step through the debugger)`);
    // console.log(`If you run instead of single step, you will see the full results here for both passes.`);
    // console.log('https://stackoverflow.com/questions/11118758/bug-in-console-log');
    // console.log(`Result List # rows = ${resultList.length}`);
    // console.log(resultList);
  }

  // Return result list
  return(resultList);
}

//==========================================================================
// Here is the main() of the app... if there was such a thing in js.
//==========================================================================

// You can verify that the helper functions work by uncommenting this below.
// verifyHelperFunctions();

// Validate all the data structures
validateCourseInfo(CourseInfo);
validateAssignmentGroup(CourseInfo, AssignmentGroup);
validateSubmissionData(LearnerSubmissions);

debugger;
const actualResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
const desiredResult = getDesiredLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//==========================================================================
// NOTE that we update the HTML page dynamically in displayhtml.js, so it's
// expected that displayhtml.js is included AFTER scripts.js in index.html
//==========================================================================

// We are done!
console.log(`\nApplication complete.`);
