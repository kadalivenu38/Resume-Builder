import React, { useEffect, useState } from 'react'
import { useParams, Link, data } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react'
import PersonalDataForm from '../components/resumeSections/PersonalDataForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import SummaryForm from '../components/resumeSections/SummaryForm'
import ExperienceForm from '../components/resumeSections/ExperienceForm'
import EducationForm from '../components/resumeSections/EducationForm'
import ProjectForm from '../components/resumeSections/ProjectForm'
import SkillsForm from '../components/resumeSections/SkillsForm'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ]
  const activeSection = sections[activeSectionIdx]

  const existingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(() => {
    existingResume()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-1 items-center text-slate-500 hover:text-slate-700 transition-colors'>
          <ArrowLeftIcon className='size-5' /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar using activeSectionIdx */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none
                 transition-discrete duration-2000' style={{ width: `${activeSectionIdx * 100 / (sections.length - 1)}%` }} />

              {/* Section Navigation */}
              <div className='flex justify-between items-center border-b border-gray-300 py-2 mb-3'>

                {/* Buttons for Template and Color */}
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center'>
                  {activeSectionIdx > 0 && (
                    <button onClick={() => setActiveSectionIdx((prev) => Math.max(prev - 1, 0))} className='flex items-center gap-1 p-2.5 rounded-lg
                     text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all'>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}
                  <button onClick={() => setActiveSectionIdx((prev) => Math.min(prev + 1, sections.length - 1))} className={`flex items-center
                      gap-1 p-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all
                      ${activeSectionIdx === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIdx === sections.length - 1}>
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalDataForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({
                    ...prev,
                    personal_info: data
                  }))} template={resumeData.template} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                )}
                {activeSection.id === 'summary' && (
                  <SummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm data={resumeData.projects} onChange={(data) => setResumeData(prev => ({ ...prev, projects: data }))} />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div>
              {/* Buttons */}
            </div>
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder