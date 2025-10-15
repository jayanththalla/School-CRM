import { useState, useCallback } from 'react';
import { AlertCircle, Check, FileText, Upload } from 'lucide-react';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assignments`);
  const assignments = await res.json();

  return {
    props: {
      initialAssignments: assignments || [], 
    },
  };
}

const Assignments = ({ initialAssignments }) => {
  const [assignments, setAssignments] = useState(initialAssignments || []); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingAssignmentId, setUploadingAssignmentId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback((event, assignmentId) => {
    const file = event.target.files[0];
    const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
    
    if (!allowedExtensions.exec(file.name)) {
      setNotification({ type: 'error', message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' });
      return;
    }

    setSelectedFile(file);
    setUploadingAssignmentId(assignmentId);
    setUploadProgress(0);
  }, []);

  const handleFileUpload = useCallback(async () => {
    if (!selectedFile) {
      setNotification({ type: 'error', message: 'Please select a file to upload.' });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('assignmentId', uploadingAssignmentId);

    try {
      const response = await fetch('/api/upload-assignment', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setAssignments((prevAssignments) =>
          prevAssignments.map((assignment) =>
            assignment.id === uploadingAssignmentId
              ? { ...assignment, status: 'submitted', file: selectedFile.name }
              : assignment
          )
        );
        setNotification({ type: 'success', message: 'Assignment submitted successfully!' });
        setUploadProgress(100);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('File upload failed:', error);
      setNotification({ type: 'error', message: 'File upload failed. Please try again.' });
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setUploadingAssignmentId(null);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, [selectedFile, uploadingAssignmentId]);

  const getDueDateStatus = useCallback((dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    return due >= today;
  }, []);

  const renderAssignmentList = useCallback((status) => {
    const filteredAssignments = assignments?.filter((assignment) => assignment.status === status) || [];  // Safely filter assignments

    if (filteredAssignments.length === 0) {
      return <p className="text-gray-500">No {status} assignments.</p>;
    }

    return filteredAssignments.map((assignment) => (
      <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{assignment.subject}: {assignment.title}</h4>
            <p className="text-sm text-gray-600">{assignment.description}</p>
            <p className="text-sm">Due: {assignment.dueDate}</p>
          </div>
          <div>
            {status === 'pending' && getDueDateStatus(assignment.dueDate) ? (
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, assignment.id)}
                  className="hidden"
                  id={`file-upload-${assignment.id}`}
                />
                <label htmlFor={`file-upload-${assignment.id}`} className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Choose File
                </label>
              </div>
            ) : status === 'pending' ? (
              <span className="text-red-500 font-semibold">Past Deadline</span>
            ) : (
              <a href={`#${assignment.file}`} className="flex items-center text-blue-500 hover:underline">
                <FileText className="w-4 h-4 mr-2" />
                {assignment.file}
              </a>
            )}
          </div>
        </div>
      </div>
    ));
  }, [assignments, getDueDateStatus, handleFileChange]);

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Assignments</h2>
        
        {notification.message && (
          <div className={`p-4 mb-6 rounded ${notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {notification.type === 'error' ? <AlertCircle className="inline w-4 h-4 mr-2" /> : <Check className="inline w-4 h-4 mr-2" />}
            {notification.message}
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Pending Assignments</h3>
          {renderAssignmentList('pending')}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Submitted Assignments</h3>
          {renderAssignmentList('submitted')}
        </div>

        {selectedFile && (
          <div className="mt-6 text-center">
            {isLoading ? (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p>Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <button
                onClick={handleFileUpload}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Submit Assignment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
