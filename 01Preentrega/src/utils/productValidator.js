export function productValidator(product) {
    const {title, description, code, price, stock, category} = product;
    const missingFields = [];

    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!code) missingFields.push("code");
    if (!price) missingFields.push("price");
    if (!stock) missingFields.push("stock");
    if (!category) missingFields.push("category");

    if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(", ")}`);
    }
}
  