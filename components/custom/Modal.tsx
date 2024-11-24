// import React, { ReactNode } from 'react';
// import { X } from 'lucide-react';

// // Base Modal Props
// interface BaseModalProps {
//   title: string;
//   onClose: () => void;
//   onSave: () => void;
//   children: ReactNode;
//   isValid?: boolean;
// }

// // Base Modal Component
// const BaseModal: React.FC<BaseModalProps> = ({ 
//   title, 
//   onClose, 
//   onSave, 
//   children,
//   isValid = true 
// }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           {children}
//         </div>

//         <div className="flex justify-end space-x-2 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             disabled={!isValid}
//             className={`px-4 py-2 text-sm text-white rounded-lg ${
//               isValid
//                 ? 'bg-blue-600 hover:bg-blue-700'
//                 : 'bg-blue-300 cursor-not-allowed'
//             }`}
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Form Field Components
// interface InputFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
//   error?: string;
//   placeholder?: string;
// }

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   value,
//   onChange,
//   type = "text",
//   error,
//   placeholder
// }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className={`w-full p-2 border rounded-lg ${error ? 'border-red-500' : ''}`}
//       placeholder={placeholder}
//     />
//     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//   </div>
// );

// interface TextAreaFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   rows?: number;
// }

// const TextAreaField: React.FC<TextAreaFieldProps> = ({
//   label,
//   value,
//   onChange,
//   rows = 3
// }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <textarea
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       rows={rows}
//     />
//   </div>
// );

// interface ToggleButtonGroupProps {
//   label: string;
//   options: string[];
//   value: string | string[];
//   onChange: (value: string) => void;
//   isMulti?: boolean;
//   getButtonStyle?: (option: string) => string;
// }

// const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
//   label,
//   options,
//   value,
//   onChange,
//   isMulti = false,
//   getButtonStyle
// }) => (
//   <div>
//     <label className="block text-sm font-medium mb-2">{label}</label>
//     <div className="flex flex-wrap gap-2">
//       {options.map(option => (
//         <button
//           key={option}
//           onClick={() => onChange(option)}
//           className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//             getButtonStyle ? getButtonStyle(option) : 
//             Array.isArray(value) ? 
//               value.includes(option) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//               : value === option ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//           }`}
//         >
//           {option}
//           {Array.isArray(value) ? 
//             value.includes(option) && ' ✓' : 
//             value === option && ' ✓'}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// export {
//   BaseModal,
//   InputField,
//   TextAreaField,
//   ToggleButtonGroup,
//   type BaseModalProps,
//   type InputFieldProps,
//   type TextAreaFieldProps,
//   type ToggleButtonGroupProps
// };