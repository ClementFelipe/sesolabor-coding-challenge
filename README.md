Note: nodejs version 16.17.0 was used

# Solution

This problem can be thought of as merging N ordered arrays. However there a two added difficulties, which are the size of the possible arrays and the async access to the array elements.

Given the memory restriction of the problem, it is impossible to store even one of the log sources in memory, therefore, the merging of the log sources must be done using minimal memory.

In a more basic scenario, we can merge two arrays of size M and N by using two pointers, and this solution would have a time complexity of O(M+N). However, in this case the number of arrays is dynamic, therefore the merging of arrays must be done through another mechanism (data structure). In the case of N arrays, looking at the first element of every array and getting the lowest value (log date) would yield the first value to print. We would then have to continue looking in the arrays for the next element to print, while maintaining the order of the previously obtained elements.

Since the problem is printing logs in an ordered fashion (least date first) this means we must use a data structure that can give us fast access to the minimum, while also maintaining the order of previously inserted entries, also insertion must be fast. A data structure that maintains order and gives fast access to the minimum is called a [MinHeap](https://en.wikipedia.org/wiki/Binary_heap) which is a special case of a binary heap, which has insertion times of O(log(N)) and can obtain the minimum in O(1).

## Algorithm

The algorithm consists of two steps:

1. Building an initial heap with the firs log from each of the M log sources, this will guarantee obtaining the minimum and preserve the order of the elements when the next minimum log is required.
2. Adding the next log entries to the heap and printing the minimum, this is done in a two step cycle:
    1. Print out the current minimum in the heap
    2. Replace the minimum with the next log, which will reorganize the heap, preserving order with previous elements. The minimum is replaced in order to save time instead of deleting the old minimum and inserting the new log. The next log chosen is also important, as it has to be from the same source as the previously obtained minimum. This is done to guarantee that the heap will not be filled with elements too large.

Given an initial heap of size M (number of log sources) is built, and elements the minimum is always just replaced and no more elements added, the space usage of this will always be O(N), keeping it very minimal and well under the constraints of the problem. Given M arrays and N elements, the time complexity of this is O(N*log(M)), given that for every single log there is an insertion that is O(M).

An example:

![Screen Shot 2022-09-06 at 6 46 03 PM](https://user-images.githubusercontent.com/23247540/188759175-d17e40cc-b095-4475-a251-6b8a212e05e9.png)

## Tests

Unit tests are added to validate functionality of the heap and both sync and async solutions, use `npm test` in order to run. An end to end test of both solutions is already provided with the challenge and can be run using `npm start`.

## Result times

On my system, the sync solution runs in ~1.3 seconds with ~18500 logs/second and the async solution in ~3 seconds with ~8000 logs/second.

<img align="left" width="100px" height="100px" src="https://user-images.githubusercontent.com/12256205/162470824-d34c5fad-555e-498b-9ac9-ba86b6eb057a.png">

## SESO Coding Challenge: Log Sorting

<br>

## Instructions

We have a number of [**log sources**](https://github.com/sesolabor/coding-challenge/blob/master/lib/log-source.js).  Each log source contains N log entries.  Each entry is a javascript object with a timestamp and message.  We don't know the number of log entries each source contains - however - we do know that the entries within each source are sorted 🕒 **chronologically** 🕒.

### The Objectives:
1. ***Drain all of the log sources*** for both the synchronous and asynchronous solutions.
    - [Synchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L37)
    - [Asynchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L45)
1. Print all of the entries, across all of the sources, in chronological order.
    - We don't need to store the log entries, just print them to stdout.
1. Do this *efficiently*. There are time and space complexities afoot!

We expect candidates to spend 1-3 hours on this exercise.

**We want to see you flex your CS muscles!!! Use the appropriate data structures to satisfy the time and space complexities inherent to the problem!!!**

## Pointers & Callouts

* We don't know how many logs each source contains.  A source could contain millions of entries and be exabytes in size! In other words, reading the entirety of a log source into memory won't work well.
* Log sources could contain logs from last year, from yesterday, even from 100 years ago. We won't know the timeframe of a log source until we start looking.
* Consider what would happen when asked to merge 1 million log sources.  Where might bottlenecks arise?

There are two parts of the challenge which you'll see when diving into things.  You can get started by running `npm start`.

## Submitting

Create a GitHub repo and email your point of contact the link.

If - for whatever reason - you cannot create a GitHub repo for this challenge, it is also acceptable to 'zip' the directory and provide your submission as an email attachment.
