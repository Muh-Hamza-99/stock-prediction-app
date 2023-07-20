const formatQuery = query => {
    return Object.entries(query).map(queryArray => {
        if (!queryArray[1]) return `${queryArray.join(",")}NULL` ;
        return queryArray.join(",");
    });
};

module.exports = formatQuery;