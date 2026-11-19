import * as XLSX from 'xlsx';

/**
 * Normalizes header string by trimming spaces and converting to lowercase for robust matching.
 */
const normalizeHeader = (headerStr) => {
  if (!headerStr) return '';
  return String(headerStr).trim().toLowerCase();
};

/**
 * Parses uploaded Excel file (.xlsx, .xls, .csv) into worksheet JSON.
 */
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          reject(new Error('The uploaded Excel file contains no worksheets.'));
          return;
        }

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert worksheet to raw 2D array of cells to inspect headers flexibly
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        
        if (!rawRows || rawRows.length === 0) {
          reject(new Error('The uploaded Excel worksheet is empty.'));
          return;
        }

        resolve(rawRows);
      } catch (err) {
        reject(new Error('Failed to read Excel file. Please ensure it is a valid .xlsx or .xls file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file from disk.'));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Validates header columns and maps raw 2D array rows into normalized question objects.
 */
export const processAndValidateExcelData = (rawRows) => {
  if (!rawRows || rawRows.length < 2) {
    return {
      isValid: false,
      errors: ['The uploaded file must contain a header row and at least one question row.'],
      questions: [],
      headerMap: {}
    };
  }

  const rawHeaderRow = rawRows[0];
  const normalizedHeaders = rawHeaderRow.map(normalizeHeader);

  // Required header definitions
  const requiredColumns = [
    { key: 'question', target: 'Question', aliases: ['question', 'q', 'question text', 'question prompt'] },
    { key: 'optionA', target: 'Option A', aliases: ['option a', 'optiona', 'a', 'choice a'] },
    { key: 'optionB', target: 'Option B', aliases: ['option b', 'optionb', 'b', 'choice b'] },
    { key: 'optionC', target: 'Option C', aliases: ['option c', 'optionc', 'c', 'choice c'] },
    { key: 'optionD', target: 'Option D', aliases: ['option d', 'optiond', 'd', 'choice d'] },
    { key: 'correctAnswer', target: 'Correct Answer', aliases: ['correct answer', 'correctanswer', 'correct', 'answer', 'key'] }
  ];

  const headerMap = {};
  const missingColumns = [];

  requiredColumns.forEach((colDef) => {
    let foundIndex = -1;
    for (let i = 0; i < normalizedHeaders.length; i++) {
      const h = normalizedHeaders[i];
      if (colDef.aliases.includes(h)) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex !== -1) {
      headerMap[colDef.key] = foundIndex;
    } else {
      missingColumns.push(colDef.target);
    }
  });

  if (missingColumns.length > 0) {
    return {
      isValid: false,
      errors: [
        'Invalid Excel format',
        `Missing required column(s): ${missingColumns.join(', ')}`
      ],
      questions: []
    };
  }

  const errors = [];
  const questions = [];
  const questionTextMap = new Map(); // For duplicate detection

  // Filter out completely empty rows at the end of the sheet
  const dataRows = rawRows.slice(1).filter((row) => {
    if (!row) return false;
    return row.some((cell) => String(cell).trim() !== '');
  });

  dataRows.forEach((row, rowIndex) => {
    const rowNum = rowIndex + 1; // 1-indexed for display

    const questionText = String(row[headerMap.question] || '').trim();
    const optA = String(row[headerMap.optionA] || '').trim();
    const optB = String(row[headerMap.optionB] || '').trim();
    const optC = String(row[headerMap.optionC] || '').trim();
    const optD = String(row[headerMap.optionD] || '').trim();
    const rawAnswer = String(row[headerMap.correctAnswer] || '').trim();

    // Check missing fields in row
    if (!questionText) {
      errors.push(`Question ${rowNum}: Question text is missing.`);
    }
    if (!optA) {
      errors.push(`Question ${rowNum}: Option A is missing.`);
    }
    if (!optB) {
      errors.push(`Question ${rowNum}: Option B is missing.`);
    }
    if (!optC) {
      errors.push(`Question ${rowNum}: Option C is missing.`);
    }
    if (!optD) {
      errors.push(`Question ${rowNum}: Option D is missing.`);
    }

    // Normalize Correct Answer
    let normAns = '';
    let ansIndex = -1;

    const cleanedAns = rawAnswer.toUpperCase().replace(/^OPTION\s*/, '').trim();

    if (cleanedAns === 'A' || cleanedAns === '1') {
      normAns = 'A';
      ansIndex = 0;
    } else if (cleanedAns === 'B' || cleanedAns === '2') {
      normAns = 'B';
      ansIndex = 1;
    } else if (cleanedAns === 'C' || cleanedAns === '3') {
      normAns = 'C';
      ansIndex = 2;
    } else if (cleanedAns === 'D' || cleanedAns === '4') {
      normAns = 'D';
      ansIndex = 3;
    } else if (rawAnswer === optA) {
      normAns = 'A';
      ansIndex = 0;
    } else if (rawAnswer === optB) {
      normAns = 'B';
      ansIndex = 1;
    } else if (rawAnswer === optC) {
      normAns = 'C';
      ansIndex = 2;
    } else if (rawAnswer === optD) {
      normAns = 'D';
      ansIndex = 3;
    } else {
      errors.push(
        `Question ${rowNum} has an invalid Correct Answer. Expected A, B, C or D (Found: "${rawAnswer || 'Empty'}")`
      );
    }

    // Check duplicate questions
    if (questionText) {
      const lowerQ = questionText.toLowerCase();
      if (questionTextMap.has(lowerQ)) {
        const firstOccur = questionTextMap.get(lowerQ);
        errors.push(`Duplicate questions detected: Question ${firstOccur} and Question ${rowNum} ("${questionText}")`);
      } else {
        questionTextMap.set(lowerQ, rowNum);
      }
    }

    questions.push({
      id: `q-xl-${rowNum}-${Date.now()}`,
      question: questionText,
      options: [
        { id: 'A', text: optA },
        { id: 'B', text: optB },
        { id: 'C', text: optC },
        { id: 'D', text: optD }
      ],
      // Compatibility fields with student runner
      rawOptions: [optA, optB, optC, optD],
      correctAnswer: normAns,
      correctAnswerIndex: ansIndex
    });
  });

  // Configurable Maximum Questions Limit
  const MAX_QUESTIONS = 100;
  const totalCount = questions.length;
  let countNotice = '';

  if (totalCount === 0) {
    errors.push('⚠️ No questions found in Excel file. Please add at least 1 question.');
  } else if (totalCount > MAX_QUESTIONS) {
    errors.push(
      `⚠️ ${totalCount} questions found. Maximum allowed questions per examination: ${MAX_QUESTIONS}. Please reduce your question file.`
    );
  } else {
    const qWord = totalCount === 1 ? 'question' : 'questions';
    countNotice = `✓ ${totalCount} ${qWord} detected. All questions valid. Exam is ready to create.`;
  }

  const isValid = errors.length === 0 && totalCount >= 1 && totalCount <= MAX_QUESTIONS;

  return {
    isValid,
    errors,
    questions,
    totalCount,
    countNotice
  };
};

/**
 * Downloads a sample Excel template (.xlsx) with pre-filled headers and sample questions.
 */
export const downloadExcelTemplate = () => {
  const templateData = [
    {
      'Question': 'Which keyword is used for inheritance in Java?',
      'Option A': 'implements',
      'Option B': 'extends',
      'Option C': 'inherits',
      'Option D': 'super',
      'Correct Answer': 'B'
    },
    {
      'Question': 'What does JVM stand for?',
      'Option A': 'Java Virtual Machine',
      'Option B': 'Java Variable Method',
      'Option C': 'Java Version Manager',
      'Option D': 'None of the above',
      'Correct Answer': 'A'
    },
    {
      'Question': 'Which testing level verifies individual software components in isolation?',
      'Option A': 'Integration Testing',
      'Option B': 'System Testing',
      'Option C': 'Unit Testing',
      'Option D': 'Acceptance Testing',
      'Correct Answer': 'C'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateData);
  
  // Set column widths for readability
  worksheet['!cols'] = [
    { wch: 45 }, // Question
    { wch: 20 }, // Option A
    { wch: 20 }, // Option B
    { wch: 20 }, // Option C
    { wch: 20 }, // Option D
    { wch: 15 }  // Correct Answer
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Exam Questions');

  XLSX.writeFile(workbook, 'Examify_Exam_Questions_Template.xlsx');
};
