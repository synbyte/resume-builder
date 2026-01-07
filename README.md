# 📄 AI-Powered Resume Builder

A modern, professional resume builder with AI-assisted editing, real-time preview, and intelligent pagination.

## ✨ Features

- **AI Resume Architect**: Natural language editing powered by Google Gemini 2.0 Flash
  - "Make the font larger"
  - "Change color to blue"
  - "Add spacing above Experience"
  
- **10 Professional Templates**: Modern, Classic, Minimal, Professional, Creative, Elegant, Tech, Timeline, Compact, Bold

- **Smart Pagination**: Automatic page-break detection to prevent content from being cut mid-element

- **Undo/Redo System**: Full history tracking with keyboard shortcuts (Ctrl+Z / Ctrl+Y)

- **WYSIWYG Editor**: What you see is exactly what prints

- **Design System**: Customizable fonts, colors, spacing, and heading sizes per template

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Supabase recommended)
- Google Gemini API key (optional, for AI features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd resume
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

4. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

5. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Database**: PostgreSQL + Prisma ORM
- **AI**: Google Gemini 2.0 Flash
- **PDF Export**: jsPDF + html-to-image
- **Authentication**: Supabase Auth (integrated via Prisma schema)

## 📁 Project Structure

```
resume/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Resume management dashboard
│   └── resume/[id]/       # Resume editor page
├── components/
│   ├── dashboard/         # Dashboard components
│   └── resume/            # Resume editor components
│       ├── Templates/     # 10 resume templates
│       ├── Wizard/        # Form components
│       ├── AIAssistant.tsx
│       ├── ResumeEditor.tsx
│       └── PagedPreviewWrapper.tsx
├── lib/
│   ├── actions.ts         # Server actions (CRUD)
│   ├── ai-actions.ts      # AI processing
│   └── types.ts           # TypeScript types
├── prisma/
│   └── schema.prisma      # Database schema
└── services/
    └── googleai.js        # AI service config
```

## 🎨 Usage

### Creating a Resume

1. Navigate to dashboard
2. Click "Create New Resume"
3. Fill in your information using the wizard
4. Choose a template
5. Customize design settings
6. Use AI assistant for quick edits

### AI Assistant Commands

```
"Make the font smaller"
"Change color to emerald green"
"Add 30px space above Skills"
"Switch template to Professional"
"Update my summary to focus on leadership"
```

### Keyboard Shortcuts

- `Ctrl+Z` - Undo
- `Ctrl+Y` / `Ctrl+Shift+Z` - Redo
- `Ctrl+P` - Print
- `Ctrl+S` - Save (browser default)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string (pooled) | ✅ |
| `DIRECT_URL` | PostgreSQL direct connection | ✅ |
| `GEMINI_API_KEY` | Google AI API key | ⚠️ Optional (fallback exists) |

### Database Setup

This project uses Supabase with the following key tables:
- `users` (auth.users) - User authentication
- `resumes` (public.resumes) - Resume data storage

## 📝 API Routes

Currently, all operations use Next.js Server Actions in `lib/actions.ts`:
- `getResumes()` - Fetch all resumes
- `createResume(title, template?)` - Create new resume
- `updateResume(id, data)` - Save resume changes
- `deleteResume(id)` - Delete resume
- `renameResume(id, title)` - Update title

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

[Add your license here]

## 🙏 Acknowledgments

- Templates inspired by professional resume design patterns
- AI features powered by Google Gemini
- Database infrastructure by Supabase
