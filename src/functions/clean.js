import Filter from "bad-words"

const filter = new Filter({
    placeHolder: "x",
})

export const clean = (text) => {
    if (text.length === 0) return ""
    return filter.clean(text)
}