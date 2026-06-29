import { Trophy, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const AchievementsForm = ({ data, onChange }) => {
  const addAchievement = () => {
    onChange([...data, { point: '' }])
  }

  const removeAchievement = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this achievement?')
    if (!confirmDelete) return
    const updatedAchievements = data.filter((_, i) => i !== index)
    onChange(updatedAchievements)
  }

  const updateAchievement = (index, value) => {
    const updatedAchievements = [...data]
    updatedAchievements[index] = { ...updatedAchievements[index], point: value }
    onChange(updatedAchievements)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Achievements</h3>
          <p className='text-sm text-gray-500'>Add one achievement point at a time</p>
        </div>
        <button onClick={addAchievement} className='flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors'>
          <Plus className='size-4' />Add Achievement
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Trophy className='w-14 h-14 mx-auto mb-2 text-gray-300' />
          <p>No achievements added yet.</p>
          <p className='text-sm'>Click “Add Achievement” to add your notable accomplishments.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((achievement, index) => (
            <div key={index} className='p-3 border border-gray-200 rounded-lg space-y-2'>
              <div className='flex justify-between items-start'>
                <h4>Achievement #{index + 1}</h4>
                <button onClick={() => removeAchievement(index)} className='text-red-500 p-2.5 rounded-full hover:bg-red-200 hover:text-red-700 transition-colors'>
                  <Trash2 className='size-5' />
                </button>
              </div>

              <textarea
                rows={2} maxLength={120}
                value={achievement.point || ''}
                onChange={(e) => updateAchievement(index, e.target.value)}
                placeholder='Enter a single achievement point...'
                className='w-full text-sm px-3 py-2 rounded-lg resize-none'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AchievementsForm
