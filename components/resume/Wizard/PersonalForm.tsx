'use client';

interface PersonalFormProps {
    data: {
        fullName?: string;
        email?: string;
        phone?: string;
        linkedin?: string;
        website?: string;
    };
    onChange: (data: any) => void;
}

export default function PersonalForm({ data, onChange }: PersonalFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={data.fullName || ''}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={data.email || ''}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={data.phone || ''}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">LinkedIn</label>
                <input
                    type="text"
                    name="linkedin"
                    value={data.linkedin || ''}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-foreground mb-1">Website</label>
                <input
                    type="text"
                    name="website"
                    value={data.website || ''}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
}
