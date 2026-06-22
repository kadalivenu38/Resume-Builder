import { Mail, Phone, MapPin, Globe } from "lucide-react";
import LinkedinIcon from '../LinkedInIcon'

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-4 bg-white text-gray-800">
            {/* Header */}
            <header className="text-center mb-2 pb-2 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-semibold mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600" style={{ lineHeight: '0' }}>
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1 px-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1 px-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1 px-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" className="flex items-center gap-1 px-1">
                            <LinkedinIcon />
                            <span className="break-all mt-1">LinkedIn</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" className="flex items-center gap-1 px-1">
                            <Globe className="size-4" />
                            <span className="break-all">Portfolio</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-2">
                    <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed px-5" style={{ lineHeight: '1.3' }}>{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-2">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-1">
                                    <div className="mb-1" style={{ lineHeight: '0.5' }}>
                                        <h3 className="font-semibold text-lg text-black-900">{exp.company}</h3>
                                        <p className="text-gray-700 font-medium">{exp.position}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc px-5">
                                        {exp.description.split("\n").map((line, i) => (
                                            <li key={i} style={{ lineHeight: '1.3' }}>{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    <ul className="space-y-2">
                        {data.projects.map((project, index) => (
                            <div key={index} className="flex justify-between items-start border-l-3 border-gray-300 pl-4" style={{ borderColor: accentColor }}>
                                <div>
                                    <div className="flex items-center justify-between gap-8">
                                        <li className="text-lg font-semibold text-black ">{project.name}</li>
                                        <p className="font-medium text-sm text-gray-600">{project.tech_stack}</p>
                                    </div>
                                    {project.description && (
                                        <ul className="list-disc px-5">
                                            {project.description.split("\n").map((line, i) => (
                                                <li key={i} style={{ lineHeight: '1.3' }}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>
                    {data.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {edu.institution}
                                </h3>
                                <h3 className="font-medium text-gray-700">
                                    {edu.degree} {edu.field_of_study && `- ${edu.field_of_study}`}
                                </h3>
                                {edu.score && <p className="text-sm text-gray-600">GPA: {edu.score}</p>}
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>{formatDate(edu.start_date)} - {edu.is_current ? "Present" : formatDate(edu.graduation_date)}</p>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-2">
                    <h2 className="text-lg font-semibold" style={{ color: accentColor }}>
                        SKILLS
                    </h2>

                    <div className="flex gap-3 flex-wrap" style={{ lineHeight: '0.6' }}>
                        {data.skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;