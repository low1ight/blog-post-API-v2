const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

export const isValidId = (id:string) => {
    return id.length === 12 || (id.length === 24 && checkForHexRegExp.test(id));
}