import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }
  const removeSkill = (index) => {
    onChange(data.filter((_, idx) => index !== idx))
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
        <p className='text-sm text-gray-500'>Add your Technical and Soft skills.</p>
      </div>

      <div className='flex gap-2'>
        <input type="text" placeholder='Enter a Skill (e.g: JavaScript, Project Management)' className='flex-1 px-3 py-2 text-sm'
          value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={handleKeyPress} />
        <button onClick={addSkill} disabled={!newSkill.trim()} className='flex items-center gap-1 px-3 py-1 bg-green-500 text-white
          rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          <Plus className='size-4' />Add
        </button>
      </div>
      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
          {data.map((skill, index)=> (
            <span key={index} className='flex items-center pl-3 bg-blue-100 text-blue-900 rounded-full'>
              {skill}
              <button onClick={()=> removeSkill(index)} className='flex items-center ml-1 hover:bg-blue-300 rounded-full
                hover:text-red-700 p-0.5 transition-colors'>
                <X className='size-4.5'/>
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className='text-center py-6 text-gray-500'>
          <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
          <p>No skills added yet.</p>
          <p className='text-sm'>Add your technical and soft skills above.</p>
        </div>
      )}

      <div className='bg-blue-50 p-4 rounded-lg'>
        <p className='text-sm text-blue-800'><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming, languages, tools)
          and soft skills (leadership, communication).</p>
      </div>
    </div>
  )
}

export default SkillsForm