'''
    split_test.py
    
    This file tests string.split(). In the real world, there's no need to test
    Python's library functions, but we're just doing this as an intro to unit
    tests.
'''

import unittest

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_LENGTH = "length"
KEY_FIRST_WORD = "first_word"
KEY_SECOND_WORD = "second_word"

# "String1 String2 String3".split() => ['String1', 'String2', 'String3']

class SplitTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "Childish Gambino",
                KEY_EXPECTED: ['Childish', 'Gambino'],
            },
            {
                KEY_INPUT: "Ariana Grande",
                KEY_EXPECTED: ['Ariana', 'Grande'],
            }
            # TODO add another
        ]
        
        self.failure_test_params = [
            {
                KEY_INPUT: "The Weeknd",
                KEY_EXPECTED: "TheWeeknd",
            },
            {
                KEY_INPUT: "Glass Animals",
                KEY_EXPECTED: ['Glasss', 'Animal', 's'],
            }
            # TODO add another
        ]


    def test_split_success(self):
        for test in self.success_test_params:
            actual_result = test[KEY_INPUT].split()
            
            expected_result = test[KEY_EXPECTED]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[0], expected_result[0])
            self.assertEqual(actual_result[1], expected_result[1])
            
    def test_split_failure(self):
        for test in self.failure_test_params:
            actual_result = test[KEY_INPUT].split()
            
            expected_result = test[KEY_EXPECTED]
            
            self.assertNotEqual(len(actual_result), len(expected_result))
            self.assertNotEqual(actual_result[0], expected_result[0])


if __name__ == '__main__':
    unittest.main()