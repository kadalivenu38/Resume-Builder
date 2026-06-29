import { Award, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const CertificationsForm = ({ data, onChange }) => {
  const addCertification = () => {
    const newCertification = {
      name: '',
      issuer: '',
      date: '',
      link: '',
    }
    onChange([...data, newCertification])
  }

  const removeCertification = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this certification?')
    if (!confirmDelete) return
    const updatedCertifications = data.filter((_, i) => i !== index)
    onChange(updatedCertifications)
  }

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...data]
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value }
    onChange(updatedCertifications)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Certifications</h3>
          <p className='text-sm text-gray-500'>Add your professional credentials here</p>
        </div>
        <button onClick={addCertification} className='flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors'>
          <Plus className='size-4' />Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Award className='w-14 h-14 mx-auto mb-2 text-gray-300' />
          <p>No certifications added yet.</p>
          <p className='text-sm'>Click “Add Certification” to start building your list.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((certification, index) => (
            <div key={index} className='p-3 border border-gray-200 rounded-lg space-y-3'>
              <div className='flex justify-between items-start'>
                <h4>Certification #{index + 1}</h4>
                <button onClick={() => removeCertification(index)} className='text-red-500 p-2.5 rounded-full hover:bg-red-200 hover:text-red-700 transition-colors'>
                  <Trash2 className='size-5' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-2'>
                <input
                  type='text'
                  value={certification.name || ''}
                  onChange={(e) => updateCertification(index, 'name', e.target.value)}
                  placeholder='Certification Name'
                  className='px-3 py-2 text-sm rounded-lg'
                />
                <input
                  type='text'
                  value={certification.issuer || ''}
                  onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                  placeholder='Issuer'
                  className='px-3 py-2 text-sm rounded-lg'
                />
                <input
                  type='month'
                  value={certification.date || ''}
                  onChange={(e) => updateCertification(index, 'date', e.target.value)}
                  onFocus={(e) => e.target.showPicker?.()}
                  placeholder='Issued Date'
                  className='px-3 py-2 text-sm rounded-lg cursor-pointer'
                />
                <input
                  type='url'
                  value={certification.link || ''}
                  onChange={(e) => updateCertification(index, 'link', e.target.value)}
                  placeholder='Certificate Link'
                  className='px-3 py-2 text-sm rounded-lg'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CertificationsForm
