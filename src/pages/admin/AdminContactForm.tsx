import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { formFieldsAPI } from '../../services/api';
import { Plus, Edit2, Trash2, Save, X, GripVertical, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';

interface FormOption {
  id: number;
  field_id: number;
  option_value: string;
  option_label: string;
  sort_order: number;
}

interface FormField {
  id: number;
  field_name: string;
  label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  enabled: boolean;
  sort_order: number;
  options?: FormOption[];
}

export default function AdminContactForm() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<number | null>(null);
  const [editingOption, setEditingOption] = useState<{ fieldId: number; optionId: number } | null>(null);
  const [showAddField, setShowAddField] = useState(false);
  const [showAddOption, setShowAddOption] = useState<number | null>(null);
  const [expandedFields, setExpandedFields] = useState<number[]>([]);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New field form state
  const [newField, setNewField] = useState({
    field_name: '',
    label: '',
    field_type: 'text' as FormField['field_type'],
    placeholder: '',
    required: false,
  });

  // New option form state
  const [newOption, setNewOption] = useState({ option_value: '', option_label: '' });

  // Edit field form state
  const [editFieldData, setEditFieldData] = useState<Partial<FormField>>({});

  // Edit option form state
  const [editOptionData, setEditOptionData] = useState({ option_value: '', option_label: '' });

  const fetchFields = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await formFieldsAPI.getAll();
      if (response.fields) {
        setFields(response.fields);
      }
    } catch (err) {
      console.error('Error fetching fields:', err);
      setError('Failed to load form fields.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const showSuccess = (message: string = 'Changes saved successfully!') => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const toggleFieldExpanded = (fieldId: number) => {
    setExpandedFields(prev =>
      prev.includes(fieldId) ? prev.filter(id => id !== fieldId) : [...prev, fieldId]
    );
  };

  const toggleFieldEnabled = async (fieldId: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return;
    
    try {
      await formFieldsAPI.update(fieldId, { enabled: !field.enabled });
      setFields(fields.map(f => f.id === fieldId ? { ...f, enabled: !f.enabled } : f));
      showSuccess();
    } catch (err) {
      console.error('Error updating field:', err);
    }
  };

  // Add new field
  const handleAddField = async () => {
    if (!newField.field_name || !newField.label) return;

    try {
      const response = await formFieldsAPI.create({
        field_name: newField.field_name,
        label: newField.label,
        field_type: newField.field_type,
        placeholder: newField.placeholder,
        required: newField.required,
        enabled: true,
        sort_order: fields.length + 1,
      });
      
      if (response.id) {
        setFields([...fields, {
          id: response.id,
          field_name: newField.field_name,
          label: newField.label,
          field_type: newField.field_type,
          placeholder: newField.placeholder,
          required: newField.required,
          enabled: true,
          sort_order: fields.length + 1,
          options: newField.field_type === 'select' ? [] : undefined,
        }]);
        setNewField({
          field_name: '',
          label: '',
          field_type: 'text',
          placeholder: '',
          required: false,
        });
        setShowAddField(false);
        showSuccess('Field added successfully!');
      }
    } catch (err) {
      console.error('Error adding field:', err);
      alert('Failed to add field.');
    }
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

  const handleEditField = async (fieldId: number) => {
    try {
      await formFieldsAPI.update(fieldId, editFieldData);
      setFields(fields.map(field =>
        field.id === fieldId ? { ...field, ...editFieldData } : field
      ));
      setEditingField(null);
      setEditFieldData({});
      showSuccess();
    } catch (err) {
      console.error('Error updating field:', err);
    }
  };

  // Delete field
  const handleDeleteField = async (fieldId: number) => {
    if (!confirm('Are you sure you want to delete this field?')) return;
    
    try {
      await formFieldsAPI.delete(fieldId);
      setFields(fields.filter(field => field.id !== fieldId));
      showSuccess('Field deleted successfully!');
    } catch (err) {
      console.error('Error deleting field:', err);
    }
  };

  // Add option to select field
  const handleAddOption = async (fieldId: number) => {
    if (!newOption.option_value || !newOption.option_label) return;

    try {
      const response = await formFieldsAPI.createOption({
        field_id: fieldId,
        option_value: newOption.option_value,
        option_label: newOption.option_label,
      });
      
      if (response.id) {
        const field = fields.find(f => f.id === fieldId);
        const newOpt: FormOption = {
          id: response.id,
          field_id: fieldId,
          option_value: newOption.option_value,
          option_label: newOption.option_label,
          sort_order: (field?.options?.length || 0) + 1,
        };
        
        setFields(fields.map(f => {
          if (f.id === fieldId) {
            return { ...f, options: [...(f.options || []), newOpt] };
          }
          return f;
        }));
        
        setNewOption({ option_value: '', option_label: '' });
        setShowAddOption(null);
        showSuccess('Option added successfully!');
      }
    } catch (err) {
      console.error('Error adding option:', err);
    }
  };

  // Edit option
  const startEditOption = (fieldId: number, option: FormOption) => {
    setEditingOption({ fieldId, optionId: option.id });
    setEditOptionData({ option_value: option.option_value, option_label: option.option_label });
  };

  const handleEditOption = async () => {
    if (!editingOption) return;

    try {
      await formFieldsAPI.updateOption(editingOption.optionId, editOptionData);
      
      setFields(fields.map(field => {
        if (field.id === editingOption.fieldId && field.options) {
          return {
            ...field,
            options: field.options.map(opt =>
              opt.id === editingOption.optionId ? { ...opt, ...editOptionData } : opt
            ),
          };
        }
        return field;
      }));
      
      setEditingOption(null);
      setEditOptionData({ option_value: '', option_label: '' });
      showSuccess();
    } catch (err) {
      console.error('Error updating option:', err);
    }
  };

  // Delete option
  const handleDeleteOption = async (fieldId: number, optionId: number) => {
    if (!confirm('Are you sure you want to delete this option?')) return;
    
    try {
      await formFieldsAPI.deleteOption(optionId);
      setFields(fields.map(field => {
        if (field.id === fieldId && field.options) {
          return { ...field, options: field.options.filter(opt => opt.id !== optionId) };
        }
        return field;
      }));
      showSuccess('Option deleted successfully!');
    } catch (err) {
      console.error('Error deleting option:', err);
    }
  };

  // Move field up/down
  const moveField = async (fieldId: number, direction: 'up' | 'down') => {
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
    setFields(newFields);
    
    try {
      await formFieldsAPI.reorder(newFields.map(f => f.id));
      showSuccess();
    } catch (err) {
      console.error('Error reordering fields:', err);
    }
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Form Settings</h1>
            <p className="text-gray-600 mt-1">Manage form fields and options for the contact page</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchFields}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => setShowAddField(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Field
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

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
                  value={newField.field_name}
                  onChange={(e) => setNewField({ ...newField, field_name: e.target.value.replace(/\s/g, '') })}
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
                  value={newField.field_type}
                  onChange={(e) => setNewField({ ...newField, field_type: e.target.value as FormField['field_type'] })}
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
                        {getFieldTypeLabel(field.field_type)} • {field.field_name}
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

                  {field.field_type === 'select' && (
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
              {field.field_type === 'select' && expandedFields.includes(field.id) && (
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
                          value={newOption.option_value}
                          onChange={(e) => setNewOption({ ...newOption, option_value: e.target.value.replace(/\s/g, '-').toLowerCase() })}
                          className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="value-id"
                        />
                        <input
                          type="text"
                          value={newOption.option_label}
                          onChange={(e) => setNewOption({ ...newOption, option_label: e.target.value })}
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
                            setNewOption({ option_value: '', option_label: '' });
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
                    {field.options?.map((option) => (
                      <div
                        key={option.id}
                        className="bg-white p-3 rounded-lg border border-gray-200 flex items-center gap-3"
                      >
                        {editingOption?.fieldId === field.id && editingOption?.optionId === option.id ? (
                          <>
                            <input
                              type="text"
                              value={editOptionData.option_value}
                              onChange={(e) => setEditOptionData({ ...editOptionData, option_value: e.target.value })}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="value-id"
                            />
                            <input
                              type="text"
                              value={editOptionData.option_label}
                              onChange={(e) => setEditOptionData({ ...editOptionData, option_label: e.target.value })}
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
                              <span className="font-medium text-gray-900">{option.option_label}</span>
                              <span className="text-gray-400 text-sm ml-2">({option.option_value})</span>
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

          {fields.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              No form fields found. Click "Add New Field" to create one.
            </div>
          )}
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
                  {field.field_type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      disabled
                    />
                  ) : field.field_type === 'select' ? (
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      disabled
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.id} value={opt.option_value}>{opt.option_label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.field_type}
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
