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
    dob: "2010-05-15",
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
    dob: "2011-08-22",
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
    dob: s.dob || "2010-01-01",
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
export const getParentsForStudent = (studentId) => {
  const relationships = getRelationships();
  const rels = relationships.filter((r) => r.studentId === studentId);
  if (!rels || rels.length === 0) return [];

  const parents = getParents();
  return rels.map((rel) => {
    const parent = parents.find((p) => p.id === rel.parentId);
    const displayRelationship = rel.relationship === "Other" ? rel.customRelationship || "Guardian" : rel.relationship;
    return {
      ...(parent || { id: rel.parentId, name: "Parent", email: "", phone: "" }),
      relationship: displayRelationship,
      rawRelationship: rel.relationship
    };
  });
};

export const getParentForStudent = (studentId) => {
  const parentsList = getParentsForStudent(studentId);
  return parentsList.length > 0 ? parentsList[0] : null;
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

// Format exact API Payload JSON requested by user
export const formatPayloadJSON = (studentData, guardiansList) => {
  // Parse numeric STU SRNO or default
  const stuSrnoMatch = studentData.id?.match(/\d+/);
  const stdSrno = stuSrnoMatch ? parseInt(stuSrnoMatch[0], 10) : 1;

  const genderMap = { Male: 1, Female: 2, Other: 3 };
  const bloodGroupMap = { "A+": 1, "A-": 2, "B+": 3, "B-": 4, "O+": 5, "O-": 6, "AB+": 7, "AB-": 8 };

  const t0Entry = {
    STD_SRNO: stdSrno,
    F_NAME: studentData.firstName || studentData.name?.split(' ')[0] || "",
    M_NAME: studentData.middleName || "",
    L_NAME: studentData.lastName || studentData.name?.split(' ').slice(1).join(' ') || "",
    DOB: studentData.dob ? `${studentData.dob}T00:00:00` : "",
    BIRTH_PLACE: studentData.birthPlace || "",
    BLOOD_GROUP: bloodGroupMap[studentData.bloodGroup] || studentData.bloodGroup || 1,
    MOBILE_NO: studentData.phone || "",
    ADDRESS: studentData.address || "",
    CITY_SRNO: studentData.citySrno || 1,
    DISTRICT_SRNO: studentData.districtSrno || 1,
    STATE_SRNO: studentData.stateSrno || 1,
    PINCODE: Number(studentData.pincode) || 431001,
    GENDER_SRNO: genderMap[studentData.gender] || 1,
    CLASS_SRNO: Number(studentData.classSrno) || 1,
    ROLL_NO: Number(studentData.rollNumber) || 1,
    ADDMISSION_DATE: studentData.admissionDate ? `${studentData.admissionDate}T00:00:00` : ""
  };

  const t1Entries = (guardiansList || []).map((g, idx) => {
    const parentSrnoMatch = g.id?.match(/\d+/);
    const grdnSrno = parentSrnoMatch ? parseInt(parentSrnoMatch[0], 10) : (idx + 1);

    return {
      GRDN_SRNO: grdnSrno,
      STD_SRNO: stdSrno,
      F_NAME: g.firstName || g.name?.split(' ')[0] || "",
      M_NAME: g.middleName || "",
      L_NAME: g.lastName || g.name?.split(' ').slice(1).join(' ') || "",
      RELATION: g.relationship === 'Other' ? (g.customRelationship || 'Guardian') : g.relationship,
      GENDER_SRNO: genderMap[g.gender] || 1,
      MOBILE_NO: g.phone || "",
      ADDRESS: g.address || studentData.address || ""
    };
  });

  return {
    msgId: 1,
    msg: {
      T0: [t0Entry],
      T1: t1Entries
    }
  };
};

// Multi-guardian save
export const addStudentWithMultipleGuardians = (studentData, guardiansList) => {
  const students = getStudents();
  const parents = getParents();
  let relationships = getRelationships();

  // Combined full name for backward compatibility
  const fullName = studentData.fullName || `${studentData.firstName} ${studentData.lastName}`.trim();
  const fullStudentObj = {
    ...studentData,
    name: fullName,
    role: "student"
  };

  // Save/Update student
  const existingStudentIndex = students.findIndex((s) => s.id === studentData.id);
  if (existingStudentIndex >= 0) {
    students[existingStudentIndex] = { ...students[existingStudentIndex], ...fullStudentObj };
  } else {
    students.push(fullStudentObj);
  }

  // Remove existing relationships for this student
  relationships = relationships.filter((r) => r.studentId !== studentData.id);

  // Save Guardians & create relationships
  guardiansList.forEach((g) => {
    const parentFullName = g.fullName || `${g.firstName} ${g.lastName}`.trim();
    const parentObj = {
      id: g.id,
      name: parentFullName,
      firstName: g.firstName,
      middleName: g.middleName,
      lastName: g.lastName,
      email: g.email,
      phone: g.phone,
      address: g.address,
      gender: g.gender,
      password: g.password || 'parent123',
      role: "parent"
    };

    const existingParentIndex = parents.findIndex((p) => p.id === g.id);
    if (existingParentIndex >= 0) {
      parents[existingParentIndex] = { ...parents[existingParentIndex], ...parentObj };
    } else {
      parents.push(parentObj);
    }

    relationships.push({
      studentId: studentData.id,
      parentId: g.id,
      relationship: g.relationship,
      customRelationship: g.customRelationship || ""
    });
  });

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

// Admin Operations
export const addStudentAndParent = (studentData, parentData, relationshipData) => {
  const guardianObj = {
    ...parentData,
    relationship: relationshipData.relationship,
    customRelationship: relationshipData.customRelationship
  };
  addStudentWithMultipleGuardians(studentData, [guardianObj]);
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
