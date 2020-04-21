/*
1. Given an array. Write a recursive function that removes the first element and returns
the given array. (without using arr.unshift(),assign second element to first, third element
to second...)
 */

function unshift(arr, index = 0) {
    if (arr.lenght == 0) {
        return [];
    }
    if (index == arr.length - 1) {
        arr.pop();
        return arr;
    }
    arr[index] = arr[index + 1];
    index++;
    return unshift(arr, index);
}


/*
2. Given an object. Invert it (keys become values and values become keys). If there is
more than key for that given value create an array.
 */


function invert(obj) {

    for (let key in obj) {
        if (key != obj[key]) {
            let temp = obj[obj[key]]
            if (temp) {
                if (Array.isArray(temp)) {
                    temp.push(key);
                    obj[obj[key]] = temp;
                } else {
                    let a = [];
                    a.push(temp);
                    a.push(key);
                    obj[obj[key]] = a;

                }
            } else {
                obj[obj[key]] = key;
            }
            delete obj[key];
        }

    }
    return obj;
}


/*
3. Given the list of the following readers:
Output the books sorted by the percent in descending order which readStatus is true.
 */

let list = [
        {book: "Catcher in the Rye", readStatus: true, percent: 40},
        {book: "Samvel", readStatus: true, percent: 80},
        {book: "Xenty", readStatus: false, percent: 90},
    ]
;

function filterAndSort(list)
{
   return (list.filter(item => item.readStatus == true)).sort((a, b) => b.percent - a.percent);
}

filterAndSort(list);

/*
4.Given an array and a number N.  Write a recursive function that rotates an array N
places to the left. (Hint: to add element to the beginning use arr.unshift())
 */

function rotLeft(arr, n, count = 0) {
    if (n < 0) {
        let nPositive = arr.length - Math.abs(n);
        return rotLeft(arr, nPositive, 0)
    }
    if (count == n) {
        return arr;
    }
    arr.shift(arr.push(arr[0]));
    count++;
    return rotLeft(arr, d, count);
}


/*
5. Create a function that builds a tree like object given an array with object which
contains parent and id properties.
 */

function makeTree(data, obj = {}) {
    data.forEach(each => {
        if (each.parent === null) {
            obj[each.id] = traverse(data, each.id)
        }
    });

    return obj
}

function traverse(data, parentId) {
    const children = {};
    data.forEach(child => {
        if (child.parent === parentId)
            children[child.id] = traverse(data, child.id);
    });
    return children;
}

let treeNodes = [
    {parent: null, id: 0},
    {parent: 0, id: 1},
    {parent: 0, id: 2},
    {parent: 1, id: 3},
    {parent: 1, id: 4},
    {parent: 2, id: 5},
    {parent: 4, id: 6},

]
makeTree(treeNodes);

/*
6. Write a JavaScript function to get all possible subsets of given length of the given
array.
Assume that all elements in the array are unique.
 */

function subSets(arr, length) {
    let combs = [];
    if (length > arr.length || length <= 0) {
        return [];
    }

    if (length == arr.length) {
        return [arr];
    }

    if (length == 1) {
        for (let i = 0; i < arr.length; i++) {
            combs.push([arr[i]]);
        }
        return combs;
    }

    for (let i = 0; i < arr.length - length + 1; i++) {
        let startItem = arr.slice(i, i + 1);
        let lastCombs = subSets(arr.slice(i + 1), length - 1);
        for (let j = 0; j < lastCombs.length; j++) {
            combs.push(startItem.concat(lastCombs[j]));
        }
    }
    return combs;
}

subSets([1, 2, 3, 4], 2)

/*
7. Create constructor function which instances would be objects with already
implemented method &quot;map&quot; (like Array.map)
 */


function ParameterException(message) {
    this.message = message;
    this.name = "Parameter Exception";
}

function Mapable() {
    this.map = function (func) {
        if(typeof  func != 'function')
        {
            throw new ParameterException("Parameter for map function is not a function ");
        }

        for (let key in this) {
            if(typeof  this[key]!= 'function' && typeof  this[key]!= 'object')
            {
                this[key] = func(this[key])
            }

        }
        return this;
    }
}

let a = new Mapable();
a.length = 7;
a.map(function (item) {
    return item * 7
});