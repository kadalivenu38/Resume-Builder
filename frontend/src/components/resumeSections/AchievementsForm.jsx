import { Trophy, Plus, Trash2 } from "lucide-react";

const AchievementsForm = ({ data, onChange }) => {
    const addAchievement = () => {
        onChange([
            ...data,
            {
                contents: "",
            },
        ]);
    };

    const removeAchievement = (index) => {
        if (!window.confirm("Delete this achievement?")) return;

        onChange(data.filter((_, i) => i !== index));
    };

    const updateAchievement = (index, value) => {
        const updated = [...data];
        updated[index] = {
            contents: value,
        };

        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Achievements
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add awards, rankings, accomplishments, etc.
                    </p>
                </div>

                <button
                    onClick={addAchievement}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                    <Plus className="size-4" />
                    Add Achievement
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No achievements added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((achievement, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-2"
                        >
                            <div className="flex justify-between items-start">
                                <h4>Achievement #{index + 1}</h4>

                                <button
                                    onClick={() => removeAchievement(index)}
                                    className="text-red-500 p-2 rounded-full hover:bg-red-200"
                                >
                                    <Trash2 className="size-5" />
                                </button>
                            </div>

                            <textarea
                                rows={3}
                                value={achievement.contents || ""}
                                onChange={(e) =>
                                    updateAchievement(index, e.target.value)
                                }
                                className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                                placeholder="Example: Secured 1st Prize in Project Presentation at VEDA 2K24."
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AchievementsForm;