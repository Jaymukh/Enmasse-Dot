import './Typography.module.css';

interface HeadingOne {
    title: string;
    type: string;
}

export const HeadingOne= ({ title, type} : HeadingOne) => {
    return(
        <h1>{title}</h1>
    )
}