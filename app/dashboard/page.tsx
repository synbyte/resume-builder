import { getResumes, getCurrentUser } from '@/lib/actions';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function DashboardPage() {
    const [resumes, user] = await Promise.all([
        getResumes(),
        getCurrentUser()
    ]);

    return <DashboardClient resumes={resumes} userEmail={user?.email || ''} />;
}
