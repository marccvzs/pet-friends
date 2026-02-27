export default function UserLayout({
    children,
    analytics
}: {
    children: React.ReactNode,
    analytics: React.ReactNode
}) {
    return (
        <div>
            {children}
            <aside>
                {analytics}
            </aside>
        </div>
    )
};
