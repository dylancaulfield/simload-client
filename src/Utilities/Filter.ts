interface INamed {
    name: string
}

export function filterText(item: INamed, filter: string): boolean {

    const filterText = filter.trim();
    if (!filterText) return true;
    return item.name.toLowerCase().includes(filterText.toLowerCase());

}