import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../../configs/api'

const ExperienceForm = ({ data, onChange }) => {
    const { token } = useSelector(state => state.auth)
    const [generatingIdx, setGeneratingIdx] = useState(-1)

    const enhanceDescription = async (idx) => {
        try {
            setGeneratingIdx(idx)
            const experience = data[idx]
            const prompt = `enhance this job description - "${experience.description}" for the position of ${experience.position} at ${experience.company}`
            const res = await api.post('/api/ai/enhance-job-desc', { prompt }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            updateExperience(idx, "description", res.data.enhancedDescription)
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message)
        } finally {
            setGeneratingIdx(-1)
        }
    }

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
        const confirmDelete = window.confirm('Are you sure you want to delete this experience?')
        if (!confirmDelete) return
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
                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg
                hover:bg-green-700 transition-colors'>
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
                                <button onClick={() => removeExperience(index)} className='text-red-500 p-2.5 rounded-full hover:bg-red-200
                                    hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-5' />
                                </button>
                            </div>

                            {/* Input for Experience Details */}
                            <div className='grid md:grid-cols-2 gap-3 mb-1'>
                                <input type="text" value={experience.company || ""} onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' />
                                <input type="text" value={experience.position || ""} onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                    placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg' />
                                <input type="month" value={experience.start_date || ""} onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg' />
                                <input type="month" value={experience.is_current ? "" : experience.end_date} onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                                    className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' disabled={experience.is_current} />
                            </div>
                            <label className='flex items-center gap-1'>
                                <input type="checkbox" checked={experience.is_current} onChange={(e) => updateExperience(index, 'is_current', e.target.checked)} />
                                <span className='text-sm text-gray-700'>Currently working here</span>
                            </label>
                            <div className='space-y-3 mt-5'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>Job Description</label>
                                    <button onClick={()=> enhanceDescription(index)} disabled={generatingIdx === index || !experience.position || !experience.company || !experience.description}
                                      className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-300
                                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                                        {generatingIdx === index ? (<Loader2 className='animate-spin size-4' />) : (<Sparkles className='size-4' />)}
                                        {generatingIdx === index ? "Enhancing..." : "AI Enhance"}
                                    </button>
                                </div>
                                <textarea rows={4} value={experience.description || ''} onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                    className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and achievements...' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm