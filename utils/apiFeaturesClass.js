class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString
    }

    pagination(collectionLength) {
        let metadata = {};

        let page = +this.queryString.page || 1;
        if (page <= 0) page = 1;

        const limit = 4;
        metadata.limit = limit;

        const totalPages = Math.ceil(collectionLength / limit);
        if (page > totalPages) page = totalPages;
        metadata.totalPages = totalPages;
        metadata.currentPage = page;

        const skip = (page - 1) * limit;

        let nextPage = page + 1;
        let prevPage = page - 1;
        if (nextPage <= totalPages) metadata.nextPage = nextPage;
        if (prevPage > 0) metadata.prevPage = prevPage;

        this.mongooseQuery.skip(skip).limit(limit);
        this.metadata = metadata
        return this
    }

    filter() {
        let filterObj = { ...this.queryString };
        const excutedQueries = ["page", "keyword", "sort", "fields"];
        excutedQueries.forEach((query) => delete filterObj[query]);

        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
        filterObj = JSON.parse(filterObj)

        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.queryString.sort) {
            let sort = this.queryString.sort.replace(",", " ");
            this.mongooseQuery.sort(sort)
        }
        return this
    }

    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: "i" } },
                    { title: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } },
                ]
            })
        }
        return this
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.replace(",", " ");
            this.mongooseQuery.select(fields)
        }
        return this
    }
}

export default ApiFeatures