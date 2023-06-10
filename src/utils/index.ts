export const checkTableHeader = (header: string) => {
    if (header.includes("nút")) return false;
    return true;
};

export const removeLastItemBreadScrumb = (array: { title: string; path: string }[]) => {
    const lastItem: { title: string; path: string } = array[array.length - 1];
    const newArray = array.filter(
        (item) => item.title.includes(lastItem.title) === false
    );
    return { lastItem, newArray };
};

export const getCookie = (name: string) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift();
    }
    return null;
};
