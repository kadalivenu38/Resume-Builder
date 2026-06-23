import React, { useEffect, useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const skills = [
    {
      key: "languages",
      label: "Programming Languages",
      placeholder: "Python, Java, C++, JavaScript",
    },
    {
      key: "development",
      label: "Development",
      placeholder: "React, Node.js, Express.js, HTML, CSS",
    },
    {
      key: "cloud",
      label: "Cloud & DevOps",
      placeholder: "AWS, Azure, Docker, Kubernetes",
    },
    {
      key: "tools",
      label: "Tools & Platforms",
      placeholder: "Git, GitHub, VS Code, Postman, Jupyter Notebook",
    },
  ];

  const [formValues, setFormValues] = useState({
    languages: "",
    development: "",
    cloud: "",
    tools: "",
  });

  useEffect(() => {
    setFormValues({
      languages: (data?.languages || []).join(", "),
      development: (data?.development || []).join(", "),
      cloud: (data?.cloud || []).join(", "),
      tools: (data?.tools || []).join(", "),
    });
  }, []);

  const handleChange = (category, value) => {
    setFormValues((prev) => ({
      ...prev,
      [category]: value,
    }));

    onChange({
      ...data,
      [category]: value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Technical Skills
        </h3>

        <p className="text-sm text-gray-500">
          Enter skills separated by commas.
        </p>
      </div>

      {skills.map((skill) => (
        <div key={skill.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {skill.label}
          </label>

          <textarea
            rows={2}
            value={formValues[skill.key]}
            onChange={(e) =>
              handleChange(skill.key, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={skill.placeholder}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillsForm;