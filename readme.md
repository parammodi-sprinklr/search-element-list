## Submission Instructions

1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.

### Background

You are tasked with improving the performance of a web application that displays a large dataset. The dataset consists of thousands of items, each with a unique identifier and associated details. Rendering all items at once would be inefficient and lead to performance issues, so the list is virtualized, meaning only a subset of items visible in the viewport is rendered at any given time.

In this scenario, you need to implement a **search** function that efficiently finds a specific item in the list. The list itself is virtualized to display only the items currently visible in the viewport.

### Requirements:

1. **Function to Implement**:

   - Implement a function called **search** that takes the following arguments:
   - **items**: A Sorted array of strings representing the dataset.
   - **target**: A string representing the item to be found.
   - **onCompare**: A callback function that should be called each time a comparison is made during the search.
   - The **search** function should return the index of the **target** in the items array. If the target is not found, return -1.

2. **Constraints**:

   - The **items** array is large (e.g., 1000+ items).
   - The dataset is sorted in ascending order.
   - The search implementation should be efficient, considering the size of the dataset.
   - You should avoid iterating through each item in the array one by one.

3. **Virtualized List Behavior**:

   - Assume the list is virtualized, meaning that only a subset of the **items** array is rendered based on the scroll position.
   - Your implementation should optimize the **startIndex** calculation to ensure smooth scrolling and efficient rendering of the visible items.

4. **Test Case Integration**:

   - Write tests to ensure the **search** function operates correctly across various scenarios.
   - Ensure that the number of comparisons made during the search is consistent with an efficient search algorithm.
   - Validate that the **startIndex** and visible items are correctly managed during scrolling in the virtualized list.

### Deliverables:

- Implementation: Provide the **search** function implementation.
- Tests: Write test cases using Jest or a similar testing framework to validate:
  - The correct operation of the **search** function.
  - That the **search** function performs efficiently, considering the dataset size.
  - The correct behavior of the **startIndex** calculation in the virtualized list scenario.

### Evaluation Criteria:

- **Correctness**: Does the search function return the correct index for the target in various scenarios?
- **Efficiency**: Is the search function optimized for large datasets?
- **Test Coverage**: Are edge cases covered, and do the tests effectively ensure that the candidate implements an efficient search algorithm?
