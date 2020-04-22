const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return (blogs.length === 0)
        ?  0
        : blogs.reduce((tot, cur) => tot + cur.likes, 0) 
}

const favoriteBlog = (blogs) => {
    
    let likArr=blogs.map(el => el.likes);
    let index = likArr.indexOf(Math.max(...likArr));
    return (blogs.length === 0)
        ? {}
        : blogs[index]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return {};
    }

    let counts = blogs.reduce((tot, each) => {
        let count = (tot[each.author] || 0); 
        tot[each.author] = ++count;
        return tot;
    }, {}) 
    let max = Math.max(...Object.values(counts));
    let ind = Object.values(counts).indexOf(max);

    let objArr = []
    Object.keys(counts).forEach(key => {
        let newObj = {}
        newObj[key] = counts[key]
        objArr.push(newObj)
    })

    return {author: Object.keys(objArr[ind])[0], blogs: Object.values(objArr[ind])[0]}
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {};
    }

    let likes = blogs.reduce((likeCount, each) => {
        let curCount = (likeCount[each.author] || 0);
        likeCount[each.author] = curCount + each.likes;
        return likeCount;
    }, {})

    let maxLikes = Math.max(...Object.values(likes));
    let index = Object.values(likes).indexOf(maxLikes);
    
    let objArr = [];
    Object.keys(likes).forEach(key => {
        let newObj = {};
        newObj[key] = likes[key];
        objArr.push(newObj)
    })

    return {author: Object.keys(objArr[index])[0], likes: Object.values(objArr[index])[0]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}