import React from "react";
import StatCard from "./StatCard";
import ResumeDetails from "./ResumeDetails";
import ActivityFeed from "./ActivityFeed";
import JobRecommendations from "./JobRecommendations";
import TipsSection from "./TipsSection";

export default function MainContent({ isDarkMode }) {
    return (
        <section className="flex-1 p-1 mx-auto max-w-[1200px]">
            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                <StatCard
                    title="Customized Resume Preview"
                    type="resume"
                    actions={["View", "Download", "Edit"]}
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    title="ATS Score"
                    type="ats"
                    score={75}
                    actionLink="Improve Tips"
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    title="Skill Gap Analysis"
                    type="skills"
                    missingSkills={3}
                    actionLink="Recommended Courses"
                    isDarkMode={isDarkMode}
                />
                <StatCard
                    title="Interview Prep"
                    type="interview"
                    questions={5}
                    actionLink="View More"
                    isDarkMode={isDarkMode}
                />
            </div>

            <ResumeDetails isDarkMode={isDarkMode} />
            <ActivityFeed isDarkMode={isDarkMode} />

            <div className="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1">
                <JobRecommendations isDarkMode={isDarkMode} />
                <TipsSection isDarkMode={isDarkMode} />
            </div>
        </section>
    );
}
