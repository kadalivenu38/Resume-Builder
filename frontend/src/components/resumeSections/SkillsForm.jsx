import { Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const skillSections = [
  { key: 'languages', label: 'Programming Languages', placeholder: 'Python, Java, C++' },
  { key: 'development', label: 'Development', placeholder: 'JavaScript, React, Node.js' },
  { key: 'cloud', label: 'Cloud / DevOps', placeholder: 'AWS, Azure, Terraform' },
  { key: 'tools', label: 'Tools / Platforms', placeholder: 'Git, Docker, Figma' },
]

const getInitialSkillFields = (data) => {
  const initial = {
    languages: '',
    development: '',
    cloud: '',
    tools: '',
  }

  if (Array.isArray(data)) {
    initial.development = data.join(', ')
    return initial
  }

  if (data && typeof data === 'object') {
    return {
      languages: Array.isArray(data.languages)
        ? data.languages.join(', ')
        : Array.isArray(data.programmingLanguages)
          ? data.programmingLanguages.join(', ')
          : '',
      development: Array.isArray(data.development)
        ? data.development.join(', ')
        : '',
      cloud: Array.isArray(data.cloud)
        ? data.cloud.join(', ')
        : Array.isArray(data.cloudDevOps)
          ? data.cloudDevOps.join(', ')
          : '',
      tools: Array.isArray(data.tools)
        ? data.tools.join(', ')
        : Array.isArray(data.toolsPlatforms)
          ? data.toolsPlatforms.join(', ')
          : '',
    }
  }

  return initial
}

const splitSkills = (value) =>
  String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const getSkillsFromFields = (fields) => ({
  languages: splitSkills(fields.languages),
  development: splitSkills(fields.development),
  cloud: splitSkills(fields.cloud),
  tools: splitSkills(fields.tools),
})

const SkillsForm = ({ data, onChange }) => {
  const [skillFields, setSkillFields] = useState(() => getInitialSkillFields(data))

  useEffect(() => {
    const currentSkills = getSkillsFromFields(skillFields)
    if (JSON.stringify(data || []) !== JSON.stringify(currentSkills)) {
      setSkillFields(getInitialSkillFields(data))
    }
  }, [data])

  const handleFieldChange = (field, value) => {
    const updatedFields = { ...skillFields, [field]: value }
    setSkillFields(updatedFields)
    onChange(getSkillsFromFields(updatedFields))
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
        <p className='text-sm text-gray-500'>Add your technical and professional strengths in a structured way.</p>
      </div>

      <div className='space-y-4'>
        {skillSections.map((section) => (
          <div key={section.key} className='p-4 border border-gray-200 rounded-lg space-y-2 bg-white'>
            <label className='text-sm font-medium text-gray-700'>{section.label}</label>
            <input
              type='text'
              value={skillFields[section.key] || ''}
              onChange={(e) => handleFieldChange(section.key, e.target.value)}
              placeholder={section.placeholder}
              className='w-full px-3 py-2 text-sm rounded-lg'
            />
          </div>
        ))}
      </div>

      <div className='bg-blue-50 p-4 rounded-lg'>
        <div className='flex items-center gap-2 text-sm font-medium text-blue-800'>
          <Sparkles className='size-4' />
          Tip
        </div>
        <p className='mt-1 text-sm text-blue-700'>Separate each skill with a comma. This keeps your resume neat and easy to scan.</p>
      </div>
    </div>
  )
}

export default SkillsForm