export interface Note {
    title: string,
    content: string,
    creation: number,
    modification: number,
    selected: boolean,
    color: string,
    deleted?: number,
    id: string,
    userId: string,
    [key: string]: any
}

export interface Option {
    text: string,
    first?: string,
    type: string,
    items?: string[],
    click?: () => void,
    onOptionSelect?: (option: string) => void,
    icon?: JSX.Element
}