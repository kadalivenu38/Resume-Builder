import React from 'react'
import { BriefcaseBusiness, Globe, Mail, MapPin, Phone, User } from 'lucide-react'
import LinkedinIcon from '../LinkedInIcon'

const PersonalDataForm = ({ data, onChange, template, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: 'full_name', label: 'Full Name', icon: User, type: 'text', required: true },
        { key: 'email', label: 'Email', icon: Mail, type: 'email', required: true },
        { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
        { key: 'location', label: 'Location', icon: MapPin, type: 'text' },
        { key: 'job_role', label: 'Job Role', icon: BriefcaseBusiness, type: 'text' },
        { key: 'linkedin', label: 'LinkedIn Profile', icon: LinkedinIcon, type: 'url' },
        { key: 'website', label: 'Portfolio Website', icon: Globe, type: 'url' }
    ]

    return (
        <div>
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the personal information section.</p>
            {template === 'minimal-image' && (
                <div className='flex items-center gap-2'>
                    <label>
                        {data.image ? (
                            <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image"
                                className='w-20 h-20 rounded-full object-cover mt-2 ring-black-500 hover:opacity-80 cursor-pointer' />
                        ) : (
                            <div className='inline-flex items-center gap-2 mt-2 text-slate-500 hover:text-slate-800 cursor-pointer'>
                                <User className='size-11 p-2.5 border rounded-full' />
                                Upload Image
                            </div>
                        )}
                        <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e) => handleChange('image', e.target.files[0])} />
                    </label>

                    {typeof data.image === 'object' && (
                        <div className='flex flex-col gap-1 pl-4 text-sm'>
                            <p>Remove Background</p>
                            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                <input type="checkbox" className='sr-only peer' onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                                <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'></div>
                                <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200
                         ease-in-out peer-checked:translate-x-4'></span>
                            </label>
                        </div>
                    )}
                </div>
            )}
            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className='space-y-1 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                            <Icon className='size-4' />
                            {field.label}
                            {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        <input type={field.type} value={data[field.key] || ''} onChange={(e) => handleChange(field.key, e.target.value)}
                            className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none
                         transition-colors text-sm' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} />
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalDataForm