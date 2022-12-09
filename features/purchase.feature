Feature: Ticket purchase
    Scenario: Successfull purchase of one ticket for the first movie
        Given user is on cinema page
        When user chooses day and movie time
        Then user sees "Логан"
        When user chooses one seat and books it
        Then user sees "Вы выбрали билеты:"
        When user clicks booking code butoon
        Then user sees "Электронный билет"

    Scenario: Failed purchase of the same ticket for the first movie
        Given user is on cinema page
        When user chooses day and movie time
        Then user sees "Логан"
        When user chooses one seat and books it
        Then user sees the button is disabled

    Scenario: Successful purchase of two tickets for the second movie
        Given user is on cinema page
        When user chooses day and second movie time
        Then user sees "Фильм 3"
        When user chooses two seats and books them
        Then user sees "Вы выбрали билеты:"
        When user clicks booking code butoon
        Then user sees "Электронный билет"
