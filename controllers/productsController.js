const prima = require("../../prisma/client");

const ALLOWED_FILTER_TYPES = ["price", "rating", "category", "inStock", 'outOfStock'];
const ALLOWED_OPERATIONS = ["equals", "lt", "gt", "gte", "lte", "contains"];
const ALLOWED_SORT_VALUES = ["asc", "desc"];