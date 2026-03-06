import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Edit2, Trash2, Save, X, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  enabled: boolean;
  options?: { id: string; value: string; label: string }[];
}

const defaultFields: FormField[] = [
  {
    id: 'fullName',
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
    enabled: true,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    required: true,
    enabled: true,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    required: true,
    enabled: true,
  },
  {
    id: 'loanAmount',
    name: 'loanAmount',
    label: 'Loan Amount Interested',
    type: 'select',
    placeholder: 'Select loan amount',
    required: true,
    enabled: true,
    options: [
      { id: '1', value: 'under-5000', label: 'Under $5,000' },
      { id: '2', value: '5000-10000', label: '$5,000 - $10,000' },
      { id: '3', value: '10000-25000', label: '$10,000 - $25,000' },
      { id: '4', value: '25000-50000', label: '$25,000 - $50,000' },
      { id: '5', value: '50000-plus', label: '$50,000+' },
    ],
  },
  {
    id: 'employmentStatus',
    name: 'employmentStatus',
    label: 'Employment Status',
    type: 'select',
    placeholder: 'Select employment status',
    required: true,
    enabled: true,
    options: [
      { id: '1', value: 'employed-full', label: 'Employed Full-Time' },
      { id: '2', value: 'employed-part', label: 'Employed Part-Time' },
      { id: '3', value: 'self-employed', label: 'Self-Employed' },
      { id: '4', value: 'business-owner', label: 'Business Owner' },
      { id: '5', value: 'retired', label: 'Retired' },
      { id: '6', value: 'student', label: 'Student' },
      { id: '7', value: 'other', label: 'Other' },
    ],
  },
  {
    id: 'message',
    name: 'message',
    label: 'Additional Information',
    type: 'textarea',
    placeholder: 'Tell us more about your requirements...',
    required: false,
    enabled: true,
  },
];

export default function AdminContactForm() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<{ fieldId: string; optionId: string } | null>(null);
  const [showAddField, setShowAddField] = useState(false);
  const [showAddOption, setShowAddOption] = useState<string | null>(null);
  const [expandedFields, setExpandedFields] = useState<string[]>([]);
  const [saveMessage, setSaveMessage] = useState('');

  // New field form state
  const [newField, setNewField] = useState<Partial<FormField>>({
    name: '',
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
    enabled: true,
  });

  // New option form state
  const [newOption, setNewOption] = useState({ value: '', label: '' });

  // Edit field form state
  const [editFieldData, setEditFieldData] = useState<Partial<FormField>>({});

  // Edit option form state
  const [editOptionData, setEditOptionData] = useState({ value: '', label: '' });

  useEffect(() => {
    const savedFields = localStorage.getItem('contactFormFields');
    if (savedFields) {
      setFields(JSON.parse(savedFields));
    } else {
      setFields(defaultFields);
      localStorage.setItem('contactFormFields', JSON.stringify(defaultFields));
    }
  }, []);

  const saveFields = (updatedFields: FormField[]) => {
    setFields(updatedFields);
    localStorage.setItem('contactFormFields', JSON.stringify(updatedFields));
    setSaveMessage('Changes saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const toggleFieldExpanded = (fieldId: string) => {
    setExpandedFields(prev =>
      prev.includes(fieldId) ? prev.filter(id => id !== fieldId) : [...prev, fieldId]
    );
  };

  const toggleFieldEnabled = (fieldId: string) => {
    const updatedFields = fields.map(field =>
      field.id === fieldId ? { ...field, enabled: !field.enabled } : field
    );
    saveFields(updatedFields);
  };

  // Toggle required is handled in editFieldData

  // Add new field
  const handleAddField = () => {
    if (!newField.name || !newField.label) return;

    const field: FormField = {
      id: Date.now().toString(),
      name: newField.name || '',
      label: newField.label || '',
      type: newField.type || 'text',
      placeholder: newField.placeholder || '',
      required: newField.required || false,
      enabled: true,
      options: newField.type === 'select' ? [] : undefined,
    };

    const updatedFields = [...fields, field];
    saveFields(updatedFields);
    setNewField({
      name: '',
      label: '',
      type: 'text',
      placeholder: '',
      required: false,
      enabled: true,
    });
    setShowAddField(false);
  };

  // Edit field
  const startEditField = (field: FormField) => {
    setEditingField(field.id);
    setEditFieldData({
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
    });
  };

  const handleEditField = (fieldId: string) => {
    const updatedFields = fields.map(field =>
      field.id === fieldId
        ? { ...field, ...editFieldData }
        : field
    );
    saveFields(updatedFields);
    setEditingField(null);
    setEditFieldData({});
  };

  // Delete field
  const handleDeleteField = (fieldId: string) => {
    if (confirm('Are you sure you want to delete this field?')) {
      const updatedFields = fields.filter(field => field.id !== fieldId);
      saveFields(updatedFields);
    }
  };

  // Add option to select field
  const handleAddOption = (fieldId: string) => {
    if (!newOption.value || !newOption.label) return;

    const updatedFields = fields.map(field => {
      if (field.id === fieldId && field.options) {
        return {
          ...field,
          options: [
            ...field.options,
            { id: Date.now().toString(), value: newOption.value, label: newOption.label },
          ],
        };
      }
      return field;
    });

    saveFields(updatedFields);
    setNewOption({ value: '', label: '' });
    setShowAddOption(null);
  };

  // Edit option
  const startEditOption = (fieldId: string, option: { id: string; value: string; label: string }) => {
    setEditingOption({ fieldId, optionId: option.id });
    setEditOptionData({ value: option.value, label: option.label });
  };

  const handleEditOption = () => {
    if (!editingOption) return;

    const updatedFields = fields.map(field => {
      if (field.id === editingOption.fieldId && field.options) {
        return {
          ...field,
          options: field.options.map(opt =>
            opt.id === editingOption.optionId
              ? { ...opt, ...editOptionData }
              : opt
          ),
        };
      }
      return field;
    });

    saveFields(updatedFields);
    setEditingOption(null);
    setEditOptionData({ value: '', label: '' });
  };

  // Delete option
  const handleDeleteOption = (fieldId: string, optionId: string) => {
    if (confirm('Are you sure you want to delete this option?')) {
      const updatedFields = fields.map(field => {
        if (field.id === fieldId && field.options) {
          return {
            ...field,
            options: field.options.filter(opt => opt.id !== optionId),
          };
        }
        return field;
      });
      saveFields(updatedFields);
    }
  };

  // Move field up/down
  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const index = fields.findIndex(f => f.id === fieldId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    saveFields(newFields);
  };

  // Move option up/down
  const moveOption = (fieldId: string, optionId: string, direction: 'up' | 'down') => {
    const updatedFields = fields.map(field => {
      if (field.id === fieldId && field.options) {
        const index = field.options.findIndex(o => o.id === optionId);
        if (
          (direction === 'up' && index === 0) ||
          (direction === 'down' && index === field.options.length - 1)
        ) {
          return field;
        }

        const newOptions = [...field.options];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newOptions[index], newOptions[newIndex]] = [newOptions[newIndex], newOptions[index]];
        return { ...field, options: newOptions };
      }
      return field;
    });
    saveFields(updatedFields);
  };

  const getFieldTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      text: 'Text Input',
      email: 'Email Input',
      tel: 'Phone Input',
      textarea: 'Text Area',
      select: 'Dropdown Select',
    };
    return types[type] || type;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Form Settings</h1>
            <p className="text-gray-600 mt-1">Manage form fields and options for the contact page</p>
          </div>
          <button
            onClick={() => setShowAddField(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Field
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <Save className="w-5 h-5" />
            {saveMessage}
          </div>
        )}

        {/* Add New Field Form */}
        {showAddField && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Field</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name (ID)</label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value.replace(/\s/g, '') })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="fieldName"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Field Label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as FormField['type'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="text">Text Input</option>
                  <option value="email">Email Input</option>
                  <option value="tel">Phone Input</option>
                  <option value="textarea">Text Area</option>
                  <option value="select">Dropdown Select</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                <input
                  type="text"
                  value={newField.placeholder}
                  onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter placeholder text"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newFieldRequired"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="newFieldRequired" className="text-sm font-medium text-gray-700">Required Field</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddField(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddField}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Field
              </button>
            </div>
          </div>
        )}

        {/* Fields List */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`bg-white rounded-xl shadow-sm border ${field.enabled ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}
            >
              {/* Field Header */}
              <div className="p-4 flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveField(field.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveField(field.id, 'down')}
                    disabled={index === fields.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <GripVertical className="w-5 h-5 text-gray-400" />
                
                <div className="flex-1">
                  {editingField === field.id ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        value={editFieldData.label}
                        onChange={(e) => setEditFieldData({ ...editFieldData, label: e.target.value })}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={editFieldData.placeholder}
                        onChange={(e) => setEditFieldData({ ...editFieldData, placeholder: e.target.value })}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Placeholder"
                      />
                      <button
                        onClick={() => handleEditField(field.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingField(null)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{field.label}</h3>
                        {field.required && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>
                        )}
                        {!field.enabled && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Disabled</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {getFieldTypeLabel(field.type)} • {field.name}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Enabled */}
                  <button
                    onClick={() => toggleFieldEnabled(field.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${field.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${field.enabled ? 'left-7' : 'left-1'}`}
                    />
                  </button>

                  <button
                    onClick={() => startEditField(field)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {field.type === 'select' && (
                    <button
                      onClick={() => toggleFieldExpanded(field.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedFields.includes(field.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Options List for Select Fields */}
              {field.type === 'select' && expandedFields.includes(field.id) && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">Dropdown Options</h4>
                    <button
                      onClick={() => setShowAddOption(field.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  </div>

                  {/* Add Option Form */}
                  {showAddOption === field.id && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="text"
                          value={newOption.value}
                          onChange={(e) => setNewOption({ ...newOption, value: e.target.value.replace(/\s/g, '-').toLowerCase() })}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="value-id"
                        />
                        <input
                          type="text"
                          value={newOption.label}
                          onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Display Label"
                        />
                        <button
                          onClick={() => handleAddOption(field.id)}
                          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setShowAddOption(null);
                            setNewOption({ value: '', label: '' });
                          }}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2">
                    {field.options?.map((option, optIndex) => (
                      <div
                        key={option.id}
                        className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3"
                      >
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveOption(field.id, option.id, 'up')}
                            disabled={optIndex === 0}
                            className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveOption(field.id, option.id, 'down')}
                            disabled={optIndex === (field.options?.length || 0) - 1}
                            className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>

                        {editingOption?.fieldId === field.id && editingOption?.optionId === option.id ? (
                          <>
                            <input
                              type="text"
                              value={editOptionData.value}
                              onChange={(e) => setEditOptionData({ ...editOptionData, value: e.target.value })}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="value-id"
                            />
                            <input
                              type="text"
                              value={editOptionData.label}
                              onChange={(e) => setEditOptionData({ ...editOptionData, label: e.target.value })}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Display Label"
                            />
                            <button
                              onClick={handleEditOption}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingOption(null)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">{option.label}</span>
                              <span className="text-gray-400 text-sm ml-2">({option.value})</span>
                            </div>
                            <button
                              onClick={() => startEditOption(field.id, option)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteOption(field.id, option.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}

                    {(!field.options || field.options.length === 0) && (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No options added yet. Click "Add Option" to add dropdown choices.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Preview</h3>
          <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-xl">
            <div className="space-y-4">
              {fields.filter(f => f.enabled).map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      disabled
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.id} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
