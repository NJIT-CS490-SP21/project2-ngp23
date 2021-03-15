'''Test the adding to the data'''
import unittest
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import add_db_test
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'


class AddUserTestCase(unittest.TestCase):
    '''add user function'''
    def setUp(self):
        '''Passes the test params'''
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'setUser': 'user2'
                },
                KEY_EXPECTED: [INITIAL_USERNAME, 'user2'],
            },
        ]
        self.failure_test_params = [
            {
                KEY_INPUT: {
                    'setUser': 'user3'
                },
                KEY_EXPECTED: [INITIAL_USERNAME],
            },
        ]
        self.failure_test_params2 = [
            {
                KEY_INPUT: {
                    'setUser': 'user3'
                },
                KEY_EXPECTED: [INITIAL_USERNAME, 'user3', 'user3'],
            },
        ]

        initial_person = models.Person(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, username):
        '''add username to the db'''
        self.initial_db_mock.append(username)

    def mocked_db_session_commit(self):
        '''do nothing'''
        pass

    def mocked_person_query_all(self):
        '''returns the value from db'''
        return self.initial_db_mock

    def test_success(self):
        '''success test case for the db'''
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_result = add_db_test(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print(expected_result)

                        self.assertEqual(len(actual_result),
                                         len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])

    def test_failure(self):
        '''failure test case for the db'''
        for test in self.failure_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_result = add_db_test(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print(expected_result)

                        self.assertNotEqual(len(actual_result),
                                            len(expected_result))
                        self.assertEqual(actual_result[0], expected_result[0])

    def test_failure2(self):
        '''failure2 test case for the db'''
        for test in self.failure_test_params2:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit',
                           self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        print(self.initial_db_mock)
                        actual_result = add_db_test(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        print(self.initial_db_mock)
                        print(expected_result)

                        self.assertNotEqual(len(actual_result),
                                            len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])


if __name__ == '__main__':
    unittest.main()
