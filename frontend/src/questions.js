const questions = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    description: "Find two numbers in an array that add up to a target sum.",
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if(map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    aiExplanation: `We use a hash map to store previously visited numbers. For each number, we check if the target minus that number exists in the map. If yes, return their indices. Time complexity: O(n).`,
  }, 
  {
    id: 2,
    title: "Valid Parentheses",
    topic: "Stacks & Queues",
    difficulty: "Easy",
    description: "Check if the input string of parentheses is valid.",
    codeSnippet: `function isValid(s) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };
  for (let char of s) {
    if (map[char]) {
      stack.push(map[char]);
    } else {
      if (stack.pop() !== char) return false;
    }
  }
  return stack.length === 0;
}`,
    aiExplanation: `We use a stack to track closing brackets. Push expected closings on encountering openings, and match on closings. Stack should be empty at the end.`
  },
  {
    id: 3,
    title: "Reverse a String",
    topic: "Strings",
    difficulty: "Easy",
    description: "Reverse a given string.",
    codeSnippet: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    aiExplanation: `We convert the string to an array, reverse it, and join it back to a string.`
  },
  {
    id: 4,
    title: "Fibonacci using Recursion",
    topic: "Recursion",
    difficulty: "Easy",
    description: "Find the nth Fibonacci number using recursion.",
    codeSnippet: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    aiExplanation: `This uses the recursive definition of Fibonacci. Inefficient for large n.`
  },
  {
    id: 5,
    title: "Palindrome Check",
    topic: "Strings",
    difficulty: "Easy",
    description: "Check whether a given string is a palindrome.",
    codeSnippet: `function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}`,
    aiExplanation: `A palindrome reads same forwards and backwards. We reverse and compare.`
  },
  {
    id: 6,
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Medium",
    description: "Search for an element in a sorted array using binary search.",
    codeSnippet: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    aiExplanation: `We repeatedly halve the search space. Efficient for sorted arrays. Time: O(log n).`
  },
  {
    id: 7,
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    description: "Count the ways to climb n stairs taking 1 or 2 steps at a time.",
    codeSnippet: `function climbStairs(n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
    aiExplanation: `This is Fibonacci in disguise. DP avoids repeated calculations.`
  },
  {
    id: 8,
    title: "Max Subarray (Kadane's Algo)",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    description: "Find the subarray with the maximum sum.",
    codeSnippet: `function maxSubArray(nums) {
  let maxSum = nums[0], currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}`,
    aiExplanation: `Kadane's Algorithm tracks current and max sums dynamically.`
  },
  {
    id: 9,
    title: "Merge Sorted Arrays",
    topic: "Two Pointers",
    difficulty: "Easy",
    description: "Merge two sorted arrays into one sorted array.",
    codeSnippet: `function merge(arr1, arr2) {
  let i = 0, j = 0, result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) result.push(arr1[i++]);
    else result.push(arr2[j++]);
  }
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}`,
    aiExplanation: `Use two pointers to merge in linear time.`
  },
  {
    id: 10,
    title: "Detect Cycle in Graph",
    topic: "Graphs",
    difficulty: "Hard",
    description: "Detect if a graph contains a cycle.",
    codeSnippet: `function hasCycle(graph, node, visited, recStack) {
  if (!visited[node]) {
    visited[node] = true;
    recStack[node] = true;
    for (let neighbor of graph[node]) {
      if (!visited[neighbor] && hasCycle(graph, neighbor, visited, recStack)) return true;
      else if (recStack[neighbor]) return true;
    }
  }
  recStack[node] = false;
  return false;
}`,
    aiExplanation: `We use DFS with recursion stack to detect back edges (cycles).`
  },
  {
    id: 11,
    title: "Tower of Hanoi",
    topic: "Recursion",
    difficulty: "Medium",
    description: "Solve Tower of Hanoi for n disks.",
    codeSnippet: `function hanoi(n, from, to, aux) {
  if (n === 1) {
    console.log(\`Move disk 1 from \${from} to \${to}\`);
    return;
  }
  hanoi(n - 1, from, aux, to);
  console.log(\`Move disk \${n} from \${from} to \${to}\`);
  hanoi(n - 1, aux, to, from);
}`,
    aiExplanation: `Divide problem into smaller ones. Move n-1 to aux, last disk to target, then n-1 from aux to target.`
  },
  {
    id: 12,
    title: "Power of Two",
    topic: "Bit Manipulation",
    difficulty: "Easy",
    description: "Check if a number is a power of 2.",
    codeSnippet: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    aiExplanation: `Only powers of 2 have one bit set. n & (n-1) will be zero.`
  },
  {
    id: 13,
    title: "Find Peak Element",
    topic: "Binary Search",
    difficulty: "Medium",
    description: "Find any peak element in an array.",
    codeSnippet: `function findPeak(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}`,
    aiExplanation: `We apply binary search to find the element greater than its neighbors.`
  },
  {
    id: 14,
    title: "Minimum Window Substring",
    topic: "Sliding Window",
    difficulty: "Hard",
    description: "Find the smallest window that contains all characters of a pattern.",
    codeSnippet: `function minWindow(s, t) {
  const map = {}, window = {};
  for (let c of t) map[c] = (map[c] || 0) + 1;

  let have = 0, need = Object.keys(map).length;
  let res = [-1, -1], resLen = Infinity, l = 0;

  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    window[c] = (window[c] || 0) + 1;

    if (map[c] && window[c] === map[c]) have++;

    while (have === need) {
      if (r - l + 1 < resLen) {
        res = [l, r];
        resLen = r - l + 1;
      }
      window[s[l]]--;
      if (map[s[l]] && window[s[l]] < map[s[l]]) have--;
      l++;
    }
  }

  const [start, end] = res;
  return resLen === Infinity ? "" : s.slice(start, end + 1);
}`,
    aiExplanation: `This is a variable sliding window approach with frequency counting.`
  },
  {
    id: 15,
    title: "Serialize and Deserialize Tree",
    topic: "Trees",
    difficulty: "Hard",
    description: "Convert a binary tree to string and back.",
    codeSnippet: `function serialize(root) {
  if (!root) return "null,";
  return root.val + "," + serialize(root.left) + serialize(root.right);
}

function deserialize(data) {
  const nodes = data.split(",");
  function build() {
    const val = nodes.shift();
    if (val === "null") return null;
    const node = { val: parseInt(val), left: null, right: null };
    node.left = build();
    node.right = build();
    return node;
  }
  return build();
}`,
    aiExplanation: `Use preorder traversal to serialize and reconstruct the tree.`
  },
  {
    id: 16,
    title: "Rat in a Maze",
    topic: "Backtracking",
    difficulty: "Medium",
    description: "Print all paths from start to end in a maze.",
    codeSnippet: `function solveMaze(maze, x, y, path, visited) {
  if (x === n-1 && y === n-1) {
    console.log(path);
    return;
  }
  // Move in all 4 directions with valid checks...
}`,
    aiExplanation: `Use backtracking with visited matrix to explore all paths.`
  },
  {
    id: 17,
    title: "LRU Cache",
    topic: "Hashing",
    difficulty: "Hard",
    description: "Design a Least Recently Used (LRU) cache.",
    codeSnippet: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
    aiExplanation: `Use Map to store key-values and maintain order of access for eviction.`
  },
  {
    id: 18,
    title: "Anagram Check",
    topic: "Hashing",
    difficulty: "Easy",
    description: "Check if two strings are anagrams.",
    codeSnippet: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
    aiExplanation: `Track character counts and validate frequency in both strings.`
  },
  {
    id: 19,
    title: "Longest Common Subsequence",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    description: "Find length of longest common subsequence.",
    codeSnippet: `function lcs(s1, s2) {
  const dp = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(0));
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[s1.length][s2.length];
}`,
    aiExplanation: `We use bottom-up DP to find max matching characters between strings.`
  },
  {
    id: 20,
    title: "Detect Cycle in Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    description: "Detect if a cycle exists in a linked list.",
    codeSnippet: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    aiExplanation: `Floyd’s Tortoise and Hare algorithm detects cycles using two pointers.`
  }
];

export default questions;


