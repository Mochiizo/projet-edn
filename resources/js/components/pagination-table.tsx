import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface PaginationProps {
    links: { url: string | null; label: string; active: boolean }[];
}

export default function PaginationUser({ links }: PaginationProps) {
    if (links.length === 0) return null; // Si pas de pagination, on n'affiche rien
    return (
        <Pagination>
            <PaginationContent>
                {links.map((link, index) => (
                    <PaginationItem key={index}>
                        {link.url ? (
                            <PaginationLink href={link.url} isActive={link.active}>
                                {link.label.replace(/&laquo;|&raquo;/g, '')} {/* Supprime les chevrons */}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}
