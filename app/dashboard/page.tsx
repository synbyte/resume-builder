import { getResumes } from '@/lib/actions';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function DashboardPage() {
    const resumes = await getResumes();

    return <DashboardClient resumes={resumes} />;
}
