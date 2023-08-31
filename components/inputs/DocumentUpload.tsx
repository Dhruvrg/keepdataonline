"use client";

interface DocumentUploadProps {
  onChange: (value: any) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onChange }) => {
  return (
    <input
      className="block w-full text-sm bg-[#232429] text-gray-900 border border-black focus:border-neutral-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600"
      id="multiple_files"
      type="file"
      onChange={onChange}
      multiple
    />
  );
};

export default DocumentUpload;
