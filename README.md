# onboarding-practice README.md

### This is a leave management system project, that manages the leaves of different employees, the managers can accept or deny leavews accordingly and set absent dates. Built on Django, Django Rest Framework and JWT Authentication.

# Table of Content


## 1. [Project Setup](#project-setup)
## 2. [Running Project](#running-project)
## 3. [Project Apps](#project-apps)
## 4. [Rest Framework](#rest-framework)
## 5. [Tests](#tests)  
- [Users app](#users-app)
- [Manager app](#manager-app)
- [Main app](#main-app)
-----

# Project Setup

## Pull code 

### For HTTP pull link

 - **HTTP** > git pull https://github.com/Ignicube/onboarding-practice.git

### For SSH pull link

 - **SSH** > git pull git@github.com:Ignicube/onboarding-practice.git

# Steps for instantiating the project 

### Installing python virtualenv

```bash
pip install virtualenv
```

### Setting up virtualenv

```bash
python3 -m venv env
```

### Activating virtualenv

```bash
source env/bin/activate
```

## Install Dockerfile for docker container

### Build an Image

#### Run the commands in the project directory

```bash
docker-compose build
```

### Run a container

```bash
docker-compose up
```

### Install requirements.txt 

```bash
pip install -r requirements.txt 
```

# Running project

## Without docker container

#### Will need to change the database settings in settings.py 

- From => HOST: 'db'
- To => HOST: 'localhost'

and vice versa if want to run as docker container

```bash
python3 manage.py runserver
```

## With Docker container
```bash
docker-compose run web python manage.py runserver
``` 

# Frame Works and Database

### - Django
### - Django Rest Framework
### - Django Simple JWT (JSON Web Token)
### - PostgreSQL

---

# Project apps

- ## main
    - ### main app that controls the flow models, views, urls of the employee logged in
- ## managers
    - ### Manager app controls the flow models, views, urls of the managers logged in
- ## users
    - ### Contains CustomUser model
    - ### Users app controls the flow models and JWT authentication of the users logging in

# Rest Framework

## settings.py

```Python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': 'leaves_testing_secret_key',
}
```

# Tests

## Users app

### Tes tUrls

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| Test_access_url_token | Testing urlconfig with JWT token view | - | Pass |
| Test_refresh_url_token | Testing urlconfig with JWT refresh token view | - | Pass |

### View Test

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_jwt_access_token_view | Testing JWT access token in response.data | HTTP_200_ok  | Pass |
| test_jwt_refresh_token_view | Testing JWT refresh token in response.data | HTTP_200_ok | Pass |
| test_token_refreshing_view | Test for obtaining access token through providing refresh token to the API | HTTP_200_OK | Pass |

## Manager app

### Test Urls

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_current_manager_view | Test for checking urls linked to right views | - | Pass |
| test_request_leave_view | Test for checking urls linked to right views | - | Pass |
| test_request_leave_edit_view | Test for checking urls linked to right views | - | Pass |

### View Test

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_current_manager_not_authenticated_view | Test for current unauthorized manager view | HTTP_401_UNAUTHORIZED | Pass |
| test_current_manager_authenticated_view | Test for current authenticated manager view | HTTP_200_OK | Pass |
| test_requested_leave_view_manager | Test for managers departments employee leaves detail | HTTP_200_OK | Pass |


### Model Test

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_string_method | Test for checking the Managers __str__ method | True | Pass |

## Main app

### Test Url

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_current_user_url | Test for checking urls linked to right views | True | Pass |
| test_leave_request_url | Test for checking urls linked to right views | True | Pass |

### View Test

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_current_user_view | A test for current user detail | HTTP_200_OK | Pass |
| test_current_user_leaves_view | A test for current users requested leaves | HTTP_200_OK | Pass |

### Test Model

| Test | Description | Result | Pass/Fail |
| ---- | ----------- | ------ | --------- |
| test_employee_string | Test for checcking employee model __str__ method | True | Pass |
| test_check_limit | Test tfor checking employee model check_limit method | True | Pass |
| test_absent_string | Test for checcking absent model __str__ method | True | Pass |
| test_leave_notice_check_positive_value | Test for checking leave notice attribute number_of_days to be positive | True (number_of_days > 0) | Pass |
| test_leave_notice_check_negative_value | Test for checking leave notice attribute number_of_days to be negative | True (number_of_days not < 0) | Pass |