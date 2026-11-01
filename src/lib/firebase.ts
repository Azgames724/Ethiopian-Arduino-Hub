import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  limit,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApplicationRecord } from '../data/clubData';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with explicit databaseId from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Test connectivity on initial boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client is currently offline or connecting...");
    }
  }
}
testConnection();

/**
 * Saves a student application/registration to Firestore
 */
export async function saveStudentApplicationToFirestore(app: ApplicationRecord): Promise<boolean> {
  const docId = app.referenceNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
  const path = `applications/${docId}`;
  
  try {
    const docRef = doc(db, 'applications', docId);
    
    // Clean payload matching blueprint
    const payload = {
      referenceNumber: app.referenceNumber,
      email: app.email,
      fullName: app.fullName,
      fatherName: app.fatherName,
      grandfatherName: app.grandfatherName || '',
      dob: app.dob,
      gender: app.gender,
      phone: app.phone,
      language: app.language,
      country: app.country || 'Ethiopia',
      region: app.region,
      city: app.city,
      educationStatus: app.educationStatus,
      institution: app.institution,
      fieldOrGrade: app.fieldOrGrade,
      computerAccess: app.computerAccess,
      experienceLevel: app.experienceLevel,
      programCode: app.programCode,
      programName: app.programName,
      coverLetterAmharic: app.coverLetterAmharic,
      documentType: app.documentType || 'Student ID Card',
      fileName: app.fileName || '',
      status: 'submitted',
      notes: app.notes || 'Application received and placed in queue for mentor review.',
      cohort: app.cohort || 'Pending review',
      nextSteps: app.nextSteps || 'Please save your reference number. You can check your application status at /status at any time.',
      createdAt: app.submittedAt || new Date().toISOString(),
      updatedAt: app.updatedAt || new Date().toISOString()
    };

    await setDoc(docRef, payload);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return false;
  }
}

/**
 * Retrieves a student application by reference number from Firestore
 */
export async function getApplicationFromFirestore(refCode: string, email?: string): Promise<ApplicationRecord | null> {
  const docId = refCode.trim().toUpperCase().replace(/[^a-zA-Z0-9_-]/g, '_');
  const path = `applications/${docId}`;

  try {
    // 1. Direct document lookup by reference ID
    const docRef = doc(db, 'applications', docId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      if (!email || data.email.toLowerCase() === email.trim().toLowerCase()) {
        return {
          id: snap.id,
          referenceNumber: data.referenceNumber,
          email: data.email,
          fullName: data.fullName,
          fatherName: data.fatherName,
          grandfatherName: data.grandfatherName,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          language: data.language,
          country: data.country,
          region: data.region,
          city: data.city,
          educationStatus: data.educationStatus,
          institution: data.institution,
          fieldOrGrade: data.fieldOrGrade,
          computerAccess: data.computerAccess,
          experienceLevel: data.experienceLevel,
          programCode: data.programCode,
          programName: data.programName,
          coverLetterAmharic: data.coverLetterAmharic,
          documentType: data.documentType,
          fileName: data.fileName,
          status: data.status,
          submittedAt: data.createdAt,
          updatedAt: data.updatedAt,
          notes: data.notes,
          cohort: data.cohort,
          nextSteps: data.nextSteps
        };
      }
    }

    // 2. Query fallback by referenceNumber field
    const q = query(
      collection(db, 'applications'),
      where('referenceNumber', '==', refCode.trim().toUpperCase()),
      limit(1)
    );
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      const docSnap = querySnap.docs[0];
      const data = docSnap.data();
      if (!email || data.email.toLowerCase() === email.trim().toLowerCase()) {
        return {
          id: docSnap.id,
          referenceNumber: data.referenceNumber,
          email: data.email,
          fullName: data.fullName,
          fatherName: data.fatherName,
          grandfatherName: data.grandfatherName,
          dob: data.dob,
          gender: data.gender,
          phone: data.phone,
          language: data.language,
          country: data.country,
          region: data.region,
          city: data.city,
          educationStatus: data.educationStatus,
          institution: data.institution,
          fieldOrGrade: data.fieldOrGrade,
          computerAccess: data.computerAccess,
          experienceLevel: data.experienceLevel,
          programCode: data.programCode,
          programName: data.programName,
          coverLetterAmharic: data.coverLetterAmharic,
          documentType: data.documentType,
          fileName: data.fileName,
          status: data.status,
          submittedAt: data.createdAt,
          updatedAt: data.updatedAt,
          notes: data.notes,
          cohort: data.cohort,
          nextSteps: data.nextSteps
        };
      }
    }

    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}
