import React, { useState } from 'react';
import { 
  FaFileExcel, 
  FaCloudUploadAlt, 
  FaDownload, 
  FaRedo, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { downloadExcelTemplate } from '../../utils/excelParser';

/**
 * ExcelUploader component for drag-and-drop / file browser upload of .xlsx and .xls files.
 */
const ExcelUploader = ({
  onFileSelected,
  fileSummary,
  onResetFile,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndProcessFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndProcessFile(selectedFile);
    }
  };

  const validateAndProcessFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
      alert('Unsupported file type. Please upload a valid .xlsx or .xls Excel spreadsheet.');
      return;
    }
    onFileSelected(file);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
            <FaFileExcel />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">Upload Question Excel File</h3>
            <p className="text-xs text-slate-500">Upload a pre-formatted Excel spreadsheet containing all 20 MCQs.</p>
          </div>
        </div>

        {/* Template Download & Help Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadExcelTemplate}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 transition-colors cursor-pointer"
          >
            <FaDownload className="text-emerald-600" />
            <span>Download Excel Template</span>
          </button>

          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <FaQuestionCircle />
            <span>Format Help</span>
            {showHelp ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
          </button>
        </div>
      </div>

      {/* Expandable Format Help Accordion */}
      {showHelp && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <FaInfoCircle className="text-emerald-600" />
            <span>How to prepare your Excel file?</span>
          </div>

          <p className="text-slate-600">Your Excel worksheet must include the following required column headers in the first row:</p>

          <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-[11px] font-bold text-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div>1. Question</div>
            <div>2. Option A</div>
            <div>3. Option B</div>
            <div>4. Option C</div>
            <div>5. Option D</div>
            <div>6. Correct Answer</div>
          </div>

          <div className="space-y-1 text-slate-500 text-[11px]">
            <p>• <strong>Correct Answer column</strong> must specify: <code>A</code>, <code>B</code>, <code>C</code>, or <code>D</code> (or Option A, Option B...)</p>
            <p>• <strong>Exactly 20 questions</strong> are required for an examination.</p>
          </div>
        </div>
      )}

      {/* Upload Drop Zone / Selected Summary */}
      {fileSummary ? (
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              <FaFileExcel />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">{fileSummary.name}</span>
                <FaCheckCircle className="text-emerald-500" />
              </div>
              <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                {fileSummary.countNotice || `${fileSummary.totalCount} questions detected`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetFile}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors shadow-xs cursor-pointer"
          >
            <FaRedo />
            <span>Replace File</span>
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
            isDragOver
              ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
              : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400'
          }`}
        >
          <input
            type="file"
            id="excel-file-input"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileInput}
            className="hidden"
          />

          <label htmlFor="excel-file-input" className="cursor-pointer block space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-bold shadow-xs">
              <FaCloudUploadAlt />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-extrabold text-slate-900">
                Drag & Drop your Excel file here
              </h4>
              <p className="text-xs text-slate-500">OR click to browse from your computer</p>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
              <span>Browse File</span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium pt-1">
              Supported Formats: <strong>.xlsx, .xls</strong>
            </p>
          </label>
        </div>
      )}

    </div>
  );
};

export default ExcelUploader;
