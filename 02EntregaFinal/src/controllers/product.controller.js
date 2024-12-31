import { ProductManagerDB } from "../dao/ProductManagerDB.js";

const products = new ProductManagerDB();

export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort } = req.query;

        const options = {
            page: Number(page),
            limit: Number(limit),
            lean: true,
        };

        const searchQuery = {};

        if (req.query.category) {
            searchQuery.category = req.query.category;
        }

        if (req.query.title) {
            searchQuery.title = { $regex: req.query.title, $options: "i" };
        }

        if (req.query.stock) {
            const stockNumber = parseInt(req.query.stock);
            if (!isNaN(stockNumber)) {
                searchQuery.stock = stockNumber;
            }
        }

        if (sort === "asc" || sort === "desc") {
            options.sort = { price: sort === "asc" ? 1 : -1 };
        }

        const buildLinks = (products) => {
            const { prevPage, nextPage } = products;
            const baseUrl = req.originalUrl.split("?")[0];
            const sortParam = sort ? `&sort=${sort}` : "";

            const prevLink = prevPage ? `${baseUrl}?page=${prevPage}${sortParam}` : null;
            const nextLink = nextPage ? `${baseUrl}?page=${nextPage}${sortParam}` : null;

            return {
                prevPage: prevPage ? parseInt(prevPage) : null,
                nextPage: nextPage ? parseInt(nextPage) : null,
                prevLink,
                nextLink,
            };
        };

        const paginatedProducts = await products.getPaginateProducts(searchQuery, options);
        const { prevPage, nextPage, prevLink, nextLink } = buildLinks(paginatedProducts);

        let requestedPage = parseInt(page);
        if (isNaN(requestedPage) || requestedPage < 1) {
            requestedPage = 1;
        }

        if (requestedPage > paginatedProducts.totalPages) {
            return res.status(404).json({ error: "La página solicitada está fuera de rango" });
        }

        const response = {
            status: "success",
            payload: paginatedProducts.docs,
            totalPages: paginatedProducts.totalPages,
            page: parseInt(page),
            hasPrevPage: paginatedProducts.hasPrevPage,
            hasNextPage: paginatedProducts.hasNextPage,
            prevPage,
            nextPage,
            prevLink,
            nextLink,
        };

        return res.status(200).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error interno del servidor: ${error}` });
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await products.getProductByID(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await products.deleteProduct(id);
        res.send({ status: "success", message: "Producto eliminado " + id });
    } catch (error) {
        res.status(404).send({ status: "error", error: "Ha ocurrido un error" });
    }
};

export const createProduct = async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || price === undefined || !code || stock === undefined) {
        return res
            .status(400)
            .send({ status: "Error", error: "Todos los campos son obligatorios excepto thumbnails" });
    }

    const status = req.body.status !== undefined ? req.body.status : true;
    const thumbnails = req.body.thumbnails !== undefined ? req.body.thumbnails : [];

    try {
        const result = await products.addProduct({
            title,
            description,
            price,
            code,
            stock,
            thumbnails,
            status,
            category,
        });
        res.status(201).send({ result });
    } catch (error) {
        console.error(`Error de creación de producto: ${error}`);
        res.status(400).send({ status: "Error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updateProduct = await products.updateProduct(id, req.body);
        res.send({
            status: "success",
            payload: updateProduct,
        });
    } catch (error) {
        if (error.message === "Producto no encontrado.") {
            res.status(404).send({
                status: "error",
                error: error.message,
            });
        } else {
            res.status(500).send({ status: "error", error: error.message });
        }
    }
};
