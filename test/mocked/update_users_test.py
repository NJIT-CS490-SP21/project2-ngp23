'''
    update_users_test.py
    
    Fill in what this test is for here
'''

import unittest
#from update_users import add_user
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
                USERS_INPUT: {
                    'setUser': "User1"
                },
                EXPECTED_OUTPUT: {
                    'X': "User1"
                }
            },
            {
                    USERS_INPUT: {
                    'setUser': "User2"
                },
                EXPECTED_OUTPUT: {
                    'X': "User1",
                    'O': "User2"
                }
                
            }
          
        ]
        self.failure_test_params = [
            {
                USERS_INPUT: {
                    'setUser': "User1"
                },
                EXPECTED_OUTPUT: {
                    'X': None
                }
            },
            {
                    USERS_INPUT: {
                    'setUser': "User2"
                },
                EXPECTED_OUTPUT: {
                    'X': "User2",
                    'O': None
                }
                
            }
          
        ]
        
    def test_add_user(self):
        for test in self.success_test_params:
            # TODO: Make a call to add user with your test inputs
            # then assign it to a variable. Look at split_test for example
            actual_result = loginfile.login(test[USERS_INPUT])
            # TODO: Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # TODO: Use assert checks to see compare values of the results
            self.assertEqual(actual_result,expected_result)
            self.assertEqual(actual_result['X'],expected_result['X'])
    
    def test_add_userfail(self):
        for test in self.failure_test_params:
            # TODO: Make a call to add user with your test inputs
            # then assign it to a variable. Look at split_test for example
            actual_result = loginfile.login(test[USERS_INPUT])
            # TODO: Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # TODO: Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result,expected_result)
            self.assertNotEqual(actual_result['X'],expected_result['X'])

if __name__ == '__main__':
    unittest.main()