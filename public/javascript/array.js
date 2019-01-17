console.warn("Array Homework");

/*function findMinNumber(array) {
    
    var min = array;
    array.forEach(function(nr){
        if(min > nr){
            min=nr;
        }
    })
    console.log('min= ', min);
};

var repetenti4B = [3,6,2,7,9,2,4,0,7];
findMinNumber(repetenti4B);

var repetenti5B = [5,2,6,2,4,7,9,5,2,4];

findMinNumber(repetenti5B);

findMinNumber();*/


// ================= sort ==============

function sortAsc(array) {
    console.warn("sorting: ", array);
    //array.sort();
    for (var j = 0; j < array.length; j++) {

        for (var i = 0; i < array.length - 1 - j; i++) {
            console.info('compaire', array[i], array[i + 1]);
            if (array[i] > array[i + 1]) {
                console.info(' change....');

                var tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
            }
        }
        console.log('intermediate ', array)
    }
    console.info('sorted: ', array);

}

sortAsc([1, 2, 3, 4, 5]);
sortAsc([5, 4, 3, 2, 1]);
sortAsc([1, 3, 2, 5, 4]);

