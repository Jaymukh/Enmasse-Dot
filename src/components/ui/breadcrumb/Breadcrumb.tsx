import '../../../App.css'

interface BreadcrumbItem {
    label: string;
    link?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

type AriaCurrent = "page" | "step" | "location" | "date" | "time";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb m-0">
                {items.map((item: any, index: number) => (
                    item.label && <li key={index} className={`breadcrumb-item fs-12 ${index === items.length - 1 ? 'active' : ''}`} aria-current={index === items.length - 1 ? 'page' as AriaCurrent : undefined}>
                        {index === items.length - 1 ? (
                            item.label
                        ) : (
                            <a href={item.link} >{item.label}</a>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}