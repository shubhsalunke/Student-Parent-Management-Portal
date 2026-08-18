import { fetchAllStudentsWithGuardiansFromApi, saveStudentDetailsToApi } from './apiService';

export const ADMIN_ACCOUNT = {
  id: "ADMIN001",
  name: "Portal Admin",
  email: "admin@portal.com",
  password: "admin123",
  role: "admin"
};

export const syncAllDataFromApi = async (filters = {}) => {
  const result = await fetchAllStudentsWithGuardiansFromApi(filters);
  if (result.success && result.students && result.students.length > 0) {
    const currentStudents = JSON.parse(localStorage.getItem("portal_students") || "[]");
    const currentParents = JSON.parse(localStorage.getItem("portal_parents") || "[]");
    const currentRelationships = JSON.parse(localStorage.getItem("portal_relationships") || "[]");
    const deletedStudentIds = JSON.parse(localStorage.getItem("portal_deleted_students") || "[]");
    const deletedParentIds = JSON.parse(localStorage.getItem("portal_deleted_parents") || "[]");

    // Filter out deleted students from API results
    const activeApiStudents = result.students.filter(
      (s) => !deletedStudentIds.includes(s.id) && !deletedStudentIds.includes(s.stdSrno)
    );

    // Filter out deleted parents from API results
    const activeApiParents = result.parents.filter(
      (p) => !deletedParentIds.includes(p.id) && !deletedParentIds.includes(p.grdnSrno)
    );

    // Merge API students with existing while preserving local edits
    activeApiStudents.forEach((s) => {
      const idx = currentStudents.findIndex((cs) => cs.id === s.id || cs.stdSrno === s.stdSrno);
      if (idx >= 0) {
        const existing = currentStudents[idx];
        currentStudents[idx] = { ...s, ...existing };
        if (currentStudents[idx].email) {
          currentStudents[idx].email = currentStudents[idx].email.replace(/\s+/g, '');
        }
      } else {
        if (s.email) s.email = s.email.replace(/\s+/g, '');
        currentStudents.push(s);
      }
    });

    // Merge API parents while preserving local edits
    activeApiParents.forEach((p) => {
      const idx = currentParents.findIndex((cp) => cp.id === p.id || cp.grdnSrno === p.grdnSrno);
      if (idx >= 0) {
        const existing = currentParents[idx];
        currentParents[idx] = { ...p, ...existing };
        if (currentParents[idx].email) {
          currentParents[idx].email = currentParents[idx].email.replace(/\s+/g, '');
        }
      } else {
        if (p.email) p.email = p.email.replace(/\s+/g, '');
        currentParents.push(p);
      }
    });

    // Merge API relationships
    result.relationships.forEach((r) => {
      if (!deletedStudentIds.includes(r.studentId) && !deletedParentIds.includes(r.parentId)) {
        const idx = currentRelationships.findIndex(
          (cr) => cr.studentId === r.studentId && cr.parentId === r.parentId
        );
        if (idx < 0) {
          currentRelationships.push(r);
        }
      }
    });

    // Clean up local arrays from any previously deleted IDs & duplicate relationship links
    const finalStudents = currentStudents.filter(
      (s) => !deletedStudentIds.includes(s.id) && !deletedStudentIds.includes(s.stdSrno)
    );
    const finalParents = currentParents.filter(
      (p) => !deletedParentIds.includes(p.id) && !deletedParentIds.includes(p.grdnSrno)
    );

    const seenRels = new Set();
    const finalRelationships = currentRelationships.filter((r) => {
      if (deletedStudentIds.includes(r.studentId) || deletedParentIds.includes(r.parentId)) {
        return false;
      }
      const key = `${r.studentId}_${r.parentId}`;
      if (seenRels.has(key)) return false;
      seenRels.add(key);
      return true;
    });

    localStorage.setItem("portal_students", JSON.stringify(finalStudents));
    localStorage.setItem("portal_parents", JSON.stringify(finalParents));
    localStorage.setItem("portal_relationships", JSON.stringify(finalRelationships));

    return {
      success: true,
      count: activeApiStudents.length
    };
  }
  return { success: false, message: 'Failed to sync API data' };
};

export const DEFAULT_STUDENTS = [];
export const DEFAULT_PARENTS = [];
export const DEFAULT_RELATIONSHIPS = [];
export const DEFAULT_ATTENDANCE = {};
export const DEFAULT_RESULTS = {};

// Initialize localStorage with seed data if empty or has old mock data
export const initStorage = () => {
  if (!localStorage.getItem("portal_students")) {
    localStorage.setItem("portal_students", JSON.stringify([]));
  }
  if (!localStorage.getItem("portal_parents")) {
    localStorage.setItem("portal_parents", JSON.stringify([]));
  }
  if (!localStorage.getItem("portal_relationships")) {
    localStorage.setItem("portal_relationships", JSON.stringify([]));
  }
  if (!localStorage.getItem("portal_attendance")) {
    localStorage.setItem("portal_attendance", JSON.stringify({}));
  }
  if (!localStorage.getItem("portal_results")) {
    localStorage.setItem("portal_results", JSON.stringify({}));
  }
};

// Getter functions
export const getStudents = () => {
  initStorage();
  const list = JSON.parse(localStorage.getItem("portal_students") || "[]");
  return list.map((s) => ({
    ...s,
    email: s.email ? s.email.replace(/\s+/g, '') : '',
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
    email: p.email ? p.email.replace(/\s+/g, '') : '',
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
  return all[studentId] || [];
};

export const calculateAttendancePercentage = (records) => {
  if (!records || records.length === 0) return 0;
  const presentCount = records.filter((r) => r.status === "Present").length;
  return Math.round((presentCount / records.length) * 100);
};

export const getResultRecords = (studentId) => {
  initStorage();
  const all = JSON.parse(localStorage.getItem("portal_results") || "{}");
  return all[studentId] || [];
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
  const uniqueParentsMap = new Map();

  rels.forEach((rel) => {
    const parent = parents.find((p) => p.id === rel.parentId || (p.grdnSrno && rel.grdnSrno && p.grdnSrno === rel.grdnSrno));
    const displayRelationship = rel.relationship === "Other" ? rel.customRelationship || "Guardian" : rel.relationship;
    const parentData = {
      ...(parent || { id: rel.parentId, name: "Parent", email: "", phone: "" }),
      relationship: displayRelationship,
      rawRelationship: rel.relationship
    };

    // Deduplicate by parent name + relationship
    const key = `${parentData.name?.trim().toLowerCase()}_${displayRelationship.toLowerCase()}`;
    if (!uniqueParentsMap.has(key) && parentData.name) {
      uniqueParentsMap.set(key, parentData);
    }
  });

  return Array.from(uniqueParentsMap.values());
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
    const match = p.id?.match(/(?:PAR|P)(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  });
  const nextNum = maxId + 1;
  return `PAR${String(nextNum).padStart(3, '0')}`;
};

export const formatPayloadJSON = (studentData, guardiansList) => {
  const stdSrno = Number(studentData.stdSrno) || 0;
  const isNew = stdSrno === 0;

  const genderMap = { Male: 1, Female: 2, Other: 3 };
  const bloodGroupMap = { "A+": 1, "A-": 2, "B+": 3, "B-": 4, "O+": 5, "O-": 6, "AB+": 7, "AB-": 8 };

  let fName = studentData.firstName || '';
  let mName = studentData.middleName || '';
  let lName = studentData.lastName || '';

  if (!fName && studentData.name) {
    const parts = studentData.name.trim().split(/\s+/);
    if (parts.length === 1) fName = parts[0];
    else if (parts.length === 2) { fName = parts[0]; lName = parts[1]; }
    else if (parts.length >= 3) { fName = parts[0]; mName = parts[1]; lName = parts.slice(2).join(' '); }
  }

  const grdN_Ms = (guardiansList || []).map((g) => {
    let gFName = g.firstName || '';
    let gMName = g.middleName || '';
    let gLName = g.lastName || '';
    if (!gFName && g.name) {
      const parts = g.name.trim().split(/\s+/);
      if (parts.length === 1) gFName = parts[0];
      else if (parts.length === 2) { gFName = parts[0]; gLName = parts[1]; }
      else if (parts.length >= 3) { gFName = parts[0]; gMName = parts[1]; gLName = parts.slice(2).join(' '); }
    }
    return {
      grdN_SRNO: Number(g.grdnSrno) || 0,
      f_NAME: gFName,
      m_NAME: gMName,
      l_NAME: gLName,
      relation: g.relationship === 'Other' ? (g.customRelationship || 'Guardian') : g.relationship,
      gendeR_SRNO: genderMap[g.gender] || 1,
      mobilE_NO: g.phone || "",
      address: g.address || studentData.address || ""
    };
  });

  const nowISO = new Date().toISOString();

  return {
    v_FLAG: isNew ? "A" : "U",
    stD_SRNO: stdSrno,
    f_NAME: fName,
    m_NAME: mName,
    l_NAME: lName,
    dob: studentData.dob ? `${studentData.dob}T05:01:02.720Z` : "2001-03-18T05:01:02.720Z",
    birtH_PLACE: studentData.birthPlace || "",
    blooD_GROUP: bloodGroupMap[studentData.bloodGroup] || Number(studentData.bloodGroup) || 1,
    mobilE_NO: studentData.phone || "",
    address: studentData.address || "",
    citY_SRNO: Number(studentData.citySrno) || 1,
    districT_SRNO: Number(studentData.districtSrno) || 1,
    statE_SRNO: Number(studentData.stateSrno) || 1,
    pincode: Number(studentData.pincode) || 431001,
    gendeR_SRNO: genderMap[studentData.gender] || 1,
    rolL_NO: Number(studentData.rollNumber) || 1,
    clasS_SRNO: Number(studentData.classSrno) || 1,
    addmissioN_DATE: studentData.admissionDate ? `${studentData.admissionDate}T05:01:02.720Z` : nowISO,
    grdN_Ms
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
    const updatedObj = { ...students[index], ...updatedStudent };
    students[index] = updatedObj;
    localStorage.setItem("portal_students", JSON.stringify(students));

    // Update active user session if the logged-in user is this student
    const authStr = localStorage.getItem("portal_auth");
    if (authStr) {
      const auth = JSON.parse(authStr);
      if (auth.id === updatedStudent.id || (auth.stdSrno && auth.stdSrno === updatedStudent.stdSrno)) {
        localStorage.setItem("portal_auth", JSON.stringify({ ...auth, ...updatedObj }));
      }
    }

    // Post live update payload (v_FLAG: "U") to Insert_Update_Std_Ms
    const guardians = getParentsForStudent(updatedStudent.id);
    const payload = formatPayloadJSON(updatedObj, guardians);
    saveStudentDetailsToApi(payload).catch((err) =>
      console.error('Failed to post live update to API:', err)
    );
  }
};

export const deleteStudent = (studentId) => {
  let students = getStudents();
  let parents = getParents();
  let relationships = getRelationships();

  const targetStudent = students.find((s) => s.id === studentId);

  // Track deleted student IDs so auto-sync does not re-add them
  const deletedIds = JSON.parse(localStorage.getItem("portal_deleted_students") || "[]");
  if (!deletedIds.includes(studentId)) {
    deletedIds.push(studentId);
  }
  if (targetStudent && targetStudent.stdSrno && !deletedIds.includes(targetStudent.stdSrno)) {
    deletedIds.push(targetStudent.stdSrno);
  }
  localStorage.setItem("portal_deleted_students", JSON.stringify(deletedIds));

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

  const targetParent = parents.find((p) => p.id === parentId);

  // Track deleted parent IDs so auto-sync does not re-add them
  const deletedParentIds = JSON.parse(localStorage.getItem("portal_deleted_parents") || "[]");
  if (!deletedParentIds.includes(parentId)) {
    deletedParentIds.push(parentId);
  }
  if (targetParent && targetParent.grdnSrno && !deletedParentIds.includes(targetParent.grdnSrno)) {
    deletedParentIds.push(targetParent.grdnSrno);
  }
  localStorage.setItem("portal_deleted_parents", JSON.stringify(deletedParentIds));

  parents = parents.filter((p) => p.id !== parentId);
  relationships = relationships.filter((r) => r.parentId !== parentId);

  localStorage.setItem("portal_parents", JSON.stringify(parents));
  localStorage.setItem("portal_relationships", JSON.stringify(relationships));
};

// Auth Functions
export const getCurrentUser = () => {
  const authStr = localStorage.getItem("portal_auth");
  if (!authStr) return null;
  const auth = JSON.parse(authStr);

  if (auth.role === 'student') {
    const students = JSON.parse(localStorage.getItem("portal_students") || "[]");
    const fresh = students.find((s) => s.id === auth.id || (s.stdSrno && s.stdSrno === auth.stdSrno));
    if (fresh) {
      return { ...auth, ...fresh };
    }
  } else if (auth.role === 'parent') {
    const parents = JSON.parse(localStorage.getItem("portal_parents") || "[]");
    const fresh = parents.find((p) => p.id === auth.id || (p.grdnSrno && p.grdnSrno === auth.grdnSrno));
    if (fresh) {
      return { ...auth, ...fresh };
    }
  }

  return auth;
};

export const resetDemoData = () => {
  localStorage.setItem("portal_students", JSON.stringify(DEFAULT_STUDENTS));
  localStorage.setItem("portal_parents", JSON.stringify(DEFAULT_PARENTS));
  localStorage.setItem("portal_relationships", JSON.stringify(DEFAULT_RELATIONSHIPS));
  localStorage.setItem("portal_attendance", JSON.stringify(DEFAULT_ATTENDANCE));
  localStorage.setItem("portal_results", JSON.stringify(DEFAULT_RESULTS));
};

export const loginUser = async (idOrEmail, password) => {
  initStorage();
  const input = idOrEmail.trim().toLowerCase();
  const trimmedPass = password.trim();

  // Find matching account first
  const isAdmin = input === ADMIN_ACCOUNT.id.toLowerCase() || input === ADMIN_ACCOUNT.email.toLowerCase();
  
  let students = getStudents();
  let foundStudent = students.find(
    (s) => s.id?.trim().toLowerCase() === input || (s.email && s.email.trim().toLowerCase() === input)
  );

  let parents = getParents();
  let foundParent = parents.find(
    (p) => p.id?.trim().toLowerCase() === input || (p.email && p.email.trim().toLowerCase() === input)
  );

  // If student or parent is not found locally, auto-sync live API data
  if (!isAdmin && !foundStudent && !foundParent) {
    await syncAllDataFromApi();
    students = getStudents();
    foundStudent = students.find(
      (s) => s.id?.trim().toLowerCase() === input || (s.email && s.email.trim().toLowerCase() === input)
    );
    parents = getParents();
    foundParent = parents.find(
      (p) => p.id?.trim().toLowerCase() === input || (p.email && p.email.trim().toLowerCase() === input)
    );
  }

  // If no matching account ID or Email exists in the system after API sync
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
