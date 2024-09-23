class ApiFeatures {
    constructor (mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString
    }

    pagination () {
        let page = +this.queryString.page || 1;
        if (page <= 0) page = 1;
        this.page = page

        const limit = 4;
        const skip = (page - 1) * limit;

        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }

    filter () {
        let filterObj = {...this.queryString};
        const excutedQueries = ["page", "keyword", "sort", "fields"];
        excutedQueries.forEach((query) => delete filterObj[query]);

        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
        filterObj = JSON.parse(filterObj)

        this.mongooseQuery.find(filterObj)
        return this
    }
}

export default ApiFeatures