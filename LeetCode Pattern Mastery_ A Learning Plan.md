# **LeetCode Pattern Mastery: A Learning Plan**

This document outlines a structured, pattern-based approach to mastering LeetCode and algorithmic problem-solving. The plan is divided into four modules, starting with foundational techniques and building to more complex paradigms.

## **📚 General Resources & Strategy**

Before you start, bookmark these. They are your toolset.

> * **Primary Practice Platform:** **LeetCode** itself. Use the "Tags" feature to filter problems by pattern.  
> * **Pattern-Based Learning:** Resources like **"Grokking the Coding Interview"** (available on platforms like Educative.io) are famous for popularizing this pattern-based approach. LeetCode's own **"Explore" cards** (e.g., for Arrays, Dynamic Programming) are also excellent.  
> * **Visualizations (Crucial for Spatial Learners):**  
  * **VisuAlgo:** An incredible tool that animates data structures and algorithms.  
  * **Data Structure Visualizer (like csvistool.com):** Lets you see the step-by-step operation of algorithms like BFS, DFS, and sorting.  
> * **Your Strategy:** For each pattern, your goal is **recognition**.  
  1. **Learn:** Understand the *visual* and *conceptual* blueprint of the pattern.  
  2. **Practice:** Solve 3-5 "classic" problems for that pattern (see list below).  
  3. **Identify:** When you see a new problem, ask "Which of my blueprints does this look like?" not "How do I solve this from scratch?"

## **🗺️ The Learning Plan: A 4-Module Journey**

This plan is ordered by dependency. Do not move to Module 3 before you are comfortable with Module 1\.

### **Module 1: Array & List Traversal Foundations**

These patterns are the building blocks for most other algorithms. They are all about moving pointers or indices through a linear data structure.

#### **1\. Two Pointers (and Fast & Slow)**

> * **Core Concept:** Using two separate indices (pointers) to traverse an array or list. They can move towards each other, or one can move faster than the other.  
> * **Related Concepts:** This is a foundational technique. **Sliding Window** is a specific *type* of Two Pointers.  
> * **Practice Problems:**  
  * **Easy:** *Valid Palindrome* (LeetCode 125\) \- Pointers move towards each other.  
  * **Medium:** *Two Sum II \- Input Array Is Sorted* (LeetCode 167\)  
  * **Medium:** *Linked List Cycle* (LeetCode 141\) \- Classic Fast & Slow pointer problem.

#### **2\. Sliding Window**

> * **Core Concept:** A more advanced **Two Pointers** technique. You define a "window" (a sub-array) that expands (by moving the right pointer) and contracts (by moving the left pointer) to find a subarray that satisfies a condition.  
> * **Related Concepts:** Builds directly on **Two Pointers**.  
> * **Practice Problems:**  
  * **Easy:** *Maximum Average Subarray I* (LeetCode 643\)  
  * **Medium:** *Longest Substring Without Repeating Characters* (LeetCode 3\)  
  * **Hard:** *Minimum Window Substring* (LeetCode 76\)

#### **3\. Prefix Sum**

> * **Core Concept:** A pre-processing technique. You create a new array where prefixSum\[i\] stores the sum of all elements from the original array's index 0 to i. This lets you find the sum of *any* subarray (i, j) in O(1) time.  
> * **Related Concepts:** A standalone, powerful trick for array-based "range query" problems.  
> * **Practice Problems:**  
  * **Easy:** *Find Pivot Index* (LeetCode 724\)  
  * **Medium:** *Subarray Sum Equals K* (LeetCode 560\) \- A classic, often paired with a Hash Map.

### **Module 2: Sorting, Searching, & Structures**

This module uses foundational algorithms (like sorting) or specific data structures (like heaps) to enable efficient solutions.

#### **4\. Binary Search**

> * **Core Concept:** The ultimate "divide and conquer" search algorithm. On a **sorted** array, you check the middle element and discard half the search space, repeating until you find your target.  
> * **Related Concepts:** **Requires a sorted data structure.** This pattern is often the *key optimization* that turns an O(N^2) or O(N) solution into an O(N log N) or O(log N) solution.  
> * **Practice Problems:**  
  * **Easy:** *Binary Search* (LeetCode 704\) \- The "Hello, World\!" of this pattern.  
  * **Medium:** *Search in Rotated Sorted Array* (LeetCode 33\) \- A modified version.  
  * **Medium:** *Find First and Last Position of Element in Sorted Array* (LeetCode 34\)

#### **5\. Merge Intervals**

> * **Core Concept:** A common pattern for problems involving time ranges, scheduling, or geometric overlaps. The core trick is to **sort the intervals by their start time** and then iterate through, merging any that overlap.  
> * **Related Concepts:** Absolutely dependent on **Sorting**. The logic itself is a simple linear scan after sorting.  
> * **Practice Problems:**  
  * **Medium:** *Merge Intervals* (LeetCode 56\)  
  * **Medium:** *Non-overlapping Intervals* (LeetCode 435\)  
  * **Medium:** *Meeting Rooms II* (LeetCode 253\) \- Often uses a **Heap**.

#### **6\. Heaps (Priority Queues)**

> * **Core Concept:** A data structure that excels at one thing: quickly finding the **smallest** or **largest** element (in O(1) time) and efficiently adding/removing elements (in O(log N) time).  
> * **Related Concepts:** This pattern is all about identifying when a problem is asking for the **"Top K"** elements.  
> * **Practice Problems:**  
  * **Easy:** *Kth Largest Element in a Stream* (LeetCode 703\)  
  * **Medium:** *K Closest Points to Origin* (LeetCode 973\)  
  * **Medium:** *Find Median from Data Stream* (LeetCode 295\) \- A classic using two heaps.

### **Module 3: Recursive & Graph Traversal**

This is the biggest conceptual leap. These patterns are about exploring complex, non-linear structures like trees and graphs.

#### **7\. Depth-First Search (DFS) & Breadth-First Search (BFS)**

> * **Core Concept:** The two fundamental ways to explore a tree or graph.  
  * **DFS (Depth):** Goes as deep as it can down one path before backtracking. Uses **Recursion** or a **Stack**. (Visual: A maze-solver following the right-hand wall).  
  * **BFS (Breadth):** Explores all neighbors at the current "level" before moving deeper. Uses a **Queue**. (Visual: A wave spreading out from a central point).  
> * **Related Concepts:** These are the *engine* for almost all tree and graph problems. **Dynamic Programming** (Memoization) is often just optimized DFS. **Topological Sort** is an application of BFS/DFS.  
> * **Practice Problems:**  
  * **Easy:** *Maximum Depth of Binary Tree* (LeetCode 104\) \- Classic DFS.  
  * **Medium:** *Number of Islands* (LeetCode 200\) \- Classic DFS or BFS on a grid.  
  * **Medium:** *Binary Tree Level Order Traversal* (LeetCode 102\) \- Classic BFS.

#### **8\. Topological Sort**

> * **Core Concept:** An algorithm for ordering a **Directed Acyclic Graph (DAG)**. It finds a linear ordering of nodes where for every edge from node A to node B, A comes before B in the ordering.  
> * **Related Concepts:** This is a direct *application* of **BFS (Kahn's Algorithm)** or **DFS**. It's used for problems involving prerequisites or dependencies.  
> * **Practice Problems:**  
  * **Medium:** *Course Schedule* (LeetCode 207\) \- The canonical "can you finish?" problem.  
  * **Medium:** *Course Schedule II* (LeetCode 210\) \- The "what is the order?" problem.

### **Module 4: Advanced Paradigms**

These are less about specific data structures and more about a *way of thinking*.

#### **9\. Greedy Algorithms**

> * **Core Concept:** Building a solution by making the **locally optimal** (or "greedy") choice at each step, hoping it leads to a globally optimal solution.  
> * **Related Concepts:** Often relies on **Sorting** or **Heaps** to quickly find the "best" local choice. This is a common "trap" pattern; it doesn't always work, and proving it works is hard.  
> * **Practice Problems:**  
  * **Easy:** *Best Time to Buy and Sell Stock* (LeetCode 121\)  
  * **Medium:** *Jump Game* (LeetCode 55\)  
  * **Medium:** *Partition Labels* (LeetCode 763\)

#### **10\. Dynamic Programming (DP)**

> * **Core Concept:** The "final boss" for many. You solve a complex problem by breaking it down into a collection of simpler subproblems, solving each subproblem **just once**, and storing its solution.  
> * **Related Concepts:**  
  * **Memoization (Top-Down):** This is just **DFS \+ a cache** (like a map or array) to store results. If you can solve it with recursion, you can memoize it.  
  * **Tabulation (Bottom-Up):** This is the more spatial-friendly version. You build a 1D or 2D table and fill it out from the "base cases" up.  
> * **Practice Problems:**  
  * **Easy:** *Climbing Stairs* (LeetCode 70\) \- The "Hello, World\!" of DP.  
  * **Medium:** *Coin Change* (LeetCode 322\)  
  * **Medium:** *Longest Increasing Subsequence* (LeetCode 300\)