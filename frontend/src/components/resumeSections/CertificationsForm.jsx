import { Award, Plus, Trash2 } from "lucide-react";

const CertificationsForm = ({ data, onChange }) => {
    const addCertification = () => {
        onChange([
            ...data,
            {
                name: "",
                issuer: "",
                date: "",
                credential_url: "",
            },
        ]);
    };

    const removeCertification = (index) => {
        if (!window.confirm("Delete this certification?")) return;

        onChange(data.filter((_, i) => i !== index));
    };

    const updateCertification = (index, field, value) => {
        const updated = [...data];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Certifications
                    </h3>
                    <p className="text-sm text-gray-500">
                        Add your certifications and credentials
                    </p>
                </div>

                <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Certification
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No certifications added yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((cert, index) => (
                        <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg space-y-3"
                        >
                            <div className="flex justify-between items-start">
                                <h4>Certification #{index + 1}</h4>

                                <button
                                    onClick={() => removeCertification(index)}
                                    className="text-red-500 p-2 rounded-full hover:bg-red-200"
                                >
                                    <Trash2 className="size-5" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    value={cert.name || ""}
                                    placeholder="Certification Name"
                                    onChange={(e) =>
                                        updateCertification(index, "name", e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    type="text"
                                    value={cert.issuer || ""}
                                    placeholder="Issuer"
                                    onChange={(e) =>
                                        updateCertification(index, "issuer", e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    type="month"
                                    value={cert.date || ""}
                                    onChange={(e) =>
                                        updateCertification(index, "date", e.target.value)
                                    }
                                    className="px-3 py-2 text-sm rounded-lg"
                                />

                                <input
                                    type="url"
                                    value={cert.credential_url || ""}
                                    placeholder="Credential URL"
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "credential_url",
                                            e.target.value
                                        )
                                    }
                                    className="px-3 py-2 text-sm rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CertificationsForm;