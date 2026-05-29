import { ArrowLeft, ArrowRight, Download, Edit3, Plus, Search, Sparkles, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

const steps = [
  'Personal',
  'Summary',
  'Experience',
  'Education',
  'Skills',
  'Projects',
  'Certifications',
  'Preview'
];

const defaultSkills = [
  { id: crypto.randomUUID(), category: 'Cloud Platforms', values: 'Microsoft Azure, Microsoft Fabric' },
  { id: crypto.randomUUID(), category: 'Data Engineering', values: 'Data Pipelines, Lakehouses, Dataflows Gen2, ETL/ELT' },
  { id: crypto.randomUUID(), category: 'Analytics & BI', values: 'Power BI Desktop, Power BI Service, DAX, Power Query' },
  { id: crypto.randomUUID(), category: 'Programming Languages', values: 'Java, Python, SQL' }
];

const createExperience = () => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  start: '',
  end: '',
  bullets: ''
});

const createEducation = () => ({
  id: crypto.randomUUID(),
  institution: '',
  degree: '',
  field: '',
  start: '',
  end: '',
  gpa: ''
});

const createProject = () => ({
  id: crypto.randomUUID(),
  name: '',
  tech: '',
  duration: '',
  description: '',
  link: '',
  aiFilled: false
});

const createCertification = () => ({
  id: crypto.randomUUID(),
  title: '',
  organization: '',
  date: ''
});

const initialResume = {
  personal: {
    fullName: '',
    jobTitle: '',
    location: '',
    phone: '',
    email: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experiences: [createExperience()],
  educations: [createEducation()],
  skills: defaultSkills,
  projects: [createProject()],
  certifications: [createCertification()]
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resume, setResume] = useState(initialResume);
  const [loadingProjectId, setLoadingProjectId] = useState(null);

  const progress = `${(currentStep / steps.length) * 100}%`;
  const previewData = useMemo(() => normalizeResume(resume), [resume]);

  function goToStep(step) {
    setCurrentStep(Math.min(Math.max(step, 1), steps.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updatePersonal(field, value) {
    setResume((current) => ({
      ...current,
      personal: { ...current.personal, [field]: value }
    }));
  }

  function updateList(listName, id, field, value) {
    setResume((current) => ({
      ...current,
      [listName]: current[listName].map((item) => (
        item.id === id ? { ...item, [field]: value } : item
      ))
    }));
  }

  function addListItem(listName, factory) {
    setResume((current) => ({
      ...current,
      [listName]: [...current[listName], factory()]
    }));
  }

  function removeListItem(listName, id) {
    setResume((current) => ({
      ...current,
      [listName]: current[listName].filter((item) => item.id !== id)
    }));
  }

  async function fillProject(project) {
    if (!project.name.trim()) {
      alert('Please enter a project name first.');
      return;
    }

    setLoadingProjectId(project.id);

    try {
      const response = await fetch('/api/project-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName: project.name.trim() })
      });

      if (!response.ok) {
        throw new Error('Project lookup failed');
      }

      const data = await response.json();
      setResume((current) => ({
        ...current,
        projects: current.projects.map((item) => (
          item.id === project.id
            ? {
                ...item,
                description: data.description || item.description,
                tech: item.tech || data.technologies || '',
                aiFilled: true
              }
            : item
        ))
      }));
    } catch {
      setResume((current) => ({
        ...current,
        projects: current.projects.map((item) => (
          item.id === project.id
            ? {
                ...item,
                description: `Developed a ${project.name.trim()} to solve real-world problems using modern technologies. Implemented core features including data processing, user interface design, and backend logic. Optimized performance and ensured scalability for production deployment.`,
                aiFilled: true
              }
            : item
        ))
      }));
    } finally {
      setLoadingProjectId(null);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="logo">
            <Sparkles size={22} className="logo-icon" aria-hidden="true" />
            <span className="logo-text">ResumeForge</span>
          </div>
          <div className="header-badge">Free · ATS Optimized · Instant PDF</div>
        </div>
      </header>

      <div className="progress-rail">
        <div className="progress-bar" style={{ width: progress }} />
      </div>

      <nav className="step-nav" aria-label="Resume builder steps">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          return (
            <button
              type="button"
              key={step}
              className={`step-pill ${currentStep === stepNumber ? 'active' : ''} ${currentStep > stepNumber ? 'completed' : ''}`}
              onClick={() => goToStep(stepNumber)}
            >
              <span className="step-num">{String(stepNumber).padStart(2, '0')}</span>
              <span className="step-label">{step}</span>
            </button>
          );
        })}
      </nav>

      <main className="app-container">
        {currentStep === 1 && (
          <StepShell tag="Step 01" title="Personal Details" subtitle="Let's start with the basics. This forms the top section of your resume.">
            <div className="form-grid">
              <Field label="Full Name" required className="full">
                <input value={resume.personal.fullName} onChange={(event) => updatePersonal('fullName', event.target.value)} placeholder="e.g. Sreeteja Shirivolu" />
              </Field>
              <Field label="Job Title / Desired Role">
                <input value={resume.personal.jobTitle} onChange={(event) => updatePersonal('jobTitle', event.target.value)} placeholder="e.g. Power BI Engineer" />
              </Field>
              <Field label="Location">
                <input value={resume.personal.location} onChange={(event) => updatePersonal('location', event.target.value)} placeholder="e.g. Hyderabad, Telangana" />
              </Field>
              <Field label="Phone Number">
                <input value={resume.personal.phone} onChange={(event) => updatePersonal('phone', event.target.value)} placeholder="e.g. +91 6281447742" />
              </Field>
              <Field label="Email Address" required>
                <input type="email" value={resume.personal.email} onChange={(event) => updatePersonal('email', event.target.value)} placeholder="yourname@email.com" />
              </Field>
              <Field label="LinkedIn URL">
                <input value={resume.personal.linkedin} onChange={(event) => updatePersonal('linkedin', event.target.value)} placeholder="linkedin.com/in/yourname" />
              </Field>
              <Field label="GitHub / Portfolio URL">
                <input value={resume.personal.github} onChange={(event) => updatePersonal('github', event.target.value)} placeholder="github.com/yourname" />
              </Field>
            </div>
          </StepShell>
        )}

        {currentStep === 2 && (
          <StepShell tag="Step 02" title="Professional Summary" subtitle="A 3-4 line snapshot of who you are. This is the first thing recruiters read.">
            <div className="form-grid">
              <Field label="Summary" required className="full">
                <textarea value={resume.summary} onChange={(event) => setResume((current) => ({ ...current, summary: event.target.value }))} rows="5" maxLength="600" placeholder="e.g. Microsoft Fabric and Power BI Engineer with 1+ year of experience..." />
                <div className="char-count">{resume.summary.length} / 600 characters</div>
              </Field>
              <div className="field full">
                <div className="ai-hint-box">
                  <Sparkles size={18} className="ai-icon" aria-hidden="true" />
                  <p>Include years of experience, core tools, and a key achievement. Keep it under 100 words for ATS optimization.</p>
                </div>
              </div>
            </div>
          </StepShell>
        )}

        {currentStep === 3 && (
          <StepShell tag="Step 03" title="Work Experience" subtitle="Add your work history. Start with the most recent position.">
            {resume.experiences.map((experience, index) => (
              <RepeatableCard key={experience.id} label={`Experience #${index + 1}`} onRemove={() => removeListItem('experiences', experience.id)}>
                <div className="form-grid">
                  <Field label="Company / Organization">
                    <input value={experience.company} onChange={(event) => updateList('experiences', experience.id, 'company', event.target.value)} placeholder="e.g. Quadrant Technologies" />
                  </Field>
                  <Field label="Job Title">
                    <input value={experience.role} onChange={(event) => updateList('experiences', experience.id, 'role', event.target.value)} placeholder="e.g. Software Engineer" />
                  </Field>
                  <Field label="Start Date">
                    <input value={experience.start} onChange={(event) => updateList('experiences', experience.id, 'start', event.target.value)} placeholder="e.g. Feb 2025" />
                  </Field>
                  <Field label="End Date">
                    <input value={experience.end} onChange={(event) => updateList('experiences', experience.id, 'end', event.target.value)} placeholder="e.g. Present" />
                  </Field>
                  <Field label="Key Responsibilities & Achievements" className="full">
                    <p className="bullets-hint">Enter each bullet point on a new line. Start with action verbs.</p>
                    <textarea value={experience.bullets} onChange={(event) => updateList('experiences', experience.id, 'bullets', event.target.value)} rows="5" placeholder={'Provided technical support for Power BI workloads\nResolved issues related to data ingestion\nCollaborated with engineering teams'} />
                  </Field>
                </div>
              </RepeatableCard>
            ))}
            <AddButton label="Add Experience" onClick={() => addListItem('experiences', createExperience)} />
          </StepShell>
        )}

        {currentStep === 4 && (
          <StepShell tag="Step 04" title="Education" subtitle="Add your academic background.">
            {resume.educations.map((education, index) => (
              <RepeatableCard key={education.id} label={`Education #${index + 1}`} onRemove={() => removeListItem('educations', education.id)}>
                <div className="form-grid">
                  <Field label="Institution Name" className="full">
                    <input value={education.institution} onChange={(event) => updateList('educations', education.id, 'institution', event.target.value)} placeholder="e.g. Kakatiya Institute of Technology" />
                  </Field>
                  <Field label="Degree">
                    <input value={education.degree} onChange={(event) => updateList('educations', education.id, 'degree', event.target.value)} placeholder="e.g. Bachelor of Technology" />
                  </Field>
                  <Field label="Field of Study">
                    <input value={education.field} onChange={(event) => updateList('educations', education.id, 'field', event.target.value)} placeholder="e.g. Information Technology" />
                  </Field>
                  <Field label="Start Year">
                    <input value={education.start} onChange={(event) => updateList('educations', education.id, 'start', event.target.value)} placeholder="e.g. 2020" />
                  </Field>
                  <Field label="End Year">
                    <input value={education.end} onChange={(event) => updateList('educations', education.id, 'end', event.target.value)} placeholder="e.g. 2023" />
                  </Field>
                  <Field label="GPA / CGPA">
                    <input value={education.gpa} onChange={(event) => updateList('educations', education.id, 'gpa', event.target.value)} placeholder="e.g. 6.88 / 10" />
                  </Field>
                </div>
              </RepeatableCard>
            ))}
            <AddButton label="Add Education" onClick={() => addListItem('educations', createEducation)} />
          </StepShell>
        )}

        {currentStep === 5 && (
          <StepShell tag="Step 05" title="Technical Skills" subtitle="Organize your skills by category for maximum ATS impact.">
            {resume.skills.map((skill) => (
              <RepeatableCard key={skill.id} label="Skill Category" onRemove={() => removeListItem('skills', skill.id)}>
                <div className="form-grid">
                  <Field label="Category Name">
                    <input value={skill.category} onChange={(event) => updateList('skills', skill.id, 'category', event.target.value)} placeholder="e.g. Cloud Platforms" />
                  </Field>
                  <Field label="Skills">
                    <input value={skill.values} onChange={(event) => updateList('skills', skill.id, 'values', event.target.value)} placeholder="e.g. AWS, Azure, GCP" />
                  </Field>
                </div>
              </RepeatableCard>
            ))}
            <AddButton label="Add Skill Category" onClick={() => addListItem('skills', () => ({ id: crypto.randomUUID(), category: '', values: '' }))} />
          </StepShell>
        )}

        {currentStep === 6 && (
          <StepShell tag="Step 06" title="Projects" subtitle="Showcase your work. Enter the name and let the helper fill in useful resume wording.">
            {resume.projects.map((project, index) => (
              <RepeatableCard key={project.id} label={`Project #${index + 1}`} onRemove={() => removeListItem('projects', project.id)}>
                <div className="form-grid">
                  <div className="field full">
                    <div className="project-search-row">
                      <Field label="Project Name" required>
                        <input value={project.name} onChange={(event) => updateList('projects', project.id, 'name', event.target.value)} placeholder="e.g. Restaurant Recommendation System" />
                      </Field>
                      <button className="btn-ai-search" type="button" onClick={() => fillProject(project)} disabled={loadingProjectId === project.id}>
                        <Search size={17} aria-hidden="true" />
                        {loadingProjectId === project.id ? 'Filling...' : 'AI Fill'}
                      </button>
                    </div>
                    <p className="bullets-hint">Enter a project name and use AI Fill for a resume-ready draft.</p>
                  </div>
                  <Field label="Technologies Used">
                    <input value={project.tech} onChange={(event) => updateList('projects', project.id, 'tech', event.target.value)} placeholder="e.g. Python, Flask, MySQL" />
                  </Field>
                  <Field label="Duration / Year">
                    <input value={project.duration} onChange={(event) => updateList('projects', project.id, 'duration', event.target.value)} placeholder="e.g. Jan 2023 - Apr 2023" />
                  </Field>
                  <Field label="Project Description" className="full">
                    <textarea value={project.description} onChange={(event) => updateList('projects', project.id, 'description', event.target.value)} rows="4" placeholder="Describe what the project does, your role, and the impact..." />
                    {project.aiFilled && <span className="ai-fill-badge">AI Filled</span>}
                  </Field>
                  <Field label="GitHub / Live Link" className="full">
                    <input value={project.link} onChange={(event) => updateList('projects', project.id, 'link', event.target.value)} placeholder="https://github.com/yourname/project" />
                  </Field>
                </div>
              </RepeatableCard>
            ))}
            <AddButton label="Add Project" onClick={() => addListItem('projects', createProject)} />
          </StepShell>
        )}

        {currentStep === 7 && (
          <StepShell tag="Step 07" title="Certifications" subtitle="List professional certifications and achievements.">
            {resume.certifications.map((certification, index) => (
              <RepeatableCard key={certification.id} label={`Certification #${index + 1}`} onRemove={() => removeListItem('certifications', certification.id)}>
                <div className="form-grid">
                  <Field label="Certification Title" className="full">
                    <input value={certification.title} onChange={(event) => updateList('certifications', certification.id, 'title', event.target.value)} placeholder="e.g. Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)" />
                  </Field>
                  <Field label="Issuing Organization">
                    <input value={certification.organization} onChange={(event) => updateList('certifications', certification.id, 'organization', event.target.value)} placeholder="e.g. Microsoft" />
                  </Field>
                  <Field label="Date Obtained">
                    <input value={certification.date} onChange={(event) => updateList('certifications', certification.id, 'date', event.target.value)} placeholder="e.g. 2024" />
                  </Field>
                </div>
              </RepeatableCard>
            ))}
            <AddButton label="Add Certification" onClick={() => addListItem('certifications', createCertification)} />
          </StepShell>
        )}

        {currentStep === 8 && (
          <StepShell tag="Step 08" title="Preview & Download" subtitle="Your ATS-optimized resume is ready. Review and download as PDF.">
            <div className="preview-actions">
              <button className="btn-primary" type="button" onClick={() => window.print()}>
                <Download size={17} aria-hidden="true" />
                Download PDF
              </button>
              <button className="btn-outline" type="button" onClick={() => goToStep(1)}>
                <Edit3 size={17} aria-hidden="true" />
                Edit Resume
              </button>
            </div>
            <ResumePreview resume={previewData} />
          </StepShell>
        )}

        <div className="nav-row">
          {currentStep > 1 && (
            <button className="btn-back" type="button" onClick={() => goToStep(currentStep - 1)}>
              <ArrowLeft size={17} aria-hidden="true" />
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button className="btn-next" type="button" onClick={() => goToStep(currentStep + 1)}>
              {currentStep === steps.length - 1 ? 'Preview Resume' : 'Continue'}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </main>

      <div className={`ai-overlay ${loadingProjectId ? 'show' : ''}`} aria-live="polite" aria-busy={Boolean(loadingProjectId)}>
        <div className="ai-spinner">
          <div className="spinner-ring" />
          <p>AI is researching your project...</p>
        </div>
      </div>
    </>
  );
}

function StepShell({ tag, title, subtitle, children }) {
  return (
    <section className="form-step active">
      <div className="step-header">
        <div className="step-tag">{tag}</div>
        <h1 className="step-title">{title}</h1>
        <p className="step-sub">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function Field({ label, required = false, className = '', children }) {
  return (
    <label className={`field ${className}`}>
      <span>
        {label} {required && <span className="req">*</span>}
      </span>
      {children}
    </label>
  );
}

function RepeatableCard({ label, onRemove, children }) {
  return (
    <div className="repeatable-card">
      <div className="card-header-row">
        <span className="card-label">{label}</span>
        <button className="btn-remove" type="button" onClick={onRemove}>
          <Trash2 size={15} aria-hidden="true" />
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}

function AddButton({ label, onClick }) {
  return (
    <button className="add-btn" type="button" onClick={onClick}>
      <Plus size={18} aria-hidden="true" />
      {label}
    </button>
  );
}

function ResumePreview({ resume }) {
  const contactParts = [
    resume.personal.location,
    resume.personal.phone,
    resume.personal.email,
    trimUrl(resume.personal.linkedin),
    trimUrl(resume.personal.github)
  ].filter(Boolean);

  return (
    <article className="resume-preview">
      <h2 className="rv-name">{resume.personal.fullName || 'Your Name'}</h2>
      {resume.personal.jobTitle && <div className="rv-job-title">{resume.personal.jobTitle}</div>}
      <div className="rv-contact">{contactParts.join(' | ')}</div>

      {resume.summary && (
        <ResumeSection title="Professional Summary">
          <p className="rv-summary">{resume.summary}</p>
        </ResumeSection>
      )}

      {resume.experiences.length > 0 && (
        <ResumeSection title="Professional Experience">
          {resume.experiences.map((experience) => (
            <div className="rv-entry" key={experience.id}>
              <div className="rv-entry-header">
                <strong className="rv-company">{experience.company}</strong>
                <span className="rv-dates">{formatDateRange(experience.start, experience.end)}</span>
              </div>
              {experience.role && <div className="rv-role">{experience.role}</div>}
              {experience.bullets.length > 0 && (
                <ul className="rv-bullets">
                  {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </div>
          ))}
        </ResumeSection>
      )}

      {resume.educations.length > 0 && (
        <ResumeSection title="Education">
          {resume.educations.map((education) => (
            <div className="rv-entry" key={education.id}>
              <div className="rv-entry-header">
                <strong className="rv-company">{education.institution}</strong>
                <span className="rv-dates">{formatDateRange(education.start, education.end)}</span>
              </div>
              {(education.degree || education.field) && (
                <div className="rv-degree">{[education.degree, education.field].filter(Boolean).join(', ')}</div>
              )}
              {education.gpa && <div className="rv-cgpa">CGPA: {education.gpa}</div>}
            </div>
          ))}
        </ResumeSection>
      )}

      {resume.skills.length > 0 && (
        <ResumeSection title="Technical Skills">
          <div className="rv-skills-grid">
            {resume.skills.map((skill) => (
              <div className="rv-skill-row" key={skill.id}>
                <span className="rv-skill-cat">{skill.category}: </span>
                <span className="rv-skill-vals">{skill.values}</span>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {resume.projects.length > 0 && (
        <ResumeSection title="Projects">
          {resume.projects.map((project) => (
            <div className="rv-entry" key={project.id}>
              <div className="rv-entry-header">
                <strong className="rv-project-name">{project.name}</strong>
                <span className="rv-dates">{project.duration}</span>
              </div>
              {project.tech && <div className="rv-project-tech">Technologies: {project.tech}</div>}
              {project.description && <div className="rv-project-desc">{project.description}</div>}
              {project.link && <div className="rv-link">{trimUrl(project.link)}</div>}
            </div>
          ))}
        </ResumeSection>
      )}

      {resume.certifications.length > 0 && (
        <ResumeSection title="Certifications">
          {resume.certifications.map((certification) => (
            <div className="rv-cert-item" key={certification.id}>
              {certification.title}
              {certification.organization && ` - ${certification.organization}`}
              {certification.date && ` (${certification.date})`}
            </div>
          ))}
        </ResumeSection>
      )}
    </article>
  );
}

function ResumeSection({ title, children }) {
  return (
    <section>
      <h3 className="rv-section-title">{title}</h3>
      {children}
    </section>
  );
}

function normalizeResume(resume) {
  return {
    ...resume,
    experiences: resume.experiences
      .filter((experience) => experience.company.trim())
      .map((experience) => ({
        ...experience,
        bullets: experience.bullets
          .split('\n')
          .map((bullet) => bullet.replace(/^[•\-*]\s*/, '').trim())
          .filter(Boolean)
      })),
    educations: resume.educations.filter((education) => education.institution.trim()),
    skills: resume.skills.filter((skill) => skill.category.trim()),
    projects: resume.projects.filter((project) => project.name.trim()),
    certifications: resume.certifications.filter((certification) => certification.title.trim())
  };
}

function trimUrl(value) {
  return value.replace(/^https?:\/\//, '').replace(/^www\./, '');
}

function formatDateRange(start, end) {
  if (!start && !end) return '';
  return [start, end].filter(Boolean).join(' - ');
}

export default App;
