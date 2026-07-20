import docx
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os

def create_resume():
    doc = docx.Document()
    
    # Set narrow margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.5)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)
    
    # Helper for adding headers
    def add_header(text):
        p = doc.add_paragraph()
        run = p.add_run(text)
        run.bold = True
        run.font.size = Pt(11)
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(2)
        # Add a border bottom (approximate with dashes for simple script)
        doc.add_paragraph("_" * 80).paragraph_format.space_after = Pt(4)
        
    def add_entry(title, subtitle, date, location=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(2)
        run1 = p.add_run(title)
        run1.bold = True
        if subtitle:
            p.add_run(" | " + subtitle)
        if date:
            p.add_run(f"\t\t\t{date}")
            
    # Header Info
    header = doc.add_paragraph()
    header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    name_run = header.add_run("OJASWEE UPADHYAY\n")
    name_run.bold = True
    name_run.font.size = Pt(16)
    contact_run = header.add_run("+91 79855 48606 | ojaswee2095@gmail.com | linkedin.com/in/ojaswee-upadhyay-79a041320 | github.com/Ojas2095")
    contact_run.font.size = Pt(10)
    
    # EDUCATION
    add_header("EDUCATION")
    doc.add_paragraph("University of Petroleum and Energy Studies (UPES), Dehradun\t\t\tExpected May 2028\nB.Tech in Computer Science").paragraph_format.space_after = Pt(6)
    
    # TECHNICAL SKILLS
    add_header("TECHNICAL SKILLS")
    p = doc.add_paragraph()
    p.add_run("Languages: ").bold = True
    p.add_run("JavaScript/TypeScript, Python, Scala, Kotlin, SQL, Dart, Java\n")
    p.add_run("Frameworks: ").bold = True
    p.add_run("React, Next.js, Node.js, Express, FastAPI, Flask, React Native, Expo, Three.js\n")
    p.add_run("Tools & DBs: ").bold = True
    p.add_run("Git, Docker, Firebase, Supabase, MongoDB, PostgreSQL, Cloudflare Workers")
    p.paragraph_format.space_after = Pt(6)
    
    # EXPERIENCE
    add_header("EXPERIENCE")
    
    add_entry("React Developer Intern", "Sentienta QualityAI", "Jun 2025 - Aug 2025, Jun 2026 - Present")
    doc.add_paragraph("Enhanced enterprise layout usability for 500+ daily active users by redesigning the core web infrastructure using React and Tailwind CSS.", style='List Bullet')
    doc.add_paragraph("Accelerated internal QA workflows by architecting and deploying 8 highly responsive, data-intensive QA interfaces.", style='List Bullet')
    
    add_entry("Full Stack Developer", "BuildXLayer", "Nov 2024 - Apr 2025")
    doc.add_paragraph("Reduced average database query execution time by 40% by implementing strategic MongoDB index optimization and schema redesigns.", style='List Bullet')
    doc.add_paragraph("Supported high-performance MERN stack applications with minimal latency by engineering robust RESTful backend APIs using Node.js and Express.", style='List Bullet')
    
    # OPEN SOURCE CONTRIBUTIONS
    add_header("OPEN SOURCE CONTRIBUTIONS")
    
    add_entry("Open Source Contributor", "ZIO, Tari Aiteen, OWASP Nest", "Feb 2026 - Present")
    doc.add_paragraph("Enhanced platform stability by resolving critical CI regressions and modernizing core backend components within the ZIO/ZIO-Blocks ecosystem.", style='List Bullet')
    doc.add_paragraph("Significantly reduced manual localization overhead by engineering a robust, automated i18n translation pipeline for Tari Aiteen.", style='List Bullet')
    doc.add_paragraph("Engineered and merged critical core logic improvements into OWASP Nest, CircuitVerse, and TensorMap by resolving complex open architectural issues.", style='List Bullet')

    # PROJECTS
    add_header("PROJECTS")
    
    add_entry("MorphOS", "Next.js, Three.js, Framer Motion, Gemini 2.0 Flash Vision", "")
    doc.add_paragraph("Engineered a fully immersive, browser-based Generative Operating System capable of real-time application synthesis using WebGL shaders and LLMs.", style='List Bullet')
    doc.add_paragraph("Achieved instant code generation from UI screenshots by implementing a multimodal visual compilation pipeline and native IDE subsystems.", style='List Bullet')
    doc.add_paragraph("Built at the MLH AI Hackfest, demonstrating advanced spatial sandbox concepts and dynamic UI generation.", style='List Bullet')
    
    add_entry("ColdEmailAI", "Next.js, Python, OpenRouter AI", "")
    doc.add_paragraph("Automated the generation of 10-15 highly contextual emails daily by integrating OpenRouter models to deeply analyze target company data.", style='List Bullet')
    doc.add_paragraph("Improved B2B outreach efficiency by developing an end-to-end AI automation tool that intelligently researches and drafts personalized cold emails.", style='List Bullet')
    
    add_entry("GradTrack", "React Native, Expo, TypeScript", "")
    doc.add_paragraph("Improved daily academic planning for university students by building a cross-platform mobile application to seamlessly track SGPA/CGPA trajectories and class attendance.", style='List Bullet')
    doc.add_paragraph("Engineered a highly responsive, accessible cross-platform UI achieving native-like performance using React Native and Expo.", style='List Bullet')
    
    # Change font to Arial or Calibri for all
    for paragraph in doc.paragraphs:
        for run in paragraph.runs:
            run.font.name = 'Arial'
            if run.font.size is None:
                run.font.size = Pt(10)
    
    doc.save("Ojaswee_ATS_Resume.docx")

if __name__ == "__main__":
    create_resume()
