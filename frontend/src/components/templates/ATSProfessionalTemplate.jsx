const ATSProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 px-8 py-6 text-sm">
            {/* Header */}
            <header className="border-b-2 pb-3 mb-4" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-700">
                    {data.personal_info?.email && (
                        <span>{data.personal_info.email}</span>
                    )}

                    {data.personal_info?.phone && (
                        <span>{data.personal_info.phone}</span>
                    )}

                    {data.personal_info?.github && (
                        <span>{data.personal_info.github}</span>
                    )}

                    {data.personal_info?.linkedin && (
                        <span>LinkedIn</span>
                    )}

                    {data.personal_info?.github && (
                        <span>GitHub</span>
                    )}

                    {data.personal_info?.website && (
                        <span>Portfolio</span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section className="mb-4">
                    <h2
                        className="font-bold uppercase border-b mb-2 pb-1"
                        style={{ color: accentColor }}
                    >
                        Professional Summary
                    </h2>

                    <p className="leading-relaxed">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Skills */}
            {data.skills && (
                <section className="mb-4">
                    <h2
                        className="font-bold uppercase border-b mb-2 pb-1"
                        style={{ color: accentColor }}
                    >
                        Technical Skills
                    </h2>

                    <ul className="space-y-1 text-sm">
                        {data.skills.languages?.length > 0 && (
                            <li>
                                <strong>Programming Languages:</strong>{" "}
                                {data.skills.languages.join(", ")}
                            </li>
                        )}

                        {data.skills.development?.length > 0 && (
                            <li>
                                <strong>Development:</strong>{" "}
                                {data.skills.development.join(", ")}
                            </li>
                        )}

                        {data.skills.cloud?.length > 0 && (
                            <li>
                                <strong>Cloud & DevOps:</strong>{" "}
                                {data.skills.cloud.join(", ")}
                            </li>
                        )}

                        {data.skills.tools?.length > 0 && (
                            <li>
                                <strong>Tools & Platforms:</strong>{" "}
                                {data.skills.tools.join(", ")}
                            </li>
                        )}
                    </ul>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="font-bold uppercase border-b mb-2 pb-1"
                        style={{ color: accentColor }}
                    >
                        Experience
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold">
                                            {exp.position}
                                        </h3>

                                        <p className="font-medium text-gray-700">
                                            {exp.company}
                                        </p>
                                    </div>

                                    <span className="text-gray-600">
                                        {formatDate(exp.start_date)} -{" "}
                                        {exp.is_current
                                            ? "Present"
                                            : formatDate(exp.end_date)}
                                    </span>
                                </div>

                                {exp.description && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                        {exp.description
                                            .split("\n")
                                            .filter((line) => line.trim())
                                            .map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects?.length > 0 && (
                <section className="mb-4">
                    <h2
                        className="font-bold uppercase border-b mb-2 pb-1"
                        style={{ color: accentColor }}
                    >
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">
                                        {project.name}
                                    </h3>

                                    {project.tech_stack && (
                                        <span className="text-gray-600 text-xs">
                                            {project.tech_stack}
                                        </span>
                                    )}
                                </div>

                                {project.description && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                        {project.description
                                            .split("\n")
                                            .filter((line) => line.trim())
                                            .map((line, i) => (
                                                <li key={i}>{line}</li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section>
                    <h2
                        className="font-bold uppercase border-b mb-2 pb-1"
                        style={{ color: accentColor }}
                    >
                        Education
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div
                                key={index}
                                className="flex justify-between"
                            >
                                <div>
                                    <h3 className="font-semibold">
                                        {edu.degree}
                                        {edu.field_of_study &&
                                            ` - ${edu.field_of_study}`}
                                    </h3>

                                    <p className="text-gray-700">
                                        {edu.institution}
                                    </p>

                                    {edu.score && (
                                        <p className="text-gray-600">
                                            Score: {edu.score}
                                        </p>
                                    )}
                                </div>

                                <span className="text-gray-600">
                                    {formatDate(edu.start_date)} -{" "}
                                    {edu.is_current
                                        ? "Present"
                                        : formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ATSProfessionalTemplate;
