import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  UserPlus,
  Eye,
  EyeOff,
  AlertCircle,
  Plus,
  Trash2,
  Code,
  Copy,
  Check,
  X,
  MapPin,
  Calendar,
  User,
  Globe,
  Download,
  Loader2
} from 'lucide-react';
import {
  addStudentWithMultipleGuardians,
  generateNextStudentId,
  generateNextParentId,
  formatPayloadJSON,
  getParents
} from '../../data/demoData';
import { fetchStudentDetailsFromApi, fetchMasterDataFromApi, saveStudentDetailsToApi } from '../../data/apiService';

export default function AddStudent() {
  const navigate = useNavigate();

  // Auto generate IDs dynamically
  const defaultStudentId = generateNextStudentId();
  const defaultParentId = generateNextParentId();

  // API Fetch State
  const [apiSrnoInput, setApiSrnoInput] = useState('1');
  const [isFetchingApi, setIsFetchingApi] = useState(false);

  // Master Data State from Get_Std_Ms API
  const [masterGenders, setMasterGenders] = useState([]);
  const [masterBloodGroups, setMasterBloodGroups] = useState([]);
  const [masterStates, setMasterStates] = useState([]);
  const [masterDistricts, setMasterDistricts] = useState([]);
  const [masterCities, setMasterCities] = useState([]);

  // Student Form State
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState(defaultStudentId);
  const [className, setClassName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [dob, setDob] = useState('2001-03-18');
  const [birthPlace, setBirthPlace] = useState('Aurangabad');
  const [gender, setGender] = useState('Male');
  const [admissionDate, setAdmissionDate] = useState('2026-08-15');

  // Student Address & Contact State
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [address, setAddress] = useState('Chawni Pentionpura');
  const [stateSrno, setStateSrno] = useState(1);
  const [districtSrno, setDistrictSrno] = useState(1);
  const [citySrno, setCitySrno] = useState(1);
  const [city, setCity] = useState('Mumbai');
  const [district, setDistrict] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('431001');
  const [studentPassword, setStudentPassword] = useState('student123');
  const [showStudentPassword, setShowStudentPassword] = useState(false);

  // Multi-Guardian Array State (Initially empty until user clicks Add Parent or Fetches API)
  const [guardians, setGuardians] = useState([]);

  const [emptyFields, setEmptyFields] = useState({});
  const [message, setMessage] = useState(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Load Master Data on Mount
  useEffect(() => {
    const loadMasterData = async () => {
      const res = await fetchMasterDataFromApi();
      if (res.success) {
        if (res.genders?.length) setMasterGenders(res.genders);
        if (res.bloodGroups?.length) setMasterBloodGroups(res.bloodGroups);
        if (res.states?.length) setMasterStates(res.states);
        if (res.districts?.length) setMasterDistricts(res.districts);
        if (res.cities?.length) setMasterCities(res.cities);
      }
    };
    loadMasterData();
  }, []);

  // Fetch student details from live API endpoint
  const handleFetchFromApi = async () => {
    if (!apiSrnoInput.trim()) return;
    setIsFetchingApi(true);
    setMessage(null);

    const result = await fetchStudentDetailsFromApi(apiSrnoInput.trim());
    setIsFetchingApi(false);

    if (result.success && result.student) {
      const s = result.student;
      setFirstName(s.firstName);
      setMiddleName(s.middleName);
      setLastName(s.lastName);
      setStudentId(s.id);
      setClassName(s.className);
      setRollNumber(s.rollNumber);
      setBloodGroup(s.bloodGroup);
      setDob(s.dob);
      setBirthPlace(s.birthPlace);
      setGender(s.gender);
      setAdmissionDate(s.admissionDate);
      setStudentPhone(s.phone);
      setStudentEmail(s.email);
      setAddress(s.address);
      setStateSrno(s.stateSrno || 1);
      setDistrictSrno(s.districtSrno || 1);
      setCitySrno(s.citySrno || 1);
      setCity(s.city);
      setDistrict(s.district);
      setState(s.state);
      setPincode(s.pincode);

      if (result.guardians && result.guardians.length > 0) {
        setGuardians(result.guardians);
      }

      setMessage({
        type: 'success',
        text: `Fetched live API data for STD_SRNO = ${apiSrnoInput.trim()} (${s.name}) successfully!`
      });
    } else {
      setMessage({
        type: 'error',
        text: result.message || `No data returned from API for STD_SRNO = ${apiSrnoInput.trim()}`
      });
    }
  };

  const getInputStyle = (fieldName, extraClasses = '') =>
    `w-full px-3.5 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${extraClasses} ${
      emptyFields[fieldName]
        ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/40 text-rose-900 placeholder:text-rose-300 font-medium'
        : 'border-slate-200 focus:ring-indigo-500 focus:bg-white'
    }`;

  // Add guardian item to list
  const handleAddGuardian = () => {
    let maxNum = 0;
    const existingParents = getParents();
    existingParents.forEach((p) => {
      const match = p.id?.match(/(?:PAR|P)(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    guardians.forEach((g) => {
      const match = g.id?.match(/(?:PAR|P)(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    const nextParentId = `PAR${String(maxNum + 1).padStart(3, '0')}`;

    setGuardians((prev) => [
      ...prev,
      {
        id: nextParentId,
        relationship: prev.length === 0 ? 'Father' : 'Mother',
        customRelationship: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: prev.length === 0 ? 'Male' : 'Female',
        phone: '',
        email: '',
        address: address || '',
        password: 'parent123',
        showPassword: false
      }
    ]);
  };

  const handleRemoveGuardian = (index) => {
    setGuardians((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGuardianChange = (index, field, value) => {
    setGuardians((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Build payload JSON object
  const buildCurrentPayload = () => {
    const studentDataObj = {
      id: studentId,
      firstName,
      middleName,
      lastName,
      fullName: `${firstName} ${lastName}`.trim(),
      className,
      rollNumber,
      bloodGroup,
      dob,
      birthPlace,
      gender,
      admissionDate,
      email: studentEmail,
      phone: studentPhone,
      address,
      city,
      district,
      state,
      citySrno,
      districtSrno,
      stateSrno,
      pincode,
      password: studentPassword
    };

    return formatPayloadJSON(studentDataObj, guardians);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasInvalidEmail = false;

    if (!firstName.trim()) missing.firstName = true;
    if (!lastName.trim()) missing.lastName = true;
    if (!studentId.trim()) missing.studentId = true;
    if (!className.trim()) missing.className = true;
    if (!rollNumber.trim()) missing.rollNumber = true;
    if (!dob.trim()) missing.dob = true;
    if (!studentPhone.trim()) missing.studentPhone = true;

    if (!studentEmail.trim() || !emailRegex.test(studentEmail.trim())) {
      missing.studentEmail = true;
      hasInvalidEmail = true;
    }

    guardians.forEach((g, idx) => {
      if (!g.firstName.trim()) missing[`g_${idx}_firstName`] = true;
      if (!g.lastName.trim()) missing[`g_${idx}_lastName`] = true;
      if (!g.phone.trim()) missing[`g_${idx}_phone`] = true;
      if (!g.email.trim() || !emailRegex.test(g.email.trim())) {
        missing[`g_${idx}_email`] = true;
        hasInvalidEmail = true;
      }
    });

    if (Object.keys(missing).length > 0) {
      setEmptyFields(missing);
      setMessage({
        type: 'error',
        text: hasInvalidEmail
          ? 'Please enter valid email addresses (e.g. name@domain.com) marked with *'
          : 'Please fill in all required fields marked with *'
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setEmptyFields({});

    const studentDataObj = {
      id: studentId.trim(),
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`.trim(),
      className: className.trim(),
      rollNumber: rollNumber.trim(),
      bloodGroup,
      dob,
      birthPlace: birthPlace.trim(),
      gender,
      admissionDate,
      email: studentEmail.trim(),
      phone: studentPhone.trim(),
      address: address.trim(),
      city: city.trim(),
      district: district.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      password: studentPassword.trim()
    };

    const guardiansList = guardians.map((g) => ({
      id: g.id,
      relationship: g.relationship,
      customRelationship: g.customRelationship,
      firstName: g.firstName.trim(),
      middleName: g.middleName.trim(),
      lastName: g.lastName.trim(),
      fullName: `${g.firstName.trim()} ${g.lastName.trim()}`.trim(),
      gender: g.gender,
      phone: g.phone.trim(),
      email: g.email.trim(),
      address: g.address.trim() || address.trim(),
      password: g.password.trim() || 'parent123'
    }));

    addStudentWithMultipleGuardians(studentDataObj, guardiansList);

    // POST payload to live API endpoint
    const payload = buildCurrentPayload();
    saveStudentDetailsToApi(payload).then((res) => {
      if (res.success) {
        console.log('Successfully posted student payload to live API endpoint:', res);
      }
    });

    setMessage({
      type: 'success',
      text: `Successfully registered Student (${studentDataObj.fullName}) and ${guardiansList.length} Guardian(s)!`
    });

    setTimeout(() => {
      navigate('/admin/students');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Add Student & Parent Account</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Register a new student with extended demographic data and linked guardian details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowJsonModal(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <Code className="w-4 h-4 text-indigo-600" />
            <span>Preview JSON Payload</span>
          </button>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <UserPlus className="w-5 h-5" />
          </div>
        </div>
      </div>


      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 ${
            message.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {message.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <p className="text-sm font-semibold">{message.text}</p>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Student Demographics */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-base">Student Information (T0)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Shubham"
                className={getInputStyle('firstName')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Hari"
                className={getInputStyle('middleName')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Salunke"
                className={getInputStyle('lastName')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID *</label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="STU003"
                className={getInputStyle('studentId', 'font-mono')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="3"
                className={getInputStyle('className')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number *</label>
              <input
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="12"
                className={getInputStyle('rollNumber')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                {masterGenders.length > 0 ? (
                  masterGenders.map((g) => (
                    <option key={g.GENDER_SRNO} value={g.GENDER_NAME}>
                      {g.GENDER_NAME}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={getInputStyle('dob')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Birth Place</label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="Aurangabad"
                className={getInputStyle('birthPlace')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                {masterBloodGroups.length > 0 ? (
                  masterBloodGroups.map((bg) => (
                    <option key={bg.BLOODGRP_SRNO} value={bg.BLOODGRP_NAME}>
                      {bg.BLOODGRP_NAME}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Date</label>
              <input
                type="date"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className={getInputStyle('admissionDate')}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Student Address & Contact Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-base">Contact & Address Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="9325910030"
                className={getInputStyle('studentPhone')}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="shubham@example.com"
                className={getInputStyle('studentEmail')}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Chawni Pentionpura, Aurangabad"
                className={getInputStyle('address')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              {masterStates.length > 0 ? (
                <select
                  value={stateSrno}
                  onChange={(e) => {
                    const srno = Number(e.target.value);
                    setStateSrno(srno);
                    const foundState = masterStates.find((s) => s.STATE_SRNO === srno);
                    if (foundState) setState(foundState.STATE_NAME);
                    const matchingDistricts = masterDistricts.filter((d) => d.STATE_SRNO === srno);
                    if (matchingDistricts.length > 0) {
                      setDistrictSrno(matchingDistricts[0].DISTRICT_SRNO);
                      setDistrict(matchingDistricts[0].DISTRICT_NAME);
                      const matchingCities = masterCities.filter((c) => c.DISTRICT_SRNO === matchingDistricts[0].DISTRICT_SRNO);
                      if (matchingCities.length > 0) {
                        setCitySrno(matchingCities[0].CITY_SRNO);
                        setCity(matchingCities[0].CITY_NAME);
                      }
                    }
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  {masterStates.map((s) => (
                    <option key={s.STATE_SRNO} value={s.STATE_SRNO}>
                      {s.STATE_NAME}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={getInputStyle('state')}
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
              {masterDistricts.length > 0 ? (
                <select
                  value={districtSrno}
                  onChange={(e) => {
                    const srno = Number(e.target.value);
                    setDistrictSrno(srno);
                    const foundDistrict = masterDistricts.find((d) => d.DISTRICT_SRNO === srno);
                    if (foundDistrict) setDistrict(foundDistrict.DISTRICT_NAME);
                    const matchingCities = masterCities.filter((c) => c.DISTRICT_SRNO === srno);
                    if (matchingCities.length > 0) {
                      setCitySrno(matchingCities[0].CITY_SRNO);
                      setCity(matchingCities[0].CITY_NAME);
                    }
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  {(masterDistricts.filter((d) => d.STATE_SRNO === stateSrno).length > 0
                    ? masterDistricts.filter((d) => d.STATE_SRNO === stateSrno)
                    : masterDistricts
                  ).map((d) => (
                    <option key={`${d.DISTRICT_SRNO}-${d.DISTRICT_NAME}`} value={d.DISTRICT_SRNO}>
                      {d.DISTRICT_NAME}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={getInputStyle('district')}
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              {masterCities.length > 0 ? (
                <select
                  value={citySrno}
                  onChange={(e) => {
                    const srno = Number(e.target.value);
                    setCitySrno(srno);
                    const foundCity = masterCities.find((c) => c.CITY_SRNO === srno);
                    if (foundCity) setCity(foundCity.CITY_NAME);
                  }}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                >
                  {(masterCities.filter((c) => c.DISTRICT_SRNO === districtSrno).length > 0
                    ? masterCities.filter((c) => c.DISTRICT_SRNO === districtSrno)
                    : masterCities
                  ).map((c) => (
                    <option key={`${c.CITY_SRNO}-${c.CITY_NAME}`} value={c.CITY_SRNO}>
                      {c.CITY_NAME}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={getInputStyle('city')}
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="431001"
                className={getInputStyle('pincode')}
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Student Account Password *</label>
            <div className="relative max-w-md">
              <input
                type={showStudentPassword ? 'text' : 'password'}
                required
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                placeholder="student123"
                className={getInputStyle('studentPassword', 'pl-3.5 pr-10 font-mono')}
              />
              <button
                type="button"
                onClick={() => setShowStudentPassword(!showStudentPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showStudentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Parent / Guardian Details (T1 Multi-Guardian Array) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-base">Parent / Guardian Information (T1)</h2>
            </div>
            {guardians.length > 0 && (
              <button
                type="button"
                onClick={handleAddGuardian}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs rounded-xl border border-emerald-200/80 flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Parent/Guardian</span>
              </button>
            )}
          </div>

          {guardians.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">No Parent/Guardian Linked Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
                  Click the button below to add linked parent/guardian details for this student.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddGuardian}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Parent / Guardian</span>
              </button>
            </div>
          ) : (
            guardians.map((guardian, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 relative transition-all"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                  <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs">
                    Guardian #{index + 1} ({guardian.relationship})
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveGuardian(index)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove guardian"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship *</label>
                    <select
                      value={guardian.relationship}
                      onChange={(e) => handleGuardianChange(index, 'relationship', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={guardian.firstName}
                      onChange={(e) => handleGuardianChange(index, 'firstName', e.target.value)}
                      placeholder="Harichand"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={guardian.lastName}
                      onChange={(e) => handleGuardianChange(index, 'lastName', e.target.value)}
                      placeholder="Dhote"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
                    <select
                      value={guardian.gender}
                      onChange={(e) => handleGuardianChange(index, 'gender', e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={guardian.phone}
                      onChange={(e) => handleGuardianChange(index, 'phone', e.target.value)}
                      placeholder="9763229072"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={guardian.email}
                      onChange={(e) => handleGuardianChange(index, 'email', e.target.value)}
                      placeholder="parent@example.com"
                      className={`w-full px-3.5 py-2 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        emptyFields[`g_${index}_email`] ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={guardian.address}
                    onChange={(e) => handleGuardianChange(index, 'address', e.target.value)}
                    placeholder="Chawni Pentionpura, Aurangabad"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/students')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Student & Parents</span>
          </button>
        </div>
      </form>

      {/* JSON PAYLOAD PREVIEW MODAL */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 border border-slate-800 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-slate-100 text-base">API Payload Preview JSON</h3>
              </div>
              <button
                onClick={() => setShowJsonModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
                {JSON.stringify(buildCurrentPayload(), null, 2)}
              </pre>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(buildCurrentPayload(), null, 2));
                  setJsonCopied(true);
                  setTimeout(() => setJsonCopied(false), 2000);
                }}
                className="absolute top-3 right-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md"
              >
                {jsonCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{jsonCopied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
