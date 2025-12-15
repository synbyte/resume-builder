import { getResume } from '@/lib/actions';
import ResumeEditor from '@/components/resume/ResumeEditor';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ResumePage({ params }: PageProps) {
    const { id } = await params;
    const resume = await getResume(id);

    if (!resume) {
        notFound();
    }

    // Parse JSON content if it exists, or provide default
    const initialData = (resume.content as any) || {};

    return (
        <div className="h-screen flex flex-col">
            <ResumeEditor
                id={resume.id}
                initialData={initialData}
                title={resume.title}
            />
        </div>
    );
}
