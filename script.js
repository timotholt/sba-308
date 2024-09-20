console.log(`Hello from script.js`);

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
  
  // The provided learner submission data.
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
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    const result = [
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
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);


//=======================================================================================
// This is first line of code of the actual application
//=======================================================================================

// Save the start time 
const applicationStartTimestamp = Date.now();
const applicationStartDatestamp = new Date(applicationStartTimestamp);

const validDate = (dateString) => !isNaN(Date.parse(dateString));
const getTimestamp = (dateString) => Date.parse(dateString);
// const nowPastDue = (dateString) => (getCurrentTimestamp() >= getTimestamp(dateString));

//=======================================================================================
// Application specific helper functions
//
// 10% of grade: Use functions to handle repeated tasks.
//=======================================================================================


// Validate Course ID
// Long winded (was one line but need to use a try/catch for 5% grade)
function validCourseId(courseId) {
  
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

  // Use two different types of loops for 5% of the grade (for loop is #1)
  for (let i = 0; i < assignmentGroup.assignments.length; i++) {

    // Debug message
    console.log(`comparing ${Number(assignmentGroup.assignments[i].id)} to ${Number(assignmentId)}`);

    // Using two if statements is 10% of the grade.  This is if #2
    if (Number(assignmentGroup.assignments[i].id) === Number(assignmentId)) {
      validResult = true;

      // 3% of the grade: Utilize at least one loop control keyword such as break or continue.
      break;
    }
  }
  
  return (validResult);
};

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
function getListOfLearners(LearnerSubmissions) {
  let listOfLearners = [];

  // go through the submisison list, add it if not on the list
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
  console.log(listOfLearners.length === 0 ?
    `No learners found in learner submissionslist!` :
    `List of learners = ${listOfLearners}`);

  // Return list
  return (listOfLearners);
}

// Build a list of unique assignments
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfAssignmentsDue(ag) {
  let listOfAssignmentsDue = [];

  // go through the assignment group, add it if not on the list
  for (const a of ag.assignments) {

    let dueDate = new Date(a.due_at);

    // For testing the line below
    // dueDate = 'laksjdf;lakjsdfl;akjsdflkjadfs'
    
    // Check if due date is bogus
    if (!validDate(dueDate))
      console.log(`Due date ${dueDate} is not valid.`);

    // If due date is legit, and it's due, add it to the assignment due list
    else {
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
  console.log(listOfAssignmentsDue.length === 0 ?
    `No assignments found in assignment group!` :
    `List of assignments due on ${applicationStartDatestamp} = ${listOfAssignmentsDue}`);

  // Return list
  return (listOfAssignmentsDue);
}

//===================================
// Actual code
//===================================
{ 
  // Results
  resultList = [];

  // Interator through all assignents and invoke callback function
  function iterateAssignments(assignmentGroup, callbackFunction, parametersToCallbackFunction) {

    // Go through assignment list
    for (const assignment of assignmentGroup.assignments) {
      console.log(`Iterating assignment ${assignment.id}`);

      // If callback, then invoke it
      if (callbackFunction)
        callbackFunction.apply(this, assignment, parametersToCallbackFunction);
    }
  }

  // Interator through all students and invoke callback function
  function iterateStudents(students, callbackFunction, parametersToCallbackFunction) {

    // Go through assignment list
    for (const student of students) {
      console.log(`Iterating student id ${student}`);

      // If callback, then invoke it
      if (callbackFunction)
        callbackFunction.apply(this, student, parametersToCallbackFunction);
    }
  }

  // Callback functions
  function assignmentCallback(assignment) {
    console.log(`Callback: assignment ID = ${assignment.id}`);
  }

  function studentCallback(studentId) {
    console.log(`Callback: student ID = ${studentId}`);

    resultList.push( { "id": studentId });
  }
  
  function iterateDueAssignments(assignmentGroup, dueAssignments, callbackFunction, parametersToCallbackFunction)
  {
    // Go through assignment list
    for (n in dueAssignments) {
      callbackFunction.apply(assignmentGroup, assignmentGroup.assignments[n].id, parametersToCallbackFunction);
    } 
  }

  function processAssignments(assignmentGroup, dueAssignments, learnerList, learnerSubmissions) {

  console.log(`${dueAssignments} ${learnerList}`);

  // For each student (learner)
  for (l of learnerList) {

    // Reset the score board
    let totalPossiblePoints = 0;
    let totalEarnedPoints = 0;
  
    // For each due assignment
    for (d of dueAssignments) {

      console.log(`Processing assignment ${d} for learner ${l}`);

      // Find assignment
      const result = assignmentGroup.assignments.find(obj => obj.id === d);
      console.log(`result = ${result}`);

      // If we found it
      if (result != undefined) {

          // Bump up the total possible score
          totalPossiblePoints += result.points_possible;

          // Now check if the student did the assignment
          const result2 = learnerSubmissions.find(obj => obj.learner_id === l && obj.assignment_id === d)
          console.log(`result2 = ${result2}`);

          // If the student submitted the assignment
          let assignmentValue = 1;

          if (result2 != undefined) {
            console.log(result2);

            if (getTimestamp(result2.submission.submitted_at) > getTimestamp(result.due_at)) {
              console.log(`assignment is late!`);

              // Deduct 10%
              assignmentValue = 0.9;
            }

            // Bump up the # of points earned
            totalEarnedPoints += (result2.submission.score * assignmentValue);
            console.log(`Total earned points for learner ${l} = ${totalEarnedPoints}`);
          }
        }

        // Check to see if the student actually did the assignment
        // for (a = 0; a < learnerSubmmissions)
      }

      console.log(`Total points possible for learner ${l} is ${totalPossiblePoints}`);
    }

  }

  // verifyHelperFunctions();

  //=========================================================================
  // Display the start time of this batch
  //=========================================================================

  console.log(`Application started at = ${applicationStartDatestamp} (${applicationStartTimestamp} Unix time)`);
  console.log(`This time is used to determine if an assignment is due`);

  // Get list of students (learners)
  let learnerList = getListOfLearners(LearnerSubmissions);
  console.log(`learner list = ${learnerList}`);

  // Get list of assignments that are due now
  let dueAssignments = getListOfAssignmentsDue(AssignmentGroup);
  console.log(`Due assignment list = ${dueAssignments}`);

  debugger;

  // Process assignments that are due
  processAssignments(AssignmentGroup, dueAssignments, learnerList, LearnerSubmissions);

  debugger;
  console.log(resultList);
}

//===================================
// We are done!
//===================================

console.log(`Goodbye from script.js`);
