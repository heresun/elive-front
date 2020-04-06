

// 将一个时间戳戳字符串转换为一个日期字符串
var getDateStr = function (timestamp) {
    var number = parseInt(timestamp);
    let date = new Date(number);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return year+"年"+(month+1)+"月"+day+"日";
};

// 去除collection中的tablData数组中的指定元素
var remove = function (list, id){
    for (let i = 0; i <list.length ; i++) {
        if (list[i].cId == id){
            list.splice(i,1);
        }
    }

    return list;
}

// 去除globalCollections中的id
var removeCollection = function(list, id){
    for (let i = 0; i <list.length ; i++) {
        if (list[i]== id){
            list.splice(i,1);
        }
    }
    return list;
}

export {
    getDateStr,remove,removeCollection
}