export interface Note {
    title: string,
    content: string,
    creation: number,
    modification: number,
    selected: boolean,
    color: string,
    deleted?: number
}

export interface Option {
    text: string;
    first?: string;
    type: string;
    items?: string[];
    click?: () => void;
    icon?: JSX.Element;
}