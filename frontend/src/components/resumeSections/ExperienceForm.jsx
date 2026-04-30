import { Briefcase, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({ data, onChange }) => {
    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false
        }
        onChange([...data, newExperience])
    }
    const removeExperience = (index) => {
        const updatedExperience = data.filter((_, i) => i !== index)
        onChange(updatedExperience)
    }
    const updateExperience = (index, field, value) => {
        const updatedExperience = [...data]
        updatedExperience[index] = { ...updatedExperience[index], [field]: value }
        onChange(updatedExperience)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Work Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experiences here</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200
                 transition-colors'>
                    <Plus className='size-4' />Add Experience
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to start building your resume.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            {/* Input for Experience Details */}
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input type="text" value={experience.company || ""} onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' />
                                <input type="text" value={experience.position || ""} onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                    placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg' />
                                <input type="month" value={experience.start_date || ""} onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm