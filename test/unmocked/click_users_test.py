'''
    update_users_test.py
    
    This test check if the user is correctly entering the data or not
'''

import unittest
import sys
import os

sys.path.append(os.path.abspath('../../'))
import app as loginfile
USERNAME_INPUT = "username"
USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERS_INPUT: [
                    'X','O'
                ],
                EXPECTED_OUTPUT: [
                    'X','O'
                ]
            },
          
        ]
        self.failure_test_params = [
            {
                USERS_INPUT: [
                    'X','X'
                ],
                EXPECTED_OUTPUT: [
                    'X',' '
                ]
            },
          
        ]
        self.failure_test_params2 = [
            {
                USERS_INPUT: [
                    'X','X','0'
                ],
                EXPECTED_OUTPUT: [
                    
                ]
            },
          
        ]

    def test_add_user(self):
        for test in self.success_test_params:
            actual_result = loginfile.reset(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(actual_result,expected_result)
            #self.assertEqual(actual_result['X'],expected_result['X'])
        print(actual_result)
        print(expected_result)
    def test_add_userfailure(self):
        for test in self.failure_test_params:
            actual_result = loginfile.reset(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertNotEqual(actual_result,expected_result)
            #self.assertEqual(actual_result['X'],expected_result['X'])
        print(actual_result)
        print(expected_result)
    def test_add_userfailure2(self):
        for test in self.failure_test_params2:
            actual_result = loginfile.reset(test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertNotEqual(actual_result,expected_result)
            #self.assertEqual(actual_result['X'],expected_result['X'])
        print(actual_result)
        print(expected_result)
    

if __name__ == '__main__':
    unittest.main()