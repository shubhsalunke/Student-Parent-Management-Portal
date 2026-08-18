// API Environment Configuration loaded from .env with fallback defaults
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://uat-safetrans.in/dv-NVS-SVC/api/NVS';

export const API_GET_STD_DETAILS_URL = import.meta.env.VITE_API_GET_STD_DETAILS_URL
  ? (import.meta.env.VITE_API_GET_STD_DETAILS_URL.includes('?')
      ? import.meta.env.VITE_API_GET_STD_DETAILS_URL
      : `${import.meta.env.VITE_API_GET_STD_DETAILS_URL}?STD_SRNO=`)
  : `${API_BASE_URL}/Get_Std_Details?STD_SRNO=`;

export const API_GET_STD_LIST_URL = import.meta.env.VITE_API_GET_STD_LIST_URL || `${API_BASE_URL}/Get_Std_list`;
export const API_GET_STD_MS_URL = import.meta.env.VITE_API_GET_STD_MS_URL || `${API_BASE_URL}/Get_Std_Ms`;
export const API_SAVE_STD_DETAILS_URL = import.meta.env.VITE_API_SAVE_STD_DETAILS_URL || `${API_BASE_URL}/Insert_Update_Std_Ms`;

/**
 * Send POST HTTP request to save new student and guardian payload to live API endpoint
 * @param {Object} payload - { msgId: 1, msg: { T0: [...], T1: [...] } }
 */
export const saveStudentDetailsToApi = async (payload) => {
  try {
    const response = await fetch(API_SAVE_STD_DETAILS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`API error HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Failed to save student details to live API:', error);
    return {
      success: false,
      message: error.message || 'Failed to connect to Save API'
    };
  }
};

export const bloodGroupMap = {
  1: 'A+',
  2: 'A-',
  3: 'B+',
  4: 'B-',
  5: 'AB+',
  6: 'AB-',
  7: 'O+',
  8: 'O-'
};

export const reverseBloodGroupMap = {
  'A+': 1,
  'A-': 2,
  'B+': 3,
  'B-': 4,
  'AB+': 5,
  'AB-': 6,
  'O+': 7,
  'O-': 8
};

export const genderMap = {
  1: 'Male',
  2: 'Female',
  3: 'Other'
};

export const reverseGenderMap = {
  'Male': 1,
  'Female': 2,
  'Other': 3
};

// Expanded Master Data Dictionary with distinct non-overlapping IDs
export const EXPANDED_STATES = [
  { STATE_SRNO: 1, STATE_NAME: "Maharashtra" },
  { STATE_SRNO: 2, STATE_NAME: "Gujarat" },
  { STATE_SRNO: 3, STATE_NAME: "Karnataka" },
  { STATE_SRNO: 104, STATE_NAME: "Madhya Pradesh" },
  { STATE_SRNO: 105, STATE_NAME: "Delhi" },
  { STATE_SRNO: 106, STATE_NAME: "Rajasthan" },
  { STATE_SRNO: 107, STATE_NAME: "Uttar Pradesh" },
  { STATE_SRNO: 108, STATE_NAME: "Telangana" },
  { STATE_SRNO: 109, STATE_NAME: "Goa" },
  { STATE_SRNO: 110, STATE_NAME: "Tamil Nadu" }
];

export const EXPANDED_DISTRICTS = [
  // Maharashtra (STATE_SRNO: 1)
  { DISTRICT_SRNO: 1, DISTRICT_NAME: "Mumbai", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 2, DISTRICT_NAME: "Pune", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 101, DISTRICT_NAME: "Chhatrapati Sambhajinagar (Aurangabad)", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 104, DISTRICT_NAME: "Thane", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 105, DISTRICT_NAME: "Nagpur", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 106, DISTRICT_NAME: "Nashik", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 107, DISTRICT_NAME: "Solapur", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 108, DISTRICT_NAME: "Kolhapur", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 109, DISTRICT_NAME: "Jalna", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 110, DISTRICT_NAME: "Nanded", STATE_SRNO: 1 },
  { DISTRICT_SRNO: 111, DISTRICT_NAME: "Amravati", STATE_SRNO: 1 },

  // Gujarat (STATE_SRNO: 2)
  { DISTRICT_SRNO: 3, DISTRICT_NAME: "Ahmedabad", STATE_SRNO: 2 },
  { DISTRICT_SRNO: 113, DISTRICT_NAME: "Surat", STATE_SRNO: 2 },
  { DISTRICT_SRNO: 114, DISTRICT_NAME: "Vadodara", STATE_SRNO: 2 },
  { DISTRICT_SRNO: 115, DISTRICT_NAME: "Rajkot", STATE_SRNO: 2 },

  // Karnataka (STATE_SRNO: 3)
  { DISTRICT_SRNO: 4, DISTRICT_NAME: "Bengaluru", STATE_SRNO: 3 },
  { DISTRICT_SRNO: 117, DISTRICT_NAME: "Mysuru", STATE_SRNO: 3 },
  { DISTRICT_SRNO: 118, DISTRICT_NAME: "Hubballi", STATE_SRNO: 3 },

  // Madhya Pradesh (STATE_SRNO: 104)
  { DISTRICT_SRNO: 119, DISTRICT_NAME: "Indore", STATE_SRNO: 104 },
  { DISTRICT_SRNO: 120, DISTRICT_NAME: "Bhopal", STATE_SRNO: 104 },

  // Delhi (STATE_SRNO: 105)
  { DISTRICT_SRNO: 122, DISTRICT_NAME: "New Delhi", STATE_SRNO: 105 },

  // Rajasthan (STATE_SRNO: 106)
  { DISTRICT_SRNO: 124, DISTRICT_NAME: "Jaipur", STATE_SRNO: 106 }
];

export const EXPANDED_CITIES = [
  // Chhatrapati Sambhajinagar (Aurangabad) (DISTRICT_SRNO: 101)
  { CITY_SRNO: 101, CITY_NAME: "Aurangabad", DISTRICT_SRNO: 101 },
  { CITY_SRNO: 102, CITY_NAME: "Chawni Pentionpura", DISTRICT_SRNO: 101 },
  { CITY_SRNO: 103, CITY_NAME: "CIDCO", DISTRICT_SRNO: 101 },
  { CITY_SRNO: 104, CITY_NAME: "Waluj", DISTRICT_SRNO: 101 },
  { CITY_SRNO: 105, CITY_NAME: "Chikalthana", DISTRICT_SRNO: 101 },

  // Mumbai (DISTRICT_SRNO: 1)
  { CITY_SRNO: 1, CITY_NAME: "Mumbai", DISTRICT_SRNO: 1 },
  { CITY_SRNO: 108, CITY_NAME: "Mumbai Central", DISTRICT_SRNO: 1 },
  { CITY_SRNO: 109, CITY_NAME: "Bandra", DISTRICT_SRNO: 1 },
  { CITY_SRNO: 110, CITY_NAME: "Andheri", DISTRICT_SRNO: 1 },
  { CITY_SRNO: 111, CITY_NAME: "Borivali", DISTRICT_SRNO: 1 },
  { CITY_SRNO: 112, CITY_NAME: "Dadar", DISTRICT_SRNO: 1 },

  // Pune (DISTRICT_SRNO: 2)
  { CITY_SRNO: 2, CITY_NAME: "Pune", DISTRICT_SRNO: 2 },
  { CITY_SRNO: 115, CITY_NAME: "Kothrud", DISTRICT_SRNO: 2 },
  { CITY_SRNO: 116, CITY_NAME: "Baner", DISTRICT_SRNO: 2 },
  { CITY_SRNO: 117, CITY_NAME: "Hinjewadi", DISTRICT_SRNO: 2 },
  { CITY_SRNO: 118, CITY_NAME: "Hadapsar", DISTRICT_SRNO: 2 },

  // Thane (DISTRICT_SRNO: 104)
  { CITY_SRNO: 120, CITY_NAME: "Thane", DISTRICT_SRNO: 104 },
  { CITY_SRNO: 121, CITY_NAME: "Navi Mumbai", DISTRICT_SRNO: 104 },

  // Ahmedabad (DISTRICT_SRNO: 3)
  { CITY_SRNO: 3, CITY_NAME: "Ahmedabad", DISTRICT_SRNO: 3 },

  // Bengaluru (DISTRICT_SRNO: 4)
  { CITY_SRNO: 4, CITY_NAME: "Bengaluru", DISTRICT_SRNO: 4 }
];

/**
 * Helper to merge array list strictly uniquely by key name
 */
const mergeUniqueByName = (primaryList, fallbackList, keyName) => {
  const merged = [];
  const seenNames = new Set();

  primaryList.forEach((item) => {
    const val = String(item[keyName] || '').trim().toLowerCase();
    if (val && !seenNames.has(val)) {
      seenNames.add(val);
      merged.push(item);
    }
  });

  fallbackList.forEach((item) => {
    const val = String(item[keyName] || '').trim().toLowerCase();
    if (val && !seenNames.has(val)) {
      seenNames.add(val);
      merged.push(item);
    }
  });

  return merged;
};

/**
 * Fetch Master Data (Gender, BloodGroup, State, District, City) from Get_Std_Ms API
 */
export const fetchMasterDataFromApi = async () => {
  try {
    let apiGenders = [];
    let apiBloodGroups = [];
    let apiStates = [];
    let apiDistricts = [];
    let apiCities = [];

    const response = await fetch(API_GET_STD_MS_URL);
    if (response.ok) {
      const data = await response.json();
      if (data && data.msg) {
        apiGenders = data.msg.T0 || [];
        apiBloodGroups = data.msg.T1 || [];
        apiStates = data.msg.T2 || [];
        apiDistricts = data.msg.T3 || [];
        apiCities = data.msg.T4 || [];
      }
    }

    const states = mergeUniqueByName(apiStates, EXPANDED_STATES, 'STATE_NAME');
    const districts = mergeUniqueByName(apiDistricts, EXPANDED_DISTRICTS, 'DISTRICT_NAME');
    const cities = mergeUniqueByName(apiCities, EXPANDED_CITIES, 'CITY_NAME');

    return {
      success: true,
      genders: apiGenders,
      bloodGroups: apiBloodGroups,
      states,
      districts,
      cities
    };
  } catch (error) {
    console.error('Failed to fetch master data from API:', error);
    return {
      success: true,
      genders: [],
      bloodGroups: [],
      states: EXPANDED_STATES,
      districts: EXPANDED_DISTRICTS,
      cities: EXPANDED_CITIES
    };
  }
};

/**
 * Fetch Student and Guardian details from live API endpoint by STD_SRNO
 * @param {number|string} stdSrno 
 */
export const fetchStudentDetailsFromApi = async (stdSrno) => {
  try {
    const response = await fetch(`${API_GET_STD_DETAILS_URL}${stdSrno}`);
    if (!response.ok) {
      throw new Error(`API error HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.msg) {
      return { success: false, message: 'Invalid API response structure' };
    }

    const t0 = data.msg.T0?.[0];
    if (!t0) {
      return { success: false, message: `No student found for STD_SRNO = ${stdSrno}` };
    }

    // Map T0 Student
    const cleanName = (t0.F_NAME || '').trim().toLowerCase().replace(/\s+/g, '');
    const student = {
      stdSrno: t0.STD_SRNO,
      id: `STU${String(t0.STD_SRNO).padStart(3, '0')}`,
      firstName: (t0.F_NAME || '').trim(),
      middleName: (t0.M_NAME || '').trim(),
      lastName: (t0.L_NAME || '').trim(),
      name: `${t0.F_NAME || ''} ${t0.M_NAME ? t0.M_NAME + ' ' : ''}${t0.L_NAME || ''}`.replace(/\s+/g, ' ').trim(),
      dob: t0.DOB ? t0.DOB.split('T')[0] : '2001-03-18',
      birthPlace: t0.BIRTH_PLACE || '',
      bloodGroupSrno: t0.BLOOD_GROUP || 3,
      bloodGroup: bloodGroupMap[t0.BLOOD_GROUP] || 'B+',
      phone: t0.MOBILE_NO || '',
      email: cleanName ? `${cleanName}@example.com` : 'student@example.com',
      address: t0.ADDRESS || '',
      citySrno: t0.CITY_SRNO || 1,
      districtSrno: t0.DISTRICT_SRNO || 1,
      stateSrno: t0.STATE_SRNO || 1,
      city: t0.CITY_SRNO ? String(t0.CITY_SRNO) : 'Mumbai',
      district: t0.DISTRICT_SRNO ? String(t0.DISTRICT_SRNO) : 'Mumbai',
      state: t0.STATE_SRNO ? String(t0.STATE_SRNO) : 'Maharashtra',
      pincode: t0.PINCODE ? String(t0.PINCODE) : '431001',
      genderSrno: t0.GENDER_SRNO || 1,
      gender: genderMap[t0.GENDER_SRNO] || 'Male',
      className: String(t0.CLASS_SRNO || '3'),
      rollNumber: String(t0.ROLL_NO || '12'),
      admissionDate: t0.ADDMISSION_DATE ? t0.ADDMISSION_DATE.split('T')[0] : '2026-08-15',
      password: 'student123',
      role: 'student'
    };

    // Map T1 Guardians
    const guardians = (data.msg.T1 || []).map((t1, idx) => {
      const cleanGrdnName = (t1.F_NAME || '').trim().toLowerCase().replace(/\s+/g, '');
      return {
        id: `PAR${String(t1.GRDN_SRNO || (idx + 1)).padStart(3, '0')}`,
        grdnSrno: t1.GRDN_SRNO,
        firstName: (t1.F_NAME || '').trim(),
        middleName: (t1.M_NAME || '').trim(),
        lastName: (t1.L_NAME || '').trim(),
        name: `${t1.F_NAME || ''} ${t1.M_NAME ? t1.M_NAME + ' ' : ''}${t1.L_NAME || ''}`.replace(/\s+/g, ' ').trim(),
        relationship: t1.RELATION || 'Parent',
        genderSrno: t1.GENDER_SRNO || 1,
        gender: genderMap[t1.GENDER_SRNO] || 'Male',
        phone: t1.MOBILE_NO || '',
        email: cleanGrdnName ? `${cleanGrdnName}@example.com` : 'parent@example.com',
        address: t1.ADDRESS || t0.ADDRESS || '',
        password: 'parent123',
        role: 'parent'
      };
    });

    return {
      success: true,
      raw: data,
      student,
      guardians
    };
  } catch (error) {
    console.error('Failed to fetch student details from API:', error);
    return {
      success: false,
      message: error.message || 'Failed to connect to API'
    };
  }
};

/**
 * Fetch list of students from live API endpoint Get_Std_list with optional query filters
 * @param {Object} filters - { classSrno, fName, lName, mobileNo }
 */
export const fetchStudentListFromApi = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.classSrno) queryParams.append('CLASS_SRNO', filters.classSrno);
    if (filters.fName) queryParams.append('F_NAME', filters.fName);
    if (filters.lName) queryParams.append('L_NAME', filters.lName);
    if (filters.mobileNo) queryParams.append('MOBILE_NO', filters.mobileNo);

    const queryString = queryParams.toString();
    const url = queryString ? `${API_GET_STD_LIST_URL}?${queryString}` : API_GET_STD_LIST_URL;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.msg || !data.msg.T0) {
      return { success: false, message: 'Invalid student list API response', students: [] };
    }

    const students = data.msg.T0.map((t0) => {
      const cleanFName = (t0.F_NAME || '').trim().toLowerCase().replace(/\s+/g, '');
      return {
        stdSrno: t0.STD_SRNO,
        id: `STU${String(t0.STD_SRNO).padStart(3, '0')}`,
        firstName: (t0.F_NAME || '').trim(),
        middleName: (t0.M_NAME || '').trim(),
        lastName: (t0.L_NAME || '').trim(),
        name: `${t0.F_NAME || ''} ${t0.M_NAME ? t0.M_NAME + ' ' : ''}${t0.L_NAME || ''}`.replace(/\s+/g, ' ').trim(),
        dob: t0.DOB ? t0.DOB.split('T')[0] : '2001-03-18',
        birthPlace: t0.BIRTH_PLACE || '',
        bloodGroupSrno: t0.BLOOD_GROUP || 3,
        bloodGroup: bloodGroupMap[t0.BLOOD_GROUP] || 'B+',
        phone: t0.MOBILE_NO || '',
        email: cleanFName ? `${cleanFName}@example.com` : 'student@example.com',
        address: t0.ADDRESS || '',
        citySrno: t0.CITY_SRNO || 1,
        districtSrno: t0.DISTRICT_SRNO || 1,
        stateSrno: t0.STATE_SRNO || 1,
        city: t0.CITY_SRNO ? String(t0.CITY_SRNO) : 'Mumbai',
        district: t0.DISTRICT_SRNO ? String(t0.DISTRICT_SRNO) : 'Mumbai',
        state: t0.STATE_SRNO ? String(t0.STATE_SRNO) : 'Maharashtra',
        pincode: t0.PINCODE ? String(t0.PINCODE) : '431001',
        genderSrno: t0.GENDER_SRNO || 1,
        gender: genderMap[t0.GENDER_SRNO] || 'Male',
        className: String(t0.CLASS_SRNO || '3'),
        rollNumber: String(t0.ROLL_NO || '12'),
        admissionDate: t0.ADDMISSION_DATE ? t0.ADDMISSION_DATE.split('T')[0] : '2026-08-15',
        password: 'student123',
        role: 'student'
      };
    });

    return {
      success: true,
      students
    };
  } catch (error) {
    console.error('Failed to fetch student list from API:', error);
    return {
      success: false,
      message: error.message || 'Failed to fetch student list from API',
      students: []
    };
  }
};

/**
 * Fetch all students with their linked guardians from live API endpoints with filters
 */
export const fetchAllStudentsWithGuardiansFromApi = async (filters = {}) => {
  try {
    const listRes = await fetchStudentListFromApi(filters);
    if (!listRes.success || !listRes.students || listRes.students.length === 0) {
      return { success: false, students: [], parents: [], relationships: [] };
    }

    const allStudents = [];
    const allParentsMap = new Map();
    const allRelationships = [];
    const relKeysSet = new Set();

    // Fetch details for each student to get guardian records (T1)
    for (const studentItem of listRes.students) {
      const detailsRes = await fetchStudentDetailsFromApi(studentItem.stdSrno);
      if (detailsRes.success && detailsRes.student) {
        allStudents.push(detailsRes.student);

        (detailsRes.guardians || []).forEach((g) => {
          allParentsMap.set(g.id, g);
          const relKey = `${detailsRes.student.id}_${g.id}`;
          if (!relKeysSet.has(relKey)) {
            relKeysSet.add(relKey);
            allRelationships.push({
              studentId: detailsRes.student.id,
              parentId: g.id,
              grdnSrno: g.grdnSrno,
              relationship: g.relationship,
              customRelationship: ''
            });
          }
        });
      } else {
        allStudents.push(studentItem);
      }
    }

    const allParents = Array.from(allParentsMap.values());

    return {
      success: true,
      students: allStudents,
      parents: allParents,
      relationships: allRelationships
    };
  } catch (error) {
    console.error('Failed to fetch all students with guardians:', error);
    return { success: false, students: [], parents: [], relationships: [] };
  }
};
