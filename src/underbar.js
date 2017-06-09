(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = val => val;

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = (array, n) => {
    return n === undefined ? array[0] : [...array].slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = (array, n) => {
    return n === undefined ? array[array.length - 1] : [...array].slice(Math.max(0, array.length -n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = (collection, iterator) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let item in collection) {
        iterator(collection[item], item, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = (array, target) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = (collection, test) => {
    const results = [];
    _.each(collection, (element) => {
      if (test(element)) {
        results.push(element);
      }
    });
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = (collection, test) => {
    const results = [];
    _.each(collection, (element) => {
      if (!test(element)) {
        results.push(element);
      }
    });
    return results;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = (array) => {
    const letterCount = {};
    const results = [];
    for (let i = 0; i < array.length; i++) {
      letterCount[array[i]] = letterCount[array[i]] || 0;
      letterCount[array[i]]++;
    }
    for (let value in letterCount) {
      if (typeof +value === 'number') {
        results.push(+value);
      } else {
        results.push(value);
      }
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = (collection, iterator) => {
    const results = [];
    _.each(collection, (element) => {
      results.push(iterator(element));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = (collection, key) => {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    return _.map(collection, (element) => {
      return element[key];
    });

  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if ([...arguments].length === 2) {
      accumulator = collection[0];
      for (let i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      
    } else {
      _.each(collection, (item) => {
        accumulator = iterator(accumulator, item);
      });
    }
    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = (collection, target) => {
    //use reduce to check if value is contained in collection
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, (wasFound, nextItem) => {
      if (wasFound) {
        return true;
      } else {
        return nextItem === target;
      }
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = (collection, iterator) => {
    return _.reduce(collection, (isTrue, nextItem) => {
      if (iterator) {
        return !!(isTrue && iterator(nextItem));  
      } else {
        return !!(isTrue && _.identity(nextItem));
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = (collection, iterator) => {
    return _.reduce(collection, (hasOccurred, nextItem) => {
      if (iterator) {
        return !!(hasOccurred || iterator(nextItem));
      } else {
        return !!(hasOccurred || _.identity(nextItem));
      }
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = (obj, ...args) => {
    for (let i = 0; i < args.length; i++) {
      for (let key in args[i]) {
        obj[key] = args[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = (obj, ...args) => {
    for (let i = 0; i < args.length; i++) {
      for (let key in args[i]) {
        if (obj[key] === undefined) {
          obj[key] = args[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = (func) => {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let beenCalled = false;
    let result;
    return (...args) => {
      let context = this;
      if (!beenCalled) {
        result = func.apply(context, args);
        beenCalled = true;
      }
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = (func) => {

    let store = {};
    let result;

    return (...args) => {
      let context = this;
      if (store[JSON.stringify(args)] !== undefined) {
        result = store[JSON.stringify(args)];
      } else {
        store[JSON.stringify(args)] = true;
        result = func.apply(context, args);
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = (func, wait, ...args) => {
    let context = this;
    setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = (array) => {
    let deck = [...array];
    let remainingCount = array.length;
    let temp;
    let randomIndex;
    while (remainingCount) {
      randomIndex = Math.floor(Math.random() * remainingCount--);
      temp = deck[remainingCount];
      deck[remainingCount] = deck[randomIndex];
      deck[randomIndex] = temp;
    }
    return deck;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = (collection, functionOrKey, args) => {
    let result = [];
    _.each(collection, (element) => {
      if (typeof functionOrKey === 'string') {
        result.push(element[functionOrKey].apply(element, args));
      } else {
        result.push(functionOrKey.apply(element, args));
      }
    });
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = (collection, iterator) => {
    return collection.sort((a, b) => {
      if (typeof iterator === 'string') {
        return a[iterator] - b[iterator];
      } else {
        return iterator(a) - iterator(b);
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = (...args) => {
    const results = [];
    //find longest length of arguments
    let longestArgLength = 0;
    for (let i = 0; i < args.length; i++) {
      if (args[i].length > longestArgLength) {
        longestArgLength = args[i].length;
      }
    }
    for (let i = 0; i < longestArgLength; i++) {
      let result = [];
      for (let j = 0; j < args.length; j++) {
        result.push(args[j][i])
      }
      results.push(result);
    }
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = (nestedArray, result) => {
    let results = [];
    for (let i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        results = results.concat(_.flatten(nestedArray[i]));
      } else {
        results.push(nestedArray[i]);
      }
    }
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = (arrayToCheck, ...args) => {
    return _.filter(arrayToCheck, (element) => {
      return _.every(args, (remainingArray) => {
        return _.indexOf(remainingArray, element) >= 0;
      });
    });

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = (array, ...args) => {
    return _.filter(array, (element) => {
      return _.every(args, (remainingArray) => {
        return _.indexOf(remainingArray, element) < 0;
      });
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    let hasBeenCalled = false;

    setInterval(() => {
      hasBeenCalled = false;
    }, wait);
    return (...args) => {
      let context = this;
      if (!hasBeenCalled) {
        func.apply(context, args);
        hasBeenCalled = true;
      }
    };
  };
}());
