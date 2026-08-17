// Initial Seed Demo Data for LocalStorage

export const ADMIN_ACCOUNT = {
  id: "ADMIN001",
  name: "Portal Admin",
  email: "admin@portal.com",
  password: "admin123",
  role: "admin"
};

export const DEFAULT_STUDENTS = [
  {
    id: "STU001",
    name: "Rahul Sharma",
    className: "8-A",
    rollNumber: "12",
    bloodGroup: "O+",
    email: "rahul@example.com",
    phone: "9876543210",
    password: "student123",
    role: "student"
  },
  {
    id: "STU002",
    name: "Riya Patil",
    className: "7-B",
    rollNumber: "09",
    bloodGroup: "A+",
    email: "riya@example.com",
    phone: "9876543215",
    password: "student123",
    role: "student"
  }
];

export const DEFAULT_PARENTS = [
  {
    id: "PAR001",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "9876543211",
    password: "parent123",
    role: "parent"
  },
  {
    id: "PAR002",
    name: "Suresh Patil",
    email: "suresh@example.com",
    phone: "9876543212",
    password: "parent123",
    role: "parent"
  }
];

export const DEFAULT_RELATIONSHIPS = [
  {
    studentId: "STU001",
    parentId: "PAR001",
    relationship: "Father",
    customRelationship: ""
  },
  {
    studentId: "STU002",
    parentId: "PAR002",
    relationship: "Father",
    customRelationship: ""
  }
];

export const DEFAULT_ATTENDANCE = {
  STU001: [
    { id: "1", date: "01 Aug", status: "Present" },
    { id: "2", date: "02 Aug", status: "Present" },
    { id: "3", date: "03 Aug", status: "Absent" },
    { id: "4", date: "04 Aug", status: "Present" },
    { id: "5", date: "05 Aug", status: "Present" },
    { id: "6", date: "06 Aug", status: "Present" },
    { id: "7", date: "07 Aug", status: "Present" },
    { id: "8", date: "08 Aug", status: "Present" },
    { id: "9", date: "09 Aug", status: "Present" },
    { id: "10", date: "10 Aug", status: "Present" }
  ],
  STU002: [
    { id: "1", date: "01 Aug", status: "Present" },
    { id: "2", date: "02 Aug", status: "Present" },
    { id: "3", date: "03 Aug", status: "Present" },
    { id: "4", date: "04 Aug", status: "Present" },
    { id: "5", date: "05 Aug", status: "Absent" },
    { id: "6", date: "06 Aug", status: "Present" },
    { id: "7", date: "07 Aug", status: "Present" },
    { id: "8", date: "08 Aug", status: "Present" }
  ]
};

export const DEFAULT_RESULTS = {
  STU001: [
    { id: "1", subject: "Math", marks: 85, maxMarks: 100 },
    { id: "2", subject: "Science", marks: 90, maxMarks: 100 },
    { id: "3", subject: "English", marks: 80, maxMarks: 100 }
  ],
  STU002: [
    { id: "1", subject: "Math", marks: 92, maxMarks: 100 },
    { id: "2", subject: "Science", marks: 88, maxMarks: 100 },
    { id: "3", subject: "English", marks: 94, maxMarks: 100 }
  ]
};

// Initialize localStorage with seed data if empty
export const initStorage = () => {
  if (!localStorage.getItem("portal_students")) {
    localStorage.setItem("portal_students", JSON.stringify(DEFAULT_STUDENTS));
  }
  if (!localStorage.getItem("portal_parents")) {
    localStorage.setItem("portal_parents", JSON.stringify(DEFAULT_PARENTS));
  }
  if (!localStorage.getItem("portal_relationships")) {
    localStorage.setItem("portal_relationships", JSON.stringify(DEFAULT_RELATIONSHIPS));
  }
  if (!localStorage.getItem("portal_attendance")) {
    localStorage.setItem("portal_attendance", JSON.stringify(DEFAULT_ATTENDANCE));
  }
  if (!localStorage.getItem("portal_results")) {
    localStorage.setItem("portal_results", JSON.stringify(DEFAULT_RESULTS));
  }
};

// Getter functions
export const getStudents = () => {
  initStorage();
  const list = JSON.parse(localStorage.getItem("portal_students") || "[]");
  return list.map((s) => ({
    ...s,
    bloodGroup: s.bloodGroup || "O+",
    password: s.password || "student123"
  }));
};

export const getParents = () => {
  initStorage();
  const list = JSON.parse(localStorage.getItem("portal_parents") || "[]");
  return list.map((p) => ({
    ...p,
    password: p.password || "parent123"
  }));
};

export const getRelationships = () => {
  initStorage();
  return JSON.parse(localStorage.getItem("portal_relationships") || "[]");
};

export const getAttendanceRecords = (studentId) => {
  initStorage();
  const all = JSON.parse(localStorage.getItem("portal_attendance") || "{}");
  return all[studentId] || [
    { id: "1", date: "01 Aug", status: "Present" },
    { id: "2", date: "02 Aug", status: "Present" },
    { id: "3", date: "03 Aug", status: "Absent" },
    { id: "4", date: "04 Aug", status: "Present" }
  ];
};

export const calculateAttendancePercentage = (records) => {
  if (!records || records.length === 0) return 0;
  const presentCount = records.filter((r) => r.status === "Present").length;
  return Math.round((presentCount / records.length) * 100);
};

export const getResultRecords = (studentId) => {
  initStorage();
  const all = JSON.parse(localStorage.getItem("portal_results") || "{}");
  return all[studentId] || [
    { id: "1", subject: "Math", marks: 85, maxMarks: 100 },
    { id: "2", subject: "Science", marks: 90, maxMarks: 100 },
    { id: "3", subject: "English", marks: 80, maxMarks: 100 }
  ];
};

export const calculateResultStats = (records) => {
  if (!records || records.length === 0) return { total: 0, percentage: 0, grade: "N/A" };
  const totalMarks = records.reduce((acc, curr) => acc + Number(curr.marks), 0);
  const totalMax = records.reduce((acc, curr) => acc + Number(curr.maxMarks), 0);
  const percentage = Math.round((totalMarks / totalMax) * 100);
  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";

  return { totalMarks, totalMax, percentage, grade };
};

// Relationship Helper functions
export const getParentForStudent = (studentId) => {
  const relationships = getRelationships();
  const rel = relationships.find((r) => r.studentId === studentId);
  if (!rel) return null;

  const parents = getParents();
  const parent = parents.find((p) => p.id === rel.parentId);
  if (!parent) return null;

  const displayRelationship = rel.relationship === "Other" ? rel.customRelationship || "Guardian" : rel.relationship;

  return {
    ...parent,
    relationship: displayRelationship,
    rawRelationship: rel.relationship
  };
};

export const getStudentForParent = (parentId) => {
  const relationships = getRelationships();
  const rel = relationships.find((r) => r.parentId === parentId);
  if (!rel) return null;

  const students = getStudents();
  const student = students.find((s) => s.id === rel.studentId);
  if (!student) return null;

  const displayRelationship = rel.relationship === "Other" ? rel.customRelationship || "Guardian" : rel.relationship;

  return {
    ...student,
    relationship: displayRelationship
  };
};

export const generateNextStudentId = () => {
  const students = getStudents();
  let maxId = 0;
  students.forEach((s) => {
    const match = s.id?.match(/STU(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  });
  const nextNum = maxId + 1;
  return `STU${String(nextNum).padStart(3, '0')}`;
};

export const generateNextParentId = () => {
  const parents = getParents();
  let maxId = 0;
  parents.forEach((p) => {
    const match = p.id?.match(/PAR(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  });
  const nextNum = maxId + 1;
  return `PAR${String(nextNum).padStart(3, '0')}`;
};

// Admin Operations
export const addStudentAndParent = (studentData, parentData, relationshipData) => {
  const students = getStudents();
  const parents = getParents();
  const relationships = getRelationships();

  // Save student (update if exists, or push)
  const existingStudentIndex = students.findIndex((s) => s.id === studentData.id);
  if (existingStudentIndex >= 0) {
    students[existingStudentIndex] = { ...studentData, role: "student" };
  } else {
    students.push({
      ...studentData,
      role: "student"
    });
  }

  // Check if parent already exists or create new
  const existingParentIndex = parents.findIndex((p) => p.id === parentData.id);
  if (existingParentIndex >= 0) {
    parents[existingParentIndex] = { ...parentData, role: "parent" };
  } else {
    parents.push({
      ...parentData,
      role: "parent"
    });
  }

  // Save relationship (update if exists, or push)
  const existingRelIndex = relationships.findIndex((r) => r.studentId === studentData.id);
  if (existingRelIndex >= 0) {
    relationships[existingRelIndex] = {
      studentId: studentData.id,
      parentId: parentData.id,
      relationship: relationshipData.relationship,
      customRelationship: relationshipData.customRelationship || ""
    };
  } else {
    relationships.push({
      studentId: studentData.id,
      parentId: parentData.id,
      relationship: relationshipData.relationship,
      customRelationship: relationshipData.customRelationship || ""
    });
  }

  // Seed default attendance and result for new student
  const attendance = JSON.parse(localStorage.getItem("portal_attendance") || "{}");
  const results = JSON.parse(localStorage.getItem("portal_results") || "{}");

  if (!attendance[studentData.id]) {
    attendance[studentData.id] = [
      { id: "1", date: "01 Aug", status: "Present" },
      { id: "2", date: "02 Aug", status: "Present" },
      { id: "3", date: "03 Aug", status: "Absent" },
      { id: "4", date: "04 Aug", status: "Present" }
    ];
  }

  if (!results[studentData.id]) {
    results[studentData.id] = [
      { id: "1", subject: "Math", marks: 85, maxMarks: 100 },
      { id: "2", subject: "Science", marks: 90, maxMarks: 100 },
      { id: "3", subject: "English", marks: 80, maxMarks: 100 }
    ];
  }

  localStorage.setItem("portal_students", JSON.stringify(students));
  localStorage.setItem("portal_parents", JSON.stringify(parents));
  localStorage.setItem("portal_relationships", JSON.stringify(relationships));
  localStorage.setItem("portal_attendance", JSON.stringify(attendance));
  localStorage.setItem("portal_results", JSON.stringify(results));
};

export const updateStudent = (updatedStudent) => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === updatedStudent.id);
  if (index >= 0) {
    students[index] = { ...students[index], ...updatedStudent };
    localStorage.setItem("portal_students", JSON.stringify(students));
  }
};

export const deleteStudent = (studentId) => {
  let students = getStudents();
  let parents = getParents();
  let relationships = getRelationships();

  // Find linked parent before deleting relationship
  const rel = relationships.find((r) => r.studentId === studentId);
  const parentId = rel ? rel.parentId : null;

  // Filter out student and relationship
  students = students.filter((s) => s.id !== studentId);
  relationships = relationships.filter((r) => r.studentId !== studentId);

  // If the parent has no other remaining students linked, remove parent account too
  if (parentId) {
    const parentHasOtherStudents = relationships.some((r) => r.parentId === parentId);
    if (!parentHasOtherStudents) {
      parents = parents.filter((p) => p.id !== parentId);
    }
  }

  // Clean up attendance and results
  const attendance = JSON.parse(localStorage.getItem("portal_attendance") || "{}");
  const results = JSON.parse(localStorage.getItem("portal_results") || "{}");
  delete attendance[studentId];
  delete results[studentId];

  localStorage.setItem("portal_students", JSON.stringify(students));
  localStorage.setItem("portal_parents", JSON.stringify(parents));
  localStorage.setItem("portal_relationships", JSON.stringify(relationships));
  localStorage.setItem("portal_attendance", JSON.stringify(attendance));
  localStorage.setItem("portal_results", JSON.stringify(results));
};

export const deleteParent = (parentId) => {
  let parents = getParents();
  let relationships = getRelationships();

  parents = parents.filter((p) => p.id !== parentId);
  relationships = relationships.filter((r) => r.parentId !== parentId);

  localStorage.setItem("portal_parents", JSON.stringify(parents));
  localStorage.setItem("portal_relationships", JSON.stringify(relationships));
};

// Auth Functions
export const getCurrentUser = () => {
  const auth = localStorage.getItem("portal_auth");
  return auth ? JSON.parse(auth) : null;
};

export const resetDemoData = () => {
  localStorage.setItem("portal_students", JSON.stringify(DEFAULT_STUDENTS));
  localStorage.setItem("portal_parents", JSON.stringify(DEFAULT_PARENTS));
  localStorage.setItem("portal_relationships", JSON.stringify(DEFAULT_RELATIONSHIPS));
  localStorage.setItem("portal_attendance", JSON.stringify(DEFAULT_ATTENDANCE));
  localStorage.setItem("portal_results", JSON.stringify(DEFAULT_RESULTS));
};

export const loginUser = (idOrEmail, password) => {
  initStorage();
  const input = idOrEmail.trim().toLowerCase();
  const trimmedPass = password.trim();

  // Find matching account first
  const isAdmin = input === ADMIN_ACCOUNT.id.toLowerCase() || input === ADMIN_ACCOUNT.email.toLowerCase();
  
  const students = getStudents();
  const foundStudent = students.find(
    (s) => s.id?.trim().toLowerCase() === input || (s.email && s.email.trim().toLowerCase() === input)
  );

  const parents = getParents();
  const foundParent = parents.find(
    (p) => p.id?.trim().toLowerCase() === input || (p.email && p.email.trim().toLowerCase() === input)
  );

  // If no matching account ID or Email exists in the system
  if (!isAdmin && !foundStudent && !foundParent) {
    return {
      success: false,
      reason: 'account_not_found',
      message: `Account "${idOrEmail}" was not found. It may have been deleted or not created yet.`
    };
  }

  // Check Admin Password
  if (isAdmin) {
    if (trimmedPass === ADMIN_ACCOUNT.password) {
      const session = {
        id: ADMIN_ACCOUNT.id,
        name: ADMIN_ACCOUNT.name,
        email: ADMIN_ACCOUNT.email,
        role: "admin"
      };
      localStorage.setItem("portal_auth", JSON.stringify(session));
      return { success: true, user: session };
    } else {
      return {
        success: false,
        reason: 'incorrect_password',
        message: `Incorrect password for Admin account (${idOrEmail}).`
      };
    }
  }

  // Check Student Password
  if (foundStudent) {
    const expectedPassword = String(foundStudent.password || 'student123').trim();
    if (expectedPassword === trimmedPass) {
      const session = {
        id: foundStudent.id,
        name: foundStudent.name,
        email: foundStudent.email,
        role: "student",
        className: foundStudent.className,
        rollNumber: foundStudent.rollNumber
      };
      localStorage.setItem("portal_auth", JSON.stringify(session));
      return { success: true, user: session };
    } else {
      return {
        success: false,
        reason: 'incorrect_password',
        message: `Incorrect password for Student account (${idOrEmail}). Saved password is "${expectedPassword}".`
      };
    }
  }

  // Check Parent Password
  if (foundParent) {
    const expectedPassword = String(foundParent.password || 'parent123').trim();
    if (expectedPassword === trimmedPass) {
      const session = {
        id: foundParent.id,
        name: foundParent.name,
        email: foundParent.email,
        role: "parent"
      };
      localStorage.setItem("portal_auth", JSON.stringify(session));
      return { success: true, user: session };
    } else {
      return {
        success: false,
        reason: 'incorrect_password',
        message: `Incorrect password for Parent account (${idOrEmail}). Saved password is "${expectedPassword}".`
      };
    }
  }

  return { success: false, reason: 'unknown', message: 'Invalid credentials. Please try again.' };
};

export const logoutUser = () => {
  localStorage.removeItem("portal_auth");
};
