import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../configs/api'
import toast from 'react-hot-toast'

const SummaryForm = ({ data, onChange, setResumeData }) => {
    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const enhanceSummary = async () => {
        try {
            setIsGenerating(true)
            const summary = data;
            const res = await api.post('/api/ai/enhance-summary', { summary }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setResumeData(prev => ({ ...prev, professional_summary: res.data.summary }))
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                    <p className='text-sm text-gray-500'>Add summary for your resume here</p>
                </div>
                <button onClick={enhanceSummary} disabled={isGenerating || !data} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100
                text-purple-700 rounded hover:bg-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed' >
                    {isGenerating ? (<Loader2 className='animate-spin size-4' />) : (<Sparkles className='size-4' />)}
                    {isGenerating ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>
            <div className='mt-4'>
                <textarea name='summary' className='w-full p-3 px-4 mt-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-500
             focus:border-blue-500 outline-none transition-colors resize-none' rows={7} value={data || ''} onChange={(e) => onChange(e.target.value)}
                    placeholder='Write a compelling professional summary that highlights your skills and career objectives...' />
                <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>
                    Tip: Keep it concise(3-4 sentences) and focus on your most relavant achievements and skills
                </p>
            </div>
        </div>
    )
}

export default SummaryForm