export const  ResultsManager= class{
    /*
    a class that takes a Mongoose query (model.find())and return the customized search results based on provided filters
    */ 
    constructor(query,queryString,sensitiveFields){
        this.query=query;
        this.queryString=queryString;
        this.sensitiveFields=sensitiveFields;
    }
    filter(){
        const queryObj={...this.queryString}//shallow copy
        const escape=['sort','page','limit','select'];
        escape.forEach(el=>delete queryObj[el])
        const newquery= JSON.parse(JSON.stringify(queryObj).replace(/\b(gte|gt|lt|lte)\b/g,elem=>`$${elem}`))
        this.query.find(newquery)
        return this
    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.replaceAll(',',' ');
            this.query.sort(sortBy)
        }
        return this
    }
    paginate(){
        const page=this.queryString.page*1 ||1;
        const limit=this.queryString.limit *1;
        if(limit>=1)
            {
            this.query.skip((page-1)*limit).limit(limit)
            return this
            }
        return this
    }
    select(){
        if(this.queryString.select)
        {
            const select=this.queryString.select.replaceAll(',',' ');
            this.query.select(select);
        }
        if(this.sensitiveFields)
        {
            const ommitted_select=this.sensitiveFields.map(el=>{
                if(el[0]!=='-')
                    return '-'+el
                return el
            })
            this.query.select(ommitted_select.join(' '));   
        }
        return this;
    }

    
    
}