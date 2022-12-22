Feature: Ticket purchase
    Scenario: Successfull purchase of one ticket for the first movie
        Given user is on cinema page
        When user chooses day "2"
        When user chooses movie time "129"
        Then user sees "Логан"
        When user chooses row "4" and seat "5"
        When user books
        Then user sees "Вы выбрали билеты:"
        When user clicks booking code butoon
        Then user sees "Электронный билет"

    Scenario: Failed purchase of the same ticket for the first movie
        Given user is on cinema page
        When user chooses day "2"
        When user chooses movie time "129"
        Then user sees "Логан"
        When user chooses row "4" and seat "5"
        When user books
        Then user sees the button is disabled

    Scenario: Successful purchase of two tickets for the second movie
        Given user is on cinema page
        When user chooses day "2"
        When user chooses movie time "94"
        Then user sees "Фильм 3"
        When user chooses row "4" and seat "5"
        When user chooses row "4" and seat "6"
        When user books
        Then user sees "Вы выбрали билеты:"
        When user clicks booking code butoon
        Then user sees "Электронный билет"
